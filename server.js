require('dotenv').config();

const express = require('express');
const session = require('express-session');
const fs = require('node:fs');
const path = require('node:path');
const nodemailer = require('nodemailer');
const multer = require('multer');
const XLSX = require('xlsx');
const { createClient } = require('@supabase/supabase-js');

class FileSessionStore extends session.Store {
  constructor(options = {}) {
    super();
    this.file = options.file || path.join(__dirname, '.sessions.json');
    this.sessions = new Map();
    this.diskWritable = true;
    this.loadFromDisk();
  }
  loadFromDisk() {
    try {
      if (!fs.existsSync(this.file)) return;
      const raw = fs.readFileSync(this.file, 'utf8');
      Object.entries(JSON.parse(raw)).forEach(([sid, record]) => this.sessions.set(String(sid), record));
      this.saveToDisk();
    } catch (error) {
      this.diskWritable = false;
    }
  }
  saveToDisk() {
    if (!this.diskWritable) return;
    try {
      const payload = JSON.stringify(Object.fromEntries(this.sessions));
      const tempFile = `${this.file}.${process.pid}.tmp`;
      fs.writeFileSync(tempFile, payload, { mode: 0o600 });
      fs.renameSync(tempFile, this.file);
    } catch (error) {
      this.diskWritable = false;
    }
  }
  get(sid, callback) {
    const record = this.sessions.get(String(sid));
    if (!record) return setImmediate(() => callback(null, null));
    if (record.expires && Date.now() > record.expires) {
      this.destroy(sid, () => {});
      return setImmediate(() => callback(null, null));
    }
    setImmediate(() => callback(null, record.session));
  }
  set(sid, sessionData, callback) {
    this.sessions.set(String(sid), { session: sessionData, expires: sessionData && sessionData.cookie && (sessionData.cookie.expires instanceof Date || typeof sessionData.cookie.expires === 'number' || typeof sessionData.cookie.expires === 'string') ? new Date(sessionData.cookie.expires).getTime() : null });
    this.saveToDisk();
    if (callback) setImmediate(callback);
  }
  destroy(sid, callback) {
    this.sessions.delete(String(sid));
    this.saveToDisk();
    if (callback) setImmediate(() => callback(null));
  }
  touch(sid, sessionData, callback) {
    const record = this.sessions.get(String(sid));
    if (record) {
      record.session = sessionData;
      record.expires = sessionData && sessionData.cookie && sessionData.cookie.expires ? new Date(sessionData.cookie.expires).getTime() : null;
    }
    this.saveToDisk();
    if (callback) setImmediate(callback);
  }
}

const app = express();
const upload = multer({ storage: multer.memoryStorage(), limits: { fileSize: 2 * 1024 * 1024 } });
const port = process.env.PORT || 3000;
const requests = [];
const localDepartments = [
  { id: 1, name: 'Computer Engineering', head_user_id: 'hod.computer@svitvasad.ac.in', email: '', designation: '' }
];
const localAuditoriums = [
  { id: 1, name: 'Architecture Auditorium', capacity: 300, min_students: 1, approval_1_role: 'head', approval_2_role: 'electrician', approval_3_role: 'principal', approval_4_role: 'maintenance', principal_user_id: '', maintenance_user_id: '' },
  { id: 2, name: 'Aeronautical Auditorium', capacity: 300, min_students: 1, approval_1_role: 'head', approval_2_role: 'electrician', approval_3_role: 'principal', approval_4_role: 'maintenance', principal_user_id: '', maintenance_user_id: '' },
  { id: 3, name: 'Main Auditorium', capacity: 500, min_students: 1, approval_1_role: 'head', approval_2_role: 'electrician', approval_3_role: 'principal', approval_4_role: 'maintenance', principal_user_id: '', maintenance_user_id: '' },
  { id: 4, name: 'Seminar Auditorium', capacity: 250, min_students: 1, approval_1_role: 'head', approval_2_role: 'electrician', approval_3_role: 'principal', approval_4_role: 'maintenance', principal_user_id: '', maintenance_user_id: '' }
];
const users = [
  { id: 'admin@svitvasad.ac.in', password: 'admin123', name: 'System administrator', role: 'admin', department: 'All departments' },
  { id: 'subadmin@svitvasad.ac.in', password: 'subadmin123', name: 'Sub administrator', role: 'sub_admin', department: 'All departments' },
  { id: 'hod.computer@svitvasad.ac.in', password: 'hod123', name: 'Computer Engineering HOD', role: 'head', department: 'Computer Engineering' },
  { id: 'rakeshthakkar.admin@svitvasad.ac.in', password: 'maintenance123', name: 'Maintenance officer', role: 'maintenance', department: 'All departments' },
  { id: 'electrician@svitvasad.ac.in', password: 'electrician123', name: 'Electrician', role: 'electrician', department: 'All departments' },
  { id: 'principal@svitvasad.ac.in', password: 'principal123', name: 'Principal', role: 'principal', department: 'All departments' },
  { id: 'authority@svitvasad.ac.in', password: 'authority123', name: 'Higher authority', role: 'higher_authority', department: 'All departments' }
];
const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.SUPABASE_ANON_KEY;
const supabase = process.env.SUPABASE_URL && supabaseKey
  ? createClient(process.env.SUPABASE_URL, supabaseKey)
  : null;
const localDisabledUsers = new Set();

async function getUsers() {
  if (!supabase) return users.map((u) => ({ ...u, is_disabled: localDisabledUsers.has(u.id) }));
  const { data, error } = await supabase.from('user_accounts').select('*').order('id');
  if (error) {
    if (error.code === 'PGRST205') return users.map((u) => ({ ...u, is_disabled: localDisabledUsers.has(u.id) }));
    throw error;
  }
  return (data || []).map((u) => ({ ...u, is_disabled: Boolean(u.is_disabled) || localDisabledUsers.has(u.id) }));
}

async function saveUser(user, passwordProvided) {
  if (!supabase) return;
  const values = { id: user.id, name: user.name, department: user.department, role: user.role, password: user.password };
  if (!passwordProvided && !values.password) throw new Error('Existing user password is unavailable.');
  const { error } = await supabase.from('user_accounts').upsert(values, { onConflict: 'id' });
  if (error) throw error;
}

// --- Additional role assignments for a single email (one email, multiple roles) ---
const localRoleAssignments = [
  { id: 1, user_id: 'principal@svitvasad.ac.in', name: 'Principal', department: 'All departments', role: 'principal' }
];
async function getRoleAssignments() {
  if (!supabase) return localRoleAssignments.map((a) => ({ ...a }));
  const { data, error } = await supabase.from('role_assignments').select('*').order('id');
  if (error) {
    if (error.code === 'PGRST205' || error.code === '42501') return localRoleAssignments.map((a) => ({ ...a }));
    throw error;
  }
  return (data || []).map((a) => ({ ...a }));
}
async function saveRoleAssignment(userId, name, department, role) {
  const assignment = { user_id: userId, name, department, role };
  const updateLocal = () => {
    const index = localRoleAssignments.findIndex((a) => a.user_id === userId && a.department === department && a.role === role);
    if (index >= 0) Object.assign(localRoleAssignments[index], assignment);
    else localRoleAssignments.push({ id: Date.now(), ...assignment });
  };
  if (!supabase) { updateLocal(); return; }
  try {
    const { error } = await supabase.from('role_assignments').upsert(assignment, { onConflict: 'user_id,role,department' });
    if (error) {
      if (error.code === 'PGRST205' || error.code === '42P01' || error.code === '42501') updateLocal();
      else throw error;
    }
  } catch (e) {
    if (e.code === 'PGRST205' || e.code === '42P01' || e.code === '42501') updateLocal();
    else throw e;
  }
}
async function deleteRoleAssignment(userId, department, role) {
  const deleteLocal = () => {
    const index = localRoleAssignments.findIndex((a) => a.user_id === userId && a.department === department && a.role === role);
    if (index >= 0) localRoleAssignments.splice(index, 1);
  };
  if (!supabase) { deleteLocal(); return; }
  try {
    const { error } = await supabase.from('role_assignments').delete().eq('user_id', userId).eq('department', department).eq('role', role);
    if (error) {
      if (error.code === 'PGRST205' || error.code === '42P01' || error.code === '42501') deleteLocal();
      else throw error;
    }
  } catch (e) {
    if (e.code === 'PGRST205' || e.code === '42P01' || e.code === '42501') deleteLocal();
    else throw e;
  }
}
async function userRolesForLogin(user) {
  const extra = await getRoleAssignments();
  return (extra || []).filter((a) => a.user_id === user.id);
}

const mailer = process.env.SMTP_HOST && process.env.SMTP_USER && process.env.SMTP_PASSWORD
  ? nodemailer.createTransport({ host: process.env.SMTP_HOST, port: Number(process.env.SMTP_PORT || 587), secure: process.env.SMTP_SECURE === 'true', auth: { user: process.env.SMTP_USER, pass: process.env.SMTP_PASSWORD } })
  : null;
let senderEmail = process.env.SMTP_FROM || process.env.SMTP_USER || 'nodalofficer@svitvasad.ac.in';

app.use(express.urlencoded({ extended: true, limit: '10mb', parameterLimit: 100000 }));
app.use(express.json({ limit: '10mb' }));
app.use(session({
  secret: process.env.SESSION_SECRET || 'replace-this-session-secret',
  resave: false,
  saveUninitialized: false,
  store: new FileSessionStore(),
  cookie: { httpOnly: true, sameSite: 'lax', secure: process.env.NODE_ENV === 'production', maxAge: 7 * 24 * 60 * 60 * 1000 }
}));
app.get('/', renderRequestPage);
app.get('/request', renderRequestPage);
app.use(express.static(path.join(__dirname, 'public')));

async function getAuditoriums() {
  return (await getAuditoriumConfigs()).filter((auditorium) => !auditorium.is_locked).map((auditorium) => auditorium.name);
}

async function getAuditoriumConfigs() {
  if (!supabase) return localAuditoriums;
  const { data, error } = await supabase.from('auditoriums').select('*').order('name');
  if (error) {
    if (error.code === 'PGRST205') return localAuditoriums;
    throw error;
  }
  return data;
}

async function getDepartments() {
  if (!supabase) return localDepartments;
  const { data, error } = await supabase.from('departments').select('*').order('name');
  if (error) {
    if (error.code === 'PGRST205') return localDepartments;
    throw error;
  }
  return data;
}

async function approverEmail(role, request, auditorium) {
  if (role === 'head') {
    const department = (await getDepartments()).find((candidate) => candidate.name === request.department);
    return department?.head_user_id;
  }
  if (role === 'principal' && auditorium?.principal_user_id) {
    return auditorium.principal_user_id;
  }
  if (role === 'maintenance' && auditorium?.maintenance_user_id) {
    return auditorium.maintenance_user_id;
  }
  return (await getUsers()).find((user) => user.role === role)?.id;
}

async function notifyPendingApprover(request, auditoriumConfigs) {
  const auditorium = auditoriumConfigs.find((auditorium) => auditorium.name === request.auditorium) || {};
  const transition = approvalTransition(request, auditorium);
  if (!transition) return;
  const recipient = await approverEmail(transition.role, request, auditorium);
  if (recipient) {
    await createNotification({
      userId: recipient,
      title: `Auditorium approval pending: ${request.program}`,
      message: `${request.department} · ${request.auditorium} · ${request.date} ${request.start_time || ''}–${request.end_time || ''}. Awaiting ${moduleRoleLabel(transition.role)} approval.`,
      module: 'auditorium',
      referenceId: request.id,
      link: '/admin'
    });
  }
  if (!mailer) return;
  if (!recipient) return;
  try {
    await mailer.sendMail({
      from: senderEmail,
      to: recipient,
      subject: `Auditorium approval pending: ${request.program}`,
      text: `A new auditorium request is waiting for your approval.\n\nDepartment: ${request.department}\nProgramme: ${request.program}\nAuditorium: ${request.auditorium}\nDate: ${request.date}\nTime: ${request.start_time || 'Not specified'} - ${request.end_time || 'Not specified'}\n\nRequester: ${request.requester_name || request.faculty_name || 'Not specified'} (${request.requester_type || 'student'})\n${request.requester_enrollment_no ? `Enrollment/ID: ${request.requester_enrollment_no}\n` : ''}Branch: ${request.requester_branch || request.department}\nMobile: ${request.requester_mobile || 'Not specified'}\n\nPlease sign in to the approval desk.`
    });
  } catch (error) {
    console.error(`Approval email could not be sent to ${recipient}: ${error.message}`);
  }
}

async function notifyRequester(request, status, remarks) {
  const recipientEmail = request.requester_email || (request.requester_id && request.requester_id !== 'public' ? request.requester_id : null);
  const statusLabels = { approved: 'Approved', first_approved: 'First approval done', second_approved: 'Second approval done', third_approved: 'Third approval done', rejected: 'Rejected' };
  const statusLabel = statusLabels[status] || status;
  if (recipientEmail) {
    await createNotification({
      userId: recipientEmail,
      title: `Auditorium request ${statusLabel}: ${request.program}`,
      message: `Your request for ${request.auditorium} on ${request.date} is ${statusLabel}.${remarks ? ` Remarks: ${remarks}` : ''}`,
      module: 'auditorium',
      referenceId: request.id,
      link: '/dashboard'
    });
  }
  if (!mailer) return;
  if (!recipientEmail) return;
  try {
      await mailer.sendMail({
        from: senderEmail,
        to: recipientEmail,
        subject: `Auditorium request ${statusLabel}: ${request.program}`,
        text: `Your auditorium request has been ${statusLabel}.\n\nDepartment: ${request.department}\nProgramme: ${request.program}\nAuditorium: ${request.auditorium}\nDate: ${request.date}\nTime: ${request.start_time || 'Not specified'} - ${request.end_time || 'Not specified'}\nStatus: ${statusLabel}\n${remarks ? `Remarks: ${remarks}\n` : ''}\nPlease sign in to the approval desk for details.`
      });
  } catch (error) {
    console.error(`Requester email could not be sent to ${recipientEmail}: ${error.message}`);
  }
}

async function renderRequestPage(req, res) {
  try {
    const viewerIsAdmin = Boolean(req.session && req.session.user && isAdmin(req.session.user));
    const requestPageEnabled = (await getSystemSetting('REQUEST_PAGE_ENABLED')) !== 'false';
    const page = require('node:fs').readFileSync(path.join(__dirname, 'public', 'index.html'), 'utf8');
    if (!requestPageEnabled && !viewerIsAdmin) {
      const disabledHtml = '<section class="main-content"><p class="eyebrow">Requests closed</p><h1>Auditorium<br><em>permission</em></h1><p class="lede">The auditorium request page has been temporarily disabled by an administrator.</p><div style="padding:24px;border:1px solid var(--orange);border-radius:4px;color:var(--ink);font:15px/1.6 Arial,sans-serif"><strong>Requests are currently closed.</strong><br>New auditorium requests cannot be submitted right now. Please try again later or contact the administrator for assistance.</div></section>';
      res.send(page.replace(/<section class="main-content">[\s\S]*?<\/section>\s*<\/div>\s*<footer>/, () => `${disabledHtml}</div>\n    <footer>`));
      return;
    }
    const auditoriumConfigs = await getAuditoriumConfigs();
    const departments = await getDepartments();
    const visibleConfigs = viewerIsAdmin ? auditoriumConfigs : auditoriumConfigs.filter((auditorium) => !auditorium.is_locked);
    const options = visibleConfigs.length
      ? visibleConfigs.map((auditorium) => auditorium.is_locked
          ? `<label class="choice" title="Disabled by admin"><input type="radio" name="auditorium" value="${escapeHtml(auditorium.name)}" disabled><span>${auditoriumLabel(auditorium)}<span class="min-students-badge">(Disabled by admin)</span></span></label>`
          : `<label class="choice"><input type="radio" name="auditorium" value="${escapeHtml(auditorium.name)}" data-min-students="${auditorium.min_students || 1}" required><span>${auditoriumLabel(auditorium)}<span class="min-students-badge">(Min: ${auditorium.min_students || 1} students)</span></span></label>`).join('')
      : '<p class="empty-rooms">No auditoriums are currently available. An administrator must unlock a room before it can be selected.</p>';
    const departmentOptions = departments.map((department) => `<option value="${escapeHtml(department.name)}">${escapeHtml(department.name)}</option>`).join('');
    const purchaseDepartmentOptions = '<option value="">Select department</option>' + departmentOptions;
    const availableCount = auditoriumConfigs.filter((auditorium) => !auditorium.is_locked).length;
    let result = page
      .replace('<input name="department" placeholder="e.g. Computer Engineering" required>', `<select name="department" required><option value="">Select department</option>${departmentOptions}</select>`)
      .replace('<label>Branch / Department<input name="requester_branch" placeholder="e.g. Computer Engineering" required></label>', `<label>Branch / Department<select name="requester_branch" required><option value="">Select branch</option>${departmentOptions}</select></label>`)
      .replace(/<fieldset><legend>Choose auditorium<\/legend>[\s\S]*?<\/fieldset>/, `<fieldset><legend>Choose auditorium</legend>${options}</fieldset>`)
      .replace(/<strong>\d+<\/strong>\s*<span>Auditoriums available<\/span>/, `<strong>${availableCount < 10 ? '0' + availableCount : availableCount}</strong>\n          <span>Auditoriums available</span>`);
    result = result.replace(/<select name="department" required><option value="">Select department<\/option><\/select>/g, `<select name="department" required>${purchaseDepartmentOptions}</select>`);
    if (!requestPageEnabled && viewerIsAdmin) {
      const banner = '<div style="border:1px solid var(--orange);background:transparent;color:var(--ink);padding:14px 18px;border-radius:4px;font:14px/1.5 Arial,sans-serif;margin:0 0 22px"><strong>Admin preview:</strong> the auditorium request page is currently <strong>disabled for users</strong>. Disabled auditoriums are shown below for review and cannot be selected.</div>';
      result = result.replace('<p class="lede">Submit one clear request for every programme, lecture, rehearsal, or campus gathering.</p>', `${banner}<p class="lede">Submit one clear request for every programme, lecture, rehearsal, or campus gathering.</p>`);
    }
    res.send(result);
  } catch (error) {
    res.status(500).send(error.message);
  }
}

const requireLogin = (req, res, next) => {
  if (!req.session.user) return res.redirect('/login');
  next();
};

const isAdmin = (user) => user?.role === 'admin' || user?.role === 'sub_admin';

const escapeHtml = (value) => String(value ?? '').replace(/[&<>'"]/g, (character) => ({
  '&': '&amp;', '<': '&lt;', '>': '&gt;', "'": '&#39;', '"': '&quot;'
}[character]));

const approvalPendingRank = (status) => {
  if (status === 'approved' || status === 'completed' || status === 'work_done') return 1;
  if (status === 'rejected') return 2;
  return 0;
};

const sortPendingFirst = (list) => list.slice().sort((a, b) => {
  const pa = approvalPendingRank(a.status);
  const pb = approvalPendingRank(b.status);
  if (pa !== pb) return pa - pb;
  return new Date(b.created_at || b.submitted_at || 0) - new Date(a.created_at || a.submitted_at || 0);
});

const defaultRoleGuide = [
  ['1', 'Auditorium approval', 'Department Head (head) + Principal', 'Head approves department auditorium requests; Principal gives the final go-ahead.'],
  ['2', 'Maintenance', 'Maintenance engineer + Electrician + Work Inspector', 'Maintenance works on repair requests; Electrician handles electrical jobs; Work Inspector confirms the work is done.'],
  ['3', 'Purchase', 'Purchase Officer + Purchase Clerk + Admin Officer', 'Officer approves purchases; Clerk keeps the stock register and inventory up to date.'],
  ['4', 'Car requests', 'Chairman + Department staff', 'Chairman approves vehicle requests; staff submit official travel requests.'],
  ['5', 'Inventory', 'Purchase Clerk / Admin Officer', 'Add, update, and export department-wise inventory.'],
  ['', 'Everything', 'Admin', 'Master login — users & roles, approvals, email, stock, inventory, maintenance.']
];
let localRoleGuide = null;
async function getRoleGuide() {
  const normalizeDefaultRow = ([sortOrder, part, giveLogin, what], index) => ({
    part,
    give_login: giveLogin,
    what,
    sort_order: Number(sortOrder) || index + 1
  });

  if (!supabase) return localRoleGuide ? localRoleGuide.map((row) => ({ ...row })) : defaultRoleGuide.map(normalizeDefaultRow);
  const { data, error } = await supabase.from('role_guide').select('*').order('sort_order', { ascending: true }).order('id', { ascending: true });
  if (error) {
    if (error.code === 'PGRST205' || error.code === '42501') return defaultRoleGuide.map(normalizeDefaultRow);
    throw error;
  }
  return data && data.length ? data : defaultRoleGuide.map(normalizeDefaultRow);
}
const roleGuideTable = (heading, editable = false, rows = []) => `<section class="user-management role-guide"><div class="section-heading"><h3>${escapeHtml(heading)}</h3></div><p class="small-copy">Who should be given which login.</p><div class="admin-tools">${editable ? '<a class="page-nav" href="/admin/role-guide">Edit guide rows ↗</a>' : ''}</div><div class="table-wrap"><table><thead><tr><th>#</th><th>Part</th><th>Give login to</th><th>What they can do</th></tr></thead><tbody>${rows.length ? rows.map((row) => `<tr><td>${escapeHtml(row.sort_order === null || row.sort_order === undefined ? '' : row.sort_order)}</td><td>${escapeHtml(row.part || '')}</td><td>${escapeHtml(row.give_login || '')}</td><td>${escapeHtml(row.what || '')}</td></tr>`).join('') : '<tr><td colspan="4">No guide rows yet.</td></tr>'}</tbody></table></div></section>`;

function decorateAdminPage(page) {
  return page
    .replace('<body>', '<body><dialog id="action-popup"><h2 id="action-popup-title"></h2><p id="action-popup-message"></p><button type="button" onclick="this.closest(\'dialog\').close()">Close</button></dialog>')
    .replace('</body>', `<script>const actionQuery=new URLSearchParams(window.location.search);const action=actionQuery.get('rejected');if(action==='1'){const popup=document.querySelector('#action-popup');document.querySelector('#action-popup-title').textContent='Request rejected';document.querySelector('#action-popup-message').textContent='The rejection was saved successfully with remarks.';popup.showModal();window.history.replaceState({},document.title,window.location.pathname);}</script></body>`);
}

const auditoriumLabel = (auditorium) => `${escapeHtml(auditorium.name)} (Capacity: ${escapeHtml(auditorium.capacity || 300)})`;

app.get('/login', (req, res) => {
  const page = require('node:fs').readFileSync(path.join(__dirname, 'public', 'login.html'), 'utf8');
  res.send(page);
});

const renderLogin = (res, error) => {
  const page = require('node:fs').readFileSync(path.join(__dirname, 'public', 'login.html'), 'utf8');
  const alert = error ? `<div class="login-alert">${escapeHtml(error)}</div>` : '';
  res.status(error ? 401 : 200).send(page.replace('<form class="login-form"', `${alert}<form class="login-form"`));
};

const establishSession = (user) => {
  if (!user) return;
  const subAdminOff = user.role === 'sub_admin' ? 'admin' : user.role;
  const session = { id: user.id, name: user.name, role: subAdminOff, department: user.department };
  if (user.departments && user.departments.length) session.departments = user.departments;
  else if (session.department) session.departments = [session.department];
  return session;
};

const renderLoginRoleSelect = (res, user, assignments, error) => {
  const page = require('node:fs').readFileSync(path.join(__dirname, 'public', 'login.html'), 'utf8');
  const alert = error ? `<div class="login-alert" style="color:var(--orange);margin-bottom:20px;font:13px/1.5 Arial,sans-serif">${escapeHtml(error)}</div>` : '';
  const choices = [
    { label: `${user.department} — ${roleNames[user.role] || user.role}`, role: user.role, department: user.department, isPrimary: true },
    ...assignments.map((a) => ({ label: `${a.department || 'All departments'} — ${roleNames[a.role] || a.role}`, role: a.role, department: a.department, isPrimary: false }))
  ].map((c, i) => `<button type="button" class="login-role-choice" data-role="${escapeHtml(c.role)}" data-dept="${escapeHtml(c.department)}" style="display:block;width:100%;padding:14px 16px;margin:0 0 10px;font:14px/1.4 Arial,sans-serif;color:var(--ink);background:transparent;border:1px solid var(--line);border-radius:4px;cursor:pointer;text-align:left">${c.isPrimary ? '⭐ ' : ''}${escapeHtml(c.label)}</button>`).join('');
  const script = `<script>document.querySelectorAll('.login-role-choice').forEach((b)=>b.addEventListener('click',()=>{const r=document.querySelector('#role-value');r.value=b.dataset.role;document.querySelector('#dept-value').value=b.dataset.dept;b.closest('form').submit();}));</script>`;
  res.send(page
    .replace('<form class="login-form"', `${alert}<form class="login-form"`)
    .replace(/<button type="submit">Open approval desk[\s\S]*?<\/button>/, `${choices}<input type="hidden" name="role" id="role-value" value=""><input type="hidden" name="department" id="dept-value" value=""><input type="hidden" name="user_id" value="${escapeHtml(user.id)}"><input type="hidden" name="password" value="${escapeHtml(user.password || '')}">`)
    .replace('<p class="login-help">Department Heads are assigned by the administrator.</p>', '<p class="login-help">This email has multiple roles. Choose one to continue.</p>')
    .replace('</form>', `${script}</form>`));
};

app.post('/login', async (req, res) => {
  let allUsers;
  try {
    allUsers = await getUsers();
  } catch (e) {
    console.error(`Login user lookup failed (${e?.message}); falling back to local accounts.`);
    allUsers = users;
  }
  const user = allUsers.find((candidate) => candidate.id === req.body.user_id && candidate.password === req.body.password);
  if (!user) return renderLogin(res, 'Invalid email ID or password. Please check your details and try again.');
  if (user.is_disabled || localDisabledUsers.has(user.id)) {
    return renderLogin(res, 'This account is currently disabled by an administrator. Please contact admin for access.');
  }
  const assignments = await userRolesForLogin(user);
  if (assignments.filter((a) => a.role !== user.role).length && !req.body.role) {
    return renderLoginRoleSelect(res, user, assignments, 'This email has multiple roles. Choose the role you want to sign in with.');
  }
  let selectedRole = req.body.role || user.role;
  let selectedDepartment = req.body.department || user.department;
  if (req.body.role && req.body.role !== user.role) {
    const assignment = assignments.find((a) => a.role === selectedRole && (a.department === req.body.department));
    if (assignment) {
      selectedRole = assignment.role;
      selectedDepartment = assignment.department;
    }
  }
  const buildUser = { ...user, role: selectedRole, department: selectedDepartment };
  const departments = buildUser.role === 'head' ? await getDepartments() : [];
  const assignedDepartments = departments.filter((department) => department.head_user_id === user.id).map((department) => department.name);
  const session = establishSession(buildUser);
  if (assignedDepartments.length) session.departments = assignedDepartments;
  req.session.user = session;
  res.redirect('/dashboard');
});

app.post('/logout', requireLogin, (req, res) => req.session.destroy(() => res.redirect('/login')));

// --- Unified role-based dashboard (blueprint sections 2 and 33) ---
const portalDefs = [
  { key: 'auditorium', icon: '🏛️', title: 'Auditorium', color: 'var(--orange)', links: { request: '/', approve: '/admin', manage: '/admin/auditoriums/manage' } },
  { key: 'maintenance', icon: '🔧', title: 'Maintenance', color: '#2a7f52', links: { request: '/maintenance', approve: '/admin/maintenance', manage: '/admin/maintenance' } },
  { key: 'purchase', icon: '🛒', title: 'Purchase', color: '#2b5f8a', links: { request: '/purchase/local', approve: '/admin/purchase', stock: '/admin/purchase/stock', manage: '/admin/purchase' } },
  { key: 'car', icon: '🚗', title: 'Car Requisition', color: '#7a5b2f', links: { request: '/car-requests', approve: '/admin/car-requests', manage: '/admin/car-requests' } },
  { key: 'inventory', icon: '📦', title: 'Inventory', color: '#6a3fa0', links: { entry: '/admin/inventory', view: '/admin/inventory', stock: '/admin/inventory', manage: '/admin/inventory' } },
  { key: 'fees', icon: '💰', title: 'Student Fees', color: '#d4a574', links: { manage: '/admin/fees', report: '/admin/fees/report' } }
];

app.get('/dashboard', requireLogin, async (req, res) => {
  const user = req.session.user;
  const notifications = (await getNotifications(user.id)).filter((n) => !n.is_read);
  const notifBadge = notifications.length ? `<span class="notif-badge">${notifications.length}</span>` : '';

  const canManageSystem = isAdmin(user);

  // Gather counts per module the user may access.
  async function countsPerModule(moduleKey, actionLabel) {
    if (!actionLabel) return { total: 0, pending: 0 };
    try {
      if (moduleKey === 'auditorium') {
        const all = supabase ? (await supabase.from('requests').select('*')).data || [] : requests;
        return { total: all.length, pending: all.filter((r) => r.status === 'pending').length };
      }
      if (moduleKey === 'maintenance') {
        const all = supabase ? (await supabase.from('maintenance_requests').select('*')).data || [] : localMaintenanceRequests;
        return { total: all.length, pending: all.filter((r) => r.status === 'pending' || r.status === 'hod_approved' || r.status === 'electrician_approved').length };
      }
      if (moduleKey === 'purchase') {
        const all = await getPurchaseRequests();
        return { total: all.length, pending: all.filter((r) => r.status === 'pending').length };
      }
      if (moduleKey === 'car') {
        const all = supabase ? (await supabase.from('car_requests').select('*')).data || [] : localCarRequests;
        return { total: all.length, pending: all.filter((r) => r.status === 'pending').length };
      }
      if (moduleKey === 'inventory') {
        const all = await getInventory();
        return { total: all.length, pending: 0 };
      }
    } catch (e) { console.error(`counts error ${moduleKey}: ${e.message}`); }
    return { total: 0, pending: 0 };
  }

  const pendingApprovalTabs = async (u) => {
    const tabs = [];
    for (const def of portalDefs) {
      if (def.key === 'inventory' || def.key === 'reports' || def.key === 'system') continue;
      const key = def.key === 'auditorium' ? '/admin' : def.key === 'car' ? '/admin/car-requests' : `/admin/${def.key}`;
      const tab = deskTabs.find((t) => t.path === key);
      if (!tab || !tab.visible(u)) continue;
      const { pending } = await countsPerModule(def.key, 'approve');
      if (pending > 0) {
        tabs.push({ icon: tab.icon, label: tab.label, path: tab.path, count: pending });
      }
    }
    return tabs;
  };

  const cards = [];
  for (const def of portalDefs) {
    const action = await roleModuleAction(user.role, def.key);
    if (!action || action === 'none') continue;
    const actionRole = isAdmin(user) ? 'manage' : action;
    const link = `/portal/${def.key}`;
    const counts = await countsPerModule(def.key, actionRole);
    const statusLine = counts.total > 0
      ? `<span class="portal-stat">${counts.total} total${counts.pending ? ` · <b>${counts.pending} pending</b>` : ''}</span>`
      : '<span class="portal-stat muted">No requests yet</span>';
    cards.push(`<a class="portal-card" href="${link}" style="--accent:${def.color}"><span class="portal-icon">${def.icon}</span><div class="portal-body"><h3>${def.title}</h3>${statusLine}<span class="portal-open">Open →</span></div></a>`);
  }

  if (canManageSystem) {
    cards.push(`<a class="portal-card" href="/portal/system" style="--accent:#b34b1c"><span class="portal-icon">⚙️</span><div class="portal-body"><h3>Admin Panel</h3><span class="portal-stat">Users, roles, permissions, workflows, reports</span><span class="portal-open">Open →</span></div></a>`);
  }

  const headerNav = `<div class="dash-nav">${canManageSystem ? '<a class="nav-link" style="background:var(--orange,#e97742);color:#fff;padding:6px 14px;border-radius:6px;font-weight:700" href="/admin">⚙️ Admin Panel</a><a class="nav-link" href="/admin/pages">📑 All Admin Tools</a>' : ''}<a class="nav-link" href="/notifications">🔔 Notifications${notifBadge}</a><span class="nav-user">👤 ${escapeHtml(user.name)}</span><span class="nav-role">${escapeHtml(user.role)}</span><form action="/logout" method="post"><button class="quiet" type="submit">Logout</button></form></div>`;

  const pendingTabs = await pendingApprovalTabs(user);
  const pendingApprovalBlock = pendingTabs.length > 0
    ? `<section class="pending-block"><div class="pending-title">⏳ Pending approvals — an approval has arrived but is not yet approved</div><nav class="pending-tabs">${pendingTabs.map((t) => `<a class="pending-tab" href="${t.path}">${t.icon} ${t.label}<span class="pending-badge">${t.count}</span></a>`).join('')}</nav></section>`
    : '';

  res.send(`<!doctype html><html lang="en"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"><title>Dashboard | SVIT Vasad</title><link rel="stylesheet" href="/styles.css"><style>
    .dash-head{display:flex;justify-content:space-between;align-items:center;gap:16px;flex-wrap:wrap;padding:22px 0;border-bottom:1px solid var(--line)}
    .dash-nav{display:flex;align-items:center;gap:16px;flex-wrap:wrap;font:13px Arial}
    .nav-link{color:var(--ink);text-decoration:none;font-weight:600;position:relative}
    .notif-badge{position:absolute;top:-8px;right:-10px;background:var(--orange);color:#fff;border-radius:10px;font-size:10px;padding:1px 6px}
    .nav-user,.nav-role{color:var(--muted)}
    .nav-role{text-transform:uppercase;font-size:11px;border:1px solid var(--line);padding:3px 8px;border-radius:20px}
    .portal-grid{display:grid;grid-template-columns:repeat(auto-fill,minmax(260px,1fr));gap:18px;margin-top:26px}
    .portal-card{display:flex;gap:16px;align-items:flex-start;padding:22px;border:1px solid var(--line);border-radius:10px;text-decoration:none;color:var(--ink);transition:transform .12s ease,box-shadow .12s ease;background:#fff}
    .portal-card:hover{transform:translateY(-3px);box-shadow:0 10px 24px rgba(0,0,0,.08);border-color:var(--accent)}
    .portal-icon{font-size:30px;line-height:1}
    .portal-body h3{margin:0 0 8px;font-size:18px;font-weight:600}
    .portal-stat{display:block;color:var(--muted);font-size:13px;margin-bottom:10px}
    .portal-open{display:inline-block;font-size:12px;font-weight:600;color:var(--accent)}
    .pending-block{border:1px solid var(--line);border-left:4px solid var(--orange);border-radius:10px;padding:18px 20px;margin-top:26px;background:#fff}
    .pending-title{font:11px/1.4 Arial,sans-serif;letter-spacing:.12em;text-transform:uppercase;color:var(--muted);margin-bottom:12px}
    .pending-tabs{display:flex;gap:10px;flex-wrap:wrap}
    .pending-tab{position:relative;font:13px Arial,sans-serif;font-weight:600;text-decoration:none;color:var(--ink);border:1px solid var(--line);padding:10px 16px;border-radius:8px;display:inline-flex;gap:8px;align-items:center;background:#fff}
    .pending-tab:hover{border-color:var(--orange);color:var(--orange)}
    .pending-badge{background:var(--orange);color:#fff;border-radius:12px;font-size:11px;padding:2px 8px;font-weight:700}
    .muted{opacity:.55}
    @media(max-width:560px){.dash-head{flex-direction:column;align-items:flex-start}}
  </style></head><body><main class="shell panel">
    <div class="college-heading" style="text-align:center;padding:20px 0 4px"><div style="font-size:11px;letter-spacing:.2em;color:var(--muted)">SARDAR VALLABHBHAI PATEL INSTITUTE OF TECHNOLOGY · VASAD CAMPUS</div></div>
    <header class="dash-head"><h1 style="margin:0;font-size:30px;font-weight:500">Campus Administration Portal</h1>${headerNav}</header>
    <section class="panel-intro"><p class="eyebrow">Welcome back, ${escapeHtml(user.name)}</p><h2>What would you <em>like to do?</em></h2><p class="lede">Choose a portal. Only the modules enabled for your role are shown.</p></section>
    ${pendingApprovalBlock}
    <section class="portal-grid">${cards.join('')}</section>
  </main></body></html>`);
});

app.get('/admin/pages', requireLogin, async (req, res) => {
  if (!isAdmin(req.session.user)) return res.status(403).send('Admin access required.');
  const guideRows = await getRoleGuide();
  const groups = [
    ['1', 'Auditorium approval', [['Approval requests', '/admin', 'Review and process auditorium permission requests.'], ['Auditoriums and approval route', '/admin/auditoriums/manage', 'Configure rooms, capacity, approval stages, and assigned officers.']]],
    ['2', 'Maintenance approval', [['Maintenance requests', '/admin/maintenance', 'Review and approve maintenance and repair submissions.'], ['Submit maintenance request', '/maintenance', 'Create a new maintenance request.']]],
    ['3', 'Purchase', [['Stationery item', '/purchase/stationary', 'Submit stationery items and add extra line items.'], ['Local purchase', '/purchase/local', 'Submit a local purchase request.'], ['Cleaning item', '/purchase/cleaning', 'Submit cleaning item requests.'], ['Purchase approvals', '/admin/purchase', 'Review and approve purchase requests.'], ['Approval workflow builder', '/admin/workflows', 'Configure amount bands and approval role routes per module.'], ['Approval log', '/admin/approvals-log', 'Audit trail of every approval action.'], ['Department stock', '/admin/purchase/stock', 'Department-wise stock register.'], ['Stock transactions', '/admin/purchase/stock/transactions', 'Ledger of every stock purchase, issue, return and adjustment.'], ['Purchase approval roles', '/admin/purchase/settings', 'Assign approval roles and amount rules.'], ['Purchase Excel tools', '/admin/purchase/export', 'Download purchase data or an import template.']]],
    ['6', 'Access control', [['Permissions matrix', '/admin/permissions', 'Configure which roles can access each module and how.'], ['Audit log', '/admin/audit-logs', 'Every administrative action, logged for accountability.'], ['Role guide', '/admin/role-guide', 'Edit who should be given which login.'], ['Users and roles', '/admin/departments', 'Manage users and their role assignments.'], ['Module settings', '/admin/module-settings', 'Enable or disable request modules (auditorium, maintenance, car, purchase).']]],
    ['4', 'Car requests form', [['Car request form', '/car-requests', 'Request an official vehicle for approved travel.'], ['Car request approvals', '/admin/car-requests', 'Review and approve vehicle requests.'], ['Car & driver fleet register', '/admin/car-fleet', 'Register the available cars and drivers.'], ['Users and roles', '/admin/departments', 'Create users and assign administrator and approval duties.'], ['Role guide', '/admin/role-guide', 'Edit who should be given which login.']]],
    ['5', 'Inventory', [['Inventory register', '/admin/inventory', 'Record assets department-wise, floor-wise, and office-wise.'], ['Inventory template', '/admin/inventory/template', 'Download an Excel template for importing inventory.'], ['Inventory Excel', '/admin/inventory/export', 'Download all inventory data in one Excel sheet.']]],
    ['8', 'Student Fees', [['Fees management', '/admin/fees', 'Upload student lists and bank payments, reconcile outstanding fees.'], ['Outstanding fees report', '/admin/fees/report', 'View detailed fees status for all students.']]],
    ['7', 'Reports', [['Reports dashboard', '/admin/reports', 'Consolidated activity across all modules.'], ['Monthly Excel report', '/admin/reports/export', 'Download all module data in one workbook.']]]
  ];
  const sections = groups.map(([number, title, pages]) => `<section class="directory-group"><div class="section-heading"><span>${number}</span><h2>${title}</h2></div><div class="page-directory">${pages.map(([pageTitle, href, description]) => `<a class="page-nav" href="${href}"><strong>${pageTitle}</strong><span>${description}</span> <b>↗</b></a>`).join('')}</div></section>`).join('');
  res.send(`<!doctype html><html lang="en"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"><title>Admin pages</title><link rel="stylesheet" href="/styles.css"><style>.directory-group{border-top:1px solid var(--ink);padding:28px 0}.directory-group .section-heading{margin-bottom:18px}.directory-group .section-heading h2{font-size:26px;font-weight:400;margin:0}.page-directory{display:grid;grid-template-columns:repeat(2,minmax(0,1fr));gap:14px}.page-directory .page-nav{display:flex;flex-direction:column;gap:8px;height:100%;padding:20px;border:1px solid var(--line)}.page-directory .page-nav span{font:13px/1.4 Arial,sans-serif;color:var(--muted)}.page-directory .page-nav b{color:var(--orange)}@media(max-width:700px){.page-directory{grid-template-columns:1fr}}</style></head><body><main class="shell panel"><header class="masthead"><div><p class="kicker">${escapeHtml(req.session.user.role)}</p><h1>Admin<br><em>pages</em></h1></div><a class="page-nav" href="/dashboard">Dashboard</a><form action="/logout" method="post"><button class="quiet" type="submit">Sign out</button></form></header>${adminNavBar('/admin/pages', req.session.user)}<section class="panel-intro"><p class="eyebrow">Administration</p><h2>Choose a workspace.</h2><p class="lede">Auditorium, maintenance, purchase, and vehicle workflows.</p></section>${roleGuideTable('Login & role guide — who should get which login', true, guideRows)}${sections}</main></body></html>`);
});

// --- Per-module workspace menus (dashboard cards open these) ---
const portalMenus = {
  auditorium: { icon: '🏛️', title: 'Auditorium', tagline: 'Permission requests, rooms, and the approval route.', pages: [
    { label: 'Submit auditorium request', href: '/', desc: 'Request permission for a programme or event.', level: 'request' },
    { label: 'Approval requests', href: '/admin', desc: 'Review and process auditorium permission requests.', level: 'approve' },
    { label: 'Auditoriums and approval route', href: '/admin/auditoriums/manage', desc: 'Configure rooms, capacity, approval stages, and assigned officers.', level: 'manage' }
  ]},
  maintenance: { icon: '🔧', title: 'Maintenance', tagline: 'Submit repair requests and review what needs attention.', pages: [
    { label: 'Submit maintenance request', href: '/maintenance', desc: 'Create a new maintenance and repair request.', level: 'request' },
    { label: 'Maintenance approvals', href: '/admin/maintenance', desc: 'Review and approve maintenance and repair submissions.', level: 'approve' }
  ]},
  purchase: { icon: '🛒', title: 'Purchase', tagline: 'Submit purchases, approve requests, and follow stock.', pages: [
    { label: 'Local purchase', href: '/purchase/local', desc: 'Submit a local purchase request.', level: 'request' },
    { label: 'Stationery items', href: '/purchase/stationary', desc: 'Submit stationery items and add extra line items.', level: 'request' },
    { label: 'Cleaning items', href: '/purchase/cleaning', desc: 'Submit cleaning item requests.', level: 'request' },
    { label: 'Electric items', href: '/purchase/electric', desc: 'Submit electric item requests.', level: 'request' },
    { label: 'Purchase approvals', href: '/admin/purchase', desc: 'Review and approve purchase requests.', level: 'approve' },
    { label: 'Approval workflow builder', href: '/admin/workflows', desc: 'Configure amount bands and approval role routes per module.', level: 'manage' },
    { label: 'Approval log', href: '/admin/approvals-log', desc: 'Audit trail of every approval action.', level: 'manage' },
    { label: 'Department stock', href: '/admin/purchase/stock', desc: 'Department-wise stock register.', level: 'manage' },
    { label: 'Stock transactions', href: '/admin/purchase/stock/transactions', desc: 'Ledger of every stock purchase, issue, return and adjustment.', level: 'manage' },
    { label: 'Purchase approval roles', href: '/admin/purchase/settings', desc: 'Assign approval roles and amount rules.', level: 'manage' },
    { label: 'Purchase Excel tools', href: '/admin/purchase/export', desc: 'Download purchase data or an import template.', level: 'manage' }
  ]},
  car: { icon: '🚗', title: 'Car Requisition', tagline: 'Request an official vehicle and review travel requests.', pages: [
    { label: 'Car request form', href: '/car-requests', desc: 'Request an official vehicle for approved travel.', level: 'request' },
    { label: 'Car request approvals', href: '/admin/car-requests', desc: 'Review requests and approve with driver & car.', level: 'approve' },
    { label: 'Car & driver fleet register', href: '/admin/car-fleet', desc: 'Register the available cars and drivers.', level: 'approve' }
  ]},
  inventory: { icon: '📦', title: 'Inventory', tagline: 'One-campus asset register — department-wise, floor-wise, and office-wise.', pages: [
    { label: 'Inventory register', href: '/admin/inventory', desc: 'Record assets department-wise, floor-wise, and office-wise.', level: 'manage' },
    { label: 'Department stock', href: '/admin/purchase/stock', desc: 'Department-wise stock register of purchase items.', level: 'manage' },
    { label: 'Inventory template', href: '/admin/inventory/template', desc: 'Download an Excel template for importing inventory.', level: 'manage' },
    { label: 'Inventory Excel', href: '/admin/inventory/export', desc: 'Download all inventory data in one Excel sheet.', level: 'manage' }
  ]},
  fees: { icon: '💰', title: 'Student Fees', tagline: 'Upload student lists, bank payments, and track outstanding fees.', pages: [
    { label: 'Fees dashboard', href: '/admin/fees', desc: 'Upload student lists and bank payments, view reconciliation status.', level: 'manage' },
    { label: 'Outstanding fees report', href: '/admin/fees/report', desc: 'View students with pending fees and payment details.', level: 'manage' },
    { label: 'Reconciliation log', href: '/admin/fees/reconcile', desc: 'Audit trail of fees reconciliation and matching.', level: 'manage' }
  ]},
  reports: { icon: '📊', title: 'Reports', tagline: 'Consolidated activity across all modules.', pages: [
    { label: 'Reports dashboard', href: '/admin/reports', desc: 'Consolidated activity across all modules.', level: 'manage' },
    { label: 'Monthly Excel report', href: '/admin/reports/export', desc: 'Download all module data in one workbook.', level: 'manage' }
  ]},
  system: { icon: '⚙️', title: 'Admin Panel', tagline: 'Users, roles, permissions, workflows, reports, and the approval desk.', pages: [
    { label: 'Approvals desk', href: '/admin', desc: 'Auditorium requests in your lane, with stock and inventory tools.', level: 'manage' },
    { label: 'Users and roles', href: '/admin/departments', desc: 'Add, edit, and delete users; assign each role.', level: 'manage' },
    { label: 'Permissions matrix', href: '/admin/permissions', desc: 'Configure which roles can access each module and how.', level: 'manage' },
    { label: 'Role guide', href: '/admin/role-guide', desc: 'Edit who should be given which login.', level: 'manage' },
    { label: 'Module settings', href: '/admin/module-settings', desc: 'Enable or disable request modules.', level: 'manage' },
    { label: 'Audit log', href: '/admin/audit-logs', desc: 'Every administrative action, logged for accountability.', level: 'manage' },
    { label: 'Approval workflow builder', href: '/admin/workflows', desc: 'Configure amount bands and approval role routes per module.', level: 'manage' },
    { label: 'Approval log', href: '/admin/approvals-log', desc: 'Audit trail of every approval action.', level: 'manage' },
    { label: 'Email settings', href: '/admin/email-settings', desc: 'Set the sender email address for all notifications.', level: 'manage' },
    { label: 'Inventory', href: '/admin/inventory', desc: 'One-campus asset register — department-wise, floor-wise, and office-wise.', level: 'manage' },
    { label: 'Inventory template', href: '/admin/inventory/template', desc: 'Download an Excel template for importing inventory.', level: 'manage' },
    { label: 'Reports dashboard', href: '/admin/reports', desc: 'Consolidated activity across all modules.', level: 'manage' },
    { label: 'Monthly Excel report', href: '/admin/reports/export', desc: 'Download all module data in one workbook.', level: 'manage' }
  ]}
};

app.get('/portal/:module', requireLogin, async (req, res) => {
  const user = req.session.user;
  const menu = portalMenus[req.params.module];
  if (!menu) return res.status(404).send('Unknown portal. <a href="/dashboard">Back to dashboard</a>');
  const action = isAdmin(user) ? 'manage' : await roleModuleAction(user.role, req.params.module);
  if (req.params.module === 'system' || req.params.module === 'reports') {
    if (!isAdmin(user)) return res.status(403).send('Admin access required.');
  } else if (!action || action === 'none') {
    return res.redirect('/dashboard');
  }
  const visible = menu.pages.filter((page) => page.level === 'request' || action === 'manage' || (page.level === 'approve' && (action === 'approve' || action === 'manage')));
  const cards = visible.length ? visible.map((page) => `<a class="page-nav" href="${escapeHtml(page.href)}"><strong>${escapeHtml(page.label)}</strong><span>${escapeHtml(page.desc)}</span> <b>↗</b></a>`).join('') : `<a class="page-nav" href="/dashboard"><strong>No pages available</strong><span>No tools are enabled for your role in this module.</span> <b>↗</b></a>`;
  res.send(`<!doctype html><html lang="en"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"><title>${escapeHtml(menu.title)} | SVIT Vasad</title><link rel="stylesheet" href="/styles.css"><style>.page-directory{display:grid;grid-template-columns:repeat(2,minmax(0,1fr));gap:14px}.page-directory .page-nav{display:flex;flex-direction:column;gap:8px;height:100%;padding:20px;border:1px solid var(--line)}.page-directory .page-nav strong{font-size:15px}.page-directory .page-nav span{font:13px/1.4 Arial,sans-serif;color:var(--muted)}.page-directory .page-nav b{color:var(--orange)}@media(max-width:700px){.page-directory{grid-template-columns:1fr}}</style></head><body><main class="shell panel"><header class="masthead"><div><p class="kicker">${escapeHtml(user.role)}</p><h1>${menu.icon} ${escapeHtml(menu.title)}<br><em>workspace</em></h1></div><a class="page-nav" href="/dashboard">Back to main page</a><form action="/logout" method="post"><button class="quiet" type="submit">Sign out</button></form></header><section class="panel-intro"><p class="eyebrow">Choose a page</p><h2>${escapeHtml(menu.title)} <em>workspace.</em></h2><p class="lede">${escapeHtml(menu.tagline)}<br>Only the pages enabled for your role are shown.</p></section><div class="page-directory">${cards}</div></main></body></html>`);
});

// --- Dedicated Users management page ---
const roleNames = {
  admin: 'Admin', sub_admin: 'Sub admin', admin_officer: 'Admin officer', purchase_officer: 'Purchase officer',
  purchase_clerk: 'Purchase clerk', chairman: 'Chairman', department_user: 'Department staff',
  head: 'Department head', maintenance: 'Maintenance officer', electrician: 'Electrician', principal: 'Principal', higher_authority: 'Higher authority', work_done: 'Work Inspector'
};

const roleOptionsForUser = (selected) => ['sub_admin', 'admin_officer', 'purchase_officer', 'purchase_clerk', 'chairman', 'department_user', 'head', 'maintenance', 'electrician', 'principal', 'work_done'].map((role) => `<option value="${role}"${role === selected ? ' selected' : ''}>${escapeHtml(roleNames[role] || role)}</option>`).join('');

const userRowTemplate = (candidate, currentUser, departmentOptions, prefix = 'all') => {
  const formId = `user-form-${prefix}-${encodeURIComponent(candidate.id).replace(/%/g, '_')}_${candidate.department.replace(/[^a-z0-9]/gi, '_')}_${candidate.role || ''}`;
  const isAssignment = Boolean(candidate._assignment_id);
  const canDelete = candidate.id !== currentUser.id;
  const isDisabled = isAssignment ? false : Boolean(candidate.is_disabled);
  const statusBadge = isAssignment
    ? '<span class="status approved" style="font-size:11px;padding:3px 7px;background:#666">Extra role</span>'
    : (isDisabled
        ? '<span class="status rejected" style="font-size:11px;padding:3px 7px">Disabled</span>'
        : '<span class="status approved" style="font-size:11px;padding:3px 7px">Active</span>');
  const multiRoleNote = isAssignment ? '<span class="small-copy" style="display:block;font-size:11px;color:var(--orange)">Additional role for this email</span>' : '';
  if (isAssignment) {
    return `<tr><td><strong>${escapeHtml(candidate.id)}</strong>${multiRoleNote}</td><td><input form="${formId}" name="name" value="${escapeHtml(candidate.name)}" aria-label="Name" required></td><td><select form="${formId}" name="department" aria-label="Department" required><option value="">Select department</option>${departmentOptions(candidate.department)}</select></td><td><select form="${formId}" name="role" aria-label="Role">${roleOptionsForUser(candidate.role)}</select></td><td>${statusBadge}</td><td class="user-actions"><button form="${formId}" class="small-button" type="submit">Save</button> <button class="small-button" form="${formId}" formaction="/admin/users/${encodeURIComponent(candidate.id)}/assignment/delete" formmethod="post" onclick="return confirm('Remove this extra role (${escapeHtml(candidate.role)}) for ${escapeHtml(candidate.id)}?')">Remove role</button></td></tr>`;
  }
  return `<tr><td><form id="${formId}" action="/admin/users/${encodeURIComponent(candidate.id)}" method="post"><input name="id" type="email" value="${escapeHtml(candidate.id)}" aria-label="Email" required></form></td><td><input form="${formId}" name="name" value="${escapeHtml(candidate.name)}" aria-label="Name" required></td><td><select form="${formId}" name="department" aria-label="Department" required><option value="">Select department</option>${departmentOptions(candidate.department)}</select></td><td><select form="${formId}" name="role" aria-label="Role">${roleOptionsForUser(candidate.role)}</select></td><td>${statusBadge}</td><td class="user-actions"><input form="${formId}" name="password" type="password" placeholder="New password (optional)" aria-label="New password"><button form="${formId}" class="small-button" type="submit" onclick="return confirm('Are you sure you want to save changes to this user?')">Save</button> ${canDelete ? `<button class="small-button" form="${formId}" formaction="/admin/users/${encodeURIComponent(candidate.id)}/toggle" formmethod="post" onclick="return confirm('${isDisabled ? 'Enable this user account?' : 'Disable this user account? The user will not be able to log in.'}')">${isDisabled ? 'Enable' : 'Disable'}</button><button class="small-button" form="${formId}" formaction="/admin/users/${encodeURIComponent(candidate.id)}/delete" formmethod="post" onclick="return confirm('Are you sure you want to delete this user permanently?')">Delete</button>` : '<span class="small-copy">Signed in</span>'}</td></tr>`;
};

const usersTable = (list, currentUser, departmentOptions, prefix = 'all') => list.length
  ? `<div class="table-wrap"><table class="user-table"><thead><tr><th>Email</th><th>Name</th><th>Department</th><th>Role</th><th>Status</th><th>Actions</th></tr></thead><tbody>${list.map((candidate) => userRowTemplate(candidate, currentUser, departmentOptions, prefix)).join('')}</tbody></table></div>`
  : '<p class="small-copy">No users found.</p>';

// Workspaces on the approval desk, mapped to the roles each one uses.
const workspaceTabs = [
  { key: 'maintenance', icon: '🔧', title: 'Maintenance', roles: ['maintenance', 'electrician', 'work_done'] },
  { key: 'purchase', icon: '🛒', title: 'Purchase', roles: ['purchase_officer', 'purchase_clerk', 'admin_officer'] },
  { key: 'car', icon: '🚗', title: 'Car Requisition', roles: ['chairman', 'department_user', 'head'] },
  { key: 'inventory', icon: '📦', title: 'Inventory', roles: ['purchase_clerk', 'admin_officer'] }
];

app.get('/admin/users', requireLogin, (req, res) => {
  res.redirect('/admin/departments');
});

// --- Approval desk tabs (Auditorium / Maintenance / Purchase / Car) ---
const deskTabs = [
  { icon: '🏛️', label: 'Auditorium', path: '/admin', visible: () => true },
  { icon: '🔧', label: 'Maintenance', path: '/admin/maintenance', visible: (user) => isAdmin(user) || ['maintenance', 'head', 'electrician', 'principal', 'work_done'].includes(user.role) },
  { icon: '🛒', label: 'Purchase', path: '/admin/purchase', visible: (user) => canManagePurchases(user) },
  { icon: '🚗', label: 'Car', path: '/admin/car-requests', visible: (user) => isAdmin(user) || user?.role === 'admin_officer' }
];

function adminNavBar(activePath, user) {
  const isAdm = isAdmin(user);
  const items = [
    { label: '🏛️ Approvals Desk', path: '/admin' },
    { label: '🏛️ Manage Rooms', path: '/admin/auditoriums/manage', adminOnly: true },
    { label: '👥 Users & Roles', path: '/admin/departments', adminOnly: true },
    { label: '⚙️ Module Settings', path: '/admin/module-settings', adminOnly: true },
    { label: '� Student Fees', path: '/admin/fees', adminOnly: true },
    { label: '�🔧 Maintenance', path: '/admin/maintenance' },
    { label: '🛒 Purchase', path: '/admin/purchase' },
    { label: '🚗 Car Requests', path: '/admin/car-requests' },
    { label: '📦 Inventory', path: '/admin/inventory' },
    { label: '⚙️ All Admin Tools', path: '/admin/pages', adminOnly: true },
    { label: '📊 Dashboard', path: '/dashboard' }
  ];
  const links = items
    .filter((item) => !item.adminOnly || isAdm)
    .map((item) => `<a class="admin-tab-link ${activePath === item.path ? 'active' : ''}" href="${item.path}">${item.label}</a>`)
    .join('');
  return `<nav class="admin-top-nav">${links}</nav>`;
}

app.use((req, res, next) => {
  if (!req.path.startsWith('/admin/') || req.path === '/admin/pages') return next();
  const send = res.send.bind(res);
  res.send = (body) => send(typeof body === 'string' ? body
    .replace(/href="\/admin">Back to admin/g, 'href="/admin/pages">Back to admin pages')
    .replace(/href="\/admin">Back to Admin/g, 'href="/admin/pages">Back to admin pages')
    .replace(/<a class="page-nav"[^>]*href="([^"]+)"[^>]*>Back to [^<]*<\/a>/g, '<a class="page-nav" href="/dashboard">Back to main page</a> <a class="page-nav" href="$1">Back to admin pages</a>')
    : body);
  next();
});

app.use((req, res, next) => {
  if (req.path !== '/admin') return next();
  const send = res.send.bind(res);
  res.send = (body) => {
    if (typeof body !== 'string') return send(body);
    let html = body.replace('<link rel="stylesheet" href="/styles.css">', '<link rel="stylesheet" href="/styles.css"><style>.admin-tools{display:flex;gap:14px;align-items:center;flex-wrap:wrap;margin:18px 0}.admin-tools form{display:flex;gap:8px;align-items:center;margin:0}.request-actions{display:inline-block;margin:0 4px 4px 0}.reject-form input{width:150px}.reject-button{background:#e97742;color:#fff;border-color:#e97742}#action-popup{border:1px solid #e97742;padding:30px;background:#f4f0e8}</style>');
    html = html.replace('<h3>Auditoriums</h3>', '<h3>Auditoriums</h3><div class="admin-tools"><a class="page-nav" href="/admin/auditoriums/manage">Manage auditorium list ↗</a><a class="page-nav" href="/admin/departments">Manage users and roles ↗</a></div>');
    html = decorateAdminPage(html);
    return send(html);
  };
  next();
});

app.get('/admin', requireLogin, async (req, res) => {
  const user = req.session.user;
  const auditoriumConfigs = await getAuditoriumConfigs();
  const requestPageEnabled = (await getSystemSetting('REQUEST_PAGE_ENABLED')) !== 'false';
  let stock = [];
  try { stock = await getPurchaseStock(); } catch (e) { console.error(`Stock fetch error: ${e.message}`); }
  const guideRows = await getRoleGuide();
  let allRequests = requests;
  if (supabase) {
    const { data, error } = await supabase.from('requests').select('*').order('created_at', { ascending: false });
    if (error) return res.status(error.code === 'PGRST205' ? 503 : 500).send(error.code === 'PGRST205' ? 'Database setup required. Run supabase/schema.sql in the Supabase SQL Editor.' : error.message);
    allRequests = data;
  }
  const visibleRequests = isAdmin(user) || user.role === 'principal' || user.role === 'maintenance' || user.role === 'electrician'
    ? allRequests : allRequests.filter((request) => (user.departments || [user.department]).includes(request.department));
  const sortedRequests = sortPendingFirst(visibleRequests);
  const rows = sortedRequests.length ? sortedRequests.map((request) => requestRow(request, user, auditoriumConfigs)).join('') : `<tr><td colspan="${isAdmin(user) ? 9 : 5}">No requests yet.</td></tr>`;
  const visibleUsers = isAdmin(user) ? await getUsers() : [];
  const userRows = isAdmin(user) ? visibleUsers.map((candidate) => `<tr><td colspan="5"><form class="edit-user create-user" action="/admin/users/${encodeURIComponent(candidate.id)}" method="post"><input name="id" type="email" value="${escapeHtml(candidate.id)}" aria-label="Email" required><input name="name" value="${escapeHtml(candidate.name)}" aria-label="Name" required><input name="department" value="${escapeHtml(candidate.department)}" aria-label="Department" required><select name="role" aria-label="Role">${['sub_admin', 'admin_officer', 'purchase_officer', 'purchase_clerk', 'chairman', 'department_user', 'head', 'maintenance', 'electrician', 'principal', 'work_done'].map((role) => `<option value="${role}"${candidate.role === role ? ' selected' : ''}>${role}</option>`).join('')}</select><input name="password" type="password" placeholder="New password (optional)" aria-label="New password"><button class="small-button" type="submit" onclick="return confirm('Are you sure you want to save changes to this user?')">Save changes</button></form><form action="/admin/users/${encodeURIComponent(candidate.id)}/delete" method="post"><button class="small-button" type="submit" onclick="return confirm('Are you sure you want to delete this user?')">Delete</button></form></td></tr>`).join('') : '';
  const auditoriums = isAdmin(user) ? auditoriumConfigs : [];
  const auditoriumRows = auditoriums.map((aud) => {
    const isLocked = Boolean(aud.is_locked);
    return `<tr><td><strong>${escapeHtml(aud.name)}</strong></td><td>${escapeHtml(aud.capacity || 300)}</td><td><span class="status ${isLocked ? 'rejected' : 'approved'}">${isLocked ? 'Disabled' : 'Enabled'}</span></td><td><form action="/admin/auditoriums/${aud.id}/lock" method="post" style="display:inline"><button class="small-button" type="submit" onclick="return confirm('${isLocked ? 'Enable this auditorium for bookings?' : 'Disable this auditorium from bookings?'}')">${isLocked ? 'Enable' : 'Disable'}</button></form> <form action="/admin/auditoriums/${aud.id}/delete" method="post" style="display:inline"><button class="small-button reject-button" type="submit" onclick="return confirm('Are you sure you want to delete this auditorium permanently?')">Delete</button></form></td></tr>`;
  }).join('');
  const requestHead = isAdmin(user) ? '<th>Department</th><th>Programme</th><th>Students</th><th>Date & time</th><th>Auditorium</th><th>Requester</th><th>Contact</th><th>Status</th><th>Action</th>' : '<th>Programme</th><th>When</th><th>Room</th><th>Status</th><th>Action</th>';
  res.send(`<!doctype html><html lang="en"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"><title>Admin panel | Auditorium permissions</title><link rel="stylesheet" href="/styles.css"><style>.college-heading{text-align:center;margin:20px 0 10px}.college-heading h1{font-size:clamp(36px,6vw,64px);font-weight:700;letter-spacing:.08em;margin:0}</style></head><body><main class="shell panel"><div class="college-heading"><h1>SVIT VASAD</h1></div><header class="masthead"><div><p class="kicker">${escapeHtml(user.role)}</p><h1>Approval<br><em>desk</em></h1></div><a class="page-nav" href="/dashboard">Dashboard</a><form action="/logout" method="post"><button class="quiet" type="submit">Sign out</button></form></header>${adminNavBar('/admin', user)}<section class="panel-intro"><p class="eyebrow">Signed in as ${escapeHtml(user.name)}</p><h2>Requests in your lane.</h2><p class="lede">Department head → electrician → principal → maintenance.</p></section><section class="table-wrap"><table><thead><tr>${requestHead}</tr></thead><tbody>${rows}</tbody></table></section>${isAdmin(user) ? `<section class="user-management"><div class="section-heading"><h3>Auditoriums</h3></div><div class="admin-tools"><a class="page-nav" href="/admin/auditoriums/manage">Manage auditorium list ↗</a><a class="page-nav" href="/admin/departments">Manage users and roles ↗</a></div><p class="small-copy">Request page is currently <strong>${requestPageEnabled ? 'Enabled' : 'Disabled'}</strong> for users. <a class="page-nav" href="/">View request page</a></p><form class="create-user" action="/admin/request-page/toggle" method="post" style="margin:0 0 16px"><button class="${requestPageEnabled ? 'reject-button' : ''}" type="submit" onclick="return confirm('${requestPageEnabled ? 'Disable the request page? Users will not be able to submit new auditorium requests.' : 'Enable the request page so users can submit new auditorium requests?'}')">${requestPageEnabled ? 'Disable request page' : 'Enable request page'}</button></form><p class="small-copy">${auditoriums.filter(a => !a.is_locked).length} enabled room(s) available on the public request form.</p><div class="table-wrap" style="margin-bottom:16px"><table><thead><tr><th>Auditorium</th><th>Capacity</th><th>Status</th><th>Actions</th></tr></thead><tbody>${auditoriumRows || '<tr><td colspan="4">No auditoriums registered.</td></tr>'}</tbody></table></div><form class="create-user" action="/admin/auditoriums" method="post"><input name="name" placeholder="New auditorium name" required><input name="capacity" type="number" min="1" value="300" placeholder="Capacity" required><button type="submit">Add auditorium</button></form></section>` : ''}</main></body></html>`);
});

app.post('/admin/request-page/toggle', requireLogin, async (req, res) => {
  if (!isAdmin(req.session.user)) return res.status(403).send('Admin access required.');
  const current = (await getSystemSetting('REQUEST_PAGE_ENABLED')) !== 'false';
  await setSystemSetting('REQUEST_PAGE_ENABLED', current ? 'false' : 'true');
  res.redirect('/admin');
});

// Toggle endpoints for all modules
app.post('/admin/modules/:module/toggle', requireLogin, async (req, res) => {
  if (!isAdmin(req.session.user)) return res.status(403).send('Admin access required.');
  const moduleKey = req.params.module;
  const settingMap = {
    auditorium: 'REQUEST_PAGE_ENABLED',
    maintenance: 'MAINTENANCE_PAGE_ENABLED',
    car: 'CAR_PAGE_ENABLED',
    purchase: 'PURCHASE_PAGE_ENABLED'
  };
  const settingKey = settingMap[moduleKey];
  if (!settingKey) return res.status(400).send('Invalid module key.');
  const current = (await getSystemSetting(settingKey)) !== 'false';
  await setSystemSetting(settingKey, current ? 'false' : 'true');
  res.redirect('/admin/module-settings');
});

// Admin settings page for enabling/disabling modules
app.get('/admin/module-settings', requireLogin, async (req, res) => {
  if (!isAdmin(req.session.user)) return res.status(403).send('Admin access required.');
  const modules = [
    { key: 'auditorium', icon: '🏛️', title: 'Auditorium Requests', desc: 'Enable/disable auditorium request submissions' },
    { key: 'maintenance', icon: '🔧', title: 'Maintenance Requests', desc: 'Enable/disable maintenance request submissions' },
    { key: 'car', icon: '🚗', title: 'Car Requisition Requests', desc: 'Enable/disable car request submissions' },
    { key: 'purchase', icon: '🛒', title: 'Purchase Requests', desc: 'Enable/disable purchase request submissions' }
  ];
  
  const moduleRows = await Promise.all(modules.map(async (module) => {
    const enabled = await isRequestPageEnabled(module.key);
    const status = enabled ? '<span class="status approved">Enabled</span>' : '<span class="status rejected">Disabled</span>';
    return `<tr>
      <td>${module.icon}</td>
      <td><strong>${escapeHtml(module.title)}</strong><br><span class="small-copy">${escapeHtml(module.desc)}</span></td>
      <td>${status}</td>
      <td><form action="/admin/modules/${module.key}/toggle" method="post" style="display:inline">
        <button class="small-button ${enabled ? 'reject-button' : ''}" type="submit" onclick="return confirm('${enabled ? 'Disable' : 'Enable'} ${escapeHtml(module.title)}?')">${enabled ? 'Disable' : 'Enable'}</button>
      </form></td>
    </tr>`;
  }));
  
  res.send(`<!doctype html><html lang="en"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"><title>Module Settings | SVIT Vasad</title><link rel="stylesheet" href="/styles.css"></head><body><main class="shell panel"><header class="masthead"><div><p class="kicker">${escapeHtml(req.session.user.role)}</p><h1>Module<br><em>settings</em></h1></div><a class="page-nav" href="/admin">Back to admin</a><form action="/logout" method="post"><button class="quiet" type="submit">Sign out</button></form></header>${adminNavBar('/admin/module-settings', req.session.user)}<section class="panel-intro"><p class="eyebrow">Admin only</p><h2>Enable or disable request modules.</h2><p class="lede">Control which request types are available to users. When disabled, users will see a message that requests are temporarily closed.</p></section><section class="table-wrap"><table><thead><tr><th style="width:60px;text-align:center">Icon</th><th>Module</th><th style="width:120px">Status</th><th style="width:100px">Action</th></tr></thead><tbody>${moduleRows.join('')}</tbody></table></section></main></body></html>`);
});

app.post('/admin/auditoriums', requireLogin, async (req, res) => {
  if (!isAdmin(req.session.user)) return res.status(403).send('Admin access required.');
  const name = String(req.body.name || '').trim();
  const capacity = Number(req.body.capacity || 300);
  if (!name) return res.status(400).send('Auditorium name is required.');
  if (!Number.isInteger(capacity) || capacity < 1) return res.status(400).send('Auditorium capacity must be a positive whole number.');
  const roles = collectApprovalRoles(req.body);
  const values = { name, capacity, min_students: 1, principal_user_id: '', maintenance_user_id: '' };
  applyLegacyRoles(values, roles);
  if (supabase) {
    const { error } = await supabase.from('auditoriums').insert(values);
    if (error) return res.status(error.code === 'PGRST205' ? 503 : 500).send(error.code === 'PGRST205' ? 'Database setup required. Run supabase/schema.sql in the Supabase SQL Editor.' : error.message);
  } else if (!localAuditoriums.some((auditorium) => auditorium.name === name)) {
    const item = { id: Date.now(), ...values };
    applyLegacyRoles(item, roles);
    localAuditoriums.push(item);
  }
  res.redirect('/admin/auditoriums/manage');
});

app.get('/admin/auditoriums/manage', requireLogin, async (req, res) => {
  if (!isAdmin(req.session.user)) return res.status(403).send('Admin access required.');
  const auditoriums = await getAuditoriumConfigs();
  let stageCount = 4;
  auditoriums.forEach((a) => { const c = approvalRoles(a).length; if (c > stageCount) stageCount = c; });
  const stageSelect = (selected, nameAttr) => `<select name="${nameAttr}">${['none', 'head', 'electrician', 'principal', 'maintenance', 'chairman', 'admin_officer', 'higher_authority', 'purchase_officer', 'work_done', 'department_user', 'sub_admin', 'admin'].map((role) => `<option value="${role}"${role === (selected || 'none') ? ' selected' : ''}>${role === 'none' ? '— None' : escapeHtml(roleNames[role] || role)}</option>`).join('')}</select>`;
  const stageHeaders = (() => {
    let html = '';
    for (let n = 1; n <= stageCount; n++) {
      html += `<th class="stage-head"><span class="stage-label">${ordinal(n)}&nbsp;Approval</span>${n === stageCount ? '<button class="col-del" type="button" onclick="removeStageColumn(this)" title="Delete this column">×</button>' : ''}</th>`;
    }
    return html;
  })();
  const actionButtons = (auditorium) => `<button class="small-button" type="submit" onclick="return confirm('Save changes to ${auditorium.name}?')">Save</button><button class="small-button" formaction="/admin/auditoriums/${auditorium.id}/lock" type="submit" onclick="return confirm('${auditorium.is_locked ? 'Enable' : 'Disable'} ${auditorium.name}?')">${auditorium.is_locked ? 'Unlock' : 'Disable'}</button><button class="small-button reject-button" formaction="/admin/auditoriums/${auditorium.id}/delete" type="submit" onclick="return confirm('Delete ${auditorium.name} permanently?')">Delete</button>`;
  const rowForms = auditoriums.map((auditorium, ri) => {
    const stages = approvalRoles(auditorium);
    let cells = '';
    for (let i = 0; i < stageCount; i++) cells += `<td class="stage-cell">${stageSelect(stages[i], `approval_${i + 1}_${ri}`)}</td>`;
    return `<tr><input type="hidden" name="id[]" value="${escapeHtml(auditorium.id)}"><td>${escapeHtml(auditorium.id)}</td><td>${auditorium.is_locked ? `<strong>${auditoriumLabel(auditorium)}</strong>` : `<input name="name[]" value="${escapeHtml(auditorium.name)}" required>`}${cells}<td class="actions-cell">${actionButtons(auditorium)}</td></tr>`;
  }).join('');
  res.send(`<!doctype html><html lang="en"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"><title>Manage auditoriums</title><link rel="stylesheet" href="/styles.css"></head><body><main class="shell panel"><header class="masthead"><div><p class="kicker">${escapeHtml(req.session.user.role)}</p><h1>Manage<br><em>rooms</em></h1></div><a class="page-nav" href="/admin">Back to admin</a></header>${adminNavBar('/admin/auditoriums/manage', req.session.user)}<section class="panel-intro"><p class="eyebrow">Admin only</p><h2>Room options and approvals.</h2><p class="lede">Edit names and approval routes per room. Add more approval columns for longer routes with "+ Add approval column", remove one with its × button, lock (disable) or delete a room.</p></section><div class="admin-tools"><button class="small-button" type="button" onclick="addStageColumn()">+ Add approval column</button></div><section class="table-wrap"><h3>Existing rooms</h3><form id="row-form" action="/admin/auditoriums/manage" method="post"><input name="stage_count" id="stage_count" type="hidden" value="${stageCount}"><table><thead><tr><th>Id</th><th>Name</th>${stageHeaders}<th style="width:220px">Actions</th></tr></thead><tbody>${rowForms}</tbody></table><div class="admin-tools"><button class="small-button" type="submit">Save all changes</button></div></form></section><section class="table-wrap"><h3>Add a new room</h3><form action="/admin/auditoriums" method="post"><table><thead><tr><th>Name</th>${stageHeaders}</tr></thead><tbody><tr>${`<td><input name="name" placeholder="New room name" required></td>${Array.from({ length: stageCount }, (_, i) => `<td class="stage-cell">${stageSelect(i === 0 ? 'head' : i === 1 ? 'electrician' : i === 2 ? 'principal' : 'maintenance', `approval_${i + 1}`)}</td>`).join('')}`}</tr></tbody></table><div class="admin-tools"><button class="small-button" type="submit">Add room</button></div></form></section></main><script>var currentStages=${stageCount};function ordinal(n){return n===1?'1st':n===2?'2nd':n===3?'3rd':n+'th';}var roleVals=['none','head','electrician','principal','maintenance','chairman','admin_officer','higher_authority','purchase_officer','work_done','department_user','sub_admin','admin'];function makeSelect(){var h='<select>'+roleVals.map(function(r){return '<option value="'+r+'">'+(r==='none'?'— None':r)+'</option>';}).join('')+'</select>';return h;}function rowIndexOf(tr){return Array.prototype.indexOf.call(tr.parentElement.rows,tr);}function stageName(col,row){return 'approval_'+(col+1)+'_'+row;}function nameSelectsInRow(tr){Array.prototype.slice.call(tr.querySelectorAll('td.stage-cell select')).forEach(function(sel,ci){sel.name=stageName(ci,rowIndexOf(tr));});}function addStageColumn(){var tbody=document.querySelector('#row-form tbody');var theadTr=document.querySelector('#row-form thead tr');currentStages+=1;var th=document.createElement('th');th.className='stage-head';th.innerHTML='<span class="stage-label"></span> <button class="col-del" type="button" onclick="removeStageColumn(this)">×</button>';th.querySelector('.stage-label').textContent=ordinal(currentStages)+' Approval';theadTr.insertBefore(th,theadTr.cells[theadTr.cells.length-2]);Array.prototype.slice.call(tbody.rows).forEach(function(tr){var td=document.createElement('td');td.className='stage-cell';td.innerHTML=makeSelect;tr.insertBefore(td,tr.cells[tr.cells.length-2]);nameSelectsInRow(tr);});document.getElementById('stage_count').value=currentStages;}function removeStageColumn(btn){if(currentStages<=1){return;}var th=btn.closest('th');var theadTr=th.parentElement;var idx=Array.prototype.indexOf.call(theadTr.cells,th);theadTr.removeChild(th);Array.prototype.slice.call(document.querySelectorAll('#row-form tbody tr')).forEach(function(tr){tr.removeChild(tr.cells[idx]);});currentStages-=1;document.getElementById('stage_count').value=currentStages;}</script></body></html>`);
});

app.post('/admin/auditoriums/manage', requireLogin, async (req, res) => {
  if (!isAdmin(req.session.user)) return res.status(403).send('Admin access required.');
  const ids = Array.isArray(req.body.id) ? req.body.id : [req.body.id];
  const names = Array.isArray(req.body.name) ? req.body.name : [req.body.name];
  const stageCount = Number(req.body.stage_count || 4);
  try {
    for (let ri = 0; ri < ids.length; ri++) {
      const id = ids[ri];
      const current = (await getAuditoriumConfigs()).find((auditorium) => String(auditorium.id) === String(id));
      if (!current || current.is_locked) continue;
      const roles = [];
      for (let n = 1; n <= stageCount; n++) {
        const val = req.body[`approval_${n}_${ri}`];
        roles.push(val === undefined ? 'none' : String(val).trim() || 'none');
      }
      while (roles.length && roles[roles.length - 1] === 'none') roles.pop();
      if (!roles.length) roles.push('head');
      const values = { name: String(names[ri] || current.name).trim(), min_students: current.min_students || 1, capacity: current.capacity || 300, principal_user_id: current.principal_user_id || '', maintenance_user_id: current.maintenance_user_id || '' };
      applyLegacyRoles(values, roles);
      if (supabase) {
        const { error } = await supabase.from('auditoriums').update(values).eq('id', String(id));
        if (error) throw new Error(error.message);
      } else {
        Object.assign(localAuditoriums.find((auditorium) => String(auditorium.id) === String(id)) || {}, values);
      }
    }
  } catch (e) {
    return res.status(500).send(e.message);
  }
  res.redirect('/admin/auditoriums/manage');
});

app.post('/admin/auditoriums/:id', requireLogin, async (req, res) => {
  if (!isAdmin(req.session.user)) return res.status(403).send('Admin access required.');
  const current = (await getAuditoriumConfigs()).find((auditorium) => String(auditorium.id) === req.params.id);
  if (!current) return res.status(404).send('Auditorium not found.');
  if (current.is_locked) return res.status(409).send('Unlock the auditorium before editing it.');
  const capacity = Number(req.body.capacity);
  const minStudents = Number(req.body.min_students);
  const values = { name: String(req.body.name || '').trim(), capacity, min_students: minStudents, approval_1_role: req.body.approval_1_role, approval_2_role: req.body.approval_2_role, approval_3_role: req.body.approval_3_role, approval_4_role: req.body.approval_4_role, principal_user_id: req.body.principal_user_id || '', maintenance_user_id: req.body.maintenance_user_id || '' };
  if (!values.name) return res.status(400).send('Auditorium name is required.');
  if (!Number.isInteger(capacity) || capacity < 1) return res.status(400).send('Auditorium capacity must be a positive whole number.');
  if (!Number.isInteger(minStudents) || minStudents < 1) return res.status(400).send('Minimum students must be a positive whole number.');
  if (supabase) {
    const { error } = await supabase.from('auditoriums').update(values).eq('id', req.params.id);
    if (error) return res.status(500).send(error.message);
  } else {
    Object.assign(localAuditoriums.find((auditorium) => String(auditorium.id) === req.params.id) || {}, values);
  }
  res.redirect('/admin/auditoriums/manage');
});

app.post('/admin/auditoriums/:id/delete', requireLogin, async (req, res) => {
  if (!isAdmin(req.session.user)) return res.status(403).send('Admin access required.');
  if (supabase) {
    const { error } = await supabase.from('auditoriums').delete().eq('id', req.params.id);
    if (error) return res.status(500).send(error.message);
  } else {
    const index = localAuditoriums.findIndex((auditorium) => String(auditorium.id) === req.params.id);
    if (index >= 0) localAuditoriums.splice(index, 1);
  }
  res.redirect('/admin/auditoriums/manage');
});

app.post('/admin/auditoriums/:id/lock', requireLogin, async (req, res) => {
  if (!isAdmin(req.session.user)) return res.status(403).send('Admin access required.');
  const auditorium = (await getAuditoriumConfigs()).find((candidate) => String(candidate.id) === req.params.id);
  if (!auditorium) return res.status(404).send('Auditorium not found.');
  const isLocked = !auditorium.is_locked;
  if (supabase) {
    const { error } = await supabase.from('auditoriums').update({ is_locked: isLocked }).eq('id', req.params.id);
    if (error) return res.status(500).send(error.message);
  } else {
    auditorium.is_locked = isLocked;
  }
  res.redirect('/admin/auditoriums/manage');
});

app.get('/admin/departments', requireLogin, async (req, res) => {
  if (!isAdmin(req.session.user)) return res.status(403).send('Admin access required.');
  const allUsers = await getUsers();
  const roleAssignments = await getRoleAssignments();
  const assignedRows = (roleAssignments || []).map((a) => ({ id: a.user_id, _assignment_id: a.id, name: a.name || '', department: a.department, role: a.role, is_disabled: false, password: '' }));
  const mergedUsers = [...allUsers, ...assignedRows.filter((a) => !allUsers.some((u) => u.id === a.id && u.department === a.department && u.role === a.role))];
  const currentUser = req.session.user.id;
  const fetchedDepartments = await getDepartments();
  const departments = fetchedDepartments && fetchedDepartments.length ? fetchedDepartments : localDepartments;
  const departmentOptions = (selected) => {
    const names = departments.map((department) => department.name);
    const extra = selected && !names.includes(selected) ? `<option value="${escapeHtml(selected)}" selected>${escapeHtml(selected)}</option>` : '';
    return `${extra}${departments.map((department) => `<option value="${escapeHtml(department.name)}"${department.name === selected ? ' selected' : ''}>${escapeHtml(department.name)}</option>`).join('')}`;
  };

  const workspacePanels = workspaceTabs.map((tab) => {
    const list = mergedUsers.filter((user) => tab.roles.includes(user.role));
    return `<section class="workspace-users" id="tab-${tab.key}" data-workspace="${tab.key}"><div class="table-wrap"><table class="user-table"><thead><tr><th>Email</th><th>Name</th><th>Department</th><th>Role</th><th>Status</th><th>Actions</th></tr></thead><tbody>${list.length ? list.map((candidate) => userRowTemplate(candidate, currentUser, departmentOptions, tab.key)).join('') : '<tr><td colspan="6">No users assigned to this workspace yet.</td></tr>'}</tbody></table></div>${list.length ? '<p class="small-copy">Roles in this workspace: ' + tab.roles.map((role) => roleNames[role]).join(' · ') + '.</p>' : ''}</section>`;
  }).join('');

  const tabNav = `<div class="workspace-tabs" role="tablist"><button class="workspace-tab active" data-workspace="all" type="button">👥 All users (${mergedUsers.length})</button>${workspaceTabs.map((tab) => { const count = mergedUsers.filter((user) => tab.roles.includes(user.role)).length; return `<button class="workspace-tab" data-workspace="${tab.key}" type="button">${tab.icon} ${escapeHtml(tab.title)} (${count})</button>`; }).join('')}</div>`;

  const roleSelectOptions = ['sub_admin', 'admin_officer', 'purchase_officer', 'purchase_clerk', 'chairman', 'department_user', 'head', 'maintenance', 'electrician', 'principal', 'work_done'].map((role) => `<option value="${role}">${roleNames[role]}</option>`).join('');

  const allTab = `<section class="workspace-users" id="tab-all" data-workspace="all">${usersTable(mergedUsers, currentUser, departmentOptions, 'all')}</section>`;

  const imported = Number(req.query.imported || 0);
  const importNote = imported > 0 ? `<p class="small-copy" style="color:var(--positive,#2e7d32)">Imported/updated ${imported} department(s) from Excel.</p>` : '';
  const flashMsg = req.query.msg ? `<p class="small-copy" style="color:var(--positive,#2e7d32)">${escapeHtml(String(req.query.msg))}</p>` : '';
  const departmentRows = departments.map((department) => `<form class="create-user" action="/admin/departments/${encodeURIComponent(department.id)}" method="post"><input name="name" value="${escapeHtml(department.name)}" placeholder="Department name" required><button type="submit" onclick="return confirm('Are you sure you want to save changes to this department?')">Save changes</button><button formaction="/admin/departments/${encodeURIComponent(department.id)}/delete" type="submit" onclick="return confirm('Are you sure you want to delete this department?')">Delete</button></form>`).join('');

  res.send(`<!doctype html><html lang="en"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"><title>Users and roles | SVIT Vasad</title><link rel="stylesheet" href="/styles.css"><style>.workspace-tabs{display:flex;flex-wrap:wrap;gap:8px;margin:8px 0 22px}.workspace-tab{border:1px solid var(--line);background:transparent;color:var(--ink);padding:10px 14px;font:12px Arial,sans-serif;cursor:pointer}.workspace-tab.active{background:var(--ink);color:var(--paper)}.workspace-users{display:none}.workspace-users[data-workspace="all"][data-visible="1"],.workspace-users[data-visible="1"]{display:block}.user-table td{padding:10px}.user-table td input,.user-table td select{width:100%;min-width:0;box-sizing:border-box;padding:9px;border:1px solid var(--line);background:transparent;font:13px Arial,sans-serif}.user-table td select{width:auto}.user-table .user-actions{display:flex;gap:6px;align-items:center;white-space:nowrap}.user-table .user-actions input{margin-right:6px}.user-table .user-actions .small-button{margin:0}.user-table td form{margin:0}@media(max-width:760px){.workspace-tabs{flex-direction:column}}</style></head><body><main class="shell panel"><header class="masthead"><h1>Users <em>and roles</em></h1><a class="page-nav" href="/dashboard">Back to main page</a><form action="/logout" method="post"><button class="quiet" type="submit">Sign out</button></form></header><section class="panel-intro"><p class="eyebrow">Admin only</p><h2>Manage accounts and roles.</h2><p class="lede">Add, edit, and delete users, and assign each one a role. Switch between workspaces to see who belongs to each one.</p>${flashMsg}</section><section class="user-management"><div class="section-heading"><span>01</span><h3>Add a new user</h3></div><form class="create-user" action="/admin/users" method="post"><input name="id" type="email" placeholder="Email (login ID)" required><input name="name" placeholder="Full name" required><select name="department" required><option value="">Select department</option>${departmentOptions('')}</select><select name="role" required>${roleSelectOptions}</select><input name="password" placeholder="Password (min 6 chars)" required><button type="submit">Add user</button></form></section><section class="user-management"><div class="section-heading"><span>02</span><h3>Add a department</h3></div><p class="small-copy">Create the department here — it appears on the request form and in the Add a new user selector.</p><form class="create-user" action="/admin/departments" method="post"><input name="name" placeholder="Department name" required><button type="submit">Add department</button></form></section><section class="user-management"><div class="section-heading"><span>03</span><h3>Existing departments</h3></div>${departmentRows || '<p class="small-copy">No departments yet.</p>'}</section><section class="user-management"><div class="section-heading"><span>04</span><h3>Existing users by workspace</h3></div><p class="small-copy">Edit details or reset a password inline; delete removes the account. Use the tabs to focus on a single workspace.</p>${tabNav}${allTab}${workspacePanels}</section><section class="user-management"><div class="section-heading"><span>05</span><h3>Excel import and export</h3></div>${importNote}<div class="admin-tools"><a class="page-nav" href="/admin/departments/template">Departments template</a><a class="page-nav" href="/admin/departments/export">Departments Excel</a><a class="page-nav" href="/admin/users/template">Users template</a><a class="page-nav" href="/admin/users/export">Users Excel</a><form action="/admin/departments/import" method="post" enctype="multipart/form-data"><input type="file" name="departments_file" accept=".xlsx,.xls" required><button class="small-button" type="submit">Upload departments</button></form><form action="/admin/users/import" method="post" enctype="multipart/form-data"><input type="file" name="users_file" accept=".xlsx,.xls" required><button class="small-button" type="submit">Upload users</button></form></div><p class="small-copy">Departments Excel — required column: Name. Users Excel — required columns: Email, Name, Department, Role, Password.</p></section></main><script>const allSection=document.querySelector('#tab-all');allSection.dataset.visible='1';const tabs=Array.from(document.querySelectorAll('.workspace-tab'));const sections=Array.from(document.querySelectorAll('.workspace-users'));tabs.forEach(tab=>{tab.addEventListener('click',()=>{tabs.forEach(t=>t.classList.remove('active'));tab.classList.add('active');const key=tab.dataset.workspace;sections.forEach(s=>{if(s.id==='tab-'+key){s.dataset.visible='1';}else{s.dataset.visible='0';}});});});</script></body></html>`);
});

app.get('/admin/departments/template', requireLogin, (req, res) => {
  if (!isAdmin(req.session.user)) return res.status(403).send('Admin access required.');
  const workbook = XLSX.utils.book_new();
  XLSX.utils.book_append_sheet(workbook, XLSX.utils.json_to_sheet([{ Name: 'Computer Engineering' }]), 'Departments');
  const buffer = XLSX.write(workbook, { type: 'buffer', bookType: 'xlsx' });
  res.type('application/vnd.openxmlformats-officedocument.spreadsheetml.sheet').attachment('departments-template.xlsx').send(buffer);
});

app.get('/admin/departments/export', requireLogin, async (req, res) => {
  if (!isAdmin(req.session.user)) return res.status(403).send('Admin access required.');
  const departments = await getDepartments();
  const workbook = XLSX.utils.book_new();
  XLSX.utils.book_append_sheet(workbook, XLSX.utils.json_to_sheet(departments.map((d) => ({ Name: d.name, Email: d.email || '', Designation: d.designation || '', 'Head User ID': d.head_user_id || '' }))), 'Departments');
  const buffer = XLSX.write(workbook, { type: 'buffer', bookType: 'xlsx' });
  res.type('application/vnd.openxmlformats-officedocument.spreadsheetml.sheet').attachment('departments.xlsx').send(buffer);
});

app.post('/admin/departments/import', requireLogin, upload.single('departments_file'), async (req, res) => {
  if (!isAdmin(req.session.user)) return res.status(403).send('Admin access required.');
  if (!req.file) return res.status(400).send('Please upload an Excel file.');
  try {
    const workbook = XLSX.read(req.file.buffer, { type: 'buffer' });
    const sheet = workbook.Sheets[workbook.SheetNames[0]];
    const rawRows = XLSX.utils.sheet_to_json(sheet, { defval: '' }).map((row) => Object.fromEntries(Object.entries(row).map(([key, value]) => [key.replace(/^\uFEFF/, '').trim().toLowerCase(), value])));
    if (!rawRows.length) return res.status(400).send('Excel file has no data rows. Required column: Name.');
    const currentUsers = await getUsers();
    const existing = await getDepartments();
    let created = 0;
    for (const [index, row] of rawRows.entries()) {
      if (!Object.values(row).some((value) => String(value ?? '').trim() !== '')) continue;
      const name = String(row.name || '').trim();
      const email = String(row.email || '').trim();
      const designation = String(row.designation || '').trim();
      const headUserId = String(row['head user id'] || row.head_user_id || '').trim().toLowerCase();
      if (!name) return res.status(400).send(`Invalid Excel row ${index + 2}: Name is required.`);
      const head = headUserId ? currentUsers.find((user) => user.id.toLowerCase() === headUserId && user.role === 'head') : null;
      if (headUserId && !head) return res.status(400).send(`Invalid Excel row ${index + 2}: Head User ID "${headUserId}" must be a login with the head role.`);
      const duplicate = existing.find((d) => d.name.toLowerCase() === name.toLowerCase());
      if (supabase) {
        if (duplicate) {
          await supabase.from('departments').update({ email, designation, head_user_id: head?.id || '' }).eq('id', duplicate.id);
        } else {
          const { error } = await supabase.from('departments').insert({ name, email, designation, head_user_id: head?.id || '' });
          if (error) return res.status(500).send(`Could not add "${name}": ${error.message}`);
        }
        if (head) await supabase.from('user_accounts').update({ department: name }).eq('id', head.id);
      } else {
        const local = existing.find((d) => d.name.toLowerCase() === name.toLowerCase()) || (localDepartments.push({ id: Date.now() + created, name, email, designation, head_user_id: head?.id || '' }), localDepartments.at(-1));
        Object.assign(local, { name, email, designation, head_user_id: head?.id || '' });
        if (head) {
          const localUser = users.find((user) => user.id === head.id);
          if (localUser) localUser.department = name;
        }
      }
      created += 1;
    }
    res.redirect(`/admin/departments?imported=${encodeURIComponent(created)}`);
  } catch (error) {
    return res.status(400).send(`Could not read Excel file: ${error.message}`);
  }
});

app.post('/admin/departments', requireLogin, async (req, res) => {
  if (!isAdmin(req.session.user)) return res.status(403).send('Admin access required.');
  const name = String(req.body.name || '').trim();
  const email = String(req.body.email || '').trim();
  const designation = String(req.body.designation || '').trim();
  const head = (await getUsers()).find((user) => user.id === req.body.head_user_id && user.role === 'head');
  if (!name) return res.status(400).send('Department name is required.');
  if (supabase) {
    const { error } = await supabase.from('departments').insert({ name, email, designation, head_user_id: head?.id || '' });
    if (error) return res.status(error.code === 'PGRST205' ? 503 : 500).send(error.message);
    if (head) await supabase.from('user_accounts').update({ department: name }).eq('id', head.id);
  } else if (!localDepartments.some((department) => department.name === name)) {
    localDepartments.push({ id: Date.now(), name, email, designation, head_user_id: head?.id || '' });
    if (head) {
      const localUser = users.find((user) => user.id === head.id);
      if (localUser) localUser.department = name;
    }
  }
  res.redirect('/admin/departments');
});

app.post('/admin/departments/:id', requireLogin, async (req, res) => {
  if (!isAdmin(req.session.user)) return res.status(403).send('Admin access required.');
  const name = String(req.body.name || '').trim();
  const email = String(req.body.email || '').trim();
  const designation = String(req.body.designation || '').trim();
  const head = (await getUsers()).find((user) => user.id === req.body.head_user_id && user.role === 'head');
  if (!name || !head) return res.status(400).send('Department name and a valid Head are required.');
  if (supabase) {
    const { error } = await supabase.from('departments').update({ name, email, designation, head_user_id: head.id }).eq('id', req.params.id);
    if (error) return res.status(500).send(error.message);
    await supabase.from('user_accounts').update({ department: name }).eq('id', head.id);
  } else {
    const department = localDepartments.find((candidate) => String(candidate.id) === req.params.id);
    if (!department) return res.status(404).send('Department not found.');
    Object.assign(department, { name, email, designation, head_user_id: head.id });
    const localUser = users.find((user) => user.id === head.id);
    if (localUser) localUser.department = name;
  }
  res.redirect('/admin/departments');
});

app.post('/admin/departments/:id/delete', requireLogin, async (req, res) => {
  if (!isAdmin(req.session.user)) return res.status(403).send('Admin access required.');
  if (supabase) {
    const { error } = await supabase.from('departments').delete().eq('id', req.params.id);
    if (error) return res.status(500).send(error.message);
  } else {
    const index = localDepartments.findIndex((department) => String(department.id) === req.params.id);
    if (index >= 0) localDepartments.splice(index, 1);
  }
  res.redirect('/admin/departments');
});

app.get('/admin/requests/:id/edit', requireLogin, async (req, res) => {
  if (!isAdmin(req.session.user)) return res.status(403).send('Admin access required.');
  let request = requests.find((candidate) => String(candidate.id) === req.params.id);
  if (supabase) {
    const { data, error } = await supabase.from('requests').select('*').eq('id', req.params.id).maybeSingle();
    if (error) return res.status(500).send(error.message);
    request = data;
  }
  if (!request) return res.status(404).send('Request not found.');
  const departments = await getDepartments();
  const auditoriums = await getAuditoriums();
  const options = (values, selected) => values.map((value) => `<option value="${escapeHtml(value)}"${value === selected ? ' selected' : ''}>${escapeHtml(value)}</option>`).join('');
  const slots = Array.isArray(request.time_slots) && request.time_slots.length ? request.time_slots : [{ date: request.date, start_time: request.start_time || '', end_time: request.end_time || '' }];
  const slotJson = JSON.stringify(slots, null, 2);
  res.send(`<!doctype html><html lang="en"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"><title>Edit request</title><link rel="stylesheet" href="/styles.css"></head><body><main class="shell panel"><header class="masthead"><h1>Edit <em>request</em></h1><a class="page-nav" href="/admin">Back to admin</a></header><section class="panel-intro"><p class="eyebrow">Admin only</p><h2>Change request details.</h2><p class="lede">Update the department, programme, room, or date and time slots.</p></section><form class="create-user" action="/admin/requests/${encodeURIComponent(request.id)}" method="post"><input name="department" value="${escapeHtml(request.department)}" placeholder="Department" required><input name="program" value="${escapeHtml(request.program)}" placeholder="Programme" required><input name="date" type="date" value="${escapeHtml(request.date)}" required><input name="end_date" type="date" value="${escapeHtml(request.end_date)}" required><select name="auditorium" required>${options(auditoriums, request.auditorium)}</select><input name="faculty_name" value="${escapeHtml(request.faculty_name)}" placeholder="Faculty in charge"><select name="status"><option value="pending"${request.status === 'pending' ? ' selected' : ''}>Pending</option><option value="first_approved"${request.status === 'first_approved' ? ' selected' : ''}>First approved</option><option value="second_approved"${request.status === 'second_approved' ? ' selected' : ''}>Second approved</option><option value="third_approved"${request.status === 'third_approved' ? ' selected' : ''}>Third approved</option><option value="approved"${request.status === 'approved' ? ' selected' : ''}>Approved</option><option value="rejected"${request.status === 'rejected' ? ' selected' : ''}>Rejected</option></select><textarea name="time_slots" rows="8" placeholder='[{"date":"2026-08-27","start_time":"09:00","end_time":"10:00"}]'>${escapeHtml(slotJson)}</textarea><button type="submit">Save changes</button></form></main></body></html>`);
});

app.post('/admin/requests/:id', requireLogin, async (req, res) => {
  if (!isAdmin(req.session.user)) return res.status(403).send('Admin access required.');
  let request = requests.find((candidate) => String(candidate.id) === req.params.id);
  if (supabase) {
    const { data, error } = await supabase.from('requests').select('*').eq('id', req.params.id).maybeSingle();
    if (error) return res.status(500).send(error.message);
    request = data;
  }
  if (!request) return res.status(404).send('Request not found.');
  let timeSlots;
  try {
    timeSlots = JSON.parse(req.body.time_slots);
  } catch {
    return res.status(400).send('Time slots must be valid JSON.');
  }
  if (!Array.isArray(timeSlots) || !timeSlots.length || timeSlots.some((slot) => !slot.date)) return res.status(400).send('At least one valid date/time slot is required.');
  const values = { department: String(req.body.department || '').trim(), program: String(req.body.program || '').trim(), student_count: Number(req.body.student_count) || Number(request.student_count) || 1, date: timeSlots[0].date, end_date: String(req.body.end_date || timeSlots.at(-1).date), start_time: timeSlots[0].start_time || null, end_time: timeSlots[0].end_time || null, time_slots: timeSlots, auditorium: req.body.auditorium, faculty_name: String(req.body.faculty_name || '').trim(), status: req.body.status };
  if (!values.department || !values.program || !values.auditorium || !Number.isInteger(values.student_count) || values.student_count < 1) return res.status(400).send('Department, programme, auditorium, and a valid student count are required.');
  if (supabase) {
    const { error } = await supabase.from('requests').update(values).eq('id', req.params.id);
    if (error) return res.status(500).send(error.message);
  } else {
    Object.assign(request, values);
  }
  res.redirect('/admin');
});

app.post('/admin/requests/:id/delete', requireLogin, async (req, res) => {
  if (!isAdmin(req.session.user)) return res.status(403).send('Admin access required.');
  if (supabase) {
    const { error } = await supabase.from('requests').delete().eq('id', req.params.id);
    if (error) return res.status(500).send(error.message);
  } else {
    const index = requests.findIndex((candidate) => String(candidate.id) === req.params.id);
    if (index >= 0) requests.splice(index, 1);
  }
  res.redirect('/admin');
});

function requestRow(request, user, auditoriumConfigs) {
  const status = requestStatus(request, auditoriumConfigs);
    if (user.role === 'admin' || user.role === 'sub_admin') {
    const requesterLabel = request.requester_type === 'faculty' ? 'Faculty' : 'Student';
    const requesterDetail = escapeHtml(request.requester_name || request.faculty_name || request.requester_id || '');
    const enrollmentLine = request.requester_enrollment_no ? `<small>${escapeHtml(request.requester_type === 'faculty' ? 'Faculty' : 'Enrollment')}: ${escapeHtml(request.requester_enrollment_no)}</small>` : '';
    const contactDetail = [escapeHtml(request.requester_mobile || ''), escapeHtml(request.requester_branch || '')].filter(Boolean).join('<br>') || escapeHtml(request.requester_id);
    return `<tr><td>${escapeHtml(request.department)}</td><td>${escapeHtml(request.program)}</td><td>${escapeHtml(request.student_count || 1)}</td><td>${escapeHtml(request.date)} to ${escapeHtml(request.end_date)}<small>${requestWhen(request)}</small></td><td>${escapeHtml(request.auditorium)}</td><td>${requesterDetail}${enrollmentLine}<small>${requesterLabel}</small></td><td>${contactDetail}</td><td>${status}</td><td>${approvalAction(request, user, auditoriumConfigs)} <a class="page-nav" href="/admin/requests/${encodeURIComponent(request.id)}/edit">Edit</a><form action="/admin/requests/${encodeURIComponent(request.id)}/delete" method="post"><button class="small-button" type="submit">Delete</button></form></td></tr>`;
  }
  return `<tr><td>${escapeHtml(request.program)}<small>${escapeHtml(request.department)}</small></td><td>${escapeHtml(request.date)} to ${escapeHtml(request.end_date)}<small>${requestWhen(request)}</small></td><td>${escapeHtml(request.auditorium)}</td><td>${status}</td><td>${approvalAction(request, user, auditoriumConfigs)}</td></tr>`;
}

function requestStatus(request, auditoriumConfigs) {
  const auditorium = auditoriumConfigs.find((auditorium) => auditorium.name === request.auditorium) || {};
  const transition = approvalTransition(request, auditorium);
  if (!transition) return `<span class="status ${escapeHtml(request.status)}">${escapeHtml(request.status.replaceAll('_', ' '))}</span>${request.rejection_remarks ? `<small>Remarks: ${escapeHtml(request.rejection_remarks)}</small>` : ''}`;
  const stepRoleNames = { head: 'Department head', electrician: 'Electrician', principal: 'Principal', maintenance: 'Maintenance officer', chairman: 'Chairman', admin_officer: 'Admin officer', higher_authority: 'Higher authority', purchase_officer: 'Purchase officer', work_done: 'Work Inspector', department_user: 'Department staff' };
  let pendingLabel = stepRoleNames[transition.role] || moduleRoleLabel(transition.role) || transition.role;
  if (transition.role === 'principal' && auditorium.principal_user_id) pendingLabel += ` (${escapeHtml(auditorium.principal_user_id)})`;
  if (transition.role === 'maintenance' && auditorium.maintenance_user_id) pendingLabel += ` (${escapeHtml(auditorium.maintenance_user_id)})`;
  return `<span class="status ${escapeHtml(request.status)}">${escapeHtml(request.status.replaceAll('_', ' '))}</span><small>Pending: ${pendingLabel}</small>`;
}
 
function requestWhen(request) {
  const slots = Array.isArray(request.time_slots) && request.time_slots.length ? request.time_slots : [{ start_time: request.start_time, end_time: request.end_time }];
  const submittedAt = request.created_at ? new Date(request.created_at).toLocaleString() : 'Not available';
  return `${escapeHtml(request.duration)} · ${slots.map((slot) => `${escapeHtml(slot.date || request.date || '')} ${escapeHtml(slot.start_time || '')} - ${escapeHtml(slot.end_time || '')}`).join('<br>')}<small>Submitted: ${escapeHtml(submittedAt)}</small>`;
}

function requestSlots(request) {
  return Array.isArray(request.time_slots) && request.time_slots.length
    ? request.time_slots
    : [{ date: request.date, start_time: request.start_time, end_time: request.end_time }];
}

function slotsOverlap(first, second) {
  if (first.date !== second.date) return false;
  if (!first.start_time || !first.end_time || !second.start_time || !second.end_time) return true;
  const toMinutes = (time) => {
    const [hours, minutes] = time.split(':').map(Number);
    return hours * 60 + minutes;
  };
  const firstStart = toMinutes(first.start_time);
  const secondStart = toMinutes(second.start_time);
  const firstEndValue = toMinutes(first.end_time);
  const secondEndValue = toMinutes(second.end_time);
  if (firstEndValue <= firstStart || secondEndValue <= secondStart) return true;
  const firstEnd = firstEndValue;
  const secondEnd = secondEndValue;
  return firstStart < secondEnd && secondStart < firstEnd;
}

function auditoriumIsBooked(requestsToCheck, auditorium, slots) {
  return requestsToCheck
    .filter((request) => request.auditorium === auditorium && request.status !== 'rejected')
    .map((request) => ({ request, slot: requestSlots(request).find((savedSlot) => slots.some((slot) => slotsOverlap(savedSlot, slot))) }))
    .find((match) => match.slot);
}

function approvalAction(request, user, auditoriumConfigs) {
  const auditorium = auditoriumConfigs.find((candidate) => candidate.name === request.auditorium) || {};
  const transition = approvalTransition(request, auditorium);
  if (!transition) return '<span class="muted">Waiting</span>';
  if (user.role === 'admin') {
    return `<form class="request-actions" action="/admin/requests/${encodeURIComponent(request.id)}/approve" method="post"><button class="small-button" type="submit">Approve</button></form><form class="request-actions reject-form" action="/admin/requests/${encodeURIComponent(request.id)}/reject" method="post"><input name="remarks" placeholder="Reject remarks" aria-label="Reject remarks" required><button class="small-button reject-button" type="submit">Reject</button></form>`;
  }
  if (user.role !== transition.role) return '<span class="muted">Waiting</span>';
  if (user.role === 'head' && !(user.departments || [user.department]).includes(request.department)) return '<span class="muted">Waiting</span>';
  if (transition.role === 'principal' && auditorium.principal_user_id && user.id !== auditorium.principal_user_id) return '<span class="muted">Waiting</span>';
  if (transition.role === 'maintenance' && auditorium.maintenance_user_id && user.id !== auditorium.maintenance_user_id) return '<span class="muted">Waiting</span>';
  return `<form class="request-actions" action="/admin/requests/${encodeURIComponent(request.id)}/approve" method="post"><button class="small-button" type="submit">Approve</button></form><form class="request-actions reject-form" action="/admin/requests/${encodeURIComponent(request.id)}/reject" method="post"><input name="remarks" placeholder="Reject remarks" aria-label="Reject remarks" required><button class="small-button reject-button" type="submit">Reject</button></form>`;
}

function approvalRoles(auditorium) {
  const firstThree = [auditorium.approval_1_role, auditorium.approval_2_role, auditorium.approval_3_role].map((r) => r || 'none');
  const fourth = auditorium.approval_4_role;
  if (typeof fourth === 'string' && fourth.includes('|')) {
    return firstThree.concat(fourth.split('|').map((r) => r.trim()).filter(Boolean));
  }
  return firstThree.concat(fourth || 'none');
}

function collectApprovalRoles(body) {
  const roles = [];
  let n = 1;
  while (true) {
    const val = body[`approval_${n}`];
    if (val === undefined) break;
    roles.push(String(val).trim() || 'none');
    n += 1;
  }
  if (!roles.length) roles.push('head', 'electrician', 'principal', 'maintenance');
  while (roles.length && roles[roles.length - 1] === 'none') roles.pop();
  if (!roles.length) roles.push('head');
  return roles;
}

function applyLegacyRoles(values, roles) {
  values.approval_1_role = roles[0] || 'head';
  values.approval_2_role = roles[1] || 'electrician';
  values.approval_3_role = roles[2] || 'principal';
  values.approval_4_role = roles.slice(3).join('|') || 'maintenance';
}

function approvalTransition(request, auditorium) {
  const roles = approvalRoles(auditorium);
  const stageByStatus = { pending: 0, first_approved: 1, second_approved: 2, third_approved: 3 };
  let stage = stageByStatus[request.status];
  if (stage === undefined) return null;
  while (stage < roles.length && roles[stage] === 'none') stage += 1;
  if (stage >= roles.length) return null;
  let nextStage = stage + 1;
  while (nextStage < roles.length && roles[nextStage] === 'none') nextStage += 1;
  const nextStatus = ['pending', 'first_approved', 'second_approved', 'third_approved', 'approved'][nextStage] || 'approved';
  return { role: roles[stage], status: nextStatus };
}

app.post('/admin/users', requireLogin, async (req, res) => {
  if (!isAdmin(req.session.user)) return res.status(403).send('Admin access required.');
  const email = String(req.body.id || '').trim().toLowerCase();
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) return res.status(400).send('Please enter a valid email address.');
  if (!req.body.name || !req.body.department || !req.body.role) return res.status(400).send('Name, department, and role are required.');
  const password = String(req.body.password || '').trim();
  const role = req.body.role;
  const department = String(req.body.department).trim();
  const currentUsers = await getUsers();
  const existing = currentUsers.find((user) => user.id === email) || users.find((user) => user.id === email);

  if (existing && (existing.role !== role || existing.department !== department)) {
    if (password && password.length < 6) return res.status(400).send('Password must be at least 6 characters.');
    try {
      await saveRoleAssignment(email, String(req.body.name).trim(), department, role);
    } catch (error) {
      return res.status(500).send(`Could not save role assignment: ${error.message}`);
    }
    const msg = existing.role === role ? `User updated successfully.` : `Added role "${role}" for ${email} (this email now has multiple roles).`;
    return res.redirect('/admin/departments?msg=' + encodeURIComponent(msg));
  }

  if (!existing && (!password || password.length < 6)) {
    return res.status(400).send('Password must be at least 6 characters.');
  }
  if (password && password.length < 6) {
    return res.status(400).send('Password must be at least 6 characters.');
  }
  const values = {
    id: email,
    name: String(req.body.name).trim(),
    department,
    role,
    password: password || (existing ? existing.password : '')
  };
  const localIndex = users.findIndex((user) => user.id === email);
  if (localIndex >= 0) {
    Object.assign(users[localIndex], values);
  } else {
    users.push(values);
  }
  try {
    await saveUser(values, Boolean(values.password));
  } catch (error) {
    return res.status(500).send(`Could not save user: ${error.message}`);
  }
  res.redirect('/admin/departments?msg=' + encodeURIComponent(existing ? 'User updated successfully.' : 'User added successfully.'));
});

function workbookResponse(res, rows, filename) {
  const workbook = XLSX.utils.book_new();
  const sheet = XLSX.utils.json_to_sheet(rows);
  XLSX.utils.book_append_sheet(workbook, sheet, 'Department users');
  const buffer = XLSX.write(workbook, { type: 'buffer', bookType: 'xlsx' });
  res.type('application/vnd.openxmlformats-officedocument.spreadsheetml.sheet').attachment(filename).send(buffer);
}

app.get('/admin/users/template', requireLogin, (req, res) => {
  if (!isAdmin(req.session.user)) return res.status(403).send('Admin access required.');
  workbookResponse(res, [{ Email: 'hod.example@svit.ac.in', Name: 'Department Head', Department: 'Computer Engineering', Role: 'head', Password: 'temporary123' }], 'department-users-template.xlsx');
});

app.get('/admin/users/export', requireLogin, (req, res) => {
  if (!isAdmin(req.session.user)) return res.status(403).send('Admin access required.');
  workbookResponse(res, users.map((user) => ({ Email: user.id, Name: user.name, Department: user.department, Role: user.role, Password: '' })), 'department-users.xlsx');
});

app.post('/admin/users/import', requireLogin, upload.single('users_file'), async (req, res) => {
  if (!isAdmin(req.session.user)) return res.status(403).send('Admin access required.');
  if (!req.file) return res.status(400).send('Please upload an Excel file.');
  try {
    const workbook = XLSX.read(req.file.buffer, { type: 'buffer' });
    const rows = XLSX.utils.sheet_to_json(workbook.Sheets[workbook.SheetNames[0]], { defval: '' }).map((row) => Object.fromEntries(Object.entries(row).map(([key, value]) => [key.replace(/^\uFEFF/, '').trim().toLowerCase(), value])));
    if (!rows.length) return res.status(400).send('Excel file has no data rows. Required columns: Email, Name, Department, Role, Password.');
    const currentUsers = await getUsers();
    for (const [rowIndex, row] of rows.entries()) {
      if (!Object.values(row).some((value) => String(value ?? '').trim() !== '')) continue;
      const email = String(row.email || '').trim().toLowerCase();
      const password = String(row.password || '').trim();
      const normalizedRole = String(row.role || '').trim().toLowerCase().replace(/[\s-]+/g, '_');
      const roleLabels = { 'department_user': 'department_user', 'department_head': 'head', 'maintenance_officer': 'maintenance', 'admin_officer': 'admin_officer', 'purchase_officer': 'purchase_officer', 'purchase_clerk': 'purchase_clerk', 'chairman': 'chairman', 'principal': 'principal', 'electrician': 'electrician', 'head': 'head', 'maintenance': 'maintenance', 'work_inspector': 'work_done', 'work_done': 'work_done' };
      const role = roleLabels[normalizedRole] || normalizedRole;
      const existing = currentUsers.find((user) => user.id === email);
      const missing = ['email', 'name', 'department', 'role', 'password'].filter((field) => !String(row[field] || '').trim());
      const reason = missing.length && !(missing.length === 1 && missing[0] === 'password' && existing)
        ? `missing ${missing.map((field) => field[0].toUpperCase() + field.slice(1)).join(', ')}`
        : !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email) ? 'invalid Email'
          : !['department_user', 'head', 'maintenance', 'electrician', 'principal', 'admin_officer', 'purchase_officer', 'purchase_clerk', 'chairman', 'work_done'].includes(role) ? `invalid Role "${String(row.role).trim()}"`
            : (!existing && password.length < 6) || (existing && password && password.length < 6) ? 'Password must contain at least 6 characters' : '';
      if (reason) return res.status(400).send(`Invalid Excel row ${rowIndex + 2}: ${reason}. Required columns: Email, Name, Department, Role, Password.`);
      const values = { id: email, name: String(row.name).trim(), department: String(row.department).trim(), role };
      if (password) values.password = password;
      if (existing && (existing.role !== role || existing.department !== values.department)) {
        await saveRoleAssignment(email, values.name, values.department, role);
        continue;
      }
      if (existing) Object.assign(existing, values);
      else currentUsers.push(values);
      const localUser = users.find((user) => user.id === email);
      if (localUser) Object.assign(localUser, values);
      else users.push(values);
      await saveUser(existing ? { ...existing, ...values } : values, Boolean(password));
    }
  } catch (error) {
    return res.status(400).send(`Could not read Excel file: ${error.message}`);
  }
  res.redirect('/admin/departments');
});

app.post('/admin/users/:id/reset-password', requireLogin, async (req, res) => {
  if (!isAdmin(req.session.user)) return res.status(403).send('Admin access required.');
  const currentUsers = await getUsers();
  const user = currentUsers.find((candidate) => candidate.id === req.params.id);
  const password = String(req.body.password || '').trim();
  if (!user) return res.status(404).send('User not found.');
  if (password.length < 6) return res.status(400).send('Password must be at least 6 characters.');
  user.password = password;
  try {
    await saveUser({ ...user, password }, true);
  } catch (error) {
    return res.status(500).send(`Could not save password: ${error.message}`);
  }
  res.redirect('/admin/departments?msg=' + encodeURIComponent('Password reset successfully.'));
});

app.post('/admin/users/:id', requireLogin, async (req, res) => {
  if (!isAdmin(req.session.user)) return res.status(403).send('Admin access required.');
  const currentUsers = await getUsers();
  const user = currentUsers.find((candidate) => candidate.id === req.params.id) || users.find((candidate) => candidate.id === req.params.id);
  const email = String(req.body.id || '').trim().toLowerCase();
  if (!user) return res.status(404).send('User not found.');
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) return res.status(400).send('Please enter a valid email address.');
  if (!req.body.name || !req.body.department || !req.body.role) return res.status(400).send('Name, department, and role are required.');
  const changes = { ...user, id: email, name: String(req.body.name).trim(), department: String(req.body.department).trim(), role: req.body.role };
  if (req.body.password) {
    if (String(req.body.password).length < 6) return res.status(400).send('Password must be at least 6 characters.');
    changes.password = req.body.password;
  }
  const localUser = users.find((u) => u.id === req.params.id);
  if (localUser) {
    Object.assign(localUser, changes);
  }
  const targetLocalUser = users.find((u) => u.id === email);
  if (targetLocalUser && targetLocalUser !== localUser) {
    Object.assign(targetLocalUser, changes);
  }
  try {
    if (req.params.id !== email && supabase) {
      await supabase.from('user_accounts').delete().eq('id', req.params.id);
    }
    await saveUser(changes, Boolean(changes.password));
  } catch (error) {
    return res.status(500).send(`Could not save user: ${error.message}`);
  }
  res.redirect('/admin/departments?msg=' + encodeURIComponent('User saved successfully.'));
});

app.post('/admin/users/:id/delete', requireLogin, async (req, res) => {
  if (!isAdmin(req.session.user)) return res.status(403).send('Admin access required.');
  if (req.session.user.id === req.params.id) return res.status(400).send('You cannot delete the account currently in use.');
  const currentUsers = await getUsers();
  const existing = currentUsers.find((candidate) => candidate.id === req.params.id);
  if (!existing) return res.status(404).send('User not found.');
  const localIndex = users.findIndex((candidate) => candidate.id === req.params.id);
  if (localIndex >= 0) users.splice(localIndex, 1);
  localDisabledUsers.delete(req.params.id);
  if (supabase) {
    const { error } = await supabase.from('user_accounts').delete().eq('id', req.params.id);
    if (error) return res.status(500).send(`Could not delete user: ${error.message}`);
  }
  res.redirect('/admin/departments?msg=' + encodeURIComponent('User deleted successfully.'));
});

app.post('/admin/users/:id/toggle', requireLogin, async (req, res) => {
  if (!isAdmin(req.session.user)) return res.status(403).send('Admin access required.');
  if (req.session.user.id === req.params.id) return res.status(400).send('You cannot disable your own active account.');
  const currentUsers = await getUsers();
  const existing = currentUsers.find((candidate) => candidate.id === req.params.id);
  if (!existing) return res.status(404).send('User not found.');
  const willBeDisabled = !existing.is_disabled;
  if (willBeDisabled) {
    localDisabledUsers.add(req.params.id);
  } else {
    localDisabledUsers.delete(req.params.id);
  }
  if (supabase) {
    try {
      await supabase.from('user_accounts').update({ is_disabled: willBeDisabled }).eq('id', req.params.id);
    } catch (e) {
      // Column may not exist yet, in-memory localDisabledUsers preserves state
    }
  }
  res.redirect('/admin/departments?msg=' + encodeURIComponent(willBeDisabled ? `Account ${req.params.id} has been disabled.` : `Account ${req.params.id} has been enabled.`));
});

app.post('/admin/users/:id/assignment', requireLogin, async (req, res) => {
  if (!isAdmin(req.session.user)) return res.status(403).send('Admin access required.');
  const userId = req.params.id;
  const name = String(req.body.name || '').trim();
  const department = String(req.body.department || '').trim();
  const role = req.body.role;
  if (!name || !department || !role) return res.status(400).send('Name, department, and role are required.');
  try {
    await saveRoleAssignment(userId, name, department, role);
  } catch (error) {
    return res.status(500).send(`Could not save role assignment: ${error.message}`);
  }
  res.redirect('/admin/departments?msg=' + encodeURIComponent(`Role "${role}" updated for ${userId}.`));
});

app.post('/admin/users/:id/assignment/delete', requireLogin, async (req, res) => {
  if (!isAdmin(req.session.user)) return res.status(403).send('Admin access required.');
  const userId = req.params.id;
  const department = String(req.body.department || '').trim();
  const role = req.body.role;
  try {
    await deleteRoleAssignment(userId, department, role);
  } catch (error) {
    return res.status(500).send(`Could not remove role assignment: ${error.message}`);
  }
  res.redirect('/admin/departments?msg=' + encodeURIComponent(`Role "${role}" removed for ${userId}.`));
});

const roleGuideApprovalRoles = [
  ['none', '—'], ['head', 'Department Head'], ['electrician', 'Electrician'], ['principal', 'Principal'],
  ['maintenance', 'Maintenance Officer'], ['chairman', 'Chairman'], ['admin_officer', 'Admin Officer'],
  ['higher_authority', 'Higher Authority'], ['purchase_officer', 'Purchase Officer'], ['purchase_clerk', 'Purchase Clerk'],
  ['work_done', 'Work Inspector'], ['department_user', 'Department Staff'], ['sub_admin', 'Sub Admin'], ['admin', 'Admin']
];
const roleGuideStageOptions = (selectedValue) => roleGuideApprovalRoles.map(([key, label]) => `<option value="${key}"${key === selectedValue ? ' selected' : ''}>${escapeHtml(label)}</option>`).join('');
const roleGuideStageSelect = (fieldName, selectedValue) => `<select name="${fieldName}">${roleGuideStageOptions(String(selectedValue || ''))}</select>`;
const approvalStages = (giveLogin) => {
  const value = String(giveLogin || '');
  const parts = value.includes('|') ? value.split('|').map((s) => s.trim()) : value.split('+').map((s) => s.trim());
  return parts.map((part) => {
    const match = part.match(/\(([a-z_]+)\)\s*$/i);
    return match ? match[1] : part;
  });
};

const ordinal = (n) => (n === 1 ? '1st' : n === 2 ? '2nd' : n === 3 ? '3rd' : n + 'th');

app.get('/admin/role-guide', requireLogin, async (req, res) => {
  if (!isAdmin(req.session.user)) return res.status(403).send('Admin access required.');
  const rows = await getRoleGuide();
  const stagesList = rows.map((row) => approvalStages(row.give_login));
  const stageCount = Math.max(4, ...stagesList.map((s) => s.length));
  const stageCells = (index, stages) => Array.from({ length: stageCount }, (_, s) => `<td class="stage-cell">${roleGuideStageSelect('approval_' + (s + 1) + '_' + index, stages[s])}</td>`).join('');
  const stageHeaders = Array.from({ length: stageCount }, (_, s) => `<th class="stage-head"><span class="stage-label">${ordinal(s + 1)} Approval</span><button class="col-del" type="button" onclick="removeStageColumn(this)" title="Delete this column">×</button></th>`).join('');
  const rowForms = rows.map((row, index) => `<tr><td><input name="sort_order[]" type="number" min="0" step="1" value="${escapeHtml(row.sort_order ?? '')}"></td><td><input name="part[]" type="text" value="${escapeHtml(row.part || '')}" placeholder="e.g. Auditorium approval"></td>${stageCells(index, approvalStages(row.give_login))}<td><input name="what[]" type="text" value="${escapeHtml(row.what || '')}" placeholder="What they can do"></td><td class="actions-cell">${row.id ? `<input name="id[]" type="hidden" value="${escapeHtml(row.id)}"><button class="small-button" type="button" onclick="removeRow(this)">Delete</button>` : '<button class="small-button" type="button" onclick="removeRow(this)">Delete</button>'}</td></tr>`).join('');
  res.send(`<!doctype html><html lang="en"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"><title>Role guide | Admin</title><link rel="stylesheet" href="/styles.css"><style>.role-guide-settings .user-management{padding:0}.role-guide-settings table input[type="text"],.role-guide-settings table input[type="number"],.role-guide-settings table select{width:100%;box-sizing:border-box;padding:9px;border:1px solid var(--line);background:transparent;font:13px Arial,sans-serif}input[name="sort_order[]"]{max-width:72px}.role-guide-settings td{vertical-align:top}.stage-cell{min-width:120px}.stage-cell select{cursor:pointer}.stage-cell select:focus{border-color:var(--orange);outline:none}.stage-head{position:relative;padding-right:26px;min-width:120px}.stage-head .stage-label{display:inline-block;white-space:nowrap}.col-del{position:absolute;top:5px;right:5px;width:18px;height:18px;line-height:15px;border:1px solid var(--line);background:transparent;color:var(--orange);cursor:pointer;font:bold 12px Arial;border-radius:50%;padding:0}.col-del:hover{border-color:var(--orange);background:var(--orange);color:#fff}.actions-cell{white-space:nowrap}</style></head><body><main class="shell panel"><header class="masthead"><div><p class="kicker">${escapeHtml(req.session.user.role)}</p><h1>Role<br><em>guide</em></h1></div><form action="/logout" method="post"><button class="quiet" type="submit">Sign out</button></form></header><section class="panel-intro"><p class="eyebrow">Dynamic guide</p><h2>Who should get which login.</h2><p class="lede">Assign an approval role for each stage using the dropdowns. Add extra approval columns for longer routes with "Add approval column", remove one with its × button, and save all rows when done.</p></section><section class="user-management role-guide-settings"><div class="admin-tools"><a class="page-nav" href="/admin/pages">Back to admin pages</a><button class="small-button" form="role-guide-form" type="submit">Save all rows</button><button class="small-button" type="button" onclick="addStageColumn()">+ Add approval column</button><button class="small-button" type="button" onclick="addRow()">+ Add row</button></div><form id="role-guide-form" action="/admin/role-guide" method="post"><input name="stage_count" id="stage_count" type="hidden" value="${stageCount}"><div class="table-wrap"><table><thead><tr><th>#</th><th>Part</th>${stageHeaders}<th>What they can do</th><th></th></tr></thead><tbody>${rowForms || ('<tr><td colspan="' + (4 + stageCount) + '">No guide rows yet.</td></tr>')}</tbody></table></div></form></section></main><script>var currentStages=${stageCount};function ordinal(n){return n===1?'1st':n===2?'2nd':n===3?'3rd':n+'th';}function stageSelectHTML(name){const opts=[['none','—'],['head','Department Head'],['electrician','Electrician'],['principal','Principal'],['maintenance','Maintenance Officer'],['chairman','Chairman'],['admin_officer','Admin Officer'],['higher_authority','Higher Authority'],['purchase_officer','Purchase Officer'],['purchase_clerk','Purchase Clerk'],['work_done','Work Inspector'],['department_user','Department Staff'],['sub_admin','Sub Admin'],['admin','Admin']];return '<select name="'+name+'">'+opts.map(function(o){return '<option value="'+o[0]+'">'+o[1]+'</option>';}).join('')+'</select>';}function rowIndexOf(tr){return Array.prototype.indexOf.call(tr.parentElement.rows,tr);}function addStageColumn(){var tbody=document.querySelector('#role-guide-form tbody');var theadTr=document.querySelector('#role-guide-form thead tr');currentStages+=1;var th=document.createElement('th');th.className='stage-head';th.innerHTML='<span class="stage-label"></span> <button class="col-del" type="button" onclick="removeStageColumn(this)" title="Delete this column">×</button>';th.querySelector('.stage-label').textContent=ordinal(currentStages)+' Approval';theadTr.insertBefore(th,theadTr.cells[theadTr.cells.length-2]);var rows=Array.prototype.slice.call(tbody.rows);rows.forEach(function(tr){var td=document.createElement('td');td.className='stage-cell';td.innerHTML=stageSelectHTML('approval_'+currentStages+'_'+rowIndexOf(tr));tr.insertBefore(td,tr.cells[tr.cells.length-2]);});document.getElementById('stage_count').value=currentStages;}function removeStageColumn(btn){if(currentStages<=1){return;}var th=btn.closest('th');var theadTr=th.parentElement;var idx=Array.prototype.indexOf.call(theadTr.cells,th);theadTr.removeChild(th);var tbody=document.querySelector('#role-guide-form tbody');Array.prototype.slice.call(tbody.rows).forEach(function(tr){tr.removeChild(tr.cells[idx]);});currentStages-=1;reindexStages();document.getElementById('stage_count').value=currentStages;}function reindexStages(){var theadTr=document.querySelector('#role-guide-form thead tr');var stageThs=Array.prototype.slice.call(theadTr.querySelectorAll('th.stage-head'));currentStages=stageThs.length;var tbody=document.querySelector('#role-guide-form tbody');stageThs.forEach(function(th,ci){th.querySelector('.stage-label').textContent=ordinal(ci+1)+' Approval';Array.prototype.slice.call(tbody.rows).forEach(function(tr){var sel=tr.querySelectorAll('td.stage-cell select')[ci];if(sel)sel.name='approval_'+(ci+1)+'_'+rowIndexOf(tr);});});document.getElementById('stage_count').value=currentStages;}function addRow(){const tbody=document.querySelector('#role-guide-form tbody');const idx=tbody.querySelectorAll('tr').length;const tr=document.createElement('tr');var cells='<td><input name="sort_order[]" type="number" min="0" step="1"></td><td><input name="part[]" type="text" placeholder="e.g. Auditorium approval"></td>';for(var s=1;s<=currentStages;s++){cells+='<td class="stage-cell">'+stageSelectHTML('approval_'+s+'_idx')+'</td>';}cells+='<td><input name="what[]" type="text" placeholder="What they can do"></td><td class="actions-cell"><button class="small-button" type="button" onclick="removeRow(this)">Delete</button></td>';tr.innerHTML=cells;tr.innerHTML=tr.innerHTML.replace(/approval_\d+_idx/g,function(m){return 'approval_'+parseInt(m.match(/\d+/)[0],10)+'_'+idx;});tbody.appendChild(tr);}function removeRow(btn){const tr=btn.closest('tr');const hid=tr.querySelector('input[name="id[]"]');if(hid&&document.querySelectorAll('#role-guide-form tbody tr').length>1){if(confirm('Delete this saved row?')){const f=document.createElement('form');f.method='post';f.action='/admin/role-guide/'+hid.value+'/delete';document.body.appendChild(f);f.submit();}}else{tr.remove();}}</script></body></html>`);
});

app.post('/admin/role-guide', requireLogin, async (req, res) => {
  if (!isAdmin(req.session.user)) return res.status(403).send('Admin access required.');
  const ids = Array.isArray(req.body.id) ? req.body.id : [req.body.id];
  const orders = Array.isArray(req.body.sort_order) ? req.body.sort_order : [req.body.sort_order];
  const parts = Array.isArray(req.body.part) ? req.body.part : [req.body.part];
  const whats = Array.isArray(req.body.what) ? req.body.what : [req.body.what];
  const length = Math.max(ids.length, orders.length, parts.length, whats.length);
  const stageCount = Math.max(1, parseInt(req.body.stage_count, 10) || 4);
  const giveLoginForRow = (index) => {
    const stages = [];
    for (let stage = 1; stage <= stageCount; stage += 1) {
      const value = String(req.body['approval_' + stage + '_' + index] || '').trim();
      stages.push(value === 'none' ? '' : (roleNames[value] ? `${roleNames[value]} (${value})` : value));
    }
    while (stages.length && stages[stages.length - 1] === '') stages.pop();
    return stages.join(' | ');
  };
  if (supabase) {
    for (let index = 0; index < length; index += 1) {
      const part = String(parts[index] || '').trim();
      const giveLogin = giveLoginForRow(index);
      const what = String(whats[index] || '').trim();
      if (!part && !giveLogin && !what) continue;
      const payload = { part, give_login: giveLogin, what, sort_order: Number(orders[index]) || 0 };
      const rowId = Number(ids[index]);
      if (rowId > 0) await supabase.from('role_guide').update(payload).eq('id', rowId);
      else await supabase.from('role_guide').insert([payload]);
    }
  } else {
    localRoleGuide = Array.from({ length }, (_, index) => {
      const part = String(parts[index] || '').trim();
      const giveLogin = giveLoginForRow(index);
      const what = String(whats[index] || '').trim();
      if (!part && !giveLogin && !what) return null;
      return { id: Number(ids[index]) || 1000 + index, part, give_login: giveLogin, what, sort_order: Number(orders[index]) || 0 };
    }).filter(Boolean);
  }
  res.redirect('/admin/role-guide');
});

app.post('/admin/role-guide/:id/delete', requireLogin, async (req, res) => {
  if (!isAdmin(req.session.user)) return res.status(403).send('Admin access required.');
  if (supabase) await supabase.from('role_guide').delete().eq('id', req.params.id);
  else if (localRoleGuide) localRoleGuide = localRoleGuide.filter((row) => String(row.id) !== req.params.id);
  res.redirect('/admin/role-guide');
});

const workflowModuleOptions = (selected) => ['purchase', 'auditorium', 'maintenance', 'car', 'inventory'].map((m) => `<option value="${m}"${m === selected ? ' selected' : ''}>${m}</option>`).join('');
const workflowRoleOptions = (selected) => ['head', 'admin_officer', 'purchase_officer', 'purchase_clerk', 'principal', 'chairman', 'electrician', 'maintenance', 'higher_authority'].map((r) => `<option value="${r}"${r === selected ? ' selected' : ''}>${moduleRoleLabel(r)}</option>`).join('');
const bandAmountLabel = (band) => {
  const min = band.min_amount === null || band.min_amount === undefined ? null : Number(band.min_amount);
  const max = band.max_amount === null || band.max_amount === undefined ? null : Number(band.max_amount);
  if (min === null && max === null) return 'All amounts';
  if (min === null) return `Up to ₹${max}`;
  if (max === null) return `Above ₹${min}`;
  return `₹${min} – ₹${max}`;
};

app.get('/admin/workflows', requireLogin, async (req, res) => {
  if (!isAdmin(req.session.user)) return res.status(403).send('Admin access required.');
  const workflows = await getApprovalWorkflows();
  const bands = await getApprovalWorkflowBands();
  const steps = await getApprovalWorkflowSteps();
  const allUsers = await getUsers();

  const approverUserOptions = (step) => `<option value="">— No specific person (any ${escapeHtml(moduleRoleLabel(step.role_id))}) —</option>${allUsers.map((user) => `<option value="${escapeHtml(user.id)}"${user.id === step.approver_user_id ? ' selected' : ''}>${escapeHtml(user.name)} (${escapeHtml(user.id)})</option>`).join('')}`;

  const bandHtml = (band) => {
    const bandSteps = steps.filter((step) => step.band_id === band.id).sort((a, b) => a.step_no - b.step_no);
    const addStepForm = `<form class="wf-add-step" action="/admin/workflows/band/${band.id}/step" method="post"><div class="wf-inline"><select name="role_id" required>${workflowRoleOptions('')}</select><button class="small-button" type="submit">+ Step</button></div></form>`;
    const stepRows = bandSteps.map((step) => `<div class="wf-step"><span><b>${step.step_no}.</b> ${escapeHtml(moduleRoleLabel(step.role_id))}${step.approver_user_id ? ` <em class="wf-person">→ ${escapeHtml(step.approver_user_id)}</em>` : ''}</span><div class="wf-step-actions"><form class="wf-inline wf-assign" action="/admin/workflows/step/${step.id}/approver" method="post"><select name="approver_user_id" aria-label="Assign specific person (optional)">${approverUserOptions(step)}</select><button class="small-button" type="submit">Assign</button></form><form action="/admin/workflows/step/${step.id}/delete" method="post"><button class="small-button reject-button" type="submit">×</button></form></div></div>`).join('') || '<div class="wf-empty">No steps. Add a step below.</div>';
    return `<div class="wf-band"><div class="wf-band-head"><strong>${escapeHtml(band.label || bandAmountLabel(band))}</strong><span class="wf-band-range">${escapeHtml(bandAmountLabel(band))} · order ${escapeHtml(band.sort_order)}</span><form action="/admin/workflows/band/${band.id}/delete" method="post"><button class="small-button reject-button" type="submit">Delete band</button></form></div>${stepRows}${addStepForm}</div>`;
  };

  const workflowHtml = workflows.map((workflow) => {
    const workflowBands = bands.filter((band) => band.workflow_id === workflow.id).sort((a, b) => a.sort_order - b.sort_order);
    const bandForms = workflowBands.map(bandHtml).join('');
    const addBandForm = `<form class="wf-add-band" action="/admin/workflows/${workflow.id}/band" method="post"><strong>Add amount band</strong><div class="wf-inline"><input name="min_amount" type="number" step="0.01" placeholder="Min (blank = none)"><input name="max_amount" type="number" step="0.01" placeholder="Max (blank = none)"><input name="label" placeholder="Label (optional)"><input name="sort_order" type="number" placeholder="Order" value="${workflowBands.length + 1}"><button class="small-button" type="submit">+ Band</button></div></form>`;
    return `<section class="wf-workflow"><header class="wf-workflow-head"><div><h3>${escapeHtml(workflow.name)}</h3><p class="wf-meta">${escapeHtml(workflow.module)} / ${escapeHtml(workflow.request_type)} · <span class="status ${workflow.status === 'active' ? 'approved' : 'rejected'}">${escapeHtml(workflow.status)}</span></p></div><div class="wf-actions"><form action="/admin/workflows/${workflow.id}/toggle" method="post"><button class="small-button" type="submit">${workflow.status === 'active' ? 'Deactivate' : 'Activate'}</button></form><form action="/admin/workflows/${workflow.id}/delete" method="post"><button class="small-button reject-button" type="submit">Delete</button></form></div></header>${bandForms}${addBandForm}</section>`;
  }).join('') || '<p class="wf-empty">No workflows defined yet.</p>';

  const addWorkflowForm = `<form class="wf-add-workflow" action="/admin/workflows" method="post"><strong>Create workflow</strong><div class="wf-inline"><select name="module" required>${workflowModuleOptions('')}</select><input name="request_type" placeholder="request type (e.g. local)" required><input name="name" placeholder="Workflow name" required><button class="small-button" type="submit">+ Create</button></div></form>`;

  res.send(`<!doctype html><html lang="en"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"><title>Approval workflows | Admin</title><link rel="stylesheet" href="/styles.css"><style>
  .wf-workflow{border:1px solid var(--line);margin-bottom:28px;padding:22px;border-radius:8px}
  .wf-workflow-head{display:flex;justify-content:space-between;align-items:flex-start;gap:16px;border-bottom:1px solid var(--line);padding-bottom:14px;margin-bottom:16px}
  .wf-workflow-head h3{margin:0;font-size:22px;font-weight:500}
  .wf-meta{color:var(--muted);font-size:12px;margin:4px 0 0}
  .wf-actions{display:flex;gap:8px;align-items:center}.wf-actions form{margin:0}
  .wf-band{border:1px solid var(--line);border-radius:6px;padding:14px;margin-bottom:14px;background:rgba(0,0,0,0.02)}
  .wf-band-head{display:flex;justify-content:space-between;align-items:center;gap:12px;margin-bottom:10px}
  .wf-band-range{color:var(--muted);font-size:12px}
  .wf-step{display:flex;justify-content:space-between;align-items:center;gap:10px;padding:8px 12px;border:1px dashed var(--line);border-radius:4px;margin-bottom:6px}
  .wf-step-actions{display:flex;gap:8px;align-items:center}.wf-step-actions form{margin:0}
  .wf-assign select{padding:6px;border:1px solid var(--line);background:transparent;font:12px Arial;max-width:280px}
  .wf-assign .small-button{padding:6px 8px;font-size:10px}
  .wf-person{font-style:normal;font-size:11px;color:var(--orange);font-family:Arial,sans-serif}
  .wf-inline{display:flex;gap:8px;flex-wrap:wrap;align-items:center}
  .wf-inline input,.wf-inline select{padding:9px;border:1px solid var(--line);background:transparent;font:13px Arial}
  .wf-add-band,.wf-add-workflow{border:1px dashed var(--line);border-radius:6px;padding:14px;display:flex;flex-direction:column;gap:10px;margin-top:8px}
  .wf-add-band strong,.wf-add-workflow strong{font-size:13px}
  .wf-add-step{margin-top:8px}.wf-add-step form{margin:0}
  .wf-empty{color:var(--muted);font-size:13px}
  </style></head><body><main class="shell panel"><header class="masthead"><div><p class="kicker">${escapeHtml(req.session.user.role)}</p><h1>Workflow<br><em>builder</em></h1></div><a class="page-nav" href="/admin/pages">Back to admin pages</a></header><section class="panel-intro"><p class="eyebrow">Admin only</p><h2>Configuration of approval routes.</h2><p class="lede">Create workflows per module, split each into amount bands, and give every band an ordered list of approving roles. Use Assign to bind a step to one specific person — no other login can then act on that step. The engine routes each request automatically — no code changes needed.</p></section>${workflowHtml}${addWorkflowForm}</main></body></html>`);
});

app.post('/admin/workflows', requireLogin, async (req, res) => {
  if (!isAdmin(req.session.user)) return res.status(403).send('Admin access required.');
  const module = String(req.body.module || '').trim();
  const requestType = String(req.body.request_type || 'default').trim().toLowerCase() || 'default';
  const name = String(req.body.name || '').trim();
  if (!module || !name) return res.status(400).send('Module, request type and name are required.');
  if (supabase) {
    const { error } = await supabase.from('approval_workflows').insert({ module, request_type: requestType, name });
    if (error) return res.status(500).send(error.message);
  } else {
    localApprovalWorkflows.push({ id: Date.now() + localApprovalWorkflows.length, module, request_type: requestType, name, status: 'active' });
  }
  res.redirect('/admin/workflows');
});

app.post('/admin/workflows/:id/toggle', requireLogin, async (req, res) => {
  if (!isAdmin(req.session.user)) return res.status(403).send('Admin access required.');
  const workflow = (await getApprovalWorkflows()).find((w) => String(w.id) === req.params.id);
  if (!workflow) return res.status(404).send('Workflow not found.');
  const status = workflow.status === 'active' ? 'inactive' : 'active';
  if (supabase) await supabase.from('approval_workflows').update({ status }).eq('id', req.params.id);
  else workflow.status = status;
  res.redirect('/admin/workflows');
});

app.post('/admin/workflows/:id/delete', requireLogin, async (req, res) => {
  if (!isAdmin(req.session.user)) return res.status(403).send('Admin access required.');
  const workflow = (await getApprovalWorkflows()).find((w) => String(w.id) === req.params.id);
  if (!workflow) return res.status(404).send('Workflow not found.');
  if (supabase) await supabase.from('approval_workflows').delete().eq('id', req.params.id);
  else {
    const index = localApprovalWorkflows.findIndex((w) => String(w.id) === req.params.id);
    if (index >= 0) localApprovalWorkflows.splice(index, 1);
    const bandIds = localApprovalWorkflowBands.filter((b) => String(b.workflow_id) === req.params.id).map((b) => b.id);
    localApprovalWorkflowBands = localApprovalWorkflowBands.filter((b) => String(b.workflow_id) !== req.params.id);
    localApprovalWorkflowSteps = localApprovalWorkflowSteps.filter((s) => !bandIds.some((id) => String(s.band_id) === String(id)));
  }
  res.redirect('/admin/workflows');
});

app.post('/admin/workflows/:id/band', requireLogin, async (req, res) => {
  if (!isAdmin(req.session.user)) return res.status(403).send('Admin access required.');
  const workflow = (await getApprovalWorkflows()).find((w) => String(w.id) === req.params.id);
  if (!workflow) return res.status(404).send('Workflow not found.');
  const values = {
    workflow_id: workflow.id,
    min_amount: req.body.min_amount === '' || req.body.min_amount === undefined || req.body.min_amount === null ? null : Number(req.body.min_amount),
    max_amount: req.body.max_amount === '' || req.body.max_amount === undefined || req.body.max_amount === null ? null : Number(req.body.max_amount),
    label: String(req.body.label || '').trim(),
    sort_order: Number(req.body.sort_order) || 1
  };
  if (supabase) {
    const { error } = await supabase.from('approval_workflow_bands').insert(values);
    if (error) return res.status(500).send(error.message);
  } else {
    localApprovalWorkflowBands.push({ id: Date.now() + localApprovalWorkflowBands.length, ...values });
  }
  res.redirect('/admin/workflows');
});

app.post('/admin/workflows/band/:id/delete', requireLogin, async (req, res) => {
  if (!isAdmin(req.session.user)) return res.status(403).send('Admin access required.');
  if (supabase) await supabase.from('approval_workflow_bands').delete().eq('id', req.params.id);
  else {
    localApprovalWorkflowBands = localApprovalWorkflowBands.filter((b) => String(b.id) !== req.params.id);
    localApprovalWorkflowSteps = localApprovalWorkflowSteps.filter((s) => String(s.band_id) !== req.params.id);
  }
  res.redirect('/admin/workflows');
});

app.post('/admin/workflows/band/:id/step', requireLogin, async (req, res) => {
  if (!isAdmin(req.session.user)) return res.status(403).send('Admin access required.');
  const band = (await getApprovalWorkflowBands()).find((b) => String(b.id) === req.params.id);
  if (!band) return res.status(404).send('Band not found.');
  const roleId = String(req.body.role_id || '').trim();
  if (!roleId) return res.status(400).send('Role is required.');
  const existing = (await getApprovalWorkflowSteps()).filter((s) => String(s.band_id) === String(band.id));
  const nextNo = existing.length ? Math.max(...existing.map((s) => Number(s.step_no))) + 1 : 1;
  if (supabase) {
    const { error } = await supabase.from('approval_workflow_steps').insert({ band_id: band.id, step_no: nextNo, role_id: roleId });
    if (error) return res.status(500).send(error.message);
  } else {
    localApprovalWorkflowSteps.push({ id: Date.now() + localApprovalWorkflowSteps.length, band_id: band.id, step_no: nextNo, role_id: roleId, required: true });
  }
  res.redirect('/admin/workflows');
});

app.post('/admin/workflows/step/:id/delete', requireLogin, async (req, res) => {
  if (!isAdmin(req.session.user)) return res.status(403).send('Admin access required.');
  if (supabase) await supabase.from('approval_workflow_steps').delete().eq('id', req.params.id);
  else localApprovalWorkflowSteps = localApprovalWorkflowSteps.filter((s) => String(s.id) !== req.params.id);
  res.redirect('/admin/workflows');
});

app.post('/admin/workflows/step/:id/approver', requireLogin, async (req, res) => {
  if (!isAdmin(req.session.user)) return res.status(403).send('Admin access required.');
  const approverUserId = String(req.body.approver_user_id || '').trim() || null;
  if (approverUserId && !(await getUsers()).some((user) => user.id === approverUserId)) {
    return res.status(400).send('Assigned person must be an existing user.');
  }
  if (supabase) {
    const { error } = await supabase.from('approval_workflow_steps').update({ approver_user_id: approverUserId }).eq('id', req.params.id);
    if (error) {
      if (error.code === 'PGRST204') return res.status(503).send('The approval_workflow_steps table is missing the approver_user_id column. Run the updated supabase/migrate-workflows.sql in the Supabase SQL Editor, then try again.');
      return res.status(500).send(error.message);
    }
  } else {
    const step = localApprovalWorkflowSteps.find((s) => String(s.id) === req.params.id);
    if (!step) return res.status(404).send('Step not found.');
    step.approver_user_id = approverUserId;
  }
  res.redirect('/admin/workflows');
});

app.get('/admin/approvals-log', requireLogin, async (req, res) => {
  if (!isAdmin(req.session.user)) return res.status(403).send('Admin access required.');
  const records = await getApprovalRecords();
  const rows = records.length ? records.map((r) => `<tr><td>${escapeHtml(r.action)}</td><td>${escapeHtml(r.module)} / ${escapeHtml(r.request_type)}</td><td>${escapeHtml(r.request_id)}</td><td>${escapeHtml(r.step_no || '')}</td><td>${escapeHtml(moduleRoleLabel(r.approver_role_id))}</td><td>${escapeHtml(r.approver_user_id || '')}</td><td>${escapeHtml(r.comments || '')}</td><td>${escapeHtml(r.created_at ? new Date(r.created_at).toLocaleString() : '')}</td></tr>`).join('') : '<tr><td colspan="8">No approval actions recorded yet.</td></tr>';
  res.send(`<!doctype html><html lang="en"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"><title>Approval log | Admin</title><link rel="stylesheet" href="/styles.css"><style>.table-wrap{overflow-x:auto}table{width:100%;border-collapse:collapse;font:14px Arial,sans-serif}th{text-align:left;font-size:10px;text-transform:uppercase;letter-spacing:.1em;color:var(--muted);padding:13px 10px;border-bottom:1px solid var(--ink)}td{padding:13px 10px;border-bottom:1px solid var(--line)}</style></head><body><main class="shell panel"><header class="masthead"><div><p class="kicker">${escapeHtml(req.session.user.role)}</p><h1>Approval<br><em>log</em></h1></div><a class="page-nav" href="/admin/pages">Back to admin pages</a></header><section class="panel-intro"><p class="eyebrow">Audit trail</p><h2>Every approval action.</h2><p class="lede">Who approved, rejected, or acted on each step, and when.</p></section><section class="table-wrap"><table><thead><tr><th>Action</th><th>Module</th><th>Request ID</th><th>Step</th><th>Role</th><th>User</th><th>Comments</th><th>When</th></tr></thead><tbody>${rows}</tbody></table></section></main></body></html>`);
});

// --- General audit log (blueprint section 27) ---
app.get('/admin/audit-logs', requireLogin, async (req, res) => {
  if (!isAdmin(req.session.user)) return res.status(403).send('Admin access required.');
  const logs = await getAuditLogs();
  const rows = logs.length ? logs.map((l) => {
    const oldData = l.old_data ? `<br><code>${escapeHtml(JSON.stringify(l.old_data))}</code>` : '';
    const newData = l.new_data ? `<br><code>${escapeHtml(JSON.stringify(l.new_data))}</code>` : '';
    return `<tr><td>${escapeHtml(l.module || '')}</td><td>${escapeHtml(l.action || '')}</td><td>${escapeHtml(l.reference_id || '')}</td><td>${escapeHtml(l.user_id || '')}</td>${oldData || newData ? `<td>${oldData}${newData}</td>` : '<td>—</td>'}<td>${escapeHtml(l.ip_address || '')}</td><td>${escapeHtml(l.created_at ? new Date(l.created_at).toLocaleString() : '')}</td></tr>`;
  }).join('') : '<tr><td colspan="7">No logged actions yet.</td></tr>';
  res.send(`<!doctype html><html lang="en"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"><title>Audit log | Admin</title><link rel="stylesheet" href="/styles.css"><style>.table-wrap{overflow-x:auto}table{width:100%;border-collapse:collapse;font:14px Arial,sans-serif}th{text-align:left;font-size:10px;text-transform:uppercase;letter-spacing:.1em;color:var(--muted);padding:13px 10px;border-bottom:1px solid var(--ink)}td{padding:13px 10px;border-bottom:1px solid var(--line);vertical-align:top}td code{font-size:11px;color:var(--muted)}</style></head><body><main class="shell panel"><header class="masthead"><div><p class="kicker">${escapeHtml(req.session.user.role)}</p><h1>Audit<br><em>log</em></h1></div><a class="page-nav" href="/admin/pages">Back to admin pages</a></header><section class="panel-intro"><p class="eyebrow">Activity trail</p><h2>Who changed what, and when.</h2><p class="lede">Every administrative action across modules, logged for accountability.</p></section><section class="table-wrap"><table><thead><tr><th>Module</th><th>Action</th><th>Reference</th><th>User</th><th>Change</th><th>IP</th><th>When</th></tr></thead><tbody>${rows}</tbody></table></section></main></body></html>`);
});

// --- In-app notification feed (blueprint section 26) ---
app.get('/notifications', requireLogin, async (req, res) => {
  const notifications = await getNotifications(req.session.user.id);
  const unread = notifications.filter((n) => !n.is_read).length;
  const rows = notifications.length ? notifications.map((n) => `<div class="notif-item ${n.is_read ? 'read' : 'unread'}"><div class="notif-body"><strong>${escapeHtml(n.title)}</strong>${n.message ? `<p>${escapeHtml(n.message)}</p>` : ''}<span class="notif-meta">${escapeHtml(n.module || 'general')} · ${escapeHtml(n.created_at ? new Date(n.created_at).toLocaleString() : '')}</span></div><div class="notif-action">${n.link ? `<a class="page-nav" href="${escapeHtml(n.link)}">Open ↗</a>` : ''}${n.is_read ? '' : `<form action="/notifications/${escapeHtml(n.id)}/read" method="post"><button class="small-button" type="submit">Mark read</button></form>`}</div></div>`).join('') : '<p class="wf-empty">No notifications.</p>';
  res.send(`<!doctype html><html lang="en"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"><title>Notifications</title><link rel="stylesheet" href="/styles.css"><style>.notif-item{display:flex;justify-content:space-between;gap:16px;border:1px solid var(--line);border-radius:8px;padding:16px 18px;margin-bottom:12px}.notif-item.unread{background:rgba(233,119,66,0.06);border-color:var(--orange)}.notif-item p{margin:4px 0;color:var(--muted);font-size:13px}.notif-meta{color:var(--muted);font-size:11px;text-transform:uppercase;letter-spacing:.04em}.notif-action{display:flex;flex-direction:column;gap:8px;align-items:flex-end;flex-shrink:0}.notif-action form{margin:0}.notif-head{display:flex;justify-content:space-between;align-items:center;gap:12px}</style></head><body><main class="shell panel"><header class="masthead"><div><p class="kicker">${escapeHtml(req.session.user.role)}</p><h1>Notifi<br><em>cations</em></h1></div><a class="page-nav" href="/dashboard">Back to dashboard</a></header><section class="panel-intro"><p class="eyebrow">Signed in as ${escapeHtml(req.session.user.name)}</p><h2>Your alerts.</h2><p class="lede">${unread ? `${unread} unread` : 'You are all caught up.'}</p><div class="notif-head admin-tools"><a class="page-nav" href="/dashboard">Dashboard</a>${unread ? `<form action="/notifications/read-all" method="post"><button class="small-button" type="submit">Mark all as read</button></form>` : ''}</div></section>${rows}</main></body></html>`);
});
app.post('/notifications/read-all', requireLogin, async (req, res) => { await markNotificationsRead(req.session.user.id); res.redirect('/notifications'); });
app.post('/notifications/:id/read', requireLogin, async (req, res) => { await markNotificationsRead(req.session.user.id, req.params.id); res.redirect('/notifications'); });

// --- Role-module permission matrix admin (blueprint section 12) ---
const permissionModules = ['auditorium', 'maintenance', 'purchase', 'car', 'inventory'];
const permissionRoles = ['head', 'department_user', 'purchase_officer', 'purchase_clerk', 'admin_officer', 'principal', 'chairman', 'maintenance', 'electrician', 'higher_authority'];
const permissionActions = ['none', 'request', 'view', 'entry', 'approve', 'stock', 'manage'];
app.get('/admin/permissions', requireLogin, async (req, res) => {
  if (!isAdmin(req.session.user)) return res.status(403).send('Admin access required.');
  const perms = await getModulePermissions();
  const cell = (module, role) => {
    const p = perms.find((perm) => perm.module === module && perm.role === role);
    const current = p ? p.action : 'none';
    return `<select name="perm[${module}][${role}]">${permissionActions.map((a) => `<option value="${a}"${a === current ? ' selected' : ''}>${a}</option>`).join('')}</select>`;
  };
  const header = `<tr><th>Module</th>${permissionRoles.map((r) => `<th>${escapeHtml(moduleRoleLabel(r))}</th>`).join('')}</tr>`;
  const body = permissionModules.map((module) => `<tr><td><strong>${escapeHtml(module)}</strong></td>${permissionRoles.map((r) => `<td>${cell(module, r)}</td>`).join('')}</tr>`).join('');
  res.send(`<!doctype html><html lang="en"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"><title>Permissions | Admin</title><link rel="stylesheet" href="/styles.css"><style>.table-wrap{overflow-x:auto}table{width:100%;border-collapse:collapse;font:13px Arial}th{text-align:left;font-size:10px;text-transform:uppercase;letter-spacing:.05em;color:var(--muted);padding:12px 8px;border-bottom:1px solid var(--ink);white-space:nowrap}td{padding:9px 8px;border-bottom:1px solid var(--line)}td select{padding:6px 4px;border:1px solid var(--line);background:transparent;font-size:12px;min-width:74px}</style></head><body><main class="shell panel"><header class="masthead"><div><p class="kicker">${escapeHtml(req.session.user.role)}</p><h1>Permissions<br><em>matrix</em></h1></div><a class="page-nav" href="/admin/pages">Back to admin pages</a></header><section class="panel-intro"><p class="eyebrow">Admin only</p><h2>Who can do what.</h2><p class="lede">Set each role's action per module. The dashboard and menu show only modules each user may access. Admin always has full control.</p></section><form action="/admin/permissions" method="post"><section class="table-wrap"><table><thead>${header}</thead><tbody>${body}</tbody></table></section><div class="admin-tools"><button class="small-button" type="submit">Save permission matrix</button></div></form></main></body></html>`);
});
app.post('/admin/permissions', requireLogin, async (req, res) => {
  if (!isAdmin(req.session.user)) return res.status(403).send('Admin access required.');
  const matrix = req.body.perm || {};
  for (const module of Object.keys(matrix)) {
    for (const role of Object.keys(matrix[module])) {
      const action = String(matrix[module][role] || 'none').trim();
      if (!permissionActions.includes(action)) continue;
      await setModulePermission(module, role, action === 'none' ? 'none' : action);
    }
  }
  await recordAudit({ userId: req.session.user.id, module: 'permissions', action: 'UPDATE_MATRIX', newData: matrix, ipAddress: req.ip });
  res.redirect('/admin/permissions');
});

// --- Stock transaction ledger page (blueprint section 20) ---
app.get('/admin/purchase/stock/transactions', requireLogin, async (req, res) => {
  if (!canManagePurchases(req.session.user)) return res.status(403).send('Purchase Officer or Clerk access required.');
  const transactions = await getStockTransactions();
  const rows = transactions.length ? transactions.map((t) => `<tr><td>${escapeHtml(t.transaction_type)}</td><td>${escapeHtml(t.item_name)}</td><td>${escapeHtml(t.department)}</td><td>${escapeHtml(t.category || '')}</td><td>${escapeHtml(t.quantity)}</td><td>${escapeHtml(t.previous_stock)} → ${escapeHtml(t.new_stock)}</td><td>${escapeHtml(t.reference_type || '')}${t.reference_id ? ` #${escapeHtml(t.reference_id)}` : ''}</td><td>${escapeHtml(t.issued_by || '')}</td><td>${escapeHtml(t.created_at ? new Date(t.created_at).toLocaleString() : '')}</td></tr>`).join('') : '<tr><td colspan="9">No stock movements recorded yet.</td></tr>';
  res.send(`<!doctype html><html lang="en"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"><title>Stock transactions | Purchase</title><link rel="stylesheet" href="/styles.css"><style>.table-wrap{overflow-x:auto}table{width:100%;border-collapse:collapse;font:13px Arial}th{text-align:left;font-size:10px;text-transform:uppercase;letter-spacing:.05em;color:var(--muted);padding:12px 8px;border-bottom:1px solid var(--ink)}td{padding:12px 8px;border-bottom:1px solid var(--line)}</style></head><body><main class="shell panel"><header class="masthead"><div><p class="kicker">${escapeHtml(req.session.user.role)}</p><h1>Stock<br><em>ledger</em></h1></div><a class="page-nav" href="/admin/purchase/stock">Back to stock register</a></header><section class="panel-intro"><p class="eyebrow">Inventory control</p><h2>Every stock movement.</h2><p class="lede">Purchases, issues, returns and adjustments, with previous and new balances, so stock can always be traced.</p></section><section class="table-wrap"><table><thead><tr><th>Type</th><th>Item</th><th>Department</th><th>Category</th><th>Qty</th><th>Balance</th><th>Reference</th><th>By</th><th>When</th></tr></thead><tbody>${rows}</tbody></table></section></main></body></html>`);
});

app.post('/admin/requests/:id/approve', requireLogin, async (req, res) => {
  let request = requests.find((candidate) => String(candidate.id) === req.params.id);
  if (supabase) {
    const { data, error } = await supabase.from('requests').select('*').eq('id', req.params.id).maybeSingle();
    if (error) return res.status(500).send(error.message);
    request = data;
  }
  if (!request) return res.status(404).send('Request not found.');
  const auditorium = (await getAuditoriumConfigs()).find((candidate) => candidate.name === request.auditorium) || {};
  const transition = approvalTransition(request, auditorium);
  const user = req.session.user;
  if (!transition) return res.status(409).send('This request has no remaining approval stage.');
  if (user.role !== 'admin' && user.role !== transition.role && !(user.role === 'head' && transition.role === 'head' && (user.departments || [user.department]).includes(request.department))) return res.status(403).send('This request is waiting for another approver.');
  if (user.role === 'principal' && auditorium.principal_user_id && user.id !== auditorium.principal_user_id) return res.status(403).send('This request is assigned to another principal.');
  if (user.role === 'maintenance' && auditorium.maintenance_user_id && user.id !== auditorium.maintenance_user_id) return res.status(403).send('This request is assigned to another maintenance officer.');
  if (supabase) {
    const { error } = await supabase.from('requests').update({ status: transition.status }).eq('id', req.params.id);
    if (error) return res.status(500).send(error.message);
  } else {
    request.status = transition.status;
  }
  await notifyPendingApprover({ ...request, status: transition.status }, await getAuditoriumConfigs());
  await notifyRequester({ ...request, status: transition.status }, transition.status);
  res.redirect('/admin');
});

app.post('/admin/requests/:id/reject', requireLogin, async (req, res) => {
  let request = requests.find((candidate) => String(candidate.id) === req.params.id);
  if (supabase) {
    const { data, error } = await supabase.from('requests').select('*').eq('id', req.params.id).maybeSingle();
    if (error) return res.status(500).send(error.message);
    request = data;
  }
  if (!request) return res.status(404).send('Request not found.');
  const auditorium = (await getAuditoriumConfigs()).find((candidate) => candidate.name === request.auditorium) || {};
  const transition = approvalTransition(request, auditorium);
  const user = req.session.user;
  const remarks = String(req.body.remarks || '').trim();
  if (!remarks) return res.status(400).send('Rejection remarks are required.');
  const canReject = user.role === 'admin' || (transition && user.role === transition.role && (user.role !== 'head' || (user.departments || [user.department]).includes(request.department)));
  if (!canReject) return res.status(403).send('This request is waiting for another approver.');
  if (user.role === 'principal' && auditorium.principal_user_id && user.id !== auditorium.principal_user_id) return res.status(403).send('This request is assigned to another principal.');
  if (user.role === 'maintenance' && auditorium.maintenance_user_id && user.id !== auditorium.maintenance_user_id) return res.status(403).send('This request is assigned to another maintenance officer.');
  if (supabase) {
    const { error } = await supabase.from('requests').update({ status: 'rejected', rejection_remarks: remarks }).eq('id', req.params.id);
    if (error) return res.status(500).send(error.message);
  } else {
    request.status = 'rejected';
    request.rejection_remarks = remarks;
  }
  await notifyRequester({ ...request, status: 'rejected' }, 'rejected', remarks);
  res.redirect('/admin?rejected=1');
});

app.get('/api/requests', async (req, res) => {
  if (!supabase) return res.json(requests);

  const { data, error } = await supabase
    .from('requests')
    .select('*')
    .order('created_at', { ascending: false });

  if (error) return res.status(500).json({ error: error.message });
  res.json(data);
});

app.post('/requests', async (req, res) => {
  if ((await getSystemSetting('REQUEST_PAGE_ENABLED')) === 'false') {
    return res.status(403).send('The auditorium request page is currently disabled by an administrator. Please try again later.');
  }
  const slotDatesValue = req.body.slot_date ?? req.body['slot_date[]'] ?? req.body.date;
  const slotStartTimesValue = req.body.slot_start_time ?? req.body['slot_start_time[]'] ?? req.body.start_time ?? '';
  const slotEndTimesValue = req.body.slot_end_time ?? req.body['slot_end_time[]'] ?? req.body.end_time ?? '';
  const slotDates = Array.isArray(slotDatesValue) ? slotDatesValue : [slotDatesValue];
  const slotStartTimes = Array.isArray(slotStartTimesValue) ? slotStartTimesValue : [slotStartTimesValue];
  const slotEndTimes = Array.isArray(slotEndTimesValue) ? slotEndTimesValue : [slotEndTimesValue];
  const timeSlots = slotDates.filter(Boolean).map((date, index) => ({ date, start_time: slotStartTimes[index] || '', end_time: slotEndTimes[index] || '' }));
  const firstSlot = timeSlots[0] || {};
  const slotDatesUnique = [...new Set(timeSlots.map((slot) => slot.date))].sort();
  const derivedDuration = slotDatesUnique.length === 1 ? '1 day' : slotDatesUnique.length === 2 ? '2 days' : 'multiple days';
  const request = {
    department: req.body.department,
    program: req.body.program,
    student_count: Number(req.body.student_count),
    date: firstSlot.date,
    start_time: firstSlot.start_time,
    end_time: firstSlot.end_time,
    time_slots: timeSlots,
    duration: slotDatesUnique.length > 1 ? derivedDuration : (req.body.duration || '1 day'),
    end_date: slotDatesUnique.at(-1) || req.body.end_date || firstSlot.date,
    auditorium: req.body.auditorium,
    requester_type: req.body.requester_type || 'student',
    requester_enrollment_no: String(req.body.requester_enrollment_no || '').trim(),
    requester_name: String(req.body.requester_name || '').trim(),
    requester_branch: String(req.body.requester_branch || '').trim(),
    requester_mobile: String(req.body.requester_mobile || '').trim(),
    requester_email: String(req.body.requester_email || '').trim().toLowerCase(),
    faculty_name: req.body.requester_name || '',
    requester_id: req.session.user?.id || String(req.body.requester_email || '').trim().toLowerCase() || 'public',
    status: 'pending'
  };

  if (!request.department || !request.program || !request.date || !request.auditorium || !Number.isInteger(request.student_count) || request.student_count < 1) {
    return res.status(400).send('Department, program, date, and auditorium are required.');
  }

  if (!['1 day', '2 days', 'multiple days'].includes(request.duration)) return res.status(400).send('Please choose a valid duration.');
  if (request.duration === '1 day') request.end_date = request.date;
  if (request.duration !== '1 day' && (!request.end_date || request.end_date < request.date)) return res.status(400).send('Please choose a valid end date.');

  if (!(await getAuditoriums()).includes(request.auditorium)) return res.status(400).send('Please choose an available auditorium.');

  // Validate minimum students requirement
  const selectedAuditorium = (await getAuditoriumConfigs()).find((a) => a.name === request.auditorium);
  if (selectedAuditorium && selectedAuditorium.min_students && request.student_count < selectedAuditorium.min_students) {
    return res.status(400).send(`${selectedAuditorium.name} requires a minimum of ${selectedAuditorium.min_students} students. You entered ${request.student_count}.`);
  }

  let existingRequests = requests;
  if (supabase) {
    const { data, error } = await supabase.from('requests').select('*');
    if (error) return res.status(500).send(error.message);
    existingRequests = data;
  }
  const bookingConflict = auditoriumIsBooked(existingRequests, request.auditorium, timeSlots);
  if (bookingConflict) {
    const details = new URLSearchParams({
      conflict: '1',
      department: bookingConflict.request.department || 'Unknown department',
      date: bookingConflict.slot.date || '',
      start_time: bookingConflict.slot.start_time || '',
      end_time: bookingConflict.slot.end_time || ''
    });
    return res.redirect(`/?${details}`);
  }

  if (supabase) {
    const { error } = await supabase.from('requests').insert(request);
    if (error) {
      if (error.code === 'PGRST205') {
        return res.status(503).send('Database setup required. Run supabase/schema.sql in the Supabase SQL Editor, then try again.');
      }
      return res.status(500).send(error.message);
    }
  } else {
    requests.unshift({ id: Date.now(), created_at: new Date().toISOString(), ...request });
  }

  await notifyPendingApprover(request, await getAuditoriumConfigs());

  if (mailer && request.requester_email) {
    try {
      await mailer.sendMail({
        from: senderEmail,
        to: request.requester_email,
        subject: `Auditorium request received: ${request.program}`,
        text: `Your auditorium permission request has been submitted successfully.\n\nDepartment: ${request.department}\nProgramme: ${request.program}\nAuditorium: ${request.auditorium}\nDate: ${request.date}\nTime: ${request.start_time || 'Not specified'} - ${request.end_time || 'Not specified'}\nStatus: Pending review\n\nYour request will go through the following approval chain:\nDepartment Head → Electrician → Principal → Maintenance\n\nYou will receive an email when your request is approved or rejected.`
      });
    } catch (error) {
      console.error(`Confirmation email could not be sent to ${request.requester_email}: ${error.message}`);
    }
  }

  res.redirect('/?submitted=1');
});

app.get('/admin/email-settings', requireLogin, async (req, res) => {
  if (!isAdmin(req.session.user)) return res.status(403).send('Admin access required.');
  const emailSettings = senderEmail;
  res.send('<!doctype html><html lang="en"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"><title>Email settings | SVIT Vasad</title><link rel="stylesheet" href="/styles.css"></head><body><main class="shell panel"><header class="masthead"><h1>Email <em>settings</em></h1><a class="page-nav" href="/dashboard">Back to main page</a><form action="/logout" method="post"><button class="quiet" type="submit">Sign out</button></form></header><section class="panel-intro"><p class="eyebrow">Admin only</p><h2>Notification sender address.</h2><p class="lede">This email address is used as the sender for all approval notifications across every module.</p></section><section class="user-management"><div class="section-heading"><span>04</span><h3>Email settings</h3></div><p class="small-copy">Sender email address for all notifications.</p><form class="create-user" action="/admin/sender-email" method="post"><input name="sender_email" type="email" value="' + escapeHtml(emailSettings) + '" placeholder="sender@example.com" required><button type="submit">Update sender email</button></form></section></main></body></html>');
});

app.post('/admin/sender-email', requireLogin, (req, res) => {
  if (!isAdmin(req.session.user)) return res.status(403).send('Admin access required.');
  const email = String(req.body.sender_email || '').trim().toLowerCase();
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) return res.status(400).send('Please enter a valid email address.');
  senderEmail = email;
  res.redirect('/admin/email-settings');
});

const localMaintenanceRequests = [];

async function getMaintenanceRequests() {
  if (!supabase) return localMaintenanceRequests;
  const { data, error } = await supabase.from('maintenance_requests').select('*').order('created_at', { ascending: false });
  if (error) {
    if (error.code === 'PGRST205') return localMaintenanceRequests;
    throw error;
  }
  return data;
}

async function getAuditoriumBookings() {
  if (!supabase) return requests;
  const { data, error } = await supabase.from('requests').select('*').order('created_at', { ascending: false });
  if (error) {
    if (error.code === 'PGRST205') return requests;
    throw error;
  }
  return data;
}

app.get('/maintenance', async (req, res) => {
  if (!(await isRequestPageEnabled('maintenance'))) return renderClosedRequestPage(req, res, 'maintenance');
  const page = require('node:fs').readFileSync(path.join(__dirname, 'public', 'maintenance.html'), 'utf8');
  const departments = await getDepartments();
  const departmentOptions = departments.map((department) => `<option value="${escapeHtml(department.name)}">${escapeHtml(department.name)}</option>`).join('');
  res.send(page.replace('<input name="department" placeholder="e.g. Computer Engineering" required>', `<select name="department" required><option value="">Select department</option>${departmentOptions}</select>`));
});

app.post('/maintenance', async (req, res) => {
  if (!(await isRequestPageEnabled('maintenance'))) return res.status(403).send('This request page is currently disabled by an administrator. Please try again later.');
  const request = {
    location: String(req.body.location || '').trim(),
    category: req.body.category,
    description: String(req.body.description || '').trim(),
    priority: req.body.priority || 'medium',
    reporter_name: String(req.body.reporter_name || '').trim(),
    department: String(req.body.department || '').trim(),
    reporter_mobile: String(req.body.reporter_mobile || '').trim(),
    reporter_email: String(req.body.reporter_email || '').trim().toLowerCase(),
    status: 'pending'
  };

  if (!request.location || !request.category || !request.description || !request.reporter_name || !request.department || !request.reporter_mobile || !request.reporter_email) {
    return res.status(400).send('All fields are required.');
  }

  if (!['low', 'medium', 'high', 'urgent'].includes(request.priority)) {
    return res.status(400).send('Invalid priority level.');
  }

  if (supabase) {
    const { error } = await supabase.from('maintenance_requests').insert(request);
    if (error) {
      if (error.code === 'PGRST205') {
        return res.status(503).send('Database setup required. Run supabase/schema.sql in the Supabase SQL Editor, then try again.');
      }
      return res.status(500).send(error.message);
    }
  } else {
    localMaintenanceRequests.unshift({ id: Date.now(), created_at: new Date().toISOString(), updated_at: new Date().toISOString(), ...request });
  }

  if (mailer) {
    try {
      await mailer.sendMail({
        from: senderEmail,
        to: request.reporter_email,
        subject: `Maintenance request received: ${request.category} - ${request.location}`,
        text: `Your maintenance request has been submitted successfully.\n\nLocation: ${request.location}\nCategory: ${request.category}\nPriority: ${request.priority}\nDescription: ${request.description}\nStatus: Pending\n\nOur maintenance team will review your request and get back to you within working hours.`
      });
    } catch (error) {
      console.error(`Maintenance confirmation email could not be sent to ${request.reporter_email}: ${error.message}`);
    }
  }
  if (request.reporter_email) {
    await createNotification({
      userId: request.reporter_email,
      title: `Maintenance request received`,
      message: `Your ${request.category} request at ${request.location} was submitted and is pending review.`,
      module: 'maintenance',
      referenceId: '',
      link: '/maintenance'
    });
    const firstApprover = (await getUsers()).find((u) => u.role === 'head');
    if (firstApprover) {
      await createNotification({
        userId: firstApprover.id,
        title: `New maintenance request awaits approval`,
        message: `${request.reporter_name || request.reporter_email} reported: ${request.category} at ${request.location}.`,
        module: 'maintenance',
        referenceId: '',
        link: '/admin/maintenance'
      });
    }
  }

  res.redirect('/maintenance?submitted=1');
});

const localCarRequests = [];
const localCarFleet = [
  { id: 1, car_name: 'Swift Dzire', car_number: 'GJ-24-AB-1234' },
  { id: 2, car_name: 'Innova Crysta', car_number: 'GJ-24-AB-5678' }
];
const localCarDrivers = [
  { id: 1, driver_name: 'Ramesh Patel', phone_number: '' },
  { id: 2, driver_name: 'Suresh Singh', phone_number: '' }
];

async function getCarRequests() {
  if (!supabase) return localCarRequests;
  const { data, error } = await supabase.from('car_requests').select('*').order('created_at', { ascending: false });
  if (error) {
    if (error.code === 'PGRST205') return localCarRequests;
    throw error;
  }
  return data;
}

async function getCarFleet() {
  if (!supabase) return localCarFleet;
  const { data, error } = await supabase.from('car_fleet').select('*').order('car_name');
  if (error) {
    if (error.code === 'PGRST205') return localCarFleet;
    throw error;
  }
  return data || [];
}

async function getCarDrivers() {
  if (!supabase) return localCarDrivers;
  const { data, error } = await supabase.from('car_drivers').select('*').order('driver_name');
  if (error) {
    if (error.code === 'PGRST205') return localCarDrivers;
    throw error;
  }
  return data || [];
}

const canManageCars = (user) => isAdmin(user) || user?.role === 'admin_officer';

app.use('/car-requests', (req, res, next) => {
  if (req.method === 'POST') {
    req.body.requester_name = String(req.body.faculty_name || req.body.requester_name || '').trim();
    const passengerDetails = Array.isArray(req.body.passenger_emp_code)
      ? req.body.passenger_emp_code.map((empCode, index) => ({
        sr_no: index + 1,
        emp_code: String(empCode || '').trim(),
        emp_name: String((req.body.passenger_emp_name || [])[index] || '').trim(),
        designation: String((req.body.passenger_designation || [])[index] || '').trim(),
        department: String((req.body.passenger_department || [])[index] || '').trim()
      }))
      : [];
    req.body.remarks = `${String(req.body.remarks || '').trim()}${passengerDetails.length ? `\nPassenger details: ${JSON.stringify(passengerDetails)}` : ''}`.trim();
  }
  if (req.method === 'GET') {
    const send = res.send.bind(res);
    res.send = (body) => send(typeof body === 'string' ? body.replace('<label>Passenger count<input name="passenger_count" type="number" min="1" required></label>', '<label>Passenger count<input name="passenger_count" id="passenger-count" type="number" min="1" required></label><div id="passenger-details" class="passenger-details"></div>').replace('<label>Name<input name="requester_name" placeholder="Full name" required></label>', '<label>Faculty name<input name="faculty_name" placeholder="Full faculty name" required></label>').replace('Send car request <span>↗</span>', 'Add car request <span>↗</span>').replace('</form>', '<script>const countInput=document.querySelector("#passenger-count");const details=document.querySelector("#passenger-details");function renderPassengerDetails(){const count=Math.max(0,Number(countInput.value)||0);details.innerHTML=Array.from({length:count},(_,index)=>`<div class="passenger-row"><strong>${index+1}</strong><input name="passenger_emp_code[]" placeholder="Emp Code" required><input name="passenger_emp_name[]" placeholder="Emp Name" required><input name="passenger_designation[]" placeholder="Designation" required><input name="passenger_department[]" placeholder="Department" required></div>`).join("");}countInput.addEventListener("input",renderPassengerDetails);renderPassengerDetails();</script></form>') : body);
  }
  next();
});

app.get('/car-requests', async (req, res) => {
  if (!(await isRequestPageEnabled('car'))) return renderClosedRequestPage(req, res, 'car');
  const departments = await getDepartments();
  const departmentOptions = departments.map((department) => `<option value="${escapeHtml(department.name)}">${escapeHtml(department.name)}</option>`).join('');
  res.send(`<!doctype html><html lang="en"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"><title>Car request | SVIT Vasad</title><link rel="stylesheet" href="/styles.css"></head><body><main class="shell"><div class="college-heading"><h1>SVIT VASAD</h1></div><div class="request-layout"><aside class="side-panel"><h2>Car<br><em>Requests</em></h2><p class="sub-title">Request an official vehicle for campus work.</p><div class="rule"></div><nav class="nav-buttons"><a href="/" class="nav-btn"><span class="btn-icon">🏠</span> Back to main page</a><a href="/" class="nav-btn"><span class="btn-icon">🏛️</span> Auditorium Permission</a><a href="/maintenance" class="nav-btn"><span class="btn-icon">🔧</span> Maintenance Request</a><a href="/purchase/local" class="nav-btn"><span class="btn-icon">🏪</span> Local Purchase</a><a href="/purchase/stationary" class="nav-btn"><span class="btn-icon">📦</span> Stationery Item</a><a href="/purchase/cleaning" class="nav-btn"><span class="btn-icon">🧹</span> Cleaning Item</a><a href="/car-requests" class="nav-btn active"><span class="btn-icon">🚗</span> Car Request</a><a href="/login" class="nav-btn"><span class="btn-icon">🔐</span> Sign in</a></nav></aside><section class="main-content"><p class="eyebrow">Request form 04</p><h1>Car<br><em>request</em></h1><p class="lede">Request an official vehicle for college travel, field work, or an approved campus programme.</p><form class="request-form" action="/car-requests" method="post"><div class="section-heading"><span>01</span><h3>Travel details</h3></div><div class="form-grid"><label>Department<select name="department" required><option value="">Select department</option>${departmentOptions}</select></label><label>Purpose<input name="purpose" placeholder="e.g. Official campus visit" required></label><label>Travel date<input name="travel_date" type="date" required></label><label>Passenger count<input name="passenger_count" type="number" min="1" required></label><label>Pickup location<input name="pickup_location" placeholder="e.g. SVIT Vasad" required></label><label>Destination<input name="destination" placeholder="e.g. Ahmedabad" required></label><label>Pickup time<input name="pickup_time" type="time" required></label><label>Return time<input name="return_time" type="time"></label></div><div class="section-heading"><span>02</span><h3>Requester details</h3></div><div class="form-grid"><label>Name<input name="requester_name" placeholder="Full name" required></label><label>Mobile number<input name="requester_mobile" type="tel" pattern="[0-9]{10}" placeholder="10-digit mobile number" required></label><label>Email address<input name="requester_email" type="email" placeholder="name@svitvasad.ac.in" required></label><label>Additional notes<textarea name="remarks" placeholder="Any driver, luggage, or accessibility details"></textarea></label></div><button type="submit">Send car request <span>↗</span></button></form></section></div><footer><span>Auditorium Registration Application</span><span>Admissiondata / 2026</span></footer></main>${req.query.submitted === '1' ? '<script>alert("Car request submitted successfully.");</script>' : ''}</body></html>`);
});

app.post('/car-requests', async (req, res) => {
  if (!(await isRequestPageEnabled('car'))) return res.status(403).send('This request page is currently disabled by an administrator. Please try again later.');
  const request = { department: String(req.body.department || '').trim(), purpose: String(req.body.purpose || '').trim(), travel_date: req.body.travel_date, passenger_count: Number(req.body.passenger_count), pickup_location: String(req.body.pickup_location || '').trim(), destination: String(req.body.destination || '').trim(), pickup_time: req.body.pickup_time, return_time: req.body.return_time || null, requester_name: String(req.body.requester_name || '').trim(), requester_mobile: String(req.body.requester_mobile || '').trim(), requester_email: String(req.body.requester_email || '').trim().toLowerCase(), remarks: String(req.body.remarks || '').trim(), status: 'pending' };
  if (!request.department || !request.purpose || !request.travel_date || !Number.isInteger(request.passenger_count) || request.passenger_count < 1 || !request.pickup_location || !request.destination || !request.pickup_time || !request.requester_name || !request.requester_mobile || !request.requester_email) return res.status(400).send('All required car request fields must be filled.');
  if (supabase) {
    const { error } = await supabase.from('car_requests').insert(request);
    if (error) return res.status(error.code === 'PGRST205' ? 503 : 500).send(error.code === 'PGRST205' ? 'Database setup required. Run supabase/schema.sql in the Supabase SQL Editor.' : error.message);
  } else {
    localCarRequests.unshift({ id: Date.now(), created_at: new Date().toISOString(), ...request });
  }
  if (request.requester_email) {
    await createNotification({
      userId: request.requester_email,
      title: `Car request received`,
      message: `Your request for travel to ${request.destination} on ${request.travel_date} was submitted and is pending review.`,
      module: 'car',
      referenceId: '',
      link: '/car-requests'
    });
    const firstApprover = (await getUsers()).find((u) => u.role === 'admin_officer');
    if (firstApprover) {
      await createNotification({
        userId: firstApprover.id,
        title: `New car request awaits approval`,
        message: `${request.requester_name} (${request.department}) requests a vehicle for ${request.destination}.`,
        module: 'car',
        referenceId: '',
        link: '/admin/car-requests'
      });
    }
  }
  res.redirect('/car-requests?submitted=1');
});

app.get('/admin/car-requests', requireLogin, async (req, res) => {
  if (!canManageCars(req.session.user)) return res.status(403).send('Admin officer or Admin access required.');
  const [requests, fleet, drivers] = await Promise.all([getCarRequests(), getCarFleet(), getCarDrivers()]);

  const carOptions = (selected) => `<option value="">— Select car —</option>${fleet.map((car) => `<option value="${escapeHtml(car.car_name + ' | ' + car.car_number)}"${(car.car_name + ' | ' + car.car_number) === (selected || '') ? ' selected' : ''}>${escapeHtml(car.car_name)} (${escapeHtml(car.car_number)})</option>`).join('')}`;
  const driverOptions = (selected) => `<option value="">— Select driver —</option>${drivers.map((driver) => `<option value="${escapeHtml(driver.driver_name)}"${driver.driver_name === (selected || '') ? ' selected' : ''}>${escapeHtml(driver.driver_name)}${driver.phone_number ? ` (${escapeHtml(driver.phone_number)})` : ''}</option>`).join('')}`;

  const noFleetAlert = fleet.length === 0 || drivers.length === 0
    ? `<p class="small-copy" style="color:var(--orange)">No cars/drivers registered yet. Add them on the <a href="/admin/car-fleet">Fleet register</a> page before approving.</p>`
    : '';

  const rows = requests.length ? sortPendingFirst(requests).map((request) => {
    const assigned = request.status === 'approved'
      ? `<span class="assigned-detail">${escapeHtml(request.driver_name || '—')}<small>${escapeHtml(request.car_name || '')} ${escapeHtml(request.car_number || '')}</small>${request.assigned_by ? `<small>by ${escapeHtml(request.assigned_by)}</small>` : ''}</span>`
      : '';
    const approveForm = request.status === 'pending'
      ? `<form class="car-assign" action="/admin/car-requests/${request.id}/approve" method="post"><select name="driver_name" aria-label="Driver" required>${driverOptions('')}</select><select name="car" aria-label="Car" required>${carOptions('')}</select><button class="small-button" type="submit">Approve</button></form>`
      : '';
    const rejectForm = request.status === 'pending'
      ? `<form class="request-actions reject-form" action="/admin/car-requests/${request.id}/reject" method="post"><input name="remarks" placeholder="Reject remarks" required><button class="small-button reject-button" type="submit">Reject</button></form>`
      : '';
    return `<tr><td>${escapeHtml(request.department)}</td><td>${escapeHtml(request.purpose)}<small>${escapeHtml(request.pickup_location)} to ${escapeHtml(request.destination)}</small></td><td>${escapeHtml(request.travel_date)}<small>${escapeHtml(request.pickup_time || '')}${request.return_time ? ` - ${escapeHtml(request.return_time)}` : ''}</small></td><td>${escapeHtml(request.passenger_count)}</td><td>${escapeHtml(request.requester_name)}<small>${escapeHtml(request.requester_mobile)}<br>${escapeHtml(request.requester_email)}</small></td><td><span class="status ${request.status === 'approved' ? 'approved' : request.status === 'rejected' ? 'rejected' : 'pending'}">${escapeHtml(request.status)}</span>${assigned}</td><td>${approveForm}${rejectForm}${request.status === 'pending' ? '' : escapeHtml(request.rejection_remarks || '')}</td></tr>`;
  }).join('') : '<tr><td colspan="7">No car requests yet.</td></tr>';

  res.send(`<!doctype html><html lang="en"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"><title>Car request approvals</title><link rel="stylesheet" href="/styles.css"><style>.car-assign{display:flex;flex-direction:column;gap:6px;margin-bottom:8px}.car-assign select,.reject-form input{width:100%;box-sizing:border-box;padding:8px;border:1px solid var(--line);background:transparent;font:12px Arial,sans-serif}.assigned-detail{display:block;margin-top:8px;font:12px Arial,sans-serif;color:var(--ink)}.assigned-detail small{display:block;color:var(--muted);margin-top:2px}</style></head><body><main class="shell panel"><header class="masthead"><div><p class="kicker">${escapeHtml(req.session.user.role)}</p><h1>Car request<br><em>approval</em></h1></div><div class="admin-tools" style="display:flex;gap:10px;align-items:center"><a class="page-nav" href="/admin/car-fleet">Fleet register ↗</a><a class="page-nav" href="/admin/pages">Back to admin pages</a></div></header><section class="panel-intro"><p class="eyebrow">Section 04</p><h2>Car requests.</h2><p class="lede">Review official vehicle requests. On approval, choose the assigned driver and car.</p>${noFleetAlert}</section><div class="table-wrap"><table><thead><tr><th>Department</th><th>Travel</th><th>Date & time</th><th>Passengers</th><th>Requester</th><th>Status</th><th>Action</th></tr></thead><tbody>${rows}</tbody></table></div></main></body></html>`);
});

for (const action of ['approve', 'reject']) {
  app.post(`/admin/car-requests/:id/${action}`, requireLogin, async (req, res) => {
    if (!canManageCars(req.session.user)) return res.status(403).send('Admin officer or Admin access required.');
    let values;
    if (action === 'approve') {
      const driver = String(req.body.driver_name || '').trim();
      const car = String(req.body.car || '').trim();
      if (!driver || !car) return res.status(400).send('Choose a driver and a car to approve the request.');
      const [carName, ...carNumberParts] = car.split(' | ');
      values = { status: 'approved', driver_name: driver, car_name: carName, car_number: carNumberParts.join(' | '), assigned_by: req.session.user.name };
    } else {
      values = { status: 'rejected', rejection_remarks: String(req.body.remarks || '').trim() };
      if (!values.rejection_remarks) return res.status(400).send('Rejection remarks are required.');
    }
    let requesterEmail = '';
    if (supabase) {
      const { data, error } = await supabase.from('car_requests').select('*').eq('id', req.params.id).maybeSingle();
      if (error) return res.status(500).send(error.message);
      requesterEmail = data?.requester_email || '';
      const up = await supabase.from('car_requests').update(values).eq('id', req.params.id);
      if (up.error) return res.status(500).send(up.error.message);
    } else {
      const request = localCarRequests.find((candidate) => String(candidate.id) === req.params.id);
      if (request) { requesterEmail = request.requester_email || ''; Object.assign(request, values); }
    }
    if (requesterEmail) {
      await createNotification({
        userId: requesterEmail,
        title: `Car request ${action}d`,
        message: action === 'approve'
          ? `Your vehicle request has been approved.${values.driver_name ? ` Driver: ${values.driver_name} · Car: ${values.car_name} (${values.car_number}).` : ''}`
          : `Your vehicle request was rejected.${values.rejection_remarks ? ` Remarks: ${values.rejection_remarks}` : ''}`,
        module: 'car',
        referenceId: req.params.id,
        link: '/car-requests'
      });
    }
    res.redirect('/admin/car-requests');
  });
}

// --- Car & Driver fleet register ---
app.get('/admin/car-fleet', requireLogin, async (req, res) => {
  if (!canManageCars(req.session.user)) return res.status(403).send('Admin officer or Admin access required.');
  const [fleet, drivers] = await Promise.all([getCarFleet(), getCarDrivers()]);
  const carRows = fleet.length ? fleet.map((car) => `<tr><td><form class="edit-user create-user" action="/admin/car-fleet/car/${car.id}" method="post"><input name="car_name" value="${escapeHtml(car.car_name)}" aria-label="Car name" required><input name="car_number" value="${escapeHtml(car.car_number)}" aria-label="Car number" required><button class="small-button" type="submit">Save</button></form></td><td><form action="/admin/car-fleet/car/${car.id}/delete" method="post"><button class="small-button reject-button" type="submit">Delete</button></form></td></tr>`).join('') : '<tr><td colspan="2">No cars registered yet.</td></tr>';
  const driverRows = drivers.length ? drivers.map((driver) => `<tr><td><form class="edit-user create-user" action="/admin/car-fleet/driver/${driver.id}" method="post"><input name="driver_name" value="${escapeHtml(driver.driver_name)}" aria-label="Driver name" required><input name="phone_number" value="${escapeHtml(driver.phone_number || '')}" aria-label="Phone" placeholder="Phone (optional)"><button class="small-button" type="submit">Save</button></form></td><td><form action="/admin/car-fleet/driver/${driver.id}/delete" method="post"><button class="small-button reject-button" type="submit">Delete</button></form></td></tr>`).join('') : '<tr><td colspan="2">No drivers registered yet.</td></tr>';
  res.send(`<!doctype html><html lang="en"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"><title>Car & driver fleet register</title><link rel="stylesheet" href="/styles.css"></head><body><main class="shell panel"><header class="masthead"><div><p class="kicker">${escapeHtml(req.session.user.role)}</p><h1>Fleet<br><em>register</em></h1></div><a class="page-nav" href="/admin/car-requests">Back to car approvals</a></header><section class="panel-intro"><p class="eyebrow">Car Requisition workspace</p><h2>Cars and drivers.</h2><p class="lede">Register the college vehicles and drivers. When a request is approved, the officer picks from these lists.</p></section><section class="user-management"><div class="section-heading"><span>01</span><h3>Add a car</h3></div><form class="create-user" action="/admin/car-fleet/car" method="post"><input name="car_name" placeholder="Car name (e.g. Swift Dzire)" required><input name="car_number" placeholder="Car number (e.g. GJ-24-AB-1234)" required><button type="submit">Add car</button></form></section><section class="user-management"><div class="section-heading"><span>02</span><h3>Registered cars</h3></div><div class="table-wrap"><table><thead><tr><th>Car name & number</th><th></th></tr></thead><tbody>${carRows}</tbody></table></div></section><section class="user-management"><div class="section-heading"><span>03</span><h3>Add a driver</h3></div><form class="create-user" action="/admin/car-fleet/driver" method="post"><input name="driver_name" placeholder="Driver name" required><input name="phone_number" placeholder="Phone (optional)"><button type="submit">Add driver</button></form></section><section class="user-management"><div class="section-heading"><span>04</span><h3>Registered drivers</h3></div><div class="table-wrap"><table><thead><tr><th>Driver name</th><th></th></tr></thead><tbody>${driverRows}</tbody></table></div></section></main></body></html>`);
});

app.post('/admin/car-fleet/car', requireLogin, async (req, res) => {
  if (!canManageCars(req.session.user)) return res.status(403).send('Admin officer or Admin access required.');
  const car = { car_name: String(req.body.car_name || '').trim(), car_number: String(req.body.car_number || '').trim() };
  if (!car.car_name || !car.car_number) return res.status(400).send('Car name and number are required.');
  if (supabase) {
    const { error } = await supabase.from('car_fleet').insert(car);
    if (error) return res.status(500).send(error.message);
  } else {
    localCarFleet.unshift({ id: Date.now() + localCarFleet.length, ...car });
  }
  res.redirect('/admin/car-fleet');
});

app.post('/admin/car-fleet/car/:id', requireLogin, async (req, res) => {
  if (!canManageCars(req.session.user)) return res.status(403).send('Admin officer or Admin access required.');
  const car = { car_name: String(req.body.car_name || '').trim(), car_number: String(req.body.car_number || '').trim() };
  if (!car.car_name || !car.car_number) return res.status(400).send('Car name and number are required.');
  if (supabase) {
    const { error } = await supabase.from('car_fleet').update(car).eq('id', req.params.id);
    if (error) return res.status(500).send(error.message);
  } else {
    const row = localCarFleet.find((c) => String(c.id) === req.params.id);
    if (row) Object.assign(row, car);
  }
  res.redirect('/admin/car-fleet');
});

app.post('/admin/car-fleet/car/:id/delete', requireLogin, async (req, res) => {
  if (!canManageCars(req.session.user)) return res.status(403).send('Admin officer or Admin access required.');
  if (supabase) {
    const { error } = await supabase.from('car_fleet').delete().eq('id', req.params.id);
    if (error) return res.status(500).send(error.message);
  } else {
    const index = localCarFleet.findIndex((c) => String(c.id) === req.params.id);
    if (index >= 0) localCarFleet.splice(index, 1);
  }
  res.redirect('/admin/car-fleet');
});

app.post('/admin/car-fleet/driver', requireLogin, async (req, res) => {
  if (!canManageCars(req.session.user)) return res.status(403).send('Admin officer or Admin access required.');
  const driver = { driver_name: String(req.body.driver_name || '').trim(), phone_number: String(req.body.phone_number || '').trim() };
  if (!driver.driver_name) return res.status(400).send('Driver name is required.');
  if (supabase) {
    const { error } = await supabase.from('car_drivers').insert(driver);
    if (error) return res.status(500).send(error.message);
  } else {
    localCarDrivers.unshift({ id: Date.now() + localCarDrivers.length, ...driver });
  }
  res.redirect('/admin/car-fleet');
});

app.post('/admin/car-fleet/driver/:id', requireLogin, async (req, res) => {
  if (!canManageCars(req.session.user)) return res.status(403).send('Admin officer or Admin access required.');
  const driver = { driver_name: String(req.body.driver_name || '').trim(), phone_number: String(req.body.phone_number || '').trim() };
  if (!driver.driver_name) return res.status(400).send('Driver name is required.');
  if (supabase) {
    const { error } = await supabase.from('car_drivers').update(driver).eq('id', req.params.id);
    if (error) return res.status(500).send(error.message);
  } else {
    const row = localCarDrivers.find((d) => String(d.id) === req.params.id);
    if (row) Object.assign(row, driver);
  }
  res.redirect('/admin/car-fleet');
});

app.post('/admin/car-fleet/driver/:id/delete', requireLogin, async (req, res) => {
  if (!canManageCars(req.session.user)) return res.status(403).send('Admin officer or Admin access required.');
  if (supabase) {
    const { error } = await supabase.from('car_drivers').delete().eq('id', req.params.id);
    if (error) return res.status(500).send(error.message);
  } else {
    const index = localCarDrivers.findIndex((d) => String(d.id) === req.params.id);
    if (index >= 0) localCarDrivers.splice(index, 1);
  }
  res.redirect('/admin/car-fleet');
});

app.get('/admin/maintenance', requireLogin, async (req, res) => {
  const user = req.session.user;
  if (user.role !== 'admin' && user.role !== 'maintenance' && user.role !== 'head' && user.role !== 'electrician' && user.role !== 'principal' && user.role !== 'work_done') {
    return res.status(403).send('Access required.');
  }
  const allRequests = await getMaintenanceRequests();
  const categoryLabels = { electrical: 'Electrical', plumbing: 'Plumbing', furniture: 'Furniture', ac_fan: 'AC / Fan', carpentry: 'Carpentry', painting: 'Painting', civil: 'Civil Work', cleaning: 'Cleaning', other: 'Other' };
  const categoryIcons = { electrical: '⚡', plumbing: '🚰', furniture: '🪑', ac_fan: '❄️', carpentry: '🪚', painting: '🎨', civil: '🏗️', cleaning: '🧹', other: '🔧' };
  const priorityColors = { low: 'var(--muted)', medium: 'var(--ink)', high: 'var(--orange)', urgent: '#e74c3c' };
  const priorityBg = { low: '#f0f0f0', medium: '#e8e8e8', high: 'rgba(233,119,66,0.15)', urgent: 'rgba(231,76,60,0.15)' };
  const statusLabels = { pending: 'Pending', hod_approved: 'HOD Approved', electrician_approved: 'Electrician Approved', principal_approved: 'Principal Approved', maintenance_approved: 'Maintenance Approved', completed: 'Work Done', rejected: 'Rejected' };
  const roleNames = { head: 'Department Head', electrician: 'Electrician', principal: 'Principal', maintenance: 'Maintenance', work_done: 'Work Inspector' };

  const maintApprovalTransition = (req) => {
    const stages = ['pending', 'hod_approved', 'electrician_approved', 'principal_approved', 'maintenance_approved', 'completed'];
    const stageIndex = stages.indexOf(req.status);
    if (stageIndex === -1 || stageIndex >= stages.length - 1) return null;
    const nextStage = stages[stageIndex + 1];
    const roleMap = { hod_approved: 'head', electrician_approved: 'electrician', principal_approved: 'principal', maintenance_approved: 'maintenance', completed: 'work_done' };
    return { role: roleMap[nextStage], status: nextStage };
  };

  const maintApprovalAction = (req, user) => {
    const transition = maintApprovalTransition(req);
    if (!transition) return '<span class="muted">Completed</span>';
    if (user.role === 'admin') {
      return `<form class="request-actions" action="/admin/maintenance/${req.id}/approve" method="post"><button class="small-button" type="submit">${transition.status === 'completed' ? 'Confirm Work Done' : 'Approve'}</button></form><form class="request-actions reject-form" action="/admin/maintenance/${req.id}/reject" method="post"><input name="remarks" placeholder="Reject remarks" required><button class="small-button reject-button" type="submit">Reject</button></form>`;
    }
    if (user.role === transition.role) {
      return `<form class="request-actions" action="/admin/maintenance/${req.id}/approve" method="post"><button class="small-button" type="submit">${transition.status === 'completed' ? 'Confirm Work Done' : 'Approve'}</button></form><form class="request-actions reject-form" action="/admin/maintenance/${req.id}/reject" method="post"><input name="remarks" placeholder="Reject remarks" required><button class="small-button reject-button" type="submit">Reject</button></form>`;
    }
    return '<span class="muted">Waiting</span>';
  };

  const maintStatusDisplay = (req) => {
    const transition = maintApprovalTransition(req);
    const statusClass = req.status === 'rejected' ? 'rejected' : req.status === 'completed' ? 'approved' : req.status.includes('approved') ? 'approved' : 'pending';
    let html = `<span class="status ${statusClass}">${escapeHtml(statusLabels[req.status] || req.status)}</span>`;
    if (transition) {
      html += `<small>Pending: ${escapeHtml(roleNames[transition.role] || transition.role)}</small>`;
    }
    if (req.rejection_remarks) {
      html += `<small>Remarks: ${escapeHtml(req.rejection_remarks)}</small>`;
    }
    return html;
  };

  const rows = allRequests.length ? sortPendingFirst(allRequests).map((req) => {
    const createdDate = req.created_at ? new Date(req.created_at).toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' }) : '-';
    const createdTime = req.created_at ? new Date(req.created_at).toLocaleTimeString('en-IN', { hour: '2-digit', minute: '2-digit' }) : '';
    return `<tr>
      <td>#${escapeHtml(req.id)}</td>
      <td>${categoryIcons[req.category] || '🔧'} ${escapeHtml(req.location)}<small>${escapeHtml(categoryLabels[req.category] || req.category)}</small></td>
      <td><span class="priority-badge" style="background:${priorityBg[req.priority] || '#f0f0f0'};color:${priorityColors[req.priority] || 'var(--ink)'}">${escapeHtml(req.priority.toUpperCase())}</span></td>
      <td>${escapeHtml(req.description)}<small>${escapeHtml(req.reporter_name)} · ${escapeHtml(req.department)}</small><small>${escapeHtml(req.reporter_mobile)} · ${escapeHtml(req.reporter_email)}</small></td>
      <td>${createdDate}<small>${createdTime}</small></td>
      <td>${maintStatusDisplay(req)}</td>
      <td>${maintApprovalAction(req, user)}</td>
    </tr>`;
  }).join('') : '<tr><td colspan="7">No maintenance requests yet.</td></tr>';

  res.send(`<!doctype html><html lang="en"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"><title>Maintenance Requests | Admin</title><link rel="stylesheet" href="/styles.css"><style>
    .college-heading{text-align:center;margin:20px 0 10px}.college-heading h1{font-size:clamp(36px,6vw,64px);font-weight:700;letter-spacing:.08em;margin:0}
    .panel-intro h2{font-size:42px;font-weight:400;margin:14px 0 10px;letter-spacing:-.03em}
    .panel-intro .lede{font:14px/1.5 Arial,sans-serif;color:var(--muted)}
    .table-wrap{overflow-x:auto}table{width:100%;border-collapse:collapse;font:14px Arial,sans-serif}
    th{text-align:left;font-size:10px;text-transform:uppercase;letter-spacing:.1em;color:var(--muted);padding:13px 10px;border-bottom:1px solid var(--ink)}
    td{padding:17px 10px;border-bottom:1px solid var(--line);vertical-align:top}
    td small{display:block;color:var(--muted);font-size:11px;margin-top:3px}
    .status{display:inline-block;padding:5px 10px;font-size:10px;text-transform:uppercase;letter-spacing:.06em}
    .status.pending{background:var(--lime);color:var(--ink)}
    .status.approved{background:var(--lime);color:var(--ink)}
    .status.rejected{background:var(--orange);color:#fff}
    .muted{color:var(--muted);font-size:12px}
    .small-button{margin:0;padding:8px 10px;font-size:10px}
    .request-actions{display:inline-block;margin:0 4px 4px 0}
    .reject-form input{width:150px;font-size:12px;padding:8px;border:1px solid var(--line);border-radius:4px}
    .reject-button{background:#e97742;color:#fff;border-color:#e97742}
    .priority-badge{display:inline-block;padding:4px 10px;border-radius:4px;font:600 11px Arial,sans-serif;letter-spacing:.05em}
    .admin-tools{display:flex;gap:14px;align-items:center;flex-wrap:wrap;margin:18px 0}
    .approval-note{display:flex;align-items:center;gap:15px;padding:16px 20px;background:rgba(199,237,85,0.15);border-radius:4px;margin:20px 0;font:13px/1.4 Arial,sans-serif}
    .approval-note strong{color:var(--ink)}.approval-note span{color:var(--muted)}
  </style></head><body><main class="shell panel">
    <div class="college-heading"><h1>SVIT VASAD</h1></div>
    <header class="masthead"><div><p class="kicker">${escapeHtml(user.role)}</p><h1>Maintenance<br><em>Approval Desk</em></h1></div><form action="/logout" method="post"><button class="quiet" type="submit">Sign out</button></form></header>
    <section class="panel-intro"><p class="eyebrow">Signed in as ${escapeHtml(user.name)}</p><h2>Maintenance requests.</h2><p class="lede">Department head → Electrician → Principal → Maintenance → Work Inspector.</p><div class="admin-tools"><a class="page-nav" href="/admin">Back to Admin</a><a class="page-nav" href="/maintenance">Submit New Request ↗</a></div></section>
    <div class="approval-note"><strong>Approval path</strong><span>Department Head → Electrician → Principal → Maintenance Officer → Work Inspector (confirms work done)</span></div>
    <section class="table-wrap"><table><thead><tr><th>ID</th><th>Location</th><th>Priority</th><th>Details</th><th>Date</th><th>Status</th><th>Action</th></tr></thead><tbody>${rows}</tbody></table></section>
  </main></body></html>`);
});

app.post('/admin/maintenance/:id/approve', requireLogin, async (req, res) => {
  const user = req.session.user;
  let request = localMaintenanceRequests.find((r) => String(r.id) === req.params.id);
  if (supabase) {
    const { data, error } = await supabase.from('maintenance_requests').select('*').eq('id', req.params.id).maybeSingle();
    if (error) return res.status(500).send(error.message);
    request = data;
  }
  if (!request) return res.status(404).send('Request not found.');

  const stages = ['pending', 'hod_approved', 'electrician_approved', 'principal_approved', 'maintenance_approved', 'completed'];
  const roleMap = { hod_approved: 'head', electrician_approved: 'electrician', principal_approved: 'principal', maintenance_approved: 'maintenance', completed: 'work_done' };
  const stageIndex = stages.indexOf(request.status);
  if (stageIndex === -1 || stageIndex >= stages.length - 1) return res.status(409).send('This request has no remaining approval stage.');
  const nextStatus = stages[stageIndex + 1];
  const requiredRole = roleMap[nextStatus];

  if (user.role !== 'admin' && user.role !== requiredRole) return res.status(403).send('This request is waiting for another approver.');

  if (supabase) {
    const { error } = await supabase.from('maintenance_requests').update({ status: nextStatus, updated_at: new Date().toISOString() }).eq('id', req.params.id);
    if (error) return res.status(500).send(error.message);
  } else if (request) {
    request.status = nextStatus;
    request.updated_at = new Date().toISOString();
  }

  const fullyApproved = nextStatus === 'completed';
  if (request?.reporter_email) {
    await createNotification({
      userId: request.reporter_email,
      title: fullyApproved ? `Work done: ${request.location}` : `Maintenance request advanced`,
      message: fullyApproved
        ? `The maintenance work for (${request.location}, ${request.category}) is confirmed as done.`
        : `Your maintenance request advanced to the next stage (${moduleRoleLabel(roleMap[stages[stageIndex + 2] || ''] || '')}).`,
      module: 'maintenance',
      referenceId: request.id,
      link: '/maintenance'
    });
  }
  if (!fullyApproved) {
    const nextRole = roleMap[stages[stageIndex + 2]];
    const nextApprover = nextRole ? (await getUsers()).find((u) => u.role === nextRole) : null;
    if (nextApprover) {
      await createNotification({
        userId: nextApprover.id,
        title: `Maintenance request awaiting ${moduleRoleLabel(nextRole)} approval`,
        message: `A maintenance request (${request.location}, ${request.category}) is waiting for your review.`,
        module: 'maintenance',
        referenceId: request.id,
        link: '/admin/maintenance'
      });
    }
  }

  if (fullyApproved) {
    const allRequests2 = supabase ? (await supabase.from('maintenance_requests').select('*').eq('id', req.params.id).maybeSingle()).data : request;
    if (mailer && allRequests2?.reporter_email) {
      try {
        await mailer.sendMail({
          from: senderEmail,
          to: allRequests2.reporter_email,
          subject: `Work done: ${allRequests2.location}`,
          text: `The maintenance work has been confirmed as done.\n\nLocation: ${allRequests2.location}\nCategory: ${allRequests2.category}\nPriority: ${allRequests2.priority}\nStatus: Work Done\n\nThank you.`
        });
      } catch (e) { console.error(`Approval email error: ${e.message}`); }
    }
  }
  res.redirect('/admin/maintenance');
});

app.post('/admin/maintenance/:id/reject', requireLogin, async (req, res) => {
  const user = req.session.user;
  let request = localMaintenanceRequests.find((r) => String(r.id) === req.params.id);
  if (supabase) {
    const { data, error } = await supabase.from('maintenance_requests').select('*').eq('id', req.params.id).maybeSingle();
    if (error) return res.status(500).send(error.message);
    request = data;
  }
  if (!request) return res.status(404).send('Request not found.');

  const stages = ['pending', 'hod_approved', 'electrician_approved', 'principal_approved', 'maintenance_approved'];
  const roleMap = { hod_approved: 'head', electrician_approved: 'electrician', principal_approved: 'principal', maintenance_approved: 'maintenance' };
  const stageIndex = stages.indexOf(request.status);
  if (stageIndex === -1 || stageIndex >= stages.length - 1) return res.status(409).send('This request has no remaining approval stage.');
  const requiredRole = roleMap[stages[stageIndex]];

  const remarks = String(req.body.remarks || '').trim();
  if (!remarks) return res.status(400).send('Rejection remarks are required.');
  if (user.role !== 'admin' && user.role !== requiredRole) return res.status(403).send('This request is waiting for another approver.');

  if (supabase) {
    const { error } = await supabase.from('maintenance_requests').update({ status: 'rejected', rejection_remarks: remarks, updated_at: new Date().toISOString() }).eq('id', req.params.id);
    if (error) return res.status(500).send(error.message);
  } else if (request) {
    request.status = 'rejected';
    request.rejection_remarks = remarks;
    request.updated_at = new Date().toISOString();
  }

  if (mailer && request?.reporter_email) {
    try {
      await mailer.sendMail({
        from: senderEmail,
        to: request.reporter_email,
        subject: `Maintenance request rejected: ${request.location}`,
        text: `Your maintenance request has been rejected.\n\nLocation: ${request.location}\nCategory: ${request.category}\nStatus: Rejected\nRemarks: ${remarks}\n\nPlease contact the administration for more details.`
      });
    } catch (e) { console.error(`Rejection email error: ${e.message}`); }
  }
  res.redirect('/admin/maintenance');
});

app.post('/admin/maintenance/:id/delete', requireLogin, async (req, res) => {
  if (req.session.user.role !== 'admin') return res.status(403).send('Admin access required.');
  if (supabase) {
    const { error } = await supabase.from('maintenance_requests').delete().eq('id', req.params.id);
    if (error) return res.status(500).send(error.message);
  } else {
    const index = localMaintenanceRequests.findIndex((r) => String(r.id) === req.params.id);
    if (index >= 0) localMaintenanceRequests.splice(index, 1);
  }
  res.redirect('/admin/maintenance');
});

const localPurchaseRequests = [];
const localPurchaseStock = [];
const purchaseApprovalSettings = {
  stationary: { roles: ['head', 'admin_officer', 'principal', 'none'], threshold: 10000 },
  local: { roles: ['head', 'principal', 'chairman', 'purchase_officer'], threshold: 10000 },
  cleaning: { roles: ['head', 'admin_officer', 'principal', 'none'], threshold: 10000 }
};

// --- Configurable Approval Workflow Engine (blueprint sections 13, 21, 22, 30) ---
// A workflow belongs to a module+request_type and holds several amount bands.
// Each band has an ordered list of approval role steps. The engine resolves the
// applicable band for a request and advances through its steps, recording every
// action in the approval_workflow_* / approvals tables.

const localApprovalWorkflows = [
  { id: 1, module: 'purchase', request_type: 'local', name: 'Local Purchase', status: 'active' }
];
let localApprovalWorkflowBands = [
  { id: 1, workflow_id: 1, min_amount: null, max_amount: 10000, label: 'Up to ₹10,000', sort_order: 1 },
  { id: 2, workflow_id: 1, min_amount: 10000.01, max_amount: null, label: 'Above ₹10,000', sort_order: 2 }
];
let localApprovalWorkflowSteps = [
  { id: 1, band_id: 1, step_no: 1, role_id: 'head', required: true },
  { id: 2, band_id: 1, step_no: 2, role_id: 'purchase_officer', required: true },
  { id: 3, band_id: 2, step_no: 1, role_id: 'head', required: true },
  { id: 4, band_id: 2, step_no: 2, role_id: 'purchase_officer', required: true },
  { id: 5, band_id: 2, step_no: 3, role_id: 'principal', required: true },
  { id: 6, band_id: 2, step_no: 4, role_id: 'chairman', required: true }
];
const localApprovalRecords = [];

async function getApprovalWorkflows() {
  if (!supabase) return localApprovalWorkflows.map((row) => ({ ...row }));
  const { data, error } = await supabase.from('approval_workflows').select('*').order('id');
  if (error) { if (error.code === 'PGRST205' || error.code === '42501') return localApprovalWorkflows.map((row) => ({ ...row })); throw error; }
  return data || [];
}
async function getApprovalWorkflowBands() {
  if (!supabase) return localApprovalWorkflowBands.map((row) => ({ ...row }));
  const { data, error } = await supabase.from('approval_workflow_bands').select('*').order('sort_order');
  if (error) { if (error.code === 'PGRST205' || error.code === '42501') return localApprovalWorkflowBands.map((row) => ({ ...row })); throw error; }
  return data || [];
}
async function getApprovalWorkflowSteps() {
  if (!supabase) return localApprovalWorkflowSteps.map((row) => ({ ...row }));
  const { data, error } = await supabase.from('approval_workflow_steps').select('*').order('step_no');
  if (error) { if (error.code === 'PGRST205' || error.code === '42501') return localApprovalWorkflowSteps.map((row) => ({ ...row })); throw error; }
  return data || [];
}
async function getApprovalRecords() {
  if (!supabase) return [...localApprovalRecords];
  const { data, error } = await supabase.from('approvals').select('*').order('created_at', { ascending: false });
  if (error) { if (error.code === 'PGRST205' || error.code === '42501') return [...localApprovalRecords]; throw error; }
  return data || [];
}

async function workflowForRequest(module, requestType) {
  const workflows = await getApprovalWorkflows();
  return workflows.find((workflow) => workflow.module === module && workflow.request_type === (requestType || 'default'));
}

// Find the band whose [min_amount, max_amount] contains `amount`.
// -> amount <= max_amount when no min_amount; amount > min_amount when no max_amount.
function resolveBand(bands, amount) {
  if (!bands || !bands.length) return null;
  if (amount === null || amount === undefined) return bands[0] || null;
  const value = Number(amount);
  return bands.find((band) => {
    const minOk = band.min_amount === null || band.min_amount === undefined || value > Number(band.min_amount);
    const maxOk = band.max_amount === null || band.max_amount === undefined || value <= Number(band.max_amount);
    return minOk && maxOk;
  }) || bands[0] || null;
}

// Ordered list of approval steps for a request of this module, based on amount.
async function stepsForRequest(module, requestType, amount) {
  const workflow = await workflowForRequest(module, requestType);
  if (!workflow) return { workflow: null, band: null, steps: [] };
  const bands = (await getApprovalWorkflowBands()).filter((band) => band.workflow_id === workflow.id);
  const band = resolveBand(bands, amount);
  const steps = (await getApprovalWorkflowSteps()).filter((step) => band && step.band_id === band.id);
  return { workflow, band, steps };
}

// Determine the current pending step (and next status) for a stored status value.
// `progress` is the number of steps already approved (or an array of completed step numbers).
function computeStepProgress(module, requestType, amount, completedCount) {
  return stepsForRequest(module, requestType, amount).then(({ workflow, band, steps }) => {
    const applicable = steps.filter((step) => step.required);
    if (!workflow || !applicable.length) return { workflow, band, steps, pendingStep: null, done: true };
    if (completedCount >= applicable.length) return { workflow, band, steps, pendingStep: null, done: true, approvedBy: applicable.map((step) => step.role_id) };
    return { workflow, band, steps, pendingStep: applicable[completedCount], done: false, approvedBy: applicable.slice(0, completedCount).map((step) => step.role_id) };
  });
}

// Record a single approval action into the transaction log.
async function recordApproval({ module, requestType, requestId, workflowId, bandId, stepNo, approverUserId, approverRoleId, action, comments, ipAddress }) {
  const row = {
    module,
    request_type: requestType || 'default',
    request_id: Number(requestId),
    workflow_id: workflowId || null,
    band_id: bandId || null,
    step_no: stepNo || null,
    approver_user_id: approverUserId || null,
    approver_role_id: approverRoleId || null,
    action: action || 'PENDING',
    comments: comments || '',
    ip_address: ipAddress || ''
  };
  if (supabase) {
    const { error } = await supabase.from('approvals').insert(row);
    if (error) console.error(`Could not record approval: ${error.message}`);
  } else {
    localApprovalRecords.unshift({ id: Date.now() + localApprovalRecords.length, created_at: new Date().toISOString(), ...row });
  }
}

const moduleRoleLabel = (role) => ({ head: 'Department Head', purchase_officer: 'Purchase Officer', purchase_clerk: 'Purchase Clerk', principal: 'Principal', chairman: 'Chairman', admin_officer: 'Admin Officer', electrician: 'Electrician', maintenance: 'Maintenance Officer', higher_authority: 'Higher Authority', work_done: 'Work Inspector' }[role] || role || '');

async function approverUserLabel(userId) {
  if (!userId) return '';
  const user = (await getUsers()).find((candidate) => candidate.id === userId);
  return user ? `${user.name} (${userId})` : userId;
}

// Amount actually linked to a request for the workflow engine. For purchases we
// use total qty * unit price (matches the slip total).
function requestAmount(request) {
  if (!request) return 0;
  if (Number(request.total_amount) > 0) return Number(request.total_amount);
  return Math.round((Number(request.quantity || 0) * Number(request.unit_price || 0)) * 100) / 100;
}

// Describe the approval pipeline for any request: which workflow band applies,
// which role is waiting, and which roles have already approved. Returns a plain
// object safe for both DB and local modes.
function describePipeline({ module, requestType, request, workflow, band, steps, completed }) {
  const applicable = steps.filter((step) => step.required);
  const total = applicable.length;
  const done = total === 0 || completed >= total;
  const pendingStep = done ? null : applicable[completed];
  return {
    workflowId: workflow ? workflow.id : null,
    bandId: band ? band.id : null,
    bandLabel: band ? (band.label || `${band.min_amount === null || band.min_amount === undefined ? '' : '> ' + band.min_amount} ${band.max_amount === null || band.max_amount === undefined ? '' : '<= ' + band.max_amount}`) : '',
    steps: applicable.map((step) => step.role_id),
    approvers: applicable.map((step) => step.approver_user_id || null),
    completedSteps: applicable.slice(0, completed).map((step) => step.role_id),
    pendingRole: done ? null : pendingStep.role_id,
    pendingApproverUserId: done ? null : (pendingStep.approver_user_id || null),
    pendingStep: pendingStep || null,
    totalSteps: total,
    completedCount: Math.min(completed, total),
    done
  };
}

// Convenience: compute the full pipeline for a purchase request. When no
// workflow has been configured for the request type, fall back to a single
// approval step (purchase manager), preserving the legacy behaviour.
async function purchasePipeline(request) {
  const amount = requestAmount(request);
  const requestType = request.purchase_type || 'local';
  const { workflow, band, steps } = await stepsForRequest('purchase', requestType, amount);
  const completed = request.approval_step != null ? Number(request.approval_step) : 0;
  if (!steps.length && !workflow) {
    return describePipeline({ module: 'purchase', requestType, request, workflow: { id: null }, band, steps: [{ id: null, step_no: 1, role_id: 'purchase_officer', approver_user_id: null, required: true }, { id: null, step_no: 2, role_id: 'admin_officer', approver_user_id: null, required: false }], completed });
  }  return describePipeline({ module: 'purchase', requestType, request, workflow, band, steps, completed });
}

// --- In-app Notifications (blueprint section 26) ---
const localNotifications = [];
async function getNotifications(userId) {
  if (!supabase) return localNotifications.filter((n) => !userId || n.user_id === userId);
  const { data, error } = await supabase.from('notifications').select('*').order('created_at', { ascending: false });
  if (error) { if (error.code === 'PGRST205' || error.code === '42501') return localNotifications.filter((n) => !userId || n.user_id === userId); throw error; }
  return (data || []).filter((n) => !userId || n.user_id === userId);
}
async function createNotification({ userId, title, message, module, referenceId, link }) {
  const row = { user_id: userId || '', title: title || '', message: message || '', module: module || '', reference_id: referenceId != null ? String(referenceId) : '', link: link || '', is_read: false };
  if (supabase) {
    const { error } = await supabase.from('notifications').insert(row);
    if (error) console.error(`Could not create notification: ${error.message}`);
  } else {
    localNotifications.unshift({ id: Date.now() + localNotifications.length, created_at: new Date().toISOString(), ...row });
  }
}
async function markNotificationsRead(userId, id) {
  if (supabase) {
    if (id) await supabase.from('notifications').update({ is_read: true }).eq('id', id).eq('user_id', userId);
    else await supabase.from('notifications').update({ is_read: true }).eq('user_id', userId).eq('is_read', false);
  } else {
    for (const n of localNotifications) if (n.user_id === userId && (!id || String(n.id) === id)) n.is_read = true;
  }
}

// --- Role-module permission matrix (blueprint section 12) ---
const defaultModulePermissions = [
  ['auditorium', 'admin', 'manage'], ['auditorium', 'head', 'approve'], ['auditorium', 'department_user', 'request'], ['auditorium', 'sub_admin', 'manage'], ['auditorium', 'principal', 'approve'],
  ['maintenance', 'admin', 'manage'], ['maintenance', 'head', 'approve'], ['maintenance', 'department_user', 'request'], ['maintenance', 'maintenance', 'approve'], ['maintenance', 'electrician', 'approve'], ['maintenance', 'sub_admin', 'manage'], ['maintenance', 'principal', 'approve'], ['maintenance', 'work_done', 'approve'],
  ['purchase', 'admin', 'manage'], ['purchase', 'head', 'approve'], ['purchase', 'department_user', 'request'], ['purchase', 'purchase_officer', 'approve'], ['purchase', 'purchase_clerk', 'stock'], ['purchase', 'admin_officer', 'approve'], ['purchase', 'sub_admin', 'manage'], ['purchase', 'principal', 'approve'], ['purchase', 'chairman', 'approve'],
  ['car', 'admin', 'manage'], ['car', 'head', 'approve'], ['car', 'department_user', 'request'], ['car', 'admin_officer', 'approve'], ['car', 'sub_admin', 'manage'], ['car', 'principal', 'approve'],
  ['inventory', 'admin', 'manage'], ['inventory', 'head', 'view'], ['inventory', 'department_user', 'entry'], ['inventory', 'purchase_clerk', 'stock'], ['inventory', 'purchase_officer', 'stock'], ['inventory', 'sub_admin', 'manage'], ['inventory', 'principal', 'view']
];
const localModulePermissions = defaultModulePermissions.map(([module, role, action], i) => ({ id: i + 1, module, role, action }));
async function getModulePermissions() {
  if (!supabase) return localModulePermissions.map((row) => ({ ...row }));
  const { data, error } = await supabase.from('module_permissions').select('*');
  if (error) { if (error.code === 'PGRST205' || error.code === '42501') return localModulePermissions.map((row) => ({ ...row })); throw error; }
  return (data && data.length ? data : defaultModulePermissions.map(([module, role, action], i) => ({ id: i + 1, module, role, action })));
}
async function setModulePermission(module, role, action) {
  if (supabase) {
    const { error } = await supabase.from('module_permissions').upsert({ module, role, action }, { onConflict: 'module,role' });
    if (error) throw error;
  } else {
    const existing = localModulePermissions.find((p) => p.module === module && p.role === role);
    if (existing) existing.action = action;
    else localModulePermissions.push({ id: Date.now(), module, role, action });
  }
}
// Resolve the action a given role has for a module ('' = none).
async function roleModuleAction(role, module) {
  if (role === 'admin' || role === 'sub_admin') return 'manage';
  const perms = await getModulePermissions();
  const p = perms.find((perm) => perm.role === role && perm.module === module);
  return p ? p.action : '';
}

// --- Stock transaction ledger (blueprint section 20) ---
const localStockTransactions = [];
async function getStockTransactions(opts = {}) {
  if (!supabase) {
    let rows = localStockTransactions;
    if (opts.department || opts.itemName) rows = rows.filter((t) => (!opts.department || t.department === opts.department) && (!opts.itemName || t.item_name === opts.itemName));
    return [...rows];
  }
  let query = supabase.from('stock_transactions').select('*').order('created_at', { ascending: false });
  if (opts.department) query = query.eq('department', opts.department);
  if (opts.itemName) query = query.eq('item_name', opts.itemName);
  const { data, error } = await query;
  if (error) { if (error.code === 'PGRST205' || error.code === '42501') return [...localStockTransactions]; throw error; }
  return data || [];
}
async function recordStockTransaction({ itemId, department, itemName, category, type, quantity, previousStock, newStock, referenceType, referenceId, issuedBy, remarks }) {
  const row = {
    item_id: itemId || null,
    department: department || '',
    item_name: itemName || '',
    category: category || 'misc',
    transaction_type: type || 'ADJUSTMENT',
    quantity: Number(quantity) || 0,
    previous_stock: Number(previousStock) || 0,
    new_stock: Number(newStock) || 0,
    reference_type: referenceType || '',
    reference_id: referenceId != null ? String(referenceId) : '',
    issued_by: issuedBy || '',
    remarks: remarks || ''
  };
  if (supabase) {
    const { error } = await supabase.from('stock_transactions').insert(row);
    if (error) console.error(`Could not record stock transaction: ${error.message}`);
  } else {
    localStockTransactions.unshift({ id: Date.now() + localStockTransactions.length, created_at: new Date().toISOString(), ...row });
  }
}

// --- Audit log (blueprint section 27) ---
const localAuditLogs = [];
async function recordAudit({ userId, module, action, referenceId, oldData, newData, ipAddress }) {
  const row = {
    user_id: userId || '',
    module: module || '',
    action: action || '',
    reference_id: referenceId != null ? String(referenceId) : '',
    old_data: oldData != null ? JSON.parse(JSON.stringify(oldData)) : null,
    new_data: newData != null ? JSON.parse(JSON.stringify(newData)) : null,
    ip_address: ipAddress || ''
  };
  if (supabase) {
    const { error } = await supabase.from('audit_logs').insert(row);
    if (error) console.error(`Could not record audit log: ${error.message}`);
  } else {
    localAuditLogs.unshift({ id: Date.now() + localAuditLogs.length, created_at: new Date().toISOString(), ...row });
  }
}
async function getAuditLogs(limit = 500) {
  if (!supabase) return localAuditLogs.slice(0, limit);
  const { data, error } = await supabase.from('audit_logs').select('*').order('created_at', { ascending: false }).limit(limit);
  if (error) { if (error.code === 'PGRST205' || error.code === '42501') return localAuditLogs.slice(0, limit); throw error; }
  return data || [];
}

// --- System settings (blueprint section 28) ---
const localSystemSettings = {
  INSTITUTE_NAME: 'Sardar Vallabhbhai Patel Institute of Technology, Vasad Campus',
  PURCHASE_LIMIT: '10000',
  CURRENCY: 'INR',
  EMAIL_ENABLED: 'true',
  REQUEST_PAGE_ENABLED: 'true',
  MAINTENANCE_PAGE_ENABLED: 'true',
  CAR_PAGE_ENABLED: 'true',
  PURCHASE_PAGE_ENABLED: 'true'
};
async function getSystemSetting(key) {
  if (!supabase) return localSystemSettings[key];
  const { data, error } = await supabase.from('system_settings').select('*').eq('setting_key', key).maybeSingle();
  if (error || !data) return localSystemSettings[key];
  return data.setting_value;
}
async function setSystemSetting(key, value) {
  if (!supabase) { localSystemSettings[key] = value; return; }
  const { error } = await supabase.from('system_settings').upsert({ setting_key: key, setting_value: value, updated_at: new Date().toISOString() }, { onConflict: 'setting_key' });
  if (error) throw error;
  localSystemSettings[key] = value;
}

async function isRequestPageEnabled(moduleKey) {
  const key = { auditorium: 'REQUEST_PAGE_ENABLED', maintenance: 'MAINTENANCE_PAGE_ENABLED', car: 'CAR_PAGE_ENABLED', purchase: 'PURCHASE_PAGE_ENABLED' }[moduleKey] || 'REQUEST_PAGE_ENABLED';
  return (await getSystemSetting(key)) !== 'false';
}

const requestPageTagline = (moduleKey) => {
  const labels = {
    auditorium: 'Auditorium permission requests',
    maintenance: 'Maintenance & repair requests',
    car: 'Car / vehicle requests',
    purchase: 'Purchase requests'
  };
  return labels[moduleKey] || 'requests';
};

async function renderClosedRequestPage(req, res, moduleKey) {
  const tagline = requestPageTagline(moduleKey);
  const closedHtml = `<main class="shell"><div class="college-heading"><h1>SVIT VASAD</h1></div><div class="request-layout"><aside class="side-panel"><h2>Requests<br><em>closed</em></h2><p class="sub-title">The request page is temporarily unavailable.</p><div class="rule"></div><nav class="nav-buttons"><a href="/" class="nav-btn"><span class="btn-icon">🏠</span> Back to main page</a><a href="/login" class="nav-btn"><span class="btn-icon">🔐</span> Sign in</a></nav></aside><section class="main-content"><p class="eyebrow">Requests closed</p><h1>Requests are<br><em>currently closed</em></h1><p class="lede">${tagline} cannot be submitted right now.</p><div style="padding:24px;border:1px solid var(--orange);border-radius:4px;color:var(--ink);font:15px/1.6 Arial,sans-serif"><strong>This page is temporarily disabled.</strong><br>The administrator has closed this request page. Please try again later or contact the administrator for assistance.</div></section></div><footer><span>Auditorium Registration Application</span><span>Admissiondata / 2026</span></footer></main>`;
  res.status(200).send(`<!doctype html><html lang="en"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"><title>Requests closed | SVIT Vasad</title><link rel="stylesheet" href="/styles.css"><style>.college-heading{text-align:center;margin:20px 0 10px}.college-heading h1{font-size:clamp(36px,6vw,64px);font-weight:700;letter-spacing:.08em;margin:0}.request-layout{display:grid;grid-template-columns:280px 1fr;gap:0;min-height:80vh}.side-panel{background:var(--ink);color:var(--paper);padding:40px 30px}.side-panel h2{font-size:28px;font-weight:400;margin:0 0 10px;line-height:1.2}.side-panel h2 em{font-style:italic;color:var(--lime)}.side-panel .rule{width:40px;height:2px;background:var(--lime);margin:0 0 25px}.side-panel .nav-btn{display:block;padding:16px 20px;font:14px/1.4 Arial,sans-serif;color:var(--paper);text-decoration:none;border:1px solid rgba(255,255,255,0.2);border-radius:4px;margin-bottom:12px}.side-panel .nav-btn:hover{border-color:var(--lime);color:var(--lime)}.main-content{padding:50px 60px}.main-content .eyebrow{color:var(--orange);margin-bottom:15px;font:11px/1 Arial,sans-serif;text-transform:uppercase;letter-spacing:0.14em}.main-content h1{font-size:clamp(32px,5vw,52px);font-weight:400;margin:0 0 12px;line-height:1}.main-content h1 em{font-style:italic}.main-content .lede{font:15px/1.5 Arial,sans-serif;color:var(--muted);margin:0 0 40px;max-width:500px}@media(max-width:860px){.request-layout{grid-template-columns:1fr}.side-panel{padding:30px 24px}.main-content{padding:30px 24px}}</style></head><body>${closedHtml}</body></html>`);
}

async function getPurchaseRequests() {
  if (!supabase) return localPurchaseRequests;
  const { data, error } = await supabase.from('purchase_requests').select('*').order('created_at', { ascending: false });
  if (error) {
    if (error.code === 'PGRST205') return localPurchaseRequests;
    throw error;
  }
  return data;
}

async function getPurchaseStock() {
  if (!supabase) return localPurchaseStock;
  const { data, error } = await supabase.from('purchase_stock').select('*').order('department').order('item_name');
  if (error) {
    if (error.code === 'PGRST205' || error.code === '42501') return localPurchaseStock;
    throw error;
  }
  return data || [];
}

const localInventory = [];
async function getInventory() {
  if (!supabase) return localInventory;
  const { data, error } = await supabase.from('inventory').select('*').order('college').order('department').order('floor').order('office').order('item_category').order('item_name');
  if (error) {
    if (error.code === 'PGRST205' || error.code === '42501') return localInventory;
    throw error;
  }
  return data || [];
}

const inventoryField = (body, name, index) => String((Array.isArray(body[name]) ? (body[name][index] ?? '') : index === 0 ? (body[name] ?? '') : '') ?? '').trim();
const inventoryValues = (body, index = 0) => ({
  college: inventoryField(body, 'college', index) || 'SVIT Vasad',
  department: inventoryField(body, 'department', index),
  floor: inventoryField(body, 'floor', index),
  office: inventoryField(body, 'office', index),
  item_category: inventoryField(body, 'item_category', index),
  item_name: inventoryField(body, 'item_name', index),
  quantity: Number(inventoryField(body, 'quantity', index)) || 0
});
const upsertInventoryLocal = (values) => {
  const current = localInventory.find((item) => item.college === values.college && item.department === values.department && item.floor === values.floor && item.office === values.office && item.item_category === values.item_category && item.item_name === values.item_name);
  if (current) Object.assign(current, values);
  else localInventory.push({ id: Date.now() + localInventory.length, created_at: new Date().toISOString(), ...values });
};

const canManagePurchases = (user) => isAdmin(user) || user?.role === 'purchase_officer' || user?.role === 'purchase_clerk' || user?.role === 'admin_officer';

app.get('/admin/purchase/settings', requireLogin, (req, res) => {
  if (!canManagePurchases(req.session.user)) return res.status(403).send('Purchase Officer or Clerk access required.');
  const rows = Object.entries(purchaseApprovalSettings).map(([type, setting]) => `<form class="approval-setting" action="/admin/purchase/settings" method="post"><input type="hidden" name="purchase_type" value="${type}"><strong>${type}</strong><select name="role_1">${['head', 'admin_officer', 'principal', 'chairman', 'purchase_officer', 'none'].map((role) => `<option${setting.roles[0] === role ? ' selected' : ''}>${role}</option>`).join('')}</select><select name="role_2">${['head', 'admin_officer', 'principal', 'chairman', 'purchase_officer', 'none'].map((role) => `<option${setting.roles[1] === role ? ' selected' : ''}>${role}</option>`).join('')}</select><select name="role_3">${['head', 'admin_officer', 'principal', 'chairman', 'purchase_officer', 'none'].map((role) => `<option${setting.roles[2] === role ? ' selected' : ''}>${role}</option>`).join('')}</select><select name="role_4">${['head', 'admin_officer', 'principal', 'chairman', 'purchase_officer', 'none'].map((role) => `<option${setting.roles[3] === role ? ' selected' : ''}>${role}</option>`).join('')}</select><label>Amount threshold<input name="threshold" type="number" min="0" step="1" value="${setting.threshold}"></label><button type="submit">Save ${type} route</button></form>`).join('');
  res.send(`<!doctype html><html lang="en"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"><title>Purchase approval roles</title><link rel="stylesheet" href="/styles.css"><style>.approval-setting{display:grid;grid-template-columns:1fr repeat(4,1fr) 1fr auto;gap:10px;align-items:end;border-top:1px solid var(--line);padding:20px 0}.approval-setting select,.approval-setting input{padding:10px;border:1px solid var(--line);background:transparent;font:13px Arial}.approval-setting label{font-size:10px}@media(max-width:800px){.approval-setting{grid-template-columns:1fr 1fr}.approval-setting strong{grid-column:1/-1}}</style></head><body><main class="shell panel"><header class="masthead"><h1>Purchase<br><em>approval roles</em></h1><a class="page-nav" href="/admin/pages">Back to admin pages</a></header><section class="panel-intro"><p class="eyebrow">Admin settings</p><h2>Role approval routes.</h2><p class="lede">Set the order for Head, Admin Officer, Principal, Chairman, Purchase Officer, or None. Local purchases use the Rs. 10,000 threshold by default.</p></section>${rows}</main></body></html>`);
});

app.get('/admin/purchase/export', requireLogin, async (req, res) => {
  if (!canManagePurchases(req.session.user)) return res.status(403).send('Purchase Officer or Clerk access required.');
  const rows = await getPurchaseRequests();
  workbookResponse(res, rows.map((request) => ({ Type: request.purchase_type, Department: request.department, Item: request.item_name, Quantity: request.quantity, UnitPrice: request.unit_price, Priority: request.priority, Status: request.status })), 'purchase-requests.xlsx');
});

app.get('/admin/purchase/template', requireLogin, (req, res) => {
  if (!canManagePurchases(req.session.user)) return res.status(403).send('Purchase Officer or Clerk access required.');
  workbookResponse(res, [{ Type: 'stationary', Department: 'Computer Engineering', Item: 'A4 paper', Quantity: 10, UnitPrice: 120, Priority: 'medium', Status: 'pending' }], 'purchase-template.xlsx');
});

app.post('/admin/purchase/settings', requireLogin, (req, res) => {
  if (!isAdmin(req.session.user)) return res.status(403).send('Admin access required.');
  const setting = purchaseApprovalSettings[req.body.purchase_type];
  if (!setting) return res.status(400).send('Invalid purchase type.');
  setting.roles = [req.body.role_1, req.body.role_2, req.body.role_3, req.body.role_4];
  setting.threshold = Math.max(0, Number(req.body.threshold) || 0);
  res.redirect('/admin/purchase/settings');
});

app.get('/admin/purchase/:id/print', requireLogin, async (req, res) => {
  if (!canManagePurchases(req.session.user)) return res.status(403).send('Purchase Officer or Clerk access required.');
  const request = (await getPurchaseRequests()).find((candidate) => String(candidate.id) === req.params.id);
  if (!request) return res.status(404).send('Purchase request not found.');
  const stock = await getPurchaseStock();
  const printItems = Array.isArray(request.item_details) && request.item_details.length
    ? request.item_details
    : [{ item: request.item_name, quantity: request.quantity, purpose: request.description, admin_level: 'none' }];
  const printRows = printItems.map((item, index) => {
    const stockRecord = stock.find((s) => s.item_name === item.item && s.department === request.department);
    const stockQty = stockRecord ? Number(stockRecord.stock_quantity) : 0;
    return `<tr><td>${index + 1}</td><td>${escapeHtml(item.item)}</td><td>${escapeHtml(item.admin_level || 'none')}</td><td>${escapeHtml(item.quantity)}</td><td>${stockQty > 0 ? stockQty : 'Out of Stock'}</td>${request.purchase_type === 'stationary' ? `<td>${escapeHtml(item.purpose || '')}</td>` : ''}</tr>`;
  }).join('');
  const typeLabel = request.purchase_type === 'cleaning' ? 'Cleaning Items' : request.purchase_type === 'electric' ? 'Electric Items' : 'Stationery';
  res.send(`<!doctype html><html><head><meta charset="utf-8"><title>Purchase requisition slip</title><style>body{font:14px Arial;max-width:860px;margin:40px auto;color:#17231f}h1{text-align:center;font-size:24px;margin:0}h2{text-align:center;font-size:18px;font-weight:400;margin:8px 0 28px}.meta{display:flex;justify-content:space-between;border-bottom:1px solid #17231f;padding:12px 0}.slip{width:100%;border-collapse:collapse;margin-top:22px}.slip th,.slip td{border:1px solid #17231f;padding:9px;text-align:left}.slip th{background:#17231f;color:#fff}.signatures{display:grid;grid-template-columns:repeat(4,1fr);gap:25px;margin-top:100px}.signatures div{border-top:1px solid;padding-top:10px}@media print{button{display:none}}@media(max-width:600px){.signatures{grid-template-columns:1fr 1fr}}</style></head><body><a href="/dashboard" style="font:13px Arial;text-decoration:none;color:var(--ink);border:1px solid #17231f;padding:10px 16px;display:inline-block;margin:18px 0 0 18px">← Back to main page</a><button onclick="print()">Print / Save as PDF</button><h1>Sardar Vallabhbhai Patel Institute of Technology, Vasad</h1><h2>Requisition Slip for Departmental ${typeLabel}</h2><div class="meta"><span>Dept: ${escapeHtml(request.department)}</span><span>Date: ${escapeHtml(request.created_at ? new Date(request.created_at).toLocaleDateString('en-IN') : '')}</span></div><table class="slip"><thead><tr><th>Sr.</th><th>Item</th><th>Admin Level</th><th>Nos</th><th>Stock</th>${request.purchase_type === 'stationary' ? '<th>Purpose</th>' : ''}</tr></thead><tbody>${printRows}</tbody></table><div class="signatures"><div>Department Head</div><div>Admin Officer</div><div>Principal</div><div>Chairman</div></div></body></html>`);
});

const purchasePageConfig = {
  local: { title: 'Local', emphasis: 'purchase', description: 'Submit items procured from nearby vendors.', button: 'Submit local purchase request' },
  stationary: { title: 'Purchase', emphasis: 'stationary', description: 'Submit office and academic stationery supplies.', button: 'Submit stationery request' },
  cleaning: { title: 'Cleaning', emphasis: 'items', description: 'Submit hygiene and sanitation supply requests.', button: 'Submit cleaning items request' },
  electric: { title: 'Electric', emphasis: 'items', description: 'Submit electrical equipment and supply requests.', button: 'Submit electric items request' }
};

const purchaseItemCatalog = {
  cleaning: ['Fool Zadu', 'Sali Zadu Heavy', 'Khajoori Brush', 'Napthalene Balls', 'Bava Zadu', 'Rubber Hand Glows', 'Plastic Kucha (Big)', 'Odonil', 'Dori Refill', 'Dori Refill with Bracket', "Wiper 3'", 'Toilet Brush', 'Toilet Liquid', 'Soap (Lifebuoy)', 'Washing Soap (Wheel)', 'Wheel Powder (500 Gram)', 'Cotton Cloth (Waste)', 'Phenyle Liquid', 'Urinal Screen', 'Wooden Stick', 'Plastic Road Brush', 'Big Dustbin', 'Vacuum For Toilet'],
  stationary: ['A/4 Size Paper', 'Case a Cap in', 'Sticker Paper', 'Colour Paper (A4 Size)', 'White Board Marker Pen', 'Pencil', 'Eraser', 'Box File', 'Special File', 'Cutter', 'CD Marker Pen', 'Whitener', 'Student Gate Pass Book', 'Gum Stick', 'Cell (Pencil)', 'Scale', 'Cello Tape 1 Big, 1 Small', 'Stapler', 'Stapler Pin', 'Full Scape Book', 'Phenyle Balls', 'Punch Machine', 'Canteen Book', 'Chalk', 'Water Glass', 'Letter Head', 'Soap (Lifebouy)', 'Bucket (Big)', 'Soap (Washing)', 'Gate Pass College work', 'Gate Pass Half Leave'],
  electric: ['LED Tube Light', 'LED Bulb', 'Ceiling Fan', 'Exhaust Fan', 'Switch Board', 'MCB', 'Wire (Copper)', 'Cable Tie', 'Electrical Tape', 'Socket', 'Plug Top', 'Extension Board', 'Tube Light Choke', 'Starter', 'Regulator', 'Capacitor', 'Bell Push', 'Indicator Light', 'Main Switch', 'Distribution Board', 'Earth Wire', 'PVC Pipe', 'Casing Capping', 'Junction Box', 'Modular Switch', 'Modular Socket', 'Fan Capacitor', 'Tube Light Frame', 'Batten Holder', 'Angle Holder']
};

const stockCategories = {
  stationary: purchaseItemCatalog.stationary,
  cleaning: purchaseItemCatalog.cleaning,
  electric: purchaseItemCatalog.electric,
  plumbing: ['PVC Pipe', 'Tap', 'Bib Cock', 'Angle Valve', 'Flexible Pipe', 'P-trap', 'Floor Trap', 'Waste Coupling', 'Water Hose', 'Pipe Clamp', 'Teflon Tape', 'Sealant', 'Gate Valve', 'Ball Valve', 'Check Valve', 'Water Meter', 'Pressure Gauge'],
  misc: ['Miscellaneous item']
};

app.get('/purchase/:type', async (req, res) => {
  if (!(await isRequestPageEnabled('purchase'))) return renderClosedRequestPage(req, res, 'purchase');
  const config = purchasePageConfig[req.params.type];
  if (!config) return res.status(404).send('Purchase page not found.');
  const departments = await getDepartments();
  const departmentOptions = departments.map((department) => `<option value="${escapeHtml(department.name)}">${escapeHtml(department.name)}</option>`).join('');
  const stock = await getPurchaseStock();
  const catalogue = purchaseItemCatalog[req.params.type];
  const adminLevelOptions = ['head', 'admin_officer', 'principal', 'chairman', 'purchase_officer', 'none'].map((role) => `<option value="${role}">${role}</option>`).join('');
  const itemOptions = catalogue
    ? catalogue.map((item) => {
        const stockRecord = stock.find((s) => s.item_name === item);
        const stockQty = stockRecord ? Number(stockRecord.stock_quantity) : 0;
        return `<option value="${escapeHtml(item)}" data-stock="${stockQty}">${escapeHtml(item)}${stockQty > 0 ? ` (Stock: ${stockQty})` : ' (Out of Stock)'}</option>`;
      }).join('')
    : '';
  const itemSelectOptions = catalogue ? `<option value="">Select item</option>${itemOptions}` : '';
  const itemFields = catalogue
    ? `<div class="requisition-table-wrap"><table class="requisition-table"><thead><tr><th>Sr. No.</th><th>Item</th><th>Admin Level</th><th>Nos</th><th>Stock</th>${req.params.type === 'stationary' ? '<th>Purpose</th>' : ''}<th></th></tr></thead><tbody id="item-list"><tr class="item-row"><td class="item-number">1</td><td><select name="item_name[]" required>${itemSelectOptions}</select></td><td><select name="purchase_admin_level[]">${adminLevelOptions}</select></td><td><input name="quantity[]" type="number" min="1" step="1" placeholder="Nos" required></td><td class="stock-cell">--</td>${req.params.type === 'stationary' ? '<td><input name="item_purpose[]" placeholder="Purpose"></td>' : ''}<td><button class="remove-item" type="button" aria-label="Remove item" hidden>×</button></td></tr></tbody></table><button class="add-slot" type="button" id="add-item">+ Add item</button></div><script>const itemList=document.querySelector("#item-list");const addItem=document.querySelector("#add-item");const stockData=${JSON.stringify(catalogue ? catalogue.reduce((acc, item) => { const sr = stock.find(s => s.item_name === item); acc[item] = sr ? Number(sr.stock_quantity) : 0; return acc; }, {}) : {})};function renumberItems(){itemList.querySelectorAll(".item-row").forEach((row,index)=>{row.querySelector(".item-number").textContent=index+1;row.querySelector(".remove-item").hidden=itemList.children.length===1;});}function updateStockDisplay(row){const select=row.querySelector("select[name=\"item_name[]\"]");const stockCell=row.querySelector(".stock-cell");const qtyInput=row.querySelector("input[name=\"quantity[]\"]");const itemName=select.value;const stockQty=stockData[itemName]||0;stockCell.textContent=stockQty>0?stockQty:"Out of Stock";stockCell.style.color=stockQty>0?"var(--ink)":"var(--orange)";stockCell.classList.toggle("out",stockQty<=0);const options=select.querySelectorAll("option");options.forEach(opt=>{const optStock=Number(opt.dataset.stock||0);if(optStock<=0 && opt.value!=="" ) opt.disabled=true;else opt.disabled=false;});if(itemName && stockQty<=0){qtyInput.disabled=true;qtyInput.placeholder="Out of stock";}else{qtyInput.disabled=false;qtyInput.placeholder="Nos";}}itemList.querySelectorAll(".item-row").forEach(updateStockDisplay);itemList.addEventListener("change",(e)=>{if(e.target.name==="item_name[]"){updateStockDisplay(e.target.closest(".item-row"));}});addItem.addEventListener("click",()=>{const row=itemList.querySelector(".item-row").cloneNode(true);row.querySelectorAll("input").forEach((input)=>{input.value="";});row.querySelector("select[name=\"item_name[]\"]").selectedIndex=0;row.querySelector("select[name=\"purchase_admin_level[]\"]").selectedIndex=0;row.querySelector(".remove-item").hidden=false;row.querySelector(".remove-item").addEventListener("click",()=>{row.remove();renumberItems();});itemList.append(row);renumberItems();updateStockDisplay(row);});renumberItems();</script>`
    : '<div class="form-grid"><label>Item name<input name="item_name" placeholder="e.g. Printer cartridges" required></label><label>Quantity<input name="quantity" type="number" min="1" step="1" placeholder="e.g. 10" required></label></div>';
  res.send(`<!doctype html><html lang="en"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"><title>${config.title} ${config.emphasis}</title><link rel="stylesheet" href="/styles.css"><style>.stock-cell{font-weight:600;color:var(--ink)}.stock-cell.out{color:var(--orange)}</style></head><body><main class="shell"><div class="college-heading"><h1>SVIT VASAD</h1></div><div class="request-layout"><aside class="side-panel"><h2>Purchase<br><em>desk</em></h2><p class="sub-title">Choose a request category.</p><div class="rule"></div><nav class="nav-buttons"><a href="/" class="nav-btn"><span class="btn-icon">🏠</span> Back to main page</a><a href="/" class="nav-btn"><span class="btn-icon">🏛️</span> Auditorium Permission</a><a href="/maintenance" class="nav-btn"><span class="btn-icon">🔧</span> Maintenance Request</a><a href="/purchase/local" class="nav-btn${req.params.type === 'local' ? ' active' : ''}"><span class="btn-icon">🏪</span> Local Purchase</a><a href="/purchase/stationary" class="nav-btn${req.params.type === 'stationary' ? ' active' : ''}"><span class="btn-icon">📦</span> Purchase Stationery</a><a href="/purchase/cleaning" class="nav-btn${req.params.type === 'cleaning' ? ' active' : ''}"><span class="btn-icon">🧹</span> Cleaning Items</a><a href="/purchase/electric" class="nav-btn${req.params.type === 'electric' ? ' active' : ''}"><span class="btn-icon">⚡</span> Electric Items</a><a href="/login" class="nav-btn"><span class="btn-icon">🔐</span> Sign in</a></nav></aside><section class="main-content"><p class="eyebrow">Purchase form</p><h1>${config.title}<br><em>${config.emphasis}</em></h1><p class="lede">${config.description}</p><form class="request-form" action="/purchase" method="post"><input type="hidden" name="purchase_type" value="${req.params.type}"><div class="section-heading"><span>01</span><h3>Item details</h3></div><label>Department<select name="department" required><option value="">Select department</option>${departmentOptions}</select></label>${itemFields}<label>Unit price (₹)<input name="unit_price" type="number" min="0" step="0.01" placeholder="e.g. 250.00"></label><label>Description<textarea name="description" placeholder="Describe the item and purpose..."></textarea></label><label>Vendor name<input name="vendor" placeholder="Vendor name"></label><div class="section-heading"><span>02</span><h3>Your details</h3></div><div class="form-grid"><label>Name<input name="requester_name" placeholder="Full name" required></label><label>Mobile number<input name="requester_mobile" type="tel" pattern="[0-9]{10}" placeholder="10-digit mobile number" required></label><label>Email address<input name="requester_email" type="email" placeholder="name@svitvasad.ac.in" required></label><label>Priority<select name="priority"><option value="low">Low</option><option value="medium" selected>Medium</option><option value="high">High</option><option value="urgent">Urgent</option></select></label></div><button type="submit">${config.button} <span>↗</span></button></form></section></div><footer><span>Auditorium Registration Application</span><span>Admissiondata / 2026</span></footer></main>${req.query.submitted === '1' ? '<script>alert("Purchase request submitted successfully.");</script>' : ''}</body></html>`);
});

app.post('/purchase', async (req, res) => {
  if (!(await isRequestPageEnabled('purchase'))) return res.status(403).send('This request page is currently disabled by an administrator. Please try again later.');
  const purchaseType = req.body.purchase_type;
  if (!['local', 'stationary', 'cleaning', 'electric'].includes(purchaseType)) {
    return res.status(400).send('Invalid purchase type.');
  }

  const itemNames = Array.isArray(req.body.item_name) ? req.body.item_name.map((item) => String(item).trim()) : [String(req.body.item_name || '').trim()];
  const quantities = Array.isArray(req.body.quantity) ? req.body.quantity.map((quantity) => Number(quantity) || 0) : [Number(req.body.quantity) || 0];
  const adminLevels = Array.isArray(req.body.purchase_admin_level) ? req.body.purchase_admin_level.map((level) => String(level).trim()) : [String(req.body.purchase_admin_level || '').trim()];
  const request = {
    purchase_type: purchaseType,
    department: String(req.body.department || '').trim(),
    item_name: itemNames.join(', '),
    quantity: quantities.reduce((total, quantity) => total + quantity, 0),
    item_details: itemNames.map((item, index) => ({ item, quantity: quantities[index] || 0, purpose: Array.isArray(req.body.item_purpose) ? String(req.body.item_purpose[index] || '').trim() : '', admin_level: adminLevels[index] || 'none' })).filter((item) => item.quantity > 0),
    unit_price: Number(req.body.unit_price) || 0,
    description: String(req.body.description || '').trim(),
    vendor: String(req.body.vendor || '').trim(),
    requester_name: String(req.body.requester_name || '').trim(),
    requester_mobile: String(req.body.requester_mobile || '').trim(),
    requester_email: String(req.body.requester_email || '').trim().toLowerCase(),
    priority: req.body.priority || 'medium',
    status: 'pending'
  };

  if (req.body.confirm_out_of_stock !== '1') {
    const stock = await getPurchaseStock();
    const stockIssues = request.item_details.filter((item) => {
      const record = stock.find((candidate) => candidate.department === request.department && candidate.item_name === item.item);
      return record && Number(record.stock_quantity) < item.quantity;
    });
    if (stockIssues.length) {
      req.session.pendingPurchase = request;
      const issueRows = stockIssues.map((item) => {
        const record = stock.find((candidate) => candidate.department === request.department && candidate.item_name === item.item);
        return `<tr><td>${escapeHtml(item.item)}</td><td>${escapeHtml(item.quantity)}</td><td>${escapeHtml(record.stock_quantity)}</td></tr>`;
      }).join('');
      return res.send(`<!doctype html><html><head><meta charset="utf-8"><title>Confirm out of stock</title><link rel="stylesheet" href="/styles.css"></head><body><main class="shell panel"><section class="panel-intro"><p class="eyebrow">Stock confirmation</p><h1>Out of<br><em>stock</em></h1><p class="lede">Some requested items do not have enough stock for ${escapeHtml(request.department)}.</p></section><table class="requisition-table"><thead><tr><th>Item</th><th>Requested</th><th>Available</th></tr></thead><tbody>${issueRows}</tbody></table><form method="post" action="/purchase"><input type="hidden" name="purchase_type" value="${escapeHtml(request.purchase_type)}"><input type="hidden" name="confirm_out_of_stock" value="1"><button type="submit">Confirm purchase request <span>↗</span></button></form></main></body></html>`);
    }
  } else if (req.session.pendingPurchase) {
    Object.assign(request, req.session.pendingPurchase);
    delete req.session.pendingPurchase;
  }

  if (!request.department || !request.item_name || !request.quantity || !request.requester_name || !request.requester_mobile || !request.requester_email) {
    return res.status(400).send('All required fields must be filled.');
  }

  if (!Number.isInteger(request.quantity) || request.quantity < 1) {
    return res.status(400).send('Quantity must be a positive whole number.');
  }

  if (!['low', 'medium', 'high', 'urgent'].includes(request.priority)) {
    return res.status(400).send('Invalid priority level.');
  }

  if (supabase) {
    let { error } = await supabase.from('purchase_requests').insert(request);
    if (error?.message?.includes("'item_details' column")) {
      const { item_details: unusedItemDetails, ...legacyRequest } = request;
      ({ error } = await supabase.from('purchase_requests').insert(legacyRequest));
    }
    if (error) {
      if (error.code === 'PGRST205') {
        return res.status(503).send('Database setup required. Run supabase/schema.sql in the Supabase SQL Editor, then try again.');
      }
      return res.status(500).send(error.message);
    }
  } else {
    localPurchaseRequests.unshift({ id: Date.now(), created_at: new Date().toISOString(), ...request });
  }

  const createdId = supabase ? null : localPurchaseRequests[0].id;
  await createNotification({
    userId: request.requester_email,
    title: `Purchase request submitted`,
    message: `Your ${purchaseType} purchase request (${request.item_name}, ${request.department}) was submitted and is pending review.`,
    module: 'purchase',
    referenceId: createdId != null ? createdId : '',
    link: '/purchase/' + purchaseType
  });
  const firstApprover = (await getUsers()).find((u) => u.role === 'head');
  if (firstApprover) {
    await createNotification({
      userId: firstApprover.id,
      title: `New purchase request awaits department head approval`,
      message: `${request.requester_name} (${request.department}) submitted a ${purchaseType} purchase request.`,
      module: 'purchase',
      referenceId: createdId != null ? createdId : '',
      link: '/admin/purchase'
    });
  }

  res.redirect(`/purchase/${purchaseType}?submitted=1`);
});

app.get('/admin/purchase/stock', requireLogin, async (req, res) => {
  if (!canManagePurchases(req.session.user)) return res.status(403).send('Purchase Officer or Clerk access required.');
  const stock = await getPurchaseStock();
  const categoryOptions = Object.keys(stockCategories).map((category) => `<option value="${category}">${category[0].toUpperCase() + category.slice(1)} Items</option>`).join('');
  const catalogJson = JSON.stringify(stockCategories);
  const rows = stock.length ? stock.map((item) => `<tr><td>${escapeHtml(item.category || 'misc')}</td><td>${escapeHtml(item.department)}</td><td>${escapeHtml(item.item_name)}</td><td>${escapeHtml(item.stock_quantity)}</td><td><div class="stock-inline-group"><form class="stock-inline" action="/admin/purchase/stock/${item.id}/return" method="post"><input name="quantity" type="number" min="1" placeholder="Return +" required><label class="stock-action-select"><select name="type"><option value="RETURN">Return</option><option value="ADJUSTMENT">Adjust</option></select></label><button class="small-button" type="submit">Add</button></form><form class="stock-inline" action="/admin/purchase/stock/${item.id}/delete" method="post"><button class="small-button reject-button" type="submit">Delete</button></form></div></td></tr>`).join('') : '<tr><td colspan="5">No stock records yet.</td></tr>';
  const requestedItemMap = new Map();
  for (const purchaseRequest of await getPurchaseRequests()) {
    const requestedEntries = Array.isArray(purchaseRequest.item_details) && purchaseRequest.item_details.length
      ? purchaseRequest.item_details.map((detail) => ({ item: detail.item, quantity: detail.quantity }))
      : [{ item: purchaseRequest.item_name, quantity: purchaseRequest.quantity }];
    for (const entry of requestedEntries) {
      const key = `${purchaseRequest.department}::${entry.item}`;
      const existing = requestedItemMap.get(key) || { department: purchaseRequest.department, item: entry.item, requested: 0 };
      existing.requested += Number(entry.quantity) || 0;
      requestedItemMap.set(key, existing);
    }
  }
  const requestedRows = [...requestedItemMap.values()].map((entry) => {
    const stockRecord = stock.find((s) => s.department === entry.department && s.item_name === entry.item);
    const available = stockRecord ? Number(stockRecord.stock_quantity) : 0;
    const status = available === 0 ? 'Out of stock' : available >= entry.requested ? 'In stock' : 'Short';
    const statusColor = status === 'In stock' ? '#2a7f52' : status === 'Short' ? 'var(--orange)' : '#e74c3c';
    return `<tr><td>${escapeHtml(entry.department)}</td><td>${escapeHtml(entry.item)}</td><td>${escapeHtml((stockRecord && stockRecord.category) || 'misc')}</td><td>${escapeHtml(entry.requested)}</td><td>${escapeHtml(available)}</td><td><span class="req-stock-status" style="color:${statusColor}">${status}</span></td></tr>`;
  }).join('');
  res.send(`<!doctype html><html lang="en"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"><title>Stock register | Purchase</title><link rel="stylesheet" href="/styles.css"><style>.stock-register{margin-top:30px}.stock-form{display:grid;gap:10px}.stock-row{display:grid;grid-template-columns:1fr 1fr 1.5fr 1fr auto;gap:10px;align-items:end}.stock-row select,.stock-row input{min-width:0;padding:11px;border:1px solid var(--line);background:transparent;font:13px Arial}.stock-actions{display:flex;gap:12px;flex-wrap:wrap;margin:18px 0}.stock-inline{margin:0}.stock-inline-group{display:flex;gap:6px;flex-wrap:wrap;align-items:center}.stock-inline-group form{display:flex;gap:6px;align-items:center;margin:0}.stock-inline input[type="number"]{width:76px;padding:8px;border:1px solid var(--line);background:transparent;font:13px Arial}.stock-action-select select{padding:8px;border:1px solid var(--line);background:transparent;font:12px Arial}.register-table{margin-top:25px}.req-stock-status{font-weight:600}@media(max-width:800px){.stock-row{grid-template-columns:1fr 1fr}.stock-row button{grid-column:span 2}}</style></head><body><main class="shell panel"><header class="masthead"><div><p class="kicker">${escapeHtml(req.session.user.role)}</p><h1>Stock<br><em>register</em></h1></div><a class="page-nav" href="/admin/purchase">Back to purchase desk</a></header><section class="panel-intro"><p class="eyebrow">Inventory control</p><h2>Department-wise stock register.</h2><p class="lede">Save available stock for stationery, cleaning, electrical, plumbing, and miscellaneous items.</p></section><section class="stock-register"><div class="section-heading"><span>01</span><h3>Add or update stock</h3></div><form class="stock-form" action="/admin/purchase/stock" method="post"><div class="stock-row"><select class="stock-category" name="category[]" required>${categoryOptions}</select><input name="department[]" placeholder="Department" required><select class="stock-item" name="item_name[]" required></select><input name="stock_quantity[]" type="number" min="0" placeholder="Quantity" required><button class="remove-stock" type="button" aria-label="Remove stock row" hidden>×</button></div><button class="add-slot" id="add-stock" type="button">+ Add stock row</button><button type="submit">Save stock</button></form><div class="stock-actions"><a class="page-nav" href="/admin/purchase/stock/template">Download stock template</a><form action="/admin/purchase/stock/upload" method="post" enctype="multipart/form-data"><input type="file" name="stock_file" accept=".xlsx,.xls" required><button class="small-button" type="submit">Upload Excel</button></form></div><div class="table-wrap register-table"><table><thead><tr><th>Category</th><th>Department</th><th>Item</th><th>Available stock</th><th>Action</th></tr></thead><tbody>${rows}</tbody></table></div></section><section class="stock-register" style="margin-top:38px"><div class="section-heading"><span>02</span><h3>Department stock for requested items</h3></div><p class="small-copy">Available stock against each item that departments have requested, per department.</p><div class="table-wrap register-table"><table><thead><tr><th>Department</th><th>Item</th><th>Category</th><th>Requested</th><th>Available</th><th>Status</th></tr></thead><tbody>${requestedRows.length ? requestedRows : '<tr><td colspan="6">No requested items yet.</td></tr>'}</tbody></table></div></section></main><script>const stockCategories=${catalogJson};const stockList=document.querySelector('.stock-form');const stockRow=stockList.querySelector('.stock-row');function updateStockItems(row){const select=row.querySelector('.stock-category');const item=row.querySelector('.stock-item');item.innerHTML='<option value="">Select item</option>'+stockCategories[select.value].map((name)=>'<option value="'+name+'">'+name+'</option>').join('');}function updateStockRows(){const rows=stockList.querySelectorAll('.stock-row');rows.forEach((row)=>{row.querySelector('.remove-stock').hidden=rows.length===1;updateStockItems(row);});}stockList.querySelector('#add-stock').addEventListener('click',()=>{const row=stockRow.cloneNode(true);row.querySelectorAll('input').forEach((input)=>input.value='');row.querySelector('.stock-category').selectedIndex=0;row.querySelector('.remove-stock').hidden=false;row.querySelector('.remove-stock').addEventListener('click',()=>{row.remove();updateStockRows();});stockList.insertBefore(row,stockList.querySelector('#add-stock'));updateStockRows();});updateStockRows();stockList.addEventListener("change",(e)=>{if(e.target.classList.contains("stock-category")){updateStockItems(e.target.closest(".stock-row"));}});</script></body></html>`);
});

app.get('/admin/purchase/stock/template', requireLogin, (req, res) => {
  if (!canManagePurchases(req.session.user)) return res.status(403).send('Purchase Officer or Clerk access required.');
  workbookResponse(res, [{ Category: 'stationary', Department: 'Computer Engineering', Item: 'A/4 Size Paper', Stock: 10 }], 'stock-register-template.xlsx');
});

app.post('/admin/purchase/stock/upload', requireLogin, upload.single('stock_file'), async (req, res) => {
  if (!canManagePurchases(req.session.user)) return res.status(403).send('Purchase Officer or Clerk access required.');
  if (!req.file) return res.status(400).send('Please upload an Excel file.');
  try {
    const workbook = XLSX.read(req.file.buffer, { type: 'buffer' });
    const rows = XLSX.utils.sheet_to_json(workbook.Sheets[workbook.SheetNames[0]], { defval: '' });
    for (const row of rows) {
      const values = { category: String(row.Category || row.category || 'misc').trim().toLowerCase(), department: String(row.Department || row.department || '').trim(), item_name: String(row.Item || row.item || row['Item Name'] || '').trim(), stock_quantity: Number(row.Stock ?? row['Stock Quantity'] ?? row.stock_quantity) };
      if (!values.department || !values.item_name || !Number.isInteger(values.stock_quantity) || values.stock_quantity < 0 || !stockCategories[values.category]) continue;
      if (supabase) await supabase.from('purchase_stock').upsert(values, { onConflict: 'department,item_name' });
      else { const current = localPurchaseStock.find((item) => item.department === values.department && item.item_name === values.item_name); if (current) Object.assign(current, values); else localPurchaseStock.push({ id: Date.now() + localPurchaseStock.length, ...values }); }
    }
  } catch (error) { return res.status(400).send(`Could not read Excel file: ${error.message}`); }
  res.redirect('/admin/purchase/stock');
});

app.post('/admin/purchase/stock/:id/delete', requireLogin, async (req, res) => {
  if (!canManagePurchases(req.session.user)) return res.status(403).send('Purchase Officer or Clerk access required.');
  if (supabase) { const { error } = await supabase.from('purchase_stock').delete().eq('id', req.params.id); if (error) return res.status(500).send(error.message); }
  else { const index = localPurchaseStock.findIndex((item) => String(item.id) === req.params.id); if (index >= 0) localPurchaseStock.splice(index, 1); }
  res.redirect('/admin/purchase/stock');
});

// Return / adjust stock upward, logged as a ledger transaction (blueprint section 20).
app.post('/admin/purchase/stock/:id/return', requireLogin, async (req, res) => {
  if (!canManagePurchases(req.session.user)) return res.status(403).send('Purchase Officer or Clerk access required.');
  const type = ['RETURN', 'ADJUSTMENT'].includes(String(req.body.type).trim().toUpperCase()) ? String(req.body.type).trim().toUpperCase() : 'RETURN';
  const quantity = Number(req.body.quantity);
  if (!Number.isInteger(quantity) || quantity <= 0) return res.status(400).send('A positive whole quantity is required.');

  let item = localPurchaseStock.find((s) => String(s.id) === req.params.id);
  if (supabase) {
    const { data, error } = await supabase.from('purchase_stock').select('*').eq('id', req.params.id).maybeSingle();
    if (error) return res.status(500).send(error.message);
    item = data;
  }
  if (!item) return res.status(404).send('Stock record not found.');
  const previousStock = Number(item.stock_quantity) || 0;
  const newStock = previousStock + quantity;

  if (supabase) {
    const { error } = await supabase.from('purchase_stock').update({ stock_quantity: newStock }).eq('id', item.id);
    if (error) return res.status(500).send(error.message);
  } else {
    item.stock_quantity = newStock;
  }

  await recordStockTransaction({
    itemId: item.id,
    department: item.department,
    itemName: item.item_name,
    category: item.category || 'misc',
    type,
    quantity,
    previousStock,
    newStock,
    referenceType: 'manual',
    referenceId: item.id,
    issuedBy: req.session.user.id,
    remarks: `${type === 'RETURN' ? 'Returned' : 'Adjusted'} stock in the register`
  });
  await recordAudit({ userId: req.session.user.id, module: 'purchase', action: type === 'RETURN' ? 'STOCK_RETURN' : 'STOCK_ADJUST', referenceId: item.id, newData: { item: item.item_name, previousStock, newStock }, ipAddress: req.ip });
  res.redirect('/admin/purchase/stock');
});

app.post('/admin/purchase/stock', requireLogin, async (req, res) => {
  if (!canManagePurchases(req.session.user)) return res.status(403).send('Purchase Officer or Clerk access required.');
  const categories = Array.isArray(req.body.category) ? req.body.category : [req.body.category];
  const departments = Array.isArray(req.body.department) ? req.body.department : [req.body.department];
  const itemNames = Array.isArray(req.body.item_name) ? req.body.item_name : [req.body.item_name];
  const quantities = Array.isArray(req.body.stock_quantity) ? req.body.stock_quantity : [req.body.stock_quantity];
  for (const [index, itemName] of itemNames.entries()) {
    const values = { category: String(categories[index] || 'misc').trim().toLowerCase(), department: String(departments[index] || '').trim(), item_name: String(itemName || '').trim(), stock_quantity: Number(quantities[index]) };
    if (!values.department || !values.item_name || !Number.isInteger(values.stock_quantity) || values.stock_quantity < 0 || !stockCategories[values.category]) continue;
    let prevStock = 0;
    if (supabase) {
      const prev = await supabase.from('purchase_stock').select('stock_quantity').eq('department', values.department).eq('item_name', values.item_name).maybeSingle();
      if (prev.data) prevStock = Number(prev.data.stock_quantity) || 0;
      const { data, error } = await supabase.from('purchase_stock').upsert(values, { onConflict: 'department,item_name' }).select().single();
      if (error) return res.status(error.code === 'PGRST205' ? 503 : 500).send(error.code === 'PGRST205' ? 'Run the purchase_stock SQL migration first.' : error.message);
      if (data) {
        await recordStockTransaction({ itemId: data.id, department: values.department, itemName: values.item_name, category: values.category, type: prevStock === 0 ? 'PURCHASE' : 'ADJUSTMENT', quantity: values.stock_quantity - prevStock, previousStock: prevStock, newStock: data.stock_quantity, referenceType: 'manual', referenceId: data.id, issuedBy: req.session.user.id, remarks: prevStock === 0 ? 'Initial stock entry' : 'Stock level updated in register' });
      }
    } else {
      const current = localPurchaseStock.find((item) => item.department === values.department && item.item_name === values.item_name);
      if (current) { prevStock = Number(current.stock_quantity) || 0; current.category = values.category; current.stock_quantity = values.stock_quantity; }
      else { prevStock = 0; localPurchaseStock.push({ id: Date.now() + localPurchaseStock.length, ...values }); }
      const item = current || localPurchaseStock[localPurchaseStock.length - 1];
      if (item) await recordStockTransaction({ itemId: item.id, department: values.department, itemName: values.item_name, category: values.category, type: prevStock === 0 ? 'PURCHASE' : 'ADJUSTMENT', quantity: values.stock_quantity - prevStock, previousStock: prevStock, newStock: values.stock_quantity, referenceType: 'manual', referenceId: item.id, issuedBy: req.session.user.id, remarks: prevStock === 0 ? 'Initial stock entry' : 'Stock level updated in register' });
    }
  }
  res.redirect('/admin/purchase/stock');
});

app.get('/admin/purchase', requireLogin, async (req, res) => {
  const user = req.session.user;
  if (!canManagePurchases(user)) {
    return res.status(403).send('Purchase Officer or Clerk access required.');
  }

  const allRequests = await getPurchaseRequests();
  const stock = await getPurchaseStock();
  const typeLabels = { local: 'Local Purchase', stationary: 'Purchase Stationary', cleaning: 'Cleaning Items', electric: 'Electric Items' };
  const typeIcons = { local: '🏪', stationary: '📦', cleaning: '🧹', electric: '⚡' };
  const priorityColors = { low: 'var(--muted)', medium: 'var(--ink)', high: 'var(--orange)', urgent: '#e74c3c' };
  const priorityBg = { low: '#f0f0f0', medium: '#e8e8e8', high: 'rgba(233,119,66,0.15)', urgent: 'rgba(231,76,60,0.15)' };
  const statusLabels = { pending: 'Pending', approved: 'Approved', rejected: 'Rejected' };

  const purchaseApprovalAction = async (req, pipeline) => {
    if (req.status === 'rejected') return '<span class="muted">Rejected</span>';
    if (pipeline.done) return '<span class="muted">Complete</span>';
    let waitingForMe = isAdmin(user);
    if (!waitingForMe && pipeline.pendingApproverUserId) waitingForMe = user.id === pipeline.pendingApproverUserId;
    if (!waitingForMe && user.role === pipeline.pendingRole) waitingForMe = true;
    if (!waitingForMe && pipeline.pendingRole === 'head' && (user.departments || [user.department]).some((d) => String(d).toLowerCase() === String(req.department || '').toLowerCase())) waitingForMe = true;
    if (!waitingForMe) {
      const assignedLabel = pipeline.pendingApproverUserId ? ` (assigned to ${await approverUserLabel(pipeline.pendingApproverUserId)})` : '';
      return `<span class="muted">Waiting: ${moduleRoleLabel(pipeline.pendingRole)}${assignedLabel}</span>`;
    }
    return `<form class="request-actions" action="/admin/purchase/${req.id}/approve" method="post"><button class="small-button" type="submit">Approve</button></form><form class="request-actions reject-form" action="/admin/purchase/${req.id}/reject" method="post"><input name="remarks" placeholder="Reject remarks" required><button class="small-button reject-button" type="submit">Reject</button></form>`;
  };

  const purchaseStatusDisplay = async (req, pipeline) => {
    const statusClass = req.status === 'approved' ? 'approved' : req.status === 'rejected' ? 'rejected' : 'pending';
    let html = `<span class="status ${statusClass}">${escapeHtml(statusLabels[req.status] || req.status)}</span>`;
    if (pipeline && !pipeline.done && pipeline.totalSteps > 0) {
      const progress = `${pipeline.completedCount}/${pipeline.totalSteps}`;
      html += `<small>Route: ${pipeline.steps.map((role) => escapeHtml(moduleRoleLabel(role))).join(' → ')}</small>`;
      html += `<small>Progress: ${escapeHtml(progress)} · Next: ${escapeHtml(moduleRoleLabel(pipeline.pendingRole))}</small>`;
      if (pipeline.pendingApproverUserId) {
        html += `<small>Assigned to: ${escapeHtml(await approverUserLabel(pipeline.pendingApproverUserId))}</small>`;
      }
    }
    if (req.rejection_remarks) {
      html += `<small>Remarks: ${escapeHtml(req.rejection_remarks)}</small>`;
    }
    return html;
  };

  const rowChunks = [];
  for (const req of sortPendingFirst(allRequests)) {
    const pipeline = await purchasePipeline(req);
    const createdDate = req.created_at ? new Date(req.created_at).toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' }) : '-';
    const createdTime = req.created_at ? new Date(req.created_at).toLocaleTimeString('en-IN', { hour: '2-digit', minute: '2-digit' }) : '';
    const totalPrice = (Number(req.quantity) * Number(req.unit_price)).toFixed(2);
    const itemDetails = Array.isArray(req.item_details) && req.item_details.length
      ? `<table class="mini-slip"><thead><tr><th>Sr.</th><th>Item</th><th>Admin Level</th><th>Nos</th><th>Stock</th>${req.purchase_type === 'stationary' ? '<th>Purpose</th>' : ''}</tr></thead><tbody>${req.item_details.map((item, index) => {
          const stockRecord = stock.find((s) => s.item_name === item.item && s.department === req.department);
          const stockQty = stockRecord ? Number(stockRecord.stock_quantity) : 0;
          return `<tr><td>${index + 1}</td><td>${escapeHtml(item.item)}</td><td>${escapeHtml(item.admin_level || 'none')}</td><td>${escapeHtml(item.quantity)}</td><td>${stockQty > 0 ? stockQty : 'Out of Stock'}</td>${req.purchase_type === 'stationary' ? `<td>${escapeHtml(item.purpose || '')}</td>` : ''}</tr>`;
        }).join('')}</tbody></table>`
      : escapeHtml(req.item_name);
    rowChunks.push(`<tr>
      <td>${typeIcons[req.purchase_type] || '📋'} ${escapeHtml(typeLabels[req.purchase_type] || req.purchase_type)}</td>
      <td>${escapeHtml(req.department)}</td>
      <td>${itemDetails}<small>Total: ${escapeHtml(req.quantity)} × ₹${escapeHtml(req.unit_price)} = ₹${totalPrice}</small></td>
      <td>${escapeHtml(req.description)}<small>Vendor: ${escapeHtml(req.vendor || 'N/A')}</small></td>
      <td><span class="priority-badge" style="background:${priorityBg[req.priority] || '#f0f0f0'};color:${priorityColors[req.priority] || 'var(--ink)'}">${escapeHtml(req.priority.toUpperCase())}</span></td>
      <td>${escapeHtml(req.requester_name)}<small>${escapeHtml(req.requester_mobile)}</small><small>${escapeHtml(req.requester_email)}</small></td>
      <td>${createdDate}<small>${createdTime}</small></td>
      <td>${await purchaseStatusDisplay(req, pipeline)} <a class="page-nav" href="/admin/purchase/${req.id}/document" target="_blank">Approval sheet ↗</a></td>
      <td>${await purchaseApprovalAction(req, pipeline)}</td>
    </tr>`);
  }
  const rows = rowChunks.length ? rowChunks.join('') : '<tr><td colspan="9">No purchase requests yet.</td></tr>';

  res.send(`<!doctype html><html lang="en"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"><title>Purchase Requests | Admin</title><link rel="stylesheet" href="/styles.css"><style>
    .college-heading{text-align:center;margin:20px 0 10px}.college-heading h1{font-size:clamp(36px,6vw,64px);font-weight:700;letter-spacing:.08em;margin:0}
    .panel-intro h2{font-size:42px;font-weight:400;margin:14px 0 10px;letter-spacing:-.03em}
    .panel-intro .lede{font:14px/1.5 Arial,sans-serif;color:var(--muted)}
    .table-wrap{overflow-x:auto}table{width:100%;border-collapse:collapse;font:14px Arial,sans-serif}
    th{text-align:left;font-size:10px;text-transform:uppercase;letter-spacing:.1em;color:var(--muted);padding:13px 10px;border-bottom:1px solid var(--ink)}
    td{padding:17px 10px;border-bottom:1px solid var(--line);vertical-align:top}
    td small{display:block;color:var(--muted);font-size:11px;margin-top:3px}
    .status{display:inline-block;padding:5px 10px;font-size:10px;text-transform:uppercase;letter-spacing:.06em}
    .status.pending{background:var(--lime);color:var(--ink)}
    .status.approved{background:var(--ink);color:var(--paper)}
    .status.rejected{background:var(--orange);color:#fff}
    .muted{color:var(--muted);font-size:12px}
    .small-button{margin:0;padding:8px 10px;font-size:10px}
    .request-actions{display:inline-block;margin:0 4px 4px 0}
    .reject-form input{width:150px;font-size:12px;padding:8px;border:1px solid var(--line);border-radius:4px}
    .reject-button{background:#e97742;color:#fff;border-color:#e97742}
    .priority-badge{display:inline-block;padding:4px 10px;border-radius:4px;font:600 11px Arial,sans-serif;letter-spacing:.05em}
    .admin-tools{display:flex;gap:14px;align-items:center;flex-wrap:wrap;margin:18px 0}.mini-slip{width:100%;border-collapse:collapse;font-size:11px;margin-bottom:5px}.mini-slip th{background:var(--ink);color:var(--paper);padding:5px;font-size:9px}.mini-slip td{padding:5px;border-bottom:1px solid var(--line)}
  </style></head><body><main class="shell panel">
    <div class="college-heading"><h1>SVIT VASAD</h1></div>
    <header class="masthead"><div><p class="kicker">${escapeHtml(user.role)}</p><h1>Purchase<br><em>Approval Desk</em></h1></div><form action="/logout" method="post"><button class="quiet" type="submit">Sign out</button></form></header>
    <section class="panel-intro"><p class="eyebrow">Signed in as ${escapeHtml(user.name)}</p><h2>Purchase requests.</h2><p class="lede">Review and approve purchase requests from departments.</p><div class="admin-tools"><a class="page-nav" href="/admin">Back to Admin</a></div></section>
    <section class="table-wrap"><table><thead><tr><th>Type</th><th>Department</th><th>Item</th><th>Details</th><th>Priority</th><th>Requester</th><th>Date</th><th>Status</th><th>Action</th></tr></thead><tbody>${rows}</tbody></table></section><section class="user-management"><div class="section-heading"><span>05</span><h3>Department stock</h3></div><p class="small-copy">Use the full register for category selection, multiple rows, Excel upload, and deletion.</p><div class="admin-tools"><a class="page-nav" href="/admin/purchase/stock">Open stock register ↗</a><a class="page-nav" href="/admin/purchase/stock/template">Download stock template</a></div>${stock.length ? `<div class="table-wrap"><table><thead><tr><th>Category</th><th>Department</th><th>Item</th><th>Available stock</th></tr></thead><tbody>${stock.map((item) => `<tr><td>${escapeHtml(item.category || 'misc')}</td><td>${escapeHtml(item.department)}</td><td>${escapeHtml(item.item_name)}</td><td>${escapeHtml(item.stock_quantity)}</td></tr>`).join('')}</tbody></table></div>` : ''}</section>
  </main></body></html>`);
});

app.post('/admin/purchase/:id/approve', requireLogin, async (req, res) => {
  const user = req.session.user;
  if (!canManagePurchases(user)) {
    return res.status(403).send('Purchase Officer or Clerk access required.');
  }

  let request = localPurchaseRequests.find((r) => String(r.id) === req.params.id);
  if (supabase) {
    const { data, error } = await supabase.from('purchase_requests').select('*').eq('id', req.params.id).maybeSingle();
    if (error) return res.status(500).send(error.message);
    request = data;
  }
  if (!request) return res.status(404).send('Request not found.');

  const pipeline = await purchasePipeline(request);
  if (pipeline.done) return res.status(409).send('This request has no pending approval step.');

  // Only the role waiting at the current step (or an admin) may approve.
  // If a specific person was assigned to the step, only that person may act.
  const isAdminUser = isAdmin(user);
  let allowed = isAdminUser;
  if (!allowed && pipeline.pendingApproverUserId) {
    allowed = user.id === pipeline.pendingApproverUserId;
    if (!allowed) return res.status(403).send(`This request is specifically assigned to ${await approverUserLabel(pipeline.pendingApproverUserId)}.`);
  }
  if (!allowed) {
    const isWaitingRole = user.role === pipeline.pendingRole;
    const isHeadForDept = pipeline.pendingRole === 'head' && (user.departments || [user.department]).some((d) => String(d).toLowerCase() === String(request.department || '').toLowerCase());
    allowed = isWaitingRole || isHeadForDept;
  }
  if (!allowed) {
    return res.status(403).send(`This request is waiting for ${moduleRoleLabel(pipeline.pendingRole)} approval.`);
  }

  const newStep = pipeline.completedCount + 1;
  const allDone = newStep >= pipeline.totalSteps;

  if (supabase) {
    const { error } = await supabase.from('purchase_requests').update({ approval_step: newStep, status: allDone ? 'approved' : 'pending' }).eq('id', req.params.id);
    if (error) return res.status(500).send(error.message);
  } else if (request) {
    request.approval_step = newStep;
    request.status = allDone ? 'approved' : 'pending';
  }

  await recordApproval({
    module: 'purchase',
    requestType: request.purchase_type || 'local',
    requestId: request.id,
    workflowId: pipeline.workflowId,
    bandId: pipeline.bandId,
    stepNo: pipeline.completedCount + 1,
    approverUserId: user.id,
    approverRoleId: user.role,
    action: 'APPROVED',
    comments: String((req.body && req.body.comments) || ''),
    ipAddress: req.ip
  });

  await recordAudit({ userId: user.id, module: 'purchase', action: allDone ? 'APPROVE_FINAL' : 'APPROVE_STEP', referenceId: request.id, newData: { status: allDone ? 'approved' : 'pending', approval_step: newStep }, ipAddress: req.ip });

  // Automatic stock deduction on full approval (blueprint section 20).
  // Non-'local' requests (stationary / cleaning / electric) are issued from stock
  // and the balance is decremented and logged as an ISSUE transaction.
  if (allDone && request.purchase_type !== 'local') {
    try {
      const stock = await getPurchaseStock();
      const issuedItems = Array.isArray(request.item_details) && request.item_details.length
        ? request.item_details
        : [{ item: request.item_name, quantity: request.quantity }];
      for (const line of issuedItems) {
        const record = stock.find((s) => s.department === request.department && s.item_name === line.item);
        if (!record) continue;
        const issued = Number(line.quantity) || 0;
        const previousStock = Number(record.stock_quantity) || 0;
        if (issued <= 0) continue;
        const newStock = Math.max(0, previousStock - issued);
        if (supabase) {
          const { error } = await supabase.from('purchase_stock').update({ stock_quantity: newStock }).eq('id', record.id);
          if (error) console.error(`Stock deduction error: ${error.message}`);
        } else {
          record.stock_quantity = newStock;
        }
        await recordStockTransaction({
          itemId: record.id,
          department: request.department,
          itemName: line.item,
          category: record.category || request.purchase_type || 'misc',
          type: 'ISSUE',
          quantity: issued,
          previousStock,
          newStock,
          referenceType: 'purchase_requests',
          referenceId: request.id,
          issuedBy: user.id,
          remarks: `Issued after full approval of ${request.purchase_type} request`
        });
      }
    } catch (e) { console.error(`Automatic stock deduction failed: ${e.message}`); }
  }

  // In-app notifications: tell the requester how far the request has advanced,
  // and (if another step remains) the next approver that a decision is needed.
  await createNotification({
    userId: request.requester_email,
    title: allDone ? `Purchase request ${request.request_no || ('#' + request.id)} approved` : `Purchase request ${request.request_no || ('#' + request.id)} step approved`,
    message: allDone
      ? `Your ${request.purchase_type} purchase request for ₹${requestAmount(request)} has been fully approved.`
      : `Your purchase request advanced. Next to review: ${moduleRoleLabel(pipeline.pendingRole)}.`,
    module: 'purchase',
    referenceId: request.id,
    link: '/admin/purchase'
  });
  if (!allDone) {
    let nextApproverId = pipeline.pendingApproverUserId;
    if (!nextApproverId) {
      const nextApprover = (await getUsers()).find((u) => u.role === pipeline.pendingRole);
      nextApproverId = nextApprover ? nextApprover.id : null;
    }
    if (nextApproverId) {
      await createNotification({
        userId: nextApproverId,
        title: `Purchase request awaiting your approval`,
        message: `A purchase request (${request.department || ''}, ₹${requestAmount(request)}) is waiting for ${moduleRoleLabel(pipeline.pendingRole)} approval.${pipeline.pendingApproverUserId ? ' It is assigned to you.' : ''}`,
        module: 'purchase',
        referenceId: request.id,
        link: '/admin/purchase'
      });
    }
  }

  if (mailer && request?.requester_email) {
    try {
      const stepStatus = pipeline.steps.slice(0, pipeline.completedCount).concat(pipeline.pendingRole).map((r) => moduleRoleLabel(r)).join(' → ');
      await mailer.sendMail({
        from: senderEmail,
        to: request.requester_email,
        subject: allDone ? `Purchase request approved: ${request.item_name}` : `Purchase request step approved: ${request.item_name}`,
        text: allDone
          ? `Your purchase request has been fully approved.\n\nItem: ${request.item_name}\nQuantity: ${request.quantity}\nUnit Price: ₹${request.unit_price}\nAmount: ₹${requestAmount(request)}\nRoute: ${stepStatus}\nStatus: Approved\n\nPlease proceed with the purchase.`
          : `Your purchase request advanced to the next approval stage.\n\nItem: ${request.item_name}\nAmount: ₹${requestAmount(request)}\nApproval route: ${pipeline.steps.map((r) => moduleRoleLabel(r)).join(' → ')}\nNext waiting role: ${moduleRoleLabel(pipeline.pendingRole)}`
      });
    } catch (e) { console.error(`Purchase approval email error: ${e.message}`); }
  }

  res.redirect('/admin/purchase');
});

app.post('/admin/purchase/:id/reject', requireLogin, async (req, res) => {
  const user = req.session.user;
  if (!canManagePurchases(user)) {
    return res.status(403).send('Purchase Officer or Clerk access required.');
  }

  let request = localPurchaseRequests.find((r) => String(r.id) === req.params.id);
  if (supabase) {
    const { data, error } = await supabase.from('purchase_requests').select('*').eq('id', req.params.id).maybeSingle();
    if (error) return res.status(500).send(error.message);
    request = data;
  }
  if (!request) return res.status(404).send('Request not found.');
  if (request.status !== 'pending') return res.status(409).send('This request has already been processed.');

  const remarks = String(req.body.remarks || '').trim();
  if (!remarks) return res.status(400).send('Rejection remarks are required.');

  const pipeline = await purchasePipeline(request);

  if (supabase) {
    const { error } = await supabase.from('purchase_requests').update({ status: 'rejected', rejection_remarks: remarks }).eq('id', req.params.id);
    if (error) return res.status(500).send(error.message);
  } else if (request) {
    request.status = 'rejected';
    request.rejection_remarks = remarks;
  }

  await recordApproval({
    module: 'purchase',
    requestType: request.purchase_type || 'local',
    requestId: request.id,
    workflowId: pipeline.workflowId,
    bandId: pipeline.bandId,
    stepNo: pipeline.completedCount + 1,
    approverUserId: user.id,
    approverRoleId: user.role,
    action: 'REJECTED',
    comments: remarks,
    ipAddress: req.ip
  });

  await createNotification({
    userId: request.requester_email,
    title: `Purchase request ${request.request_no || ('#' + request.id)} rejected`,
    message: `Your ${request.purchase_type} purchase request was rejected by ${moduleRoleLabel(user.role)}. Remarks: ${remarks}`,
    module: 'purchase',
    referenceId: request.id,
    link: '/admin/purchase'
  });

  await recordAudit({ userId: user.id, module: 'purchase', action: 'REJECT', referenceId: request.id, newData: { status: 'rejected', remarks }, ipAddress: req.ip });

  if (mailer && request?.requester_email) {
    try {
      await mailer.sendMail({
        from: senderEmail,
        to: request.requester_email,
        subject: `Purchase request rejected: ${request.item_name}`,
        text: `Your purchase request has been rejected.\n\nItem: ${request.item_name}\nStatus: Rejected\nRemarks: ${remarks}\n\nPlease contact the administration for more details.`
      });
    } catch (e) { console.error(`Purchase rejection email error: ${e.message}`); }
  }

  res.redirect('/admin/purchase');
});

// --- Printable approval document with signature boxes (blueprint section 31) ---
app.get('/admin/purchase/:id/document', requireLogin, async (req, res) => {
  if (!canManagePurchases(req.session.user)) return res.status(403).send('Purchase Officer or Clerk access required.');
  let request = localPurchaseRequests.find((r) => String(r.id) === req.params.id);
  if (supabase) {
    const { data, error } = await supabase.from('purchase_requests').select('*').eq('id', req.params.id).maybeSingle();
    if (error) return res.status(500).send(error.message);
    request = data;
  }
  if (!request) return res.status(404).send('Request not found.');

  const pipeline = await purchasePipeline(request);
  const institute = await getSystemSetting('INSTITUTE_NAME');
  const signatoryBoxes = [];
  for (let index = 0; index < pipeline.steps.length; index += 1) {
    const role = pipeline.steps[index];
    const assignedUserId = pipeline.approvers ? pipeline.approvers[index] : null;
    const assignedName = assignedUserId ? await approverUserLabel(assignedUserId) : '';
    const isPending = index >= pipeline.completedCount;
    const roleLabel = moduleRoleLabel(role);
    signatoryBoxes.push(`<div class="sig-box"><span class="sig-role">${escapeHtml(roleLabel)}</span><span class="sig-status ${isPending ? 'pending' : 'signed'}">${isPending ? 'Awaiting signature' : 'Signed'}</span>${assignedName ? `<span class="sig-line">Assigned to: ${escapeHtml(assignedName)}</span>` : ''}<div class="sig-line">Signature</div><div class="sig-line">Name & Date</div></div>`);
  }
  const signatories = signatoryBoxes.join('');

  const lineItems = Array.isArray(request.item_details) && request.item_details.length
    ? request.item_details.map((detail) => `<tr><td>${escapeHtml(detail.item || '')}</td><td class="num">${escapeHtml(detail.quantity)}</td><td class="num">${escapeHtml(detail.estimated_rate || '')}</td><td class="num">${escapeHtml(detail.amount || '')}</td></tr>`).join('')
    : `<tr><td>${escapeHtml(request.item_name || '')}</td><td class="num">${escapeHtml(request.quantity)}</td><td class="num">${escapeHtml(request.estimated_rate || request.unit_price || '')}</td><td class="num">${escapeHtml(request.amount || '')}</td></tr>`;

  res.send(`<!doctype html><html lang="en"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"><title>Purchase document ${request.request_no || '#' + request.id}</title><link rel="stylesheet" href="/styles.css"><style>.doc{max-width:820px;margin:30px auto;padding:44px 52px;background:#fff;border:1px solid var(--line);color:var(--ink)}.doc-head{text-align:center;border-bottom:3px double var(--ink);padding-bottom:16px;margin-bottom:26px}.doc-head h1{font-size:26px;margin:0;text-transform:uppercase;font-weight:700}.doc-head p{margin:6px 0 0;color:var(--muted);font-size:13px}.doc-title{text-align:center;font-size:18px;font-weight:600;margin:6px 0 20px;text-transform:uppercase;letter-spacing:.05em}.meta{display:grid;grid-template-columns:1fr 1fr;gap:6px 24px;font-size:14px;margin:18px 0}.meta b{font-weight:600}.items{width:100%;border-collapse:collapse;margin:18px 0;font-size:14px}.items th{text-align:left;font-size:11px;text-transform:uppercase;letter-spacing:.08em;color:var(--muted);border-bottom:1px solid var(--ink);padding:10px 8px}.items td{padding:10px 8px;border-bottom:1px solid var(--line)}.items .num{text-align:right}.sigs{display:grid;grid-template-columns:repeat(auto-fit,minmax(200px,1fr));gap:14px;margin-top:40px}.sig-box{border:1px solid var(--line);border-top:4px solid var(--ink);padding:14px 16px 20px;min-height:120px;display:flex;flex-direction:column;gap:6px}.sig-role{font-weight:700;font-size:14px;text-transform:uppercase;letter-spacing:.03em}.sig-status{font-size:11px;text-transform:uppercase;letter-spacing:.05em}.sig-status.pending{color:var(--orange)}.sig-status.signed{color:#2e7d32}.sig-line{margin-top:26px;font-size:12px;color:var(--muted);border-top:1px dotted var(--line);padding-top:4px}.toolbar{max-width:820px;margin:20px auto;display:flex;gap:12px}.toolbar a,.toolbar button{font:13px Arial;padding:10px 16px;border:1px solid var(--line);background:transparent;cursor:pointer;text-decoration:none;color:var(--ink)}@media print{.toolbar{display:none}.doc{border:none;margin:0;padding:24px}}body{background:#fafafa}</style></head><body><div class="toolbar"><a href="/admin/purchase">← Back to purchase desk</a><a href="/dashboard">Back to main page</a><button onclick="window.print()">Print / Save as PDF</button></div><main class="doc"><div class="doc-head"><h1>${escapeHtml(institute)}</h1><p>Purchase Approval Document</p></div><div class="doc-title">Local / Stock Purchase Request — Approval Sheet</div><div class="meta"><span><b>Request No:</b> ${escapeHtml(request.request_no || '#' + request.id)}</span><span><b>Date:</b> ${escapeHtml(request.created_at ? new Date(request.created_at).toLocaleDateString() : '')}</span><span><b>Department:</b> ${escapeHtml(request.department || '')}</span><span><b>Type:</b> ${escapeHtml(request.purchase_type || 'local')}</span><span><b>Requester:</b> ${escapeHtml(request.requester_name || '')}</span><span><b>Status:</b> <b>${escapeHtml(request.status)}</b></span></div><table class="items"><thead><tr><th>Item</th><th class="num">Qty</th><th class="num">Rate</th><th class="num">Amount</th></tr></thead><tbody>${lineItems}</tbody></table><p style="font-size:13px;color:var(--muted)">Purpose / Description: ${escapeHtml(request.description || request.purpose || '—')}</p><h3 style="margin:34px 0 6px;font-size:12px;text-transform:uppercase;letter-spacing:.08em;color:var(--muted)">Approval chain</h3><div class="sigs">${signatories || '<p style="color:var(--muted)">No approval steps configured for this request type.</p>'}</div></main></body></html>`);
});

app.post('/admin/purchase/:id/delete', requireLogin, async (req, res) => {
  if (req.session.user.role !== 'admin') return res.status(403).send('Admin access required.');
  if (supabase) {
    const { error } = await supabase.from('purchase_requests').delete().eq('id', req.params.id);
    if (error) return res.status(500).send(error.message);
  } else {
    const index = localPurchaseRequests.findIndex((r) => String(r.id) === req.params.id);
    if (index >= 0) localPurchaseRequests.splice(index, 1);
  }
  res.redirect('/admin/purchase');
});

app.get('/admin/inventory', requireLogin, async (req, res) => {
  if (!canManagePurchases(req.session.user)) return res.status(403).send('Purchase manager access required.');
  const inventory = await getInventory();
  const departments = await getDepartments();
  const departmentDataList = departments.map((department) => `<option value="${escapeHtml(department.name)}">`).join('');
  const searchQuery = String(req.query.q || '').trim().toLowerCase();
  const pageSize = 100;
  const page = Math.max(1, Number.parseInt(req.query.page, 10) || 1);
  const filtered = searchQuery ? inventory.filter((entry) => [entry.college, entry.department, entry.floor, entry.office, entry.item_category, entry.item_name].some((value) => String(value || '').toLowerCase().includes(searchQuery))) : inventory;
  const totalPages = Math.max(1, Math.ceil(filtered.length / pageSize));
  const pageRecords = filtered.slice((page - 1) * pageSize, page * pageSize);
  const linkParams = new URLSearchParams({ q: searchQuery });
  const rows = pageRecords.length ? pageRecords.map((entry) => `<tr><td colspan="8"><form class="inv-edit" action="/admin/inventory/${entry.id}" method="post"><input name="college" value="${escapeHtml(entry.college)}" aria-label="College" required><input name="department" value="${escapeHtml(entry.department)}" aria-label="Department" required><input name="floor" value="${escapeHtml(entry.floor)}" aria-label="Floor"><input name="office" value="${escapeHtml(entry.office)}" aria-label="Office"><input name="item_category" value="${escapeHtml(entry.item_category)}" aria-label="Item category"><input name="item_name" value="${escapeHtml(entry.item_name)}" aria-label="Item" required><input name="quantity" type="number" min="0" value="${escapeHtml(entry.quantity ?? 0)}" aria-label="Quantity" required><button class="small-button" type="submit">Save</button></form><form class="stock-inline" action="/admin/inventory/${entry.id}/delete" method="post"><button class="small-button reject-button" type="submit">Delete</button></form></td></tr>`).join('') : '<tr><td colspan="8">No inventory records yet.</td></tr>';
  const pager = `<nav class="inv-pager"><span>Showing ${pageRecords.length} of ${filtered.length} records</span>${page > 1 ? `<a class="page-nav" href="/admin/inventory?page=${page - 1}&${linkParams}">« Previous</a>` : ''}<span class="inv-pagecount">Page ${page} of ${totalPages}</span>${page < totalPages ? `<a class="page-nav" href="/admin/inventory?page=${page + 1}&${linkParams}">Next »</a>` : ''}</nav>`;
  res.send(`<!doctype html><html lang="en"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"><title>Inventory register</title><link rel="stylesheet" href="/styles.css"><style>.inventory-register{margin-top:30px}.inv-row{display:grid;grid-template-columns:1fr 1.2fr .8fr 1fr 1.2fr 1.4fr .7fr auto;gap:8px;align-items:end}.inv-edit{display:grid;grid-template-columns:1fr 1.2fr .8fr 1fr 1.2fr 1.4fr .7fr auto;gap:8px;align-items:center}.inv-row input,.inv-edit input{min-width:0;padding:11px;border:1px solid var(--line);background:transparent;font:13px Arial}.stock-inline{margin:0}.inv-tools{display:flex;gap:12px;flex-wrap:wrap;margin:18px 0}.register-table{margin-top:25px}.inv-total{font-weight:700}.inv-search{display:flex;gap:10px;margin:18px 0 12px}.inv-search input{flex:1;min-width:0;padding:11px;border:1px solid var(--line);background:transparent;font:13px Arial}.inv-pager{display:flex;align-items:center;gap:14px;flex-wrap:wrap;margin:14px 0}.inv-pager span{font-size:12px;color:var(--muted)}.inv-pagecount{font-weight:700;color:var(--ink)}.inv-filters{display:grid;grid-template-columns:1fr 1fr;gap:10px;align-items:end;margin:16px 0}.inv-filters select{min-width:0;padding:11px;border:1px solid var(--line);background:transparent;font:13px Arial}@media(max-width:900px){.inv-row,.inv-edit{grid-template-columns:1fr 1fr}.inv-row button,.inv-edit button{grid-column:span 2}.inv-filters{grid-template-columns:1fr}}</style></head><body><main class="shell panel"><header class="masthead"><div><p class="kicker">${escapeHtml(req.session.user.role)}</p><h1>Inventory<br><em>register</em></h1></div><a class="page-nav" href="/admin/pages">Back to admin pages</a></header><section class="panel-intro"><p class="eyebrow">Asset control</p><h2>One-campus inventory register.</h2><p class="lede">Departments, floors, offices and rooms with item quantities — the SVIT inventory format.</p></section><section class="inventory-register"><div class="section-heading"><span>01</span><h3>Add inventory rows</h3></div><form class="stock-form" action="/admin/inventory" method="post"><div class="inv-row"><input class="inv-college" name="college[]" value="SVIT Vasad" placeholder="College" required><input name="department[]" list="inv-departments" placeholder="Department" required><input name="floor[]" placeholder="Floor"><input name="office[]" placeholder="Office / Room"><input name="item_category[]" placeholder="Item category"><input name="item_name[]" placeholder="Item name" required><input name="quantity[]" type="number" min="0" placeholder="Qty" required><button class="remove-stock" type="button" aria-label="Remove inventory row" hidden>×</button></div><button class="add-slot" id="add-inventory" type="button">+ Add row</button><button type="submit">Save all</button></form><datalist id="inv-departments">${departmentDataList}</datalist><div class="inv-tools"><a class="page-nav" href="/admin/inventory/export">Download Excel (all data) ↗</a><a class="page-nav" href="/admin/inventory/template">Download template ↗</a><form action="/admin/inventory/upload" method="post" enctype="multipart/form-data"><input type="file" name="inventory_file" accept=".xlsx,.xls" required><button class="small-button" type="submit">Upload Excel</button></form></div><form class="inv-search" action="/admin/inventory" method="get"><input name="q" value="${escapeHtml(req.query.q || '')}" placeholder="Search college, department, floor, office, item..." aria-label="Search inventory"><button type="submit">Search</button><a class="page-nav" href="/admin/inventory">Clear</a></form><div class="table-wrap register-table"><table><thead><tr><th>College</th><th>Department</th><th>Floor</th><th>Office</th><th>Item category</th><th>Item</th><th>Qty</th><th>Action</th></tr></thead><tbody>${rows}</tbody></table></div>${pager}</section><section class="inventory-register"><div class="section-heading"><span>02</span><h3>Branch-wise Excel export</h3></div><p class="small-copy">Filter by college, department (branch), floor, office, and item — item totals cover all campuses.</p><div class="inv-filters"><select id="f-college" aria-label="College"><option value="">All colleges</option></select><select id="f-department" aria-label="Department"><option value="">All departments</option></select><select id="f-floor" aria-label="Floor"><option value="">All floors</option></select><select id="f-office" aria-label="Office"><option value="">All offices</option></select><select id="f-item" aria-label="Item"><option value="">All items</option></select></div><a class="page-nav" id="export-advanced" href="/admin/inventory/export/advanced">Download branch-wise Excel ↗</a></section></main><script>const inventoryList=document.querySelector('.stock-form');const inventoryRow=inventoryList.querySelector('.inv-row');function updateInventoryRows(){const rows=inventoryList.querySelectorAll('.inv-row');rows.forEach((row)=>{row.querySelector('.remove-stock').hidden=rows.length===1;});}inventoryList.querySelector('#add-inventory').addEventListener('click',()=>{const row=inventoryRow.cloneNode(true);row.querySelectorAll('input').forEach((input)=>{input.value='';});row.querySelector('.inv-college').value='SVIT Vasad';row.querySelector('.remove-stock').hidden=false;row.querySelector('.remove-stock').addEventListener('click',()=>{row.remove();updateInventoryRows();});inventoryList.insertBefore(row,inventoryList.querySelector('#add-inventory'));updateInventoryRows();});updateInventoryRows();const filterEl=(id)=>document.getElementById(id);const filterBlank=(el)=>{const blank=document.createElement('option');blank.value='';blank.textContent=el.id==='f-college'?'All colleges':el.id==='f-department'?'All departments':el.id==='f-floor'?'All floors':el.id==='f-office'?'All offices':'All items';return blank;};const setFilterOptions=(el,list)=>{const current=el.value;el.innerHTML='';el.appendChild(filterBlank(el));for(const value of list){const option=document.createElement('option');option.value=value;option.textContent=value;el.appendChild(option);}if([...el.options].some((option)=>option.value===current))el.value=current;};const refreshFilters=()=>{const params=new URLSearchParams({college:filterEl('f-college').value,department:filterEl('f-department').value,floor:filterEl('f-floor').value,office:filterEl('f-office').value,item:filterEl('f-item').value});fetch('/admin/inventory/options?'+params.toString()).then((response)=>response.json()).then((data)=>{setFilterOptions(filterEl('f-college'),data.college);setFilterOptions(filterEl('f-department'),data.department);setFilterOptions(filterEl('f-floor'),data.floor);setFilterOptions(filterEl('f-office'),data.office);setFilterOptions(filterEl('f-item'),data.item);const href=new URL('/admin/inventory/export/advanced',location.origin);const linkParams=new URLSearchParams({college:filterEl('f-college').value,department:filterEl('f-department').value,floor:filterEl('f-floor').value,office:filterEl('f-office').value,item:filterEl('f-item').value});href.search=linkParams.toString();filterEl('export-advanced').setAttribute('href',href.pathname+href.search);});};['f-college','f-department','f-floor','f-office','f-item'].forEach((id)=>filterEl(id).addEventListener('change',refreshFilters));refreshFilters();</script></body></html>`);
});

app.get('/admin/inventory/export', requireLogin, async (req, res) => {
  if (!canManagePurchases(req.session.user)) return res.status(403).send('Purchase manager access required.');
  const inventory = await getInventory();
  const workbook = XLSX.utils.book_new();
  const sheet = XLSX.utils.json_to_sheet(inventory.map((entry) => ({ College: entry.college || 'SVIT Vasad', Department: entry.department || '', Floor: entry.floor || '', Office: entry.office || '', 'Item Category': entry.item_category || '', Item: entry.item_name || '', Quantity: entry.quantity ?? 0 })));
  XLSX.utils.book_append_sheet(workbook, sheet, 'Inventory');
  const buffer = XLSX.write(workbook, { type: 'buffer', bookType: 'xlsx' });
  res.type('application/vnd.openxmlformats-officedocument.spreadsheetml.sheet').attachment('inventory.xlsx').send(buffer);
});

app.get('/admin/inventory/template', requireLogin, (req, res) => {
  if (!canManagePurchases(req.session.user)) return res.status(403).send('Purchase manager access required.');
  const workbook = XLSX.utils.book_new();
  const sheet = XLSX.utils.json_to_sheet([{ College: 'SVIT Vasad', Department: 'Mechanical', Floor: 'Ground Floor', Office: 'MSM lab', 'Item Category': 'Tables', Item: '(a) Reading Tables', Quantity: 4 }]);
  XLSX.utils.book_append_sheet(workbook, sheet, 'Inventory');
  const buffer = XLSX.write(workbook, { type: 'buffer', bookType: 'xlsx' });
  res.type('application/vnd.openxmlformats-officedocument.spreadsheetml.sheet').attachment('inventory-template.xlsx').send(buffer);
});

app.post('/admin/inventory/upload', requireLogin, upload.single('inventory_file'), async (req, res) => {
  if (!canManagePurchases(req.session.user)) return res.status(403).send('Purchase manager access required.');
  if (!req.file) return res.status(400).send('Please upload an Excel file.');
  try {
    const workbook = XLSX.read(req.file.buffer, { type: 'buffer' });
    const rows = XLSX.utils.sheet_to_json(workbook.Sheets[workbook.SheetNames[0]], { defval: '' });
    for (const row of rows) {
      const values = {
        college: String(row.College || row.college || 'SVIT Vasad').trim(),
        department: String(row.Department || row.department || '').trim(),
        floor: String(row.Floor || row.floor || '').trim(),
        office: String(row.Office || row.office || '').trim(),
        item_category: String(row['Item Category'] || row.Category || row.category || '').trim(),
        item_name: String(row.Item || row['Item Name'] || row.item_name || '').trim(),
        quantity: Number(row.Quantity ?? row.qty ?? row.quantity ?? 0) || 0
      };
      if (!values.department || !values.item_name || !Number.isInteger(values.quantity) || values.quantity < 0) continue;
      if (supabase) await supabase.from('inventory').upsert(values, { onConflict: 'college,department,floor,office,item_category,item_name' });
      else upsertInventoryLocal(values);
    }
  } catch (error) { return res.status(400).send(`Could not read Excel file: ${error.message}`); }
  res.redirect('/admin/inventory');
});

app.post('/admin/inventory', requireLogin, async (req, res) => {
  if (!canManagePurchases(req.session.user)) return res.status(403).send('Purchase manager access required.');
  const itemNames = Array.isArray(req.body.item_name) ? req.body.item_name : [req.body.item_name];
  for (const [index, itemName] of itemNames.entries()) {
    const values = inventoryValues(req.body, index);
    if (!values.department || !values.item_name || !Number.isInteger(values.quantity) || values.quantity < 0) continue;
    if (supabase) {
      const { error } = await supabase.from('inventory').upsert(values, { onConflict: 'college,department,floor,office,item_category,item_name' });
      if (error) return res.status(error.code === 'PGRST205' ? 503 : 500).send(error.code === 'PGRST205' ? 'Run the inventory SQL migration first.' : error.message);
    } else {
      upsertInventoryLocal(values);
    }
  }
  res.redirect('/admin/inventory');
});

app.post('/admin/inventory/:id', requireLogin, async (req, res) => {
  if (!canManagePurchases(req.session.user)) return res.status(403).send('Purchase manager access required.');
  const values = inventoryValues(req.body);
  if (!values.department || !values.item_name || !Number.isInteger(values.quantity) || values.quantity < 0) return res.status(400).send('All required fields must be filled correctly.');
  if (supabase) {
    const { error } = await supabase.from('inventory').update(values).eq('id', req.params.id);
    if (error) return res.status(500).send(error.message);
  } else {
    const current = localInventory.find((item) => String(item.id) === req.params.id);
    if (current) Object.assign(current, values);
  }
  res.redirect('/admin/inventory');
});

app.post('/admin/inventory/:id/delete', requireLogin, async (req, res) => {
  if (!canManagePurchases(req.session.user)) return res.status(403).send('Purchase manager access required.');
  if (supabase) { const { error } = await supabase.from('inventory').delete().eq('id', req.params.id); if (error) return res.status(500).send(error.message); }
  else { const index = localInventory.findIndex((item) => String(item.id) === req.params.id); if (index >= 0) localInventory.splice(index, 1); }
  res.redirect('/admin/inventory');
});

const inventoryMatches = (entry, filters = {}) => {
  const match = (value, expected) => {
    const query = String(expected || '').trim();
    return !query || String(value || '') === query;
  };
  return match(entry.college, filters.college)
    && match(entry.department, filters.department)
    && match(entry.floor, filters.floor)
    && match(entry.office, filters.office)
    && match(entry.item_name, filters.item);
};

app.get('/admin/inventory/options', requireLogin, async (req, res) => {
  if (!canManagePurchases(req.session.user)) return res.status(403).send('Purchase manager access required.');
  const inventory = await getInventory();
  const filtered = inventory.filter((entry) => inventoryMatches(entry, req.query || {}));
  const distinct = (list) => [...new Set(list.map((value) => String(value).trim()).filter(Boolean))].sort((a, b) => a.localeCompare(b));
  res.json({
    college: distinct(inventory.map((entry) => entry.college)),
    department: distinct(inventory.map((entry) => entry.department)),
    floor: distinct(filtered.map((entry) => entry.floor)),
    office: distinct(filtered.map((entry) => entry.office)),
    item: distinct(filtered.map((entry) => entry.item_name))
  });
});

app.get('/admin/inventory/export/advanced', requireLogin, async (req, res) => {
  if (!canManagePurchases(req.session.user)) return res.status(403).send('Purchase manager access required.');
  const inventory = await getInventory();
  const filtered = inventory.filter((entry) => inventoryMatches(entry, req.query || {}));
  const workbook = XLSX.utils.book_new();
  const detailRows = filtered.map((entry) => ({ College: entry.college || 'SVIT Vasad', Department: entry.department || '', Floor: entry.floor || '', Office: entry.office || '', 'Item Category': entry.item_category || '', Item: entry.item_name || '', Quantity: entry.quantity ?? 0 }));
  const detailSheet = XLSX.utils.json_to_sheet(detailRows);
  XLSX.utils.book_append_sheet(workbook, detailSheet, 'Inventory');
  const totals = new Map();
  let grandTotal = 0;
  for (const entry of filtered) {
    const key = `${entry.department}|${entry.item_category}|${entry.item_name}`;
    const current = totals.get(key) || { Department: entry.department || '', 'Item Category': entry.item_category || '', Item: entry.item_name || '', Quantity: 0 };
    current.Quantity += entry.quantity ?? 0;
    totals.set(key, current);
    grandTotal += entry.quantity ?? 0;
  }
  const totalRows = [...totals.values()].sort((a, b) => a.Department.localeCompare(b.Department) || a.Item.localeCompare(b.Item));
  totalRows.push({ Department: 'ALL DEPARTMENTS TOTAL (ALL CAMPUS)', 'Item Category': '', Item: '', Quantity: grandTotal });
  const totalsSheet = XLSX.utils.json_to_sheet(totalRows);
  const setWidths = (sheet, widths) => { sheet['!cols'] = widths.map((wch) => ({ wch })); };
  setWidths(detailSheet, [16, 22, 14, 22, 18, 28, 10]);
  setWidths(totalsSheet, [34, 18, 28, 12]);
  XLSX.utils.book_append_sheet(workbook, totalsSheet, 'Item Totals');
  const buffer = XLSX.write(workbook, { type: 'buffer', bookType: 'xlsx' });
  res.type('application/vnd.openxmlformats-officedocument.spreadsheetml.sheet').attachment('inventory-branch.xlsx').send(buffer);
});

// --- Consolidated Reports dashboard + Excel export (blueprint reports section) ---
function statusCounts(items, statuses) {
  const counts = {};
  for (const s of statuses) counts[s] = 0;
  for (const item of items || []) {
    const st = String(item?.status || 'unknown').toLowerCase();
    if (counts[st] !== undefined) counts[st] += 1;
    else counts.unknown = (counts.unknown || 0) + 1;
  }
  counts.total = (items || []).length;
  return counts;
}
app.get('/admin/reports', requireLogin, async (req, res) => {
  if (!isAdmin(req.session.user)) return res.status(403).send('Admin access required.');
  const bookings = await getAuditoriumBookings();
  const purchases = await getPurchaseRequests();
  const maintenance = await getMaintenanceRequests();
  const cars = await getCarRequests();
  let stock = [];
  try { stock = await getPurchaseStock(); } catch (e) { /* stock unavailable */ }
  const bookingStatuses = ['pending', 'first_approved', 'second_approved', 'third_approved', 'approved', 'rejected'];
  const purchaseStatuses = ['pending', 'approved', 'rejected'];
  const maintenanceStatuses = ['pending', 'hod_approved', 'electrician_approved', 'principal_approved', 'maintenance_approved', 'rejected'];
  const carStatuses = ['pending', 'approved', 'rejected'];
  const b = statusCounts(bookings, bookingStatuses);
  const p = statusCounts(purchases, purchaseStatuses);
  const m = statusCounts(maintenance, maintenanceStatuses);
  const c = statusCounts(cars, carStatuses);
  const statCard = (title, icon, color, counts) => `<section class="report-card" style="--accent:${color}"><div class="report-head"><span class="report-icon">${icon}</span><h3>${title}</h3><span class="report-total">${counts.total}</span></div><div class="report-stats">${Object.entries(counts).filter(([k]) => k !== 'total').map(([k, v]) => `<span class="report-stat"><b>${v}</b>${k.replace(/_/g, ' ')}</span>`).join('')}</div></section>`;
  const stockTotal = stock.reduce((sum, s) => sum + (Number(s.stock_quantity) || 0), 0);
  const cards = statCard('Auditorium bookings', '🏛️', '#b34b1c', b) + statCard('Purchase requests', '🛒', '#2b5f8a', p) + statCard('Maintenance requests', '🔧', '#2a6f5c', m) + statCard('Car requests', '🚗', '#7a5b2f', c);
  res.send(`<!doctype html><html lang="en"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"><title>Reports | Admin</title><link rel="stylesheet" href="/styles.css"><style>.report-grid{display:grid;grid-template-columns:repeat(auto-fit,minmax(230px,1fr));gap:16px;margin:22px 0}.report-card{border:1px solid var(--line);border-top:4px solid var(--accent);padding:18px 20px;border-radius:8px;display:flex;flex-direction:column;gap:12px}.report-head{display:flex;align-items:center;gap:10px}.report-icon{font-size:22px}.report-head h3{font-size:16px;font-weight:600;margin:0;text-transform:capitalize}.report-total{margin-left:auto;font-size:26px;font-weight:700}.report-stats{display:flex;flex-wrap:wrap;gap:8px}.report-stat{font-size:12px;text-transform:capitalize;color:var(--muted);background:#f4f0e8;padding:5px 9px;border-radius:20px}.report-stat b{color:var(--ink);margin-right:4px}.wrap-wide{display:grid;grid-template-columns:1fr 1fr;gap:16px;margin:20px 0}.wrap-card{border:1px solid var(--line);border-radius:8px;padding:16px 18px}.wrap-card h3{margin:0 0 10px;font-size:15px}.kpi{font-size:12px;color:var(--muted)}.kpi b{color:var(--ink);font-size:18px;margin-right:4px}@media(max-width:700px){.wrap-wide{grid-template-columns:1fr}}</style></head><body><main class="shell panel"><header class="masthead"><div><p class="kicker">${escapeHtml(req.session.user.role)}</p><h1>Re<br><em>ports</em></h1></div><a class="page-nav" href="/admin/pages">Back to admin pages</a></header><section class="panel-intro"><p class="eyebrow">Consolidated view</p><h2>Campus activity at a glance.</h2><p class="lede">Request volumes and approval status across every module, with a monthly Excel export.</p><div class="admin-tools"><a class="page-nav" href="/admin/reports/export">Download monthly Excel report ↗</a></div></section><section class="report-grid">${cards}</section><section class="wrap-wide"><div class="wrap-card"><h3>Department stock</h3><span class="kpi"><b>${stock.length}</b> stock items</span> · <span class="kpi"><b>${stockTotal}</b> total units</span><div class="admin-tools"><a class="page-nav" href="/admin/purchase/stock">Open stock register ↗</a></div></div><div class="wrap-card"><h3>Approval documents</h3><p class="kpi">Printable, signature-ready approval sheets for every purchase request.</p><div class="admin-tools"><a class="page-nav" href="/admin/purchase">Open purchase desk ↗</a><a class="page-nav" href="/admin/approvals-log">Approval audit trail ↗</a></div></div></section></main></body></html>`);
});
const reportModuleDefs = [
  { key: 'auditorium', label: 'Auditorium', icon: '🏛️' },
  { key: 'purchase', label: 'Purchase', icon: '🛒' },
  { key: 'maintenance', label: 'Maintenance', icon: '🔧' },
  { key: 'car', label: 'Car', icon: '🚗' }
];

app.get('/admin/reports/export', requireLogin, async (req, res) => {
  if (!isAdmin(req.session.user)) return res.status(403).send('Admin access required.');
  const moduleOptions = reportModuleDefs.map((def) => `<label class="report-mod"><input type="checkbox" name="modules[]" value="${def.key}" checked><span class="report-mod-icon">${def.icon}</span><span class="report-mod-label">${escapeHtml(def.label)}</span></label>`).join('');
  res.send(`<!doctype html><html lang="en"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"><title>Monthly Excel report | Admin</title><link rel="stylesheet" href="/styles.css"><style>.report-export{margin-top:30px}.report-modules{display:grid;grid-template-columns:repeat(2,minmax(0,1fr));gap:14px;margin:22px 0}.report-mod{display:flex;align-items:center;gap:12px;border:1px solid var(--line);border-radius:8px;padding:16px 18px;cursor:pointer;user-select:none;transition:border-color .15s,background .15s}.report-mod input{width:auto;margin:0;transform:scale(1.3)}.report-mod-icon{font-size:22px}.report-mod-label{font-size:15px;font-weight:600}.report-mod:has(input:checked){border-color:var(--orange);background:#fff7ef}.report-tools{display:flex;gap:12px;flex-wrap:wrap;align-items:center;margin:8px 0 4px}.report-hint{font-size:12px;color:var(--muted);margin-top:10px}@media(max-width:600px){.report-modules{grid-template-columns:1fr}}</style></head><body><main class="shell panel"><header class="masthead"><div><p class="kicker">${escapeHtml(req.session.user.role)}</p><h1>Monthly Excel<br><em>report</em></h1></div><a class="page-nav" href="/admin/reports">Back to reports</a><form action="/logout" method="post"><button class="quiet" type="submit">Sign out</button></form></header><section class="panel-intro"><p class="eyebrow">Choose workbook</p><h2>Whose report do you want?</h2><p class="lede">Tick the modules to include. Only the selected module sheets are exported into one Excel workbook.</p></section><section class="report-export"><form action="/admin/reports/export" method="post"><div class="report-tools"><button class="small-button" type="submit">⬇ Download Excel</button><button class="small-button" type="button" onclick="toggleAll()">Select / clear all</button></div><div class="report-modules">${moduleOptions}</div><p class="report-hint">Note: every selected module becomes a separate sheet in the downloaded file.</p></form></section></main><script>function toggleAll(){const boxes=Array.from(document.querySelectorAll('.report-mod input'));const allOn=boxes.every(b=>b.checked);boxes.forEach(b=>b.checked=!allOn);}</script></body></html>`);
});

app.post('/admin/reports/export', requireLogin, async (req, res) => {
  if (!isAdmin(req.session.user)) return res.status(403).send('Admin access required.');
  const raw = req.body.modules;
  const selected = new Set(raw === undefined ? [] : (Array.isArray(raw) ? raw : [raw]));
  const allowed = new Set(reportModuleDefs.map((def) => def.key));
  const workbook = XLSX.utils.book_new();
  if ([...selected].some((k) => allowed.has(k))) {
    if (selected.has('auditorium')) {
      let rows = [];
      try { rows = await getAuditoriumBookings() || []; } catch (e) {}
      XLSX.utils.book_append_sheet(workbook, XLSX.utils.json_to_sheet(rows.map((r) => ({ Module: 'Auditorium', Department: r.department, Program: r.program, Auditorium: r.auditorium, Date: r.date, Start: r.start_time, End: r.end_time, Status: r.status, Requester: r.requester_name || r.faculty_name }))), 'Auditorium');
    }
    if (selected.has('purchase')) {
      let rows = [];
      try { rows = await getPurchaseRequests() || []; } catch (e) {}
      XLSX.utils.book_append_sheet(workbook, XLSX.utils.json_to_sheet(rows.map((r) => ({ Module: 'Purchase', Department: r.department, Item: r.purchase_type === 'local' ? r.item_name : (Array.isArray(r.item_details) ? r.item_details.map((d) => d.item).join(', ') : r.item_name), Qty: r.quantity, Amount: r.amount ? r.amount : (Number(r.quantity) * Number(r.unit_price || 0)), Status: r.status, Requester: r.requester_name }))), 'Purchase');
    }
    if (selected.has('maintenance')) {
      let rows = [];
      try { rows = await getMaintenanceRequests() || []; } catch (e) {}
      XLSX.utils.book_append_sheet(workbook, XLSX.utils.json_to_sheet(rows.map((r) => ({ Module: 'Maintenance', Location: r.location, Category: r.category, Priority: r.priority, Status: r.status, Reporter: r.reporter_name, Department: r.department }))), 'Maintenance');
    }
    if (selected.has('car')) {
      let rows = [];
      try { rows = await getCarRequests() || []; } catch (e) {}
      XLSX.utils.book_append_sheet(workbook, XLSX.utils.json_to_sheet(rows.map((r) => ({ Module: 'Car', Department: r.department, Purpose: r.purpose, TravelDate: r.travel_date, Pickup: r.pickup_location, Destination: r.destination, Status: r.status, Requester: r.requester_name }))), 'Car');
    }
  }
  const buffer = XLSX.write(workbook, { type: 'buffer', bookType: 'xlsx' });
  const parts = [...selected].filter((k) => allowed.has(k)).sort().join('-') || 'empty';
  res.type('application/vnd.openxmlformats-officedocument.spreadsheetml.sheet').attachment(`campus-report-${parts}.xlsx`).send(buffer);
});

// --- Fees Management Routes ---
async function getStudentsList() {
  if (!supabase) return [];
  const { data, error } = await supabase.from('students').select('*').order('enrollment_no');
  return error ? [] : (data || []);
}

async function getBankPayments() {
  if (!supabase) return [];
  const { data, error } = await supabase.from('bank_payments').select('*').order('payment_date', { ascending: false });
  return error ? [] : (data || []);
}

async function getFeesReconciliation() {
  if (!supabase) return [];
  const { data, error } = await supabase.from('fees_reconciliation').select('*').order('updated_at', { ascending: false });
  return error ? [] : (data || []);
}

async function reconcileFees() {
  if (!supabase) return;
  try {
    // Get all students and payments
    const students = await getStudentsList();
    const payments = await getBankPayments();
    
    // Group payments by enrollment number
    const paymentsByEnrollment = {};
    payments.forEach((p) => {
      if (p.enrollment_no) {
        if (!paymentsByEnrollment[p.enrollment_no]) {
          paymentsByEnrollment[p.enrollment_no] = [];
        }
        paymentsByEnrollment[p.enrollment_no].push(p);
      }
    });
    
    // Reconcile each student
    for (const student of students) {
      const studentPayments = paymentsByEnrollment[student.enrollment_no] || [];
      const paidAmount = studentPayments.reduce((sum, p) => sum + Number(p.amount || 0), 0);
      const totalFees = Number(student.total_fees || 0);
      const outstanding = totalFees - paidAmount;
      const status = outstanding <= 0 ? 'paid' : (paidAmount > 0 ? 'partial' : 'unpaid');
      const lastPayment = studentPayments.length > 0 ? studentPayments[0].payment_date : null;
      
      // Upsert reconciliation record
      await supabase.from('fees_reconciliation').upsert({
        enrollment_no: student.enrollment_no,
        student_name: student.name,
        department: student.department,
        total_fees: totalFees,
        paid_amount: paidAmount,
        outstanding_amount: outstanding < 0 ? 0 : outstanding,
        payment_status: status,
        last_payment_date: lastPayment,
        updated_at: new Date().toISOString()
      }, { onConflict: 'enrollment_no' });
    }
  } catch (error) {
    console.error('Reconciliation error:', error.message);
  }
}

app.get('/admin/fees', requireLogin, async (req, res) => {
  if (!isAdmin(req.session.user)) return res.status(403).send('Admin access required.');
  const students = await getStudentsList();
  const payments = await getBankPayments();
  
  const studentRows = students.length ? students.map((s) => `<tr><td>${escapeHtml(s.enrollment_no)}</td><td>${escapeHtml(s.name)}</td><td>${escapeHtml(s.department)}</td><td>₹${Number(s.total_fees || 0).toFixed(2)}</td><td>${escapeHtml(s.email || '-')}</td></tr>`).join('') : '<tr><td colspan="5">No students uploaded yet.</td></tr>';
  
  const paymentRows = payments.slice(0, 20).map((p) => `<tr><td>${escapeHtml(p.enrollment_no || '-')}</td><td>${escapeHtml(p.student_name || '-')}</td><td>₹${Number(p.amount || 0).toFixed(2)}</td><td>${escapeHtml(p.payment_date)}</td><td>${escapeHtml(p.bank_name || '-')}</td></tr>`).join('');
  
  res.send(`<!doctype html><html lang="en"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"><title>Student Fees Management</title><link rel="stylesheet" href="/styles.css"><style>.fees-section{margin:30px 0;padding:20px;border:1px solid var(--line);border-radius:8px}.upload-form{display:flex;flex-direction:column;gap:15px;max-width:500px}.upload-form input[type="file"]{padding:10px;border:1px solid var(--line);border-radius:4px}.upload-form button{padding:12px 20px;background:var(--ink);color:var(--paper);border:none;border-radius:4px;cursor:pointer;font-weight:600}.upload-form button:hover{background:#333}.stats{display:grid;grid-template-columns:repeat(auto-fit,minmax(200px,1fr));gap:15px;margin:20px 0}.stat-card{padding:20px;border:1px solid var(--line);border-radius:8px;text-align:center}.stat-card strong{display:block;font-size:24px;margin-bottom:5px}.table-wrap{overflow-x:auto;margin:20px 0}</style></head><body><main class="shell panel"><header class="masthead"><div><p class="kicker">${escapeHtml(req.session.user.role)}</p><h1>Student<br><em>Fees</em></h1></div><a class="page-nav" href="/dashboard">Dashboard</a><form action="/logout" method="post"><button class="quiet" type="submit">Sign out</button></form></header>${adminNavBar('/admin/fees', req.session.user)}<section class="panel-intro"><p class="eyebrow">Fees Management</p><h2>Upload student list and bank payments.</h2><p class="lede">Import student lists and bank transaction records, then reconcile to identify outstanding fees.</p></section><div class="stats"><div class="stat-card"><strong>${students.length}</strong><span>Students</span></div><div class="stat-card"><strong>${payments.length}</strong><span>Payments</span></div></div><section class="fees-section"><h3>📋 Upload Student List</h3><p>Upload an Excel file with columns: Enrollment No, Name, Department, Total Fees, Email, Mobile</p><form class="upload-form" action="/admin/fees/import-students" method="post" enctype="multipart/form-data"><input type="file" name="students_file" accept=".xlsx,.xls,.csv" required><button type="submit">Upload Student List</button></form></section><section class="fees-section"><h3>🏦 Upload Bank Payments</h3><p>Upload an Excel file with columns: Transaction ID, Enrollment No, Student Name, Amount, Payment Date, Bank Name</p><form class="upload-form" action="/admin/fees/import-payments" method="post" enctype="multipart/form-data"><input type="file" name="payments_file" accept=".xlsx,.xls,.csv" required><button type="submit">Upload Bank Payments</button></form></section><section class="fees-section"><h3>🔄 Actions</h3><form action="/admin/fees/reconcile-now" method="post" style="display:inline"><button class="small-button" type="submit" onclick="return confirm('Reconcile all students with payments? This will update the fees status.')">Reconcile Now</button></form> <a class="page-nav" href="/admin/fees/report">View Outstanding Fees Report →</a></section><section class="fees-section"><h3>📊 Recent Students</h3><div class="table-wrap"><table><thead><tr><th>Enrollment</th><th>Name</th><th>Department</th><th>Total Fees</th><th>Contact</th></tr></thead><tbody>${studentRows}</tbody></table></div></section><section class="fees-section"><h3>💳 Recent Payments</h3><div class="table-wrap"><table><thead><tr><th>Enrollment</th><th>Student Name</th><th>Amount</th><th>Date</th><th>Bank</th></tr></thead><tbody>${paymentRows}</tbody></table></div></section></main></body></html>`);
});

app.post('/admin/fees/import-students', requireLogin, upload.single('students_file'), async (req, res) => {
  if (!isAdmin(req.session.user)) return res.status(403).send('Admin access required.');
  if (!req.file) return res.status(400).send('No file uploaded.');
  
  try {
    const workbook = XLSX.read(req.file.buffer, { type: 'buffer' });
    const sheet = workbook.Sheets[workbook.SheetNames[0]];
    const data = XLSX.utils.sheet_to_json(sheet);
    
    if (!supabase) return res.status(400).send('Database not configured.');
    
    for (const row of data) {
      const enrollmentNo = String(row['Enrollment No'] || row['enrollment_no'] || row['ENROLLMENT_NO'] || '').trim();
      const name = String(row['Name'] || row['name'] || row['NAME'] || '').trim();
      const department = String(row['Department'] || row['department'] || row['DEPARTMENT'] || '').trim();
      const totalFees = Number(row['Total Fees'] || row['total_fees'] || row['TOTAL_FEES'] || 0);
      const email = String(row['Email'] || row['email'] || row['EMAIL'] || '').trim();
      const mobile = String(row['Mobile'] || row['mobile'] || row['MOBILE'] || '').trim();
      
      if (enrollmentNo && name) {
        await supabase.from('students').upsert({
          enrollment_no: enrollmentNo,
          name,
          department: department || 'Unknown',
          total_fees: totalFees,
          email: email || null,
          mobile: mobile || null
        }, { onConflict: 'enrollment_no' });
      }
    }
    
    res.redirect('/admin/fees?uploaded=students');
  } catch (error) {
    res.status(500).send(`Error uploading students: ${error.message}`);
  }
});

app.post('/admin/fees/import-payments', requireLogin, upload.single('payments_file'), async (req, res) => {
  if (!isAdmin(req.session.user)) return res.status(403).send('Admin access required.');
  if (!req.file) return res.status(400).send('No file uploaded.');
  
  try {
    const workbook = XLSX.read(req.file.buffer, { type: 'buffer' });
    const sheet = workbook.Sheets[workbook.SheetNames[0]];
    const data = XLSX.utils.sheet_to_json(sheet);
    
    if (!supabase) return res.status(400).send('Database not configured.');
    
    for (const row of data) {
      const transactionId = String(row['Transaction ID'] || row['transaction_id'] || row['TRANSACTION_ID'] || '').trim();
      const enrollmentNo = String(row['Enrollment No'] || row['enrollment_no'] || row['ENROLLMENT_NO'] || '').trim();
      const studentName = String(row['Student Name'] || row['student_name'] || row['STUDENT_NAME'] || '').trim();
      const amount = Number(row['Amount'] || row['amount'] || row['AMOUNT'] || 0);
      const paymentDate = String(row['Payment Date'] || row['payment_date'] || row['PAYMENT_DATE'] || '').trim();
      const bankName = String(row['Bank Name'] || row['bank_name'] || row['BANK_NAME'] || '').trim();
      
      if (amount > 0 && paymentDate) {
        await supabase.from('bank_payments').insert({
          transaction_id: transactionId || `TXN-${Date.now()}-${Math.random()}`,
          enrollment_no: enrollmentNo || null,
          student_name: studentName || null,
          amount,
          payment_date: paymentDate,
          bank_name: bankName || null
        }).then(({ error }) => { if (error && error.code !== 'PGRST204') console.error(error); });
      }
    }
    
    res.redirect('/admin/fees?uploaded=payments');
  } catch (error) {
    res.status(500).send(`Error uploading payments: ${error.message}`);
  }
});

app.post('/admin/fees/reconcile-now', requireLogin, async (req, res) => {
  if (!isAdmin(req.session.user)) return res.status(403).send('Admin access required.');
  await reconcileFees();
  res.redirect('/admin/fees/report');
});

app.get('/admin/fees/report', requireLogin, async (req, res) => {
  if (!isAdmin(req.session.user)) return res.status(403).send('Admin access required.');
  const reconciliation = await getFeesReconciliation();
  
  const pendingFees = reconciliation.filter((r) => r.payment_status !== 'paid');
  const paidStudents = reconciliation.filter((r) => r.payment_status === 'paid');
  const partialPayments = reconciliation.filter((r) => r.payment_status === 'partial');
  
  const totalFeesDue = pendingFees.reduce((sum, r) => sum + (Number(r.outstanding_amount) || 0), 0);
  
  const reportRows = reconciliation.map((r) => {
    const statusColor = r.payment_status === 'paid' ? '#2a7f52' : (r.payment_status === 'partial' ? '#e97742' : '#d32f2f');
    const statusLabel = r.payment_status === 'paid' ? 'Paid' : (r.payment_status === 'partial' ? 'Partial' : 'Unpaid');
    return `<tr><td>${escapeHtml(r.enrollment_no)}</td><td>${escapeHtml(r.student_name)}</td><td>${escapeHtml(r.department || '-')}</td><td>₹${Number(r.total_fees || 0).toFixed(2)}</td><td>₹${Number(r.paid_amount || 0).toFixed(2)}</td><td style="color:${statusColor};font-weight:600">₹${Number(r.outstanding_amount || 0).toFixed(2)}</td><td><span style="background:${statusColor};color:#fff;padding:4px 8px;border-radius:4px;font-size:12px">${statusLabel}</span></td><td>${r.last_payment_date ? escapeHtml(r.last_payment_date) : '-'}</td></tr>`;
  }).join('');
  
  res.send(`<!doctype html><html lang="en"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"><title>Fees Report</title><link rel="stylesheet" href="/styles.css"><style>.report-stats{display:grid;grid-template-columns:repeat(auto-fit,minmax(200px,1fr));gap:15px;margin:20px 0}.stat-box{padding:20px;border:1px solid var(--line);border-radius:8px;background:#f9f9f9}.stat-box strong{display:block;font-size:28px;margin-bottom:5px;color:var(--orange)}.table-wrap{overflow-x:auto;margin:20px 0}</style></head><body><main class="shell panel"><header class="masthead"><div><p class="kicker">${escapeHtml(req.session.user.role)}</p><h1>Outstanding<br><em>Fees Report</em></h1></div><a class="page-nav" href="/admin/fees">Back to Fees Management</a><form action="/logout" method="post"><button class="quiet" type="submit">Sign out</button></form></header>${adminNavBar('/admin/fees/report', req.session.user)}<section class="panel-intro"><p class="eyebrow">Fees Status</p><h2>Student fees reconciliation report.</h2><p class="lede">Overview of all students, their total fees, payments received, and outstanding balances.</p></section><div class="report-stats"><div class="stat-box"><strong>${reconciliation.length}</strong><span>Total Students</span></div><div class="stat-box"><strong>${paidStudents.length}</strong><span>Fully Paid</span></div><div class="stat-box"><strong>${partialPayments.length}</strong><span>Partial Payments</span></div><div class="stat-box"><strong>${pendingFees.length}</strong><span>Unpaid/Pending</span></div><div class="stat-box"><strong>₹${totalFeesDue.toFixed(2)}</strong><span>Total Outstanding</span></div></div><section class="table-wrap"><table><thead><tr><th>Enrollment</th><th>Student Name</th><th>Department</th><th>Total Fees</th><th>Paid Amount</th><th>Outstanding</th><th>Status</th><th>Last Payment</th></tr></thead><tbody>${reportRows}</tbody></table></section></main></body></html>`);
});

app.listen(port, () => {
  console.log(`Auditorium permissions running at http://localhost:${port}`);
});

process.on('unhandledRejection', (reason) => {
  console.error('Unhandled rejection:', reason && reason.stack ? reason.stack : reason);
});
process.on('uncaughtException', (error) => {
  console.error('Uncaught exception:', error && error.stack ? error.stack : error);
});
