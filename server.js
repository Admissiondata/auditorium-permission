require('dotenv').config();

const express = require('express');
const session = require('express-session');
const path = require('node:path');
const nodemailer = require('nodemailer');
const multer = require('multer');
const XLSX = require('xlsx');
const { createClient } = require('@supabase/supabase-js');

const app = express();
const upload = multer({ storage: multer.memoryStorage(), limits: { fileSize: 2 * 1024 * 1024 } });
const port = process.env.PORT || 3000;
const requests = [];
const localDepartments = [
  { id: 1, name: 'Computer Engineering', head_user_id: 'hod.computer@svitvasad.ac.in' }
];
const localAuditoriums = [
  { id: 1, name: 'Architecture Auditorium', capacity: 300, approval_1_role: 'head', approval_2_role: 'electrician', approval_3_role: 'principal', approval_4_role: 'maintenance', principal_user_id: '', maintenance_user_id: '' },
  { id: 2, name: 'Aeronautical Auditorium', capacity: 300, approval_1_role: 'head', approval_2_role: 'electrician', approval_3_role: 'principal', approval_4_role: 'maintenance', principal_user_id: '', maintenance_user_id: '' }
];
const users = [
  { id: 'admin@svitvasad.ac.in', password: 'admin123', name: 'System administrator', role: 'admin', department: 'All departments' },
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
async function getUsers() {
  if (!supabase) return users;
  const { data, error } = await supabase.from('user_accounts').select('*').order('id');
  if (error) {
    if (error.code === 'PGRST205') return users;
    throw error;
  }
  const storedIds = new Set(data.map((user) => user.id));
  return [...users.filter((user) => !storedIds.has(user.id)), ...data];
}

async function saveUser(user, passwordProvided) {
  if (!supabase) return;
  const values = { id: user.id, name: user.name, department: user.department, role: user.role, password: user.password };
  if (!passwordProvided && !values.password) throw new Error('Existing user password is unavailable.');
  const { error } = await supabase.from('user_accounts').upsert(values, { onConflict: 'id' });
  if (error) throw error;
}

const mailer = process.env.SMTP_HOST && process.env.SMTP_USER && process.env.SMTP_PASSWORD
  ? nodemailer.createTransport({ host: process.env.SMTP_HOST, port: Number(process.env.SMTP_PORT || 587), secure: process.env.SMTP_SECURE === 'true', auth: { user: process.env.SMTP_USER, pass: process.env.SMTP_PASSWORD } })
  : null;
let senderEmail = process.env.SMTP_FROM || process.env.SMTP_USER || 'nodalofficer@svitvasad.ac.in';

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(session({
  secret: process.env.SESSION_SECRET || 'replace-this-session-secret',
  resave: false,
  saveUninitialized: false,
  cookie: { httpOnly: true, sameSite: 'lax', secure: process.env.NODE_ENV === 'production' }
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
  if (!mailer) return;
  const auditorium = auditoriumConfigs.find((auditorium) => auditorium.name === request.auditorium) || {};
  const transition = approvalTransition(request, auditorium);
  if (!transition) return;
  const recipient = await approverEmail(transition.role, request, auditorium);
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
  if (!mailer) return;
  const recipientEmail = request.requester_email || (request.requester_id && request.requester_id !== 'public' ? request.requester_id : null);
  if (!recipientEmail) return;
  const statusLabels = { approved: 'Approved', first_approved: 'First approval done', second_approved: 'Second approval done', third_approved: 'Third approval done', rejected: 'Rejected' };
  const statusLabel = statusLabels[status] || status;
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
    const auditoriumConfigs = await getAuditoriumConfigs();
    const departments = await getDepartments();
    const page = require('node:fs').readFileSync(path.join(__dirname, 'public', 'index.html'), 'utf8');
    const options = auditoriumConfigs.filter((auditorium) => !auditorium.is_locked).length
      ? auditoriumConfigs.filter((auditorium) => !auditorium.is_locked).map((auditorium) => `<label class="choice"><input type="radio" name="auditorium" value="${escapeHtml(auditorium.name)}" required><span>${auditoriumLabel(auditorium)}</span></label>`).join('')
      : '<p class="empty-rooms">No auditoriums are currently available. An administrator must unlock a room before it can be selected.</p>';
    const departmentOptions = departments.map((department) => `<option value="${escapeHtml(department.name)}">${escapeHtml(department.name)}</option>`).join('');
    res.send(page.replace('<input name="department" placeholder="e.g. Computer Engineering" required>', `<select name="department" required><option value="">Select department</option>${departmentOptions}</select>`).replace('<label>Branch / Department<input name="requester_branch" placeholder="e.g. Computer Engineering" required></label>', `<label>Branch / Department<select name="requester_branch" required><option value="">Select branch</option>${departmentOptions}</select></label>`).replace(/<fieldset><legend>Choose auditorium<\/legend>[\s\S]*?<\/fieldset>/, `<fieldset><legend>Choose auditorium</legend>${options}</fieldset>`));
  } catch (error) {
    res.status(500).send(error.message);
  }
}

const requireLogin = (req, res, next) => {
  if (!req.session.user) return res.redirect('/login');
  next();
};

const escapeHtml = (value) => String(value ?? '').replace(/[&<>'"]/g, (character) => ({
  '&': '&amp;', '<': '&lt;', '>': '&gt;', "'": '&#39;', '"': '&quot;'
}[character]));

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

app.post('/login', async (req, res) => {
  const user = (await getUsers()).find((candidate) => candidate.id === req.body.user_id && candidate.password === req.body.password);
  if (!user) return res.status(401).send('Invalid user ID or password. <a href="/login">Try again</a>');
  const departments = user.role === 'head' ? await getDepartments() : [];
  const assignedDepartments = departments.filter((department) => department.head_user_id === user.id).map((department) => department.name);
  req.session.user = { id: user.id, name: user.name, role: user.role, department: user.department, departments: assignedDepartments.length ? assignedDepartments : [user.department] };
  res.redirect('/admin');
});

app.post('/logout', requireLogin, (req, res) => req.session.destroy(() => res.redirect('/login')));

app.use((req, res, next) => {
  if (req.path !== '/admin') return next();
  const send = res.send.bind(res);
  res.send = (body) => send(typeof body === 'string' ? decorateAdminPage(body.replace('<link rel="stylesheet" href="/styles.css">', '<link rel="stylesheet" href="/styles.css"><style>.admin-tools{display:flex;gap:14px;align-items:center;flex-wrap:wrap;margin:18px 0}.admin-tools form{display:flex;gap:8px;align-items:center;margin:0}.request-actions{display:inline-block;margin:0 4px 4px 0}.reject-form input{width:150px}.reject-button{background:#e97742;color:#fff;border-color:#e97742}#action-popup{border:1px solid #e97742;padding:30px;background:#f4f0e8}</style>').replace('<h3>Department user IDs</h3>', '<h3>Department user IDs</h3><div class="admin-tools"><a class="page-nav" href="/admin/users/template">Download Excel template</a><a class="page-nav" href="/admin/users/export">Download Excel file</a><form action="/admin/users/import" method="post" enctype="multipart/form-data"><input type="file" name="users_file" accept=".xlsx,.xls" required><button class="small-button" type="submit">Upload Excel</button></form></div>').replace('<h3>Auditoriums</h3>', '<h3>Auditoriums</h3><div class="admin-tools"><a class="page-nav" href="/admin/auditoriums/manage">Manage auditorium list ↗</a><a class="page-nav" href="/admin/departments">Manage departments and Heads ↗</a></div>').replace('<h2>Requests in your lane.</h2>', '<h2>Requests in your lane.</h2><div class="admin-tools" style="margin-bottom:18px"><a class="page-nav" href="/admin/maintenance">View Maintenance Requests ↗</a><a class="page-nav" href="/maintenance">Submit Maintenance Request ↗</a></div>')) : body);
  next();
});

app.get('/admin', requireLogin, async (req, res) => {
  const user = req.session.user;
  const auditoriumConfigs = await getAuditoriumConfigs();
  let allRequests = requests;
  if (supabase) {
    const { data, error } = await supabase.from('requests').select('*').order('created_at', { ascending: false });
    if (error) return res.status(error.code === 'PGRST205' ? 503 : 500).send(error.code === 'PGRST205' ? 'Database setup required. Run supabase/schema.sql in the Supabase SQL Editor.' : error.message);
    allRequests = data;
  }
  const visibleRequests = user.role === 'admin' || user.role === 'principal' || user.role === 'maintenance' || user.role === 'electrician'
    ? allRequests : allRequests.filter((request) => (user.departments || [user.department]).includes(request.department));
  const rows = visibleRequests.length ? visibleRequests.map((request) => requestRow(request, user, auditoriumConfigs)).join('') : `<tr><td colspan="${user.role === 'admin' ? 9 : 5}">No requests yet.</td></tr>`;
  const visibleUsers = user.role === 'admin' ? await getUsers() : [];
  const userRows = user.role === 'admin' ? visibleUsers.map((candidate) => `<tr><td colspan="5"><form class="edit-user create-user" action="/admin/users/${encodeURIComponent(candidate.id)}" method="post"><input name="id" type="email" value="${escapeHtml(candidate.id)}" aria-label="Email" required><input name="name" value="${escapeHtml(candidate.name)}" aria-label="Name" required><input name="department" value="${escapeHtml(candidate.department)}" aria-label="Department" required><select name="role" aria-label="Role"><option value="department_user"${candidate.role === 'department_user' ? ' selected' : ''}>Department user</option><option value="head"${candidate.role === 'head' ? ' selected' : ''}>Department head</option><option value="maintenance"${candidate.role === 'maintenance' ? ' selected' : ''}>Maintenance officer</option><option value="electrician"${candidate.role === 'electrician' ? ' selected' : ''}>Electrician</option><option value="principal"${candidate.role === 'principal' ? ' selected' : ''}>Principal</option></select><input name="password" type="password" placeholder="New password (optional)" aria-label="New password"><button class="small-button" type="submit">Save changes</button></form><form action="/admin/users/${encodeURIComponent(candidate.id)}/delete" method="post"><button class="small-button" type="submit">Delete</button></form></td></tr>`).join('') : '';
  const auditoriums = user.role === 'admin' ? auditoriumConfigs : [];
  const requestHead = user.role === 'admin' ? '<th>Department</th><th>Programme</th><th>Students</th><th>Date & time</th><th>Auditorium</th><th>Requester</th><th>Contact</th><th>Status</th><th>Action</th>' : '<th>Programme</th><th>When</th><th>Room</th><th>Status</th><th>Action</th>';
  res.send(`<!doctype html><html lang="en"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"><title>Admin panel | Auditorium permissions</title><link rel="stylesheet" href="/styles.css"><style>.college-heading{text-align:center;margin:20px 0 10px}.college-heading h1{font-size:clamp(36px,6vw,64px);font-weight:700;letter-spacing:.08em;margin:0}</style></head><body><main class="shell panel"><div class="college-heading"><h1>SVIT VASAD</h1></div><header class="masthead"><div><p class="kicker">${escapeHtml(user.role)}</p><h1>Approval<br><em>desk</em></h1></div><form action="/logout" method="post"><button class="quiet" type="submit">Sign out</button></form></header><section class="panel-intro"><p class="eyebrow">Signed in as ${escapeHtml(user.name)}</p><h2>Requests in your lane.</h2><p class="lede">Department head → electrician → principal → maintenance.</p></section><section class="table-wrap"><table><thead><tr>${requestHead}</tr></thead><tbody>${rows}</tbody></table></section>${user.role === 'admin' ? `<section class="user-management"><div class="section-heading"><span>02</span><h3>Department user IDs</h3></div><table><thead><tr><th>User ID</th><th>Name</th><th>Department</th><th>Role</th></tr></thead><tbody>${userRows}</tbody></table><form class="create-user" action="/admin/users" method="post"><input name="id" placeholder="new-user-id" required><input name="name" placeholder="Full name" required><input name="department" placeholder="Department" required><select name="role"><option value="department_user">Department user</option><option value="head">Department head</option><option value="maintenance">Maintenance officer</option><option value="electrician">Electrician</option><option value="principal">Principal</option></select><input name="password" placeholder="Temporary password" required><button type="submit">Create user ID</button></form></section><section class="user-management"><div class="section-heading"><span>03</span><h3>Auditoriums</h3></div><p class="small-copy">${auditoriums.length} rooms available on the public request form.</p><form class="create-user" action="/admin/auditoriums" method="post"><input name="name" placeholder="New auditorium name" required><button type="submit">Add auditorium</button></form></section><section class="user-management"><div class="section-heading"><span>04</span><h3>Maintenance</h3></div><p class="small-copy">Manage maintenance and repair requests.</p><div class="admin-tools"><a class="page-nav" href="/admin/maintenance">View Maintenance Requests ↗</a><a class="page-nav" href="/maintenance">Submit New Request ↗</a></div></section><section class="user-management"><div class="section-heading"><span>05</span><h3>Email settings</h3></div><p class="small-copy">Sender email address for all notifications.</p><form class="create-user" action="/admin/sender-email" method="post"><input name="sender_email" type="email" value="${escapeHtml(senderEmail)}" placeholder="sender@example.com" required><button type="submit">Update sender email</button></form></section>` : ''}</main></body></html>`);
});

app.post('/admin/auditoriums', requireLogin, async (req, res) => {
  if (req.session.user.role !== 'admin') return res.status(403).send('Admin access required.');
  const name = String(req.body.name || '').trim();
  const capacity = Number(req.body.capacity || 300);
  if (!name) return res.status(400).send('Auditorium name is required.');
  if (!Number.isInteger(capacity) || capacity < 1) return res.status(400).send('Auditorium capacity must be a positive whole number.');
  if (supabase) {
    const { error } = await supabase.from('auditoriums').insert({ name, capacity });
    if (error) return res.status(error.code === 'PGRST205' ? 503 : 500).send(error.code === 'PGRST205' ? 'Database setup required. Run supabase/schema.sql in the Supabase SQL Editor.' : error.message);
  } else if (!localAuditoriums.some((auditorium) => auditorium.name === name)) {
    localAuditoriums.push({ id: Date.now(), name, capacity, approval_1_role: 'head', approval_2_role: 'electrician', approval_3_role: 'principal', approval_4_role: 'maintenance', principal_user_id: '', maintenance_user_id: '' });
  }
  res.redirect('/admin');
});

app.get('/admin/auditoriums/manage', requireLogin, async (req, res) => {
  if (req.session.user.role !== 'admin') return res.status(403).send('Admin access required.');
  const auditoriums = await getAuditoriumConfigs();
  const allUsers = await getUsers();
  const principals = allUsers.filter((u) => u.role === 'principal');
  const maintenanceUsers = allUsers.filter((u) => u.role === 'maintenance');
  const roleOptions = (selected) => ['none', 'head', 'electrician', 'principal', 'maintenance'].map((role) => `<option value="${role}"${role === selected ? ' selected' : ''}>${role}</option>`).join('');
  const userOptions = (users, selected, label) => {
    const noneOption = `<option value="">-- None (${label}) --</option>`;
    return noneOption + users.map((u) => `<option value="${escapeHtml(u.id)}"${u.id === selected ? ' selected' : ''}>${escapeHtml(u.name)} (${escapeHtml(u.id)})</option>`).join('');
  };
  const rows = auditoriums.map((auditorium) => auditorium.is_locked ? `<form class="auditorium-row locked" action="/admin/auditoriums/${auditorium.id}/lock" method="post"><strong>${auditoriumLabel(auditorium)}</strong><span>Locked: hidden from request form</span><button type="submit">Unlock</button></form>` : `<form class="auditorium-row" action="/admin/auditoriums/${auditorium.id}" method="post"><input name="name" value="${escapeHtml(auditorium.name)}" required><input name="capacity" type="number" min="1" value="${escapeHtml(auditorium.capacity || 300)}" aria-label="Capacity" required><select name="approval_1_role">${roleOptions(auditorium.approval_1_role)}</select><select name="approval_2_role">${roleOptions(auditorium.approval_2_role)}</select><select name="approval_3_role">${roleOptions(auditorium.approval_3_role)}</select><select name="approval_4_role">${roleOptions(auditorium.approval_4_role || 'maintenance')}</select><label class="assign-label">Principal<select name="principal_user_id">${userOptions(principals, auditorium.principal_user_id || '', 'Principal')}</select></label><label class="assign-label">Maintenance Officer<select name="maintenance_user_id">${userOptions(maintenanceUsers, auditorium.maintenance_user_id || '', 'Maintenance')}</select></label><span>Unlocked: visible on request form</span><button type="submit">Save changes</button><button formaction="/admin/auditoriums/${auditorium.id}/delete" type="submit">Delete</button><button formaction="/admin/auditoriums/${auditorium.id}/lock" type="submit">Lock</button></form>`).join('');
  res.send(`<!doctype html><html lang="en"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"><title>Manage auditoriums</title><link rel="stylesheet" href="/styles.css"></head><body><main class="shell panel"><header class="masthead"><h1>Manage <em>rooms</em></h1><a class="page-nav" href="/admin">Back to admin</a></header><section class="panel-intro"><p class="eyebrow">Admin only</p><h2>Room options and approvals.</h2><p class="lede">Edit names, configure approval roles, assign Principal and Maintenance Officer per auditorium, or delete a room.</p></section><section class="auditorium-list">${rows}</section></main></body></html>`);
});

app.post('/admin/auditoriums/:id', requireLogin, async (req, res) => {
  if (req.session.user.role !== 'admin') return res.status(403).send('Admin access required.');
  const current = (await getAuditoriumConfigs()).find((auditorium) => String(auditorium.id) === req.params.id);
  if (!current) return res.status(404).send('Auditorium not found.');
  if (current.is_locked) return res.status(409).send('Unlock the auditorium before editing it.');
  const capacity = Number(req.body.capacity);
  const values = { name: String(req.body.name || '').trim(), capacity, approval_1_role: req.body.approval_1_role, approval_2_role: req.body.approval_2_role, approval_3_role: req.body.approval_3_role, approval_4_role: req.body.approval_4_role, principal_user_id: req.body.principal_user_id || '', maintenance_user_id: req.body.maintenance_user_id || '' };
  if (!values.name) return res.status(400).send('Auditorium name is required.');
  if (!Number.isInteger(capacity) || capacity < 1) return res.status(400).send('Auditorium capacity must be a positive whole number.');
  if (supabase) {
    const { error } = await supabase.from('auditoriums').update(values).eq('id', req.params.id);
    if (error) return res.status(500).send(error.message);
  } else {
    Object.assign(localAuditoriums.find((auditorium) => String(auditorium.id) === req.params.id) || {}, values);
  }
  res.redirect('/admin/auditoriums/manage');
});

app.post('/admin/auditoriums/:id/delete', requireLogin, async (req, res) => {
  if (req.session.user.role !== 'admin') return res.status(403).send('Admin access required.');
  const current = (await getAuditoriumConfigs()).find((auditorium) => String(auditorium.id) === req.params.id);
  if (current?.is_locked) return res.status(409).send('Unlock the auditorium before deleting it.');
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
  if (req.session.user.role !== 'admin') return res.status(403).send('Admin access required.');
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
  if (req.session.user.role !== 'admin') return res.status(403).send('Admin access required.');
  const departments = await getDepartments();
  const heads = (await getUsers()).filter((user) => user.role === 'head');
  const headOptions = (selected) => heads.map((head) => `<option value="${escapeHtml(head.id)}"${head.id === selected ? ' selected' : ''}>${escapeHtml(head.name)} (${escapeHtml(head.id)})</option>`).join('');
  const rows = departments.map((department) => `<form class="auditorium-row" action="/admin/departments/${encodeURIComponent(department.id)}" method="post"><input name="name" value="${escapeHtml(department.name)}" required><select name="head_user_id" required><option value="">Assign department Head</option>${headOptions(department.head_user_id)}</select><button type="submit">Save changes</button><button formaction="/admin/departments/${encodeURIComponent(department.id)}/delete" type="submit">Delete</button></form>`).join('');
  res.send(`<!doctype html><html lang="en"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"><title>Manage departments</title><link rel="stylesheet" href="/styles.css"></head><body><main class="shell panel"><header class="masthead"><h1>Manage <em>departments</em></h1><a class="page-nav" href="/admin">Back to admin</a></header><section class="panel-intro"><p class="eyebrow">Admin only</p><h2>Department options and Heads.</h2><p class="lede">These departments appear on the public request form. Assign one Head to each department.</p></section><section class="auditorium-list">${rows}</section><form class="create-user" action="/admin/departments" method="post"><input name="name" placeholder="New department name" required><select name="head_user_id" required><option value="">Assign department Head</option>${headOptions('')}</select><button type="submit">Add department</button></form></main></body></html>`);
});

app.post('/admin/departments', requireLogin, async (req, res) => {
  if (req.session.user.role !== 'admin') return res.status(403).send('Admin access required.');
  const name = String(req.body.name || '').trim();
  const head = (await getUsers()).find((user) => user.id === req.body.head_user_id && user.role === 'head');
  if (!name || !head) return res.status(400).send('Department name and a valid Head are required.');
  if (supabase) {
    const { error } = await supabase.from('departments').insert({ name, head_user_id: head.id });
    if (error) return res.status(error.code === 'PGRST205' ? 503 : 500).send(error.message);
    await supabase.from('user_accounts').update({ department: name }).eq('id', head.id);
  } else if (!localDepartments.some((department) => department.name === name)) {
    localDepartments.push({ id: Date.now(), name, head_user_id: head.id });
    const localUser = users.find((user) => user.id === head.id);
    if (localUser) localUser.department = name;
  }
  res.redirect('/admin/departments');
});

app.post('/admin/departments/:id', requireLogin, async (req, res) => {
  if (req.session.user.role !== 'admin') return res.status(403).send('Admin access required.');
  const name = String(req.body.name || '').trim();
  const head = (await getUsers()).find((user) => user.id === req.body.head_user_id && user.role === 'head');
  if (!name || !head) return res.status(400).send('Department name and a valid Head are required.');
  if (supabase) {
    const { error } = await supabase.from('departments').update({ name, head_user_id: head.id }).eq('id', req.params.id);
    if (error) return res.status(500).send(error.message);
    await supabase.from('user_accounts').update({ department: name }).eq('id', head.id);
  } else {
    const department = localDepartments.find((candidate) => String(candidate.id) === req.params.id);
    if (!department) return res.status(404).send('Department not found.');
    Object.assign(department, { name, head_user_id: head.id });
    const localUser = users.find((user) => user.id === head.id);
    if (localUser) localUser.department = name;
  }
  res.redirect('/admin/departments');
});

app.post('/admin/departments/:id/delete', requireLogin, async (req, res) => {
  if (req.session.user.role !== 'admin') return res.status(403).send('Admin access required.');
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
  if (req.session.user.role !== 'admin') return res.status(403).send('Admin access required.');
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
  if (req.session.user.role !== 'admin') return res.status(403).send('Admin access required.');
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
  if (req.session.user.role !== 'admin') return res.status(403).send('Admin access required.');
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
  if (user.role === 'admin') {
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
  const roleNames = { head: 'Department head', electrician: 'Electrician', principal: 'Principal', maintenance: 'Maintenance' };
  let pendingLabel = roleNames[transition.role] || transition.role;
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

function approvalTransition(request, auditorium) {
  const roles = [auditorium.approval_1_role || 'head', auditorium.approval_2_role || 'electrician', auditorium.approval_3_role || 'principal', auditorium.approval_4_role || 'maintenance'];
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

app.post('/admin/users', requireLogin, (req, res) => {
  if (req.session.user.role !== 'admin') return res.status(403).send('Admin access required.');
  const email = String(req.body.id || '').trim().toLowerCase();
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) return res.status(400).send('Please enter a valid email address.');
  if (users.some((user) => user.id === email)) return res.status(409).send('Email already exists.');
  users.push({ id: email, password: req.body.password, name: req.body.name, role: req.body.role, department: req.body.department });
  res.redirect('/admin');
});

function workbookResponse(res, rows, filename) {
  const workbook = XLSX.utils.book_new();
  const sheet = XLSX.utils.json_to_sheet(rows);
  XLSX.utils.book_append_sheet(workbook, sheet, 'Department users');
  const buffer = XLSX.write(workbook, { type: 'buffer', bookType: 'xlsx' });
  res.type('application/vnd.openxmlformats-officedocument.spreadsheetml.sheet').attachment(filename).send(buffer);
}

app.get('/admin/users/template', requireLogin, (req, res) => {
  if (req.session.user.role !== 'admin') return res.status(403).send('Admin access required.');
  workbookResponse(res, [{ Email: 'hod.example@svit.ac.in', Name: 'Department Head', Department: 'Computer Engineering', Role: 'head', Password: 'temporary123' }], 'department-users-template.xlsx');
});

app.get('/admin/users/export', requireLogin, (req, res) => {
  if (req.session.user.role !== 'admin') return res.status(403).send('Admin access required.');
  workbookResponse(res, users.map((user) => ({ Email: user.id, Name: user.name, Department: user.department, Role: user.role, Password: '' })), 'department-users.xlsx');
});

app.post('/admin/users/import', requireLogin, upload.single('users_file'), async (req, res) => {
  if (req.session.user.role !== 'admin') return res.status(403).send('Admin access required.');
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
      const roleLabels = { 'department_user': 'department_user', 'department_head': 'head', 'maintenance_officer': 'maintenance', 'principal': 'principal', 'electrician': 'electrician', 'head': 'head', 'maintenance': 'maintenance' };
      const role = roleLabels[normalizedRole] || normalizedRole;
      const existing = currentUsers.find((user) => user.id === email);
      const missing = ['email', 'name', 'department', 'role', 'password'].filter((field) => !String(row[field] || '').trim());
      const reason = missing.length && !(missing.length === 1 && missing[0] === 'password' && existing)
        ? `missing ${missing.map((field) => field[0].toUpperCase() + field.slice(1)).join(', ')}`
        : !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email) ? 'invalid Email'
          : !['department_user', 'head', 'maintenance', 'electrician', 'principal'].includes(role) ? `invalid Role "${String(row.role).trim()}"`
            : (!existing && password.length < 6) || (existing && password && password.length < 6) ? 'Password must contain at least 6 characters' : '';
      if (reason) return res.status(400).send(`Invalid Excel row ${rowIndex + 2}: ${reason}. Required columns: Email, Name, Department, Role, Password.`);
      const values = { id: email, name: String(row.name).trim(), department: String(row.department).trim(), role };
      if (password) values.password = password;
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
  res.redirect('/admin');
});

app.post('/admin/users/:id/reset-password', requireLogin, (req, res) => {
  if (req.session.user.role !== 'admin') return res.status(403).send('Admin access required.');
  const user = users.find((candidate) => candidate.id === req.params.id);
  const password = String(req.body.password || '').trim();
  if (!user) return res.status(404).send('User not found.');
  if (password.length < 6) return res.status(400).send('Password must be at least 6 characters.');
  user.password = password;
  res.redirect('/admin');
});

app.post('/admin/users/:id', requireLogin, (req, res) => {
  if (req.session.user.role !== 'admin') return res.status(403).send('Admin access required.');
  const user = users.find((candidate) => candidate.id === req.params.id);
  const email = String(req.body.id || '').trim().toLowerCase();
  if (!user) return res.status(404).send('User not found.');
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) return res.status(400).send('Please enter a valid email address.');
  if (users.some((candidate) => candidate !== user && candidate.id === email)) return res.status(409).send('Email already exists.');
  if (!req.body.name || !req.body.department || !req.body.role) return res.status(400).send('Name, department, and role are required.');
  user.id = email;
  user.name = String(req.body.name).trim();
  user.department = String(req.body.department).trim();
  user.role = req.body.role;
  if (req.body.password) {
    if (String(req.body.password).length < 6) return res.status(400).send('Password must be at least 6 characters.');
    user.password = req.body.password;
  }
  res.redirect('/admin');
});

app.post('/admin/users/:id/delete', requireLogin, (req, res) => {
  if (req.session.user.role !== 'admin') return res.status(403).send('Admin access required.');
  if (req.session.user.id === req.params.id) return res.status(400).send('You cannot delete the account currently in use.');
  const index = users.findIndex((candidate) => candidate.id === req.params.id);
  if (index < 0) return res.status(404).send('User not found.');
  users.splice(index, 1);
  res.redirect('/admin');
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

app.post('/admin/sender-email', requireLogin, (req, res) => {
  if (req.session.user.role !== 'admin') return res.status(403).send('Admin access required.');
  const email = String(req.body.sender_email || '').trim().toLowerCase();
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) return res.status(400).send('Please enter a valid email address.');
  senderEmail = email;
  res.redirect('/admin');
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

app.get('/maintenance', async (req, res) => {
  const page = require('node:fs').readFileSync(path.join(__dirname, 'public', 'maintenance.html'), 'utf8');
  const departments = await getDepartments();
  const departmentOptions = departments.map((department) => `<option value="${escapeHtml(department.name)}">${escapeHtml(department.name)}</option>`).join('');
  res.send(page.replace('<input name="department" placeholder="e.g. Computer Engineering" required>', `<select name="department" required><option value="">Select department</option>${departmentOptions}</select>`));
});

app.post('/maintenance', async (req, res) => {
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

  res.redirect('/maintenance?submitted=1');
});

app.get('/admin/maintenance', requireLogin, async (req, res) => {
  const user = req.session.user;
  if (user.role !== 'admin' && user.role !== 'maintenance' && user.role !== 'head' && user.role !== 'electrician' && user.role !== 'principal') {
    return res.status(403).send('Access required.');
  }
  const allRequests = await getMaintenanceRequests();
  const categoryLabels = { electrical: 'Electrical', plumbing: 'Plumbing', furniture: 'Furniture', ac_fan: 'AC / Fan', carpentry: 'Carpentry', painting: 'Painting', civil: 'Civil Work', cleaning: 'Cleaning', other: 'Other' };
  const categoryIcons = { electrical: '⚡', plumbing: '🚰', furniture: '🪑', ac_fan: '❄️', carpentry: '🪚', painting: '🎨', civil: '🏗️', cleaning: '🧹', other: '🔧' };
  const priorityColors = { low: 'var(--muted)', medium: 'var(--ink)', high: 'var(--orange)', urgent: '#e74c3c' };
  const priorityBg = { low: '#f0f0f0', medium: '#e8e8e8', high: 'rgba(233,119,66,0.15)', urgent: 'rgba(231,76,60,0.15)' };
  const statusLabels = { pending: 'Pending', hod_approved: 'HOD Approved', electrician_approved: 'Electrician Approved', principal_approved: 'Principal Approved', maintenance_approved: 'Maintenance Approved', completed: 'Completed', rejected: 'Rejected' };
  const roleNames = { head: 'Department Head', electrician: 'Electrician', principal: 'Principal', maintenance: 'Maintenance' };

  const maintApprovalTransition = (req) => {
    const stages = ['pending', 'hod_approved', 'electrician_approved', 'principal_approved', 'maintenance_approved'];
    const stageIndex = stages.indexOf(req.status);
    if (stageIndex === -1 || stageIndex >= stages.length - 1) return null;
    const nextStage = stages[stageIndex + 1];
    const roleMap = { hod_approved: 'head', electrician_approved: 'electrician', principal_approved: 'principal', maintenance_approved: 'maintenance' };
    return { role: roleMap[nextStage], status: nextStage };
  };

  const maintApprovalAction = (req, user) => {
    const transition = maintApprovalTransition(req);
    if (!transition) return '<span class="muted">Completed</span>';
    if (user.role === 'admin') {
      return `<form class="request-actions" action="/admin/maintenance/${req.id}/approve" method="post"><button class="small-button" type="submit">Approve</button></form><form class="request-actions reject-form" action="/admin/maintenance/${req.id}/reject" method="post"><input name="remarks" placeholder="Reject remarks" required><button class="small-button reject-button" type="submit">Reject</button></form>`;
    }
    if (user.role === transition.role) {
      return `<form class="request-actions" action="/admin/maintenance/${req.id}/approve" method="post"><button class="small-button" type="submit">Approve</button></form><form class="request-actions reject-form" action="/admin/maintenance/${req.id}/reject" method="post"><input name="remarks" placeholder="Reject remarks" required><button class="small-button reject-button" type="submit">Reject</button></form>`;
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

  const rows = allRequests.length ? allRequests.map((req) => {
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
    <section class="panel-intro"><p class="eyebrow">Signed in as ${escapeHtml(user.name)}</p><h2>Maintenance requests.</h2><p class="lede">Department head → Electrician → Principal → Maintenance.</p><div class="admin-tools"><a class="page-nav" href="/admin">Back to Admin</a><a class="page-nav" href="/maintenance">Submit New Request ↗</a></div></section>
    <div class="approval-note"><strong>Approval path</strong><span>Department Head → Electrician → Principal → Maintenance Officer</span></div>
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

  const stages = ['pending', 'hod_approved', 'electrician_approved', 'principal_approved', 'maintenance_approved'];
  const roleMap = { hod_approved: 'head', electrician_approved: 'electrician', principal_approved: 'principal', maintenance_approved: 'maintenance' };
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

  if (nextStatus === 'maintenance_approved') {
    const allRequests2 = supabase ? (await supabase.from('maintenance_requests').select('*').eq('id', req.params.id).maybeSingle()).data : request;
    if (mailer && allRequests2?.reporter_email) {
      try {
        await mailer.sendMail({
          from: senderEmail,
          to: allRequests2.reporter_email,
          subject: `Maintenance request approved: ${allRequests2.location}`,
          text: `Your maintenance request has been fully approved.\n\nLocation: ${allRequests2.location}\nCategory: ${allRequests2.category}\nPriority: ${allRequests2.priority}\nStatus: Fully Approved\n\nOur team will begin work shortly.`
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

app.listen(port, () => {
  console.log(`Auditorium permissions running at http://localhost:${port}`);
});
