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
  { id: 2, name: 'Aeronautical Auditorium', capacity: 300, approval_1_role: 'head', approval_2_role: 'electrician', approval_3_role: 'principal', approval_4_role: 'maintenance', principal_user_id: '', maintenance_user_id: '' },
  { id: 3, name: 'Main Auditorium', capacity: 500, approval_1_role: 'head', approval_2_role: 'electrician', approval_3_role: 'principal', approval_4_role: 'maintenance', principal_user_id: '', maintenance_user_id: '' },
  { id: 4, name: 'Seminar Auditorium', capacity: 250, approval_1_role: 'head', approval_2_role: 'electrician', approval_3_role: 'principal', approval_4_role: 'maintenance', principal_user_id: '', maintenance_user_id: '' }
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
    const purchaseDepartmentOptions = '<option value="">Select department</option>' + departmentOptions;
    const availableCount = auditoriumConfigs.filter((auditorium) => !auditorium.is_locked).length;
    let result = page.replace('<input name="department" placeholder="e.g. Computer Engineering" required>', `<select name="department" required><option value="">Select department</option>${departmentOptions}</select>`).replace('<label>Branch / Department<input name="requester_branch" placeholder="e.g. Computer Engineering" required></label>', `<label>Branch / Department<select name="requester_branch" required><option value="">Select branch</option>${departmentOptions}</select></label>`).replace(/<fieldset><legend>Choose auditorium<\/legend>[\s\S]*?<\/fieldset>/, `<fieldset><legend>Choose auditorium</legend>${options}</fieldset>`).replace('<strong>02</strong>', `<strong>${availableCount}</strong>`);
    result = result.replace(/<select name="department" required><option value="">Select department<\/option><\/select>/g, `<select name="department" required>${purchaseDepartmentOptions}</select>`);
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
  req.session.user = { id: user.id, name: user.name, role: user.role === 'sub_admin' ? 'admin' : user.role, department: user.department, departments: assignedDepartments.length ? assignedDepartments : [user.department] };
  res.redirect(isAdmin(req.session.user) ? '/admin/pages' : '/admin');
});

app.post('/logout', requireLogin, (req, res) => req.session.destroy(() => res.redirect('/login')));

app.get('/admin/pages', requireLogin, (req, res) => {
  if (!isAdmin(req.session.user)) return res.status(403).send('Admin access required.');
  const groups = [
    ['1', 'Auditorium approval', [['Approval requests', '/admin', 'Review and process auditorium permission requests.'], ['Auditoriums and approval route', '/admin/auditoriums/manage', 'Configure rooms, capacity, approval stages, and assigned officers.'], ['Departments and Heads', '/admin/departments', 'Maintain departments and assign each department Head.']]],
    ['2', 'Maintenance approval', [['Maintenance requests', '/admin/maintenance', 'Review and approve maintenance and repair submissions.'], ['Submit maintenance request', '/maintenance', 'Create a new maintenance request.']]],
    ['3', 'Purchase', [['Stationery item', '/purchase/stationary', 'Submit stationery items and add extra line items.'], ['Local purchase', '/purchase/local', 'Submit a local purchase request.'], ['Cleaning item', '/purchase/cleaning', 'Submit cleaning item requests.'], ['Purchase approvals', '/admin/purchase', 'Review and approve purchase requests.'], ['Purchase approval roles', '/admin/purchase/settings', 'Assign approval roles and amount rules.'], ['Purchase Excel tools', '/admin/purchase/export', 'Download purchase data or an import template.']]],
    ['4', 'Car requests form', [['Car request form', '/car-requests', 'Request an official vehicle for approved travel.'], ['Car request approvals', '/admin/car-requests', 'Review and approve vehicle requests.'], ['Users and roles', '/admin', 'Create users and assign administrator and approval duties.']]]
  ];
  const sections = groups.map(([number, title, pages]) => `<section class="directory-group"><div class="section-heading"><span>${number}</span><h2>${title}</h2></div><div class="page-directory">${pages.map(([pageTitle, href, description]) => `<a class="page-nav" href="${href}"><strong>${pageTitle}</strong><span>${description}</span> <b>↗</b></a>`).join('')}</div></section>`).join('');
  res.send(`<!doctype html><html lang="en"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"><title>Admin pages</title><link rel="stylesheet" href="/styles.css"><style>.directory-group{border-top:1px solid var(--ink);padding:28px 0}.directory-group .section-heading{margin-bottom:18px}.directory-group .section-heading h2{font-size:26px;font-weight:400;margin:0}.page-directory{display:grid;grid-template-columns:repeat(2,minmax(0,1fr));gap:14px}.page-directory .page-nav{display:flex;flex-direction:column;gap:8px;height:100%;padding:20px;border:1px solid var(--line)}.page-directory .page-nav span{font:13px/1.4 Arial,sans-serif;color:var(--muted)}.page-directory .page-nav b{color:var(--orange)}@media(max-width:700px){.page-directory{grid-template-columns:1fr}}</style></head><body><main class="shell panel"><header class="masthead"><div><p class="kicker">${escapeHtml(req.session.user.role)}</p><h1>Admin<br><em>pages</em></h1></div><form action="/logout" method="post"><button class="quiet" type="submit">Sign out</button></form></header><section class="panel-intro"><p class="eyebrow">Administration</p><h2>Choose a workspace.</h2><p class="lede">Auditorium, maintenance, purchase, and vehicle workflows.</p></section>${sections}</main></body></html>`);
});

app.use((req, res, next) => {
  if (!req.path.startsWith('/admin/') || req.path === '/admin/pages') return next();
  const send = res.send.bind(res);
  res.send = (body) => send(typeof body === 'string' ? body.replaceAll('href="/admin">Back to admin', 'href="/admin/pages">Back to admin pages').replaceAll('href="/admin">Back to Admin', 'href="/admin/pages">Back to admin pages') : body);
  next();
});

app.use((req, res, next) => {
  if (req.path !== '/admin') return next();
  const send = res.send.bind(res);
  res.send = (body) => send(typeof body === 'string' ? body.replace('<option value="department_user"', '<option value="admin_officer">Admin Officer</option><option value="purchase_officer">Purchase Officer</option><option value="purchase_clerk">Purchase Clerk</option><option value="chairman">Chairman</option><option value="department_user"') : body);
  next();
});

app.use((req, res, next) => {
  if (req.path !== '/admin') return next();
  const send = res.send.bind(res);
  res.send = (body) => send(typeof body === 'string' ? decorateAdminPage(body.replace('<link rel="stylesheet" href="/styles.css">', '<link rel="stylesheet" href="/styles.css"><style>.admin-tools{display:flex;gap:14px;align-items:center;flex-wrap:wrap;margin:18px 0}.admin-tools form{display:flex;gap:8px;align-items:center;margin:0}.request-actions{display:inline-block;margin:0 4px 4px 0}.reject-form input{width:150px}.reject-button{background:#e97742;color:#fff;border-color:#e97742}#action-popup{border:1px solid #e97742;padding:30px;background:#f4f0e8}</style>').replace('<h3>Department user IDs</h3>', '<h3>Department user IDs</h3><div class="admin-tools"><a class="page-nav" href="/admin/users/template">Download Excel template</a><a class="page-nav" href="/admin/users/export">Download Excel file</a><form action="/admin/users/import" method="post" enctype="multipart/form-data"><input type="file" name="users_file" accept=".xlsx,.xls" required><button class="small-button" type="submit">Upload Excel</button></form></div>').replace('<h3>Auditoriums</h3>', '<h3>Auditoriums</h3><div class="admin-tools"><a class="page-nav" href="/admin/auditoriums/manage">Manage auditorium list ↗</a><a class="page-nav" href="/admin/departments">Manage departments and Heads ↗</a></div>').replace('<h2>Requests in your lane.</h2>', '<h2>Requests in your lane.</h2><div class="admin-tools" style="margin-bottom:18px"><a class="page-nav" href="/admin/maintenance">View Maintenance Requests ↗</a><a class="page-nav" href="/maintenance">Submit Maintenance Request ↗</a></div><div class="admin-tools" style="margin-bottom:18px"><a class="page-nav" href="/admin/purchase">View Purchase Requests ↗</a></div>')) : body);
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
  const visibleRequests = isAdmin(user) || user.role === 'principal' || user.role === 'maintenance' || user.role === 'electrician'
    ? allRequests : allRequests.filter((request) => (user.departments || [user.department]).includes(request.department));
  const rows = visibleRequests.length ? visibleRequests.map((request) => requestRow(request, user, auditoriumConfigs)).join('') : `<tr><td colspan="${isAdmin(user) ? 9 : 5}">No requests yet.</td></tr>`;
  const visibleUsers = isAdmin(user) ? await getUsers() : [];
  const userRows = isAdmin(user) ? visibleUsers.map((candidate) => `<tr><td colspan="5"><form class="edit-user create-user" action="/admin/users/${encodeURIComponent(candidate.id)}" method="post"><input name="id" type="email" value="${escapeHtml(candidate.id)}" aria-label="Email" required><input name="name" value="${escapeHtml(candidate.name)}" aria-label="Name" required><input name="department" value="${escapeHtml(candidate.department)}" aria-label="Department" required><select name="role" aria-label="Role"><option value="sub_admin"${candidate.role === 'sub_admin' ? ' selected' : ''}>Sub administrator</option><option value="department_user"${candidate.role === 'department_user' ? ' selected' : ''}>Department user</option><option value="head"${candidate.role === 'head' ? ' selected' : ''}>Department head</option><option value="maintenance"${candidate.role === 'maintenance' ? ' selected' : ''}>Maintenance officer</option><option value="electrician"${candidate.role === 'electrician' ? ' selected' : ''}>Electrician</option><option value="principal"${candidate.role === 'principal' ? ' selected' : ''}>Principal</option></select><input name="password" type="password" placeholder="New password (optional)" aria-label="New password"><button class="small-button" type="submit">Save changes</button></form><form action="/admin/users/${encodeURIComponent(candidate.id)}/delete" method="post"><button class="small-button" type="submit">Delete</button></form></td></tr>`).join('') : '';
  const auditoriums = isAdmin(user) ? auditoriumConfigs : [];
  const requestHead = isAdmin(user) ? '<th>Department</th><th>Programme</th><th>Students</th><th>Date & time</th><th>Auditorium</th><th>Requester</th><th>Contact</th><th>Status</th><th>Action</th>' : '<th>Programme</th><th>When</th><th>Room</th><th>Status</th><th>Action</th>';
  res.send(`<!doctype html><html lang="en"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"><title>Admin panel | Auditorium permissions</title><link rel="stylesheet" href="/styles.css"><style>.college-heading{text-align:center;margin:20px 0 10px}.college-heading h1{font-size:clamp(36px,6vw,64px);font-weight:700;letter-spacing:.08em;margin:0}</style></head><body><main class="shell panel"><div class="college-heading"><h1>SVIT VASAD</h1></div><header class="masthead"><div><p class="kicker">${escapeHtml(user.role)}</p><h1>Approval<br><em>desk</em></h1></div><form action="/logout" method="post"><button class="quiet" type="submit">Sign out</button></form></header><section class="panel-intro"><p class="eyebrow">Signed in as ${escapeHtml(user.name)}</p><h2>Requests in your lane.</h2><p class="lede">Department head → electrician → principal → maintenance.</p></section><section class="table-wrap"><table><thead><tr>${requestHead}</tr></thead><tbody>${rows}</tbody></table></section>${user.role === 'admin' ? `<section class="user-management"><div class="section-heading"><h3>Auditoriums</h3></div><p class="small-copy">${auditoriums.length} rooms available on the public request form.</p><form class="create-user" action="/admin/auditoriums" method="post"><input name="name" placeholder="New auditorium name" required><button type="submit">Add auditorium</button></form></section><section class="user-management"><div class="section-heading"><span>03</span><h3>Maintenance</h3></div><p class="small-copy">Manage maintenance and repair requests.</p><div class="admin-tools"><a class="page-nav" href="/admin/maintenance">View Maintenance Requests ↗</a><a class="page-nav" href="/maintenance">Submit New Request ↗</a></div></section><section class="user-management"><div class="section-heading"><span>04</span><h3>Email settings</h3></div><p class="small-copy">Sender email address for all notifications.</p><form class="create-user" action="/admin/sender-email" method="post"><input name="sender_email" type="email" value="${escapeHtml(senderEmail)}" placeholder="sender@example.com" required><button type="submit">Update sender email</button></form></section>` : ''}</main></body></html>`);
});

app.post('/admin/auditoriums', requireLogin, async (req, res) => {
  if (!isAdmin(req.session.user)) return res.status(403).send('Admin access required.');
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
  if (!isAdmin(req.session.user)) return res.status(403).send('Admin access required.');
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
  if (!isAdmin(req.session.user)) return res.status(403).send('Admin access required.');
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
  if (!isAdmin(req.session.user)) return res.status(403).send('Admin access required.');
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
  const departments = await getDepartments();
  const heads = (await getUsers()).filter((user) => user.role === 'head');
  const headOptions = (selected) => heads.map((head) => `<option value="${escapeHtml(head.id)}"${head.id === selected ? ' selected' : ''}>${escapeHtml(head.name)} (${escapeHtml(head.id)})</option>`).join('');
  const rows = departments.map((department) => `<form class="auditorium-row" action="/admin/departments/${encodeURIComponent(department.id)}" method="post"><input name="name" value="${escapeHtml(department.name)}" required><select name="head_user_id" required><option value="">Assign department Head</option>${headOptions(department.head_user_id)}</select><button type="submit">Save changes</button><button formaction="/admin/departments/${encodeURIComponent(department.id)}/delete" type="submit">Delete</button></form>`).join('');
  res.send(`<!doctype html><html lang="en"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"><title>Manage departments</title><link rel="stylesheet" href="/styles.css"></head><body><main class="shell panel"><header class="masthead"><h1>Manage <em>departments</em></h1><a class="page-nav" href="/admin">Back to admin</a></header><section class="panel-intro"><p class="eyebrow">Admin only</p><h2>Department options and Heads.</h2><p class="lede">These departments appear on the public request form. Assign one Head to each department.</p></section><section class="auditorium-list">${rows}</section><form class="create-user" action="/admin/departments" method="post"><input name="name" placeholder="New department name" required><select name="head_user_id" required><option value="">Assign department Head</option>${headOptions('')}</select><button type="submit">Add department</button></form></main></body></html>`);
});

app.post('/admin/departments', requireLogin, async (req, res) => {
  if (!isAdmin(req.session.user)) return res.status(403).send('Admin access required.');
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
  if (!isAdmin(req.session.user)) return res.status(403).send('Admin access required.');
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
  if (!isAdmin(req.session.user)) return res.status(403).send('Admin access required.');
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
      const roleLabels = { 'department_user': 'department_user', 'department_head': 'head', 'maintenance_officer': 'maintenance', 'admin_officer': 'admin_officer', 'purchase_officer': 'purchase_officer', 'purchase_clerk': 'purchase_clerk', 'chairman': 'chairman', 'principal': 'principal', 'electrician': 'electrician', 'head': 'head', 'maintenance': 'maintenance' };
      const role = roleLabels[normalizedRole] || normalizedRole;
      const existing = currentUsers.find((user) => user.id === email);
      const missing = ['email', 'name', 'department', 'role', 'password'].filter((field) => !String(row[field] || '').trim());
      const reason = missing.length && !(missing.length === 1 && missing[0] === 'password' && existing)
        ? `missing ${missing.map((field) => field[0].toUpperCase() + field.slice(1)).join(', ')}`
        : !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email) ? 'invalid Email'
          : !['department_user', 'head', 'maintenance', 'electrician', 'principal', 'admin_officer', 'purchase_officer', 'purchase_clerk', 'chairman'].includes(role) ? `invalid Role "${String(row.role).trim()}"`
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
  if (!isAdmin(req.session.user)) return res.status(403).send('Admin access required.');
  const user = users.find((candidate) => candidate.id === req.params.id);
  const password = String(req.body.password || '').trim();
  if (!user) return res.status(404).send('User not found.');
  if (password.length < 6) return res.status(400).send('Password must be at least 6 characters.');
  user.password = password;
  res.redirect('/admin');
});

app.post('/admin/users/:id', requireLogin, (req, res) => {
  if (!isAdmin(req.session.user)) return res.status(403).send('Admin access required.');
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
  if (!isAdmin(req.session.user)) return res.status(403).send('Admin access required.');
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
  if (!isAdmin(req.session.user)) return res.status(403).send('Admin access required.');
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

const localCarRequests = [];

async function getCarRequests() {
  if (!supabase) return localCarRequests;
  const { data, error } = await supabase.from('car_requests').select('*').order('created_at', { ascending: false });
  if (error) {
    if (error.code === 'PGRST205') return localCarRequests;
    throw error;
  }
  return data;
}

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
  const departments = await getDepartments();
  const departmentOptions = departments.map((department) => `<option value="${escapeHtml(department.name)}">${escapeHtml(department.name)}</option>`).join('');
  res.send(`<!doctype html><html lang="en"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"><title>Car request | SVIT Vasad</title><link rel="stylesheet" href="/styles.css"></head><body><main class="shell"><div class="college-heading"><h1>SVIT VASAD</h1></div><div class="request-layout"><aside class="side-panel"><h2>Car<br><em>Requests</em></h2><p class="sub-title">Request an official vehicle for campus work.</p><div class="rule"></div><nav class="nav-buttons"><a href="/" class="nav-btn"><span class="btn-icon">🏛️</span> Auditorium Permission</a><a href="/maintenance" class="nav-btn"><span class="btn-icon">🔧</span> Maintenance Request</a><a href="/purchase/local" class="nav-btn"><span class="btn-icon">🏪</span> Local Purchase</a><a href="/purchase/stationary" class="nav-btn"><span class="btn-icon">📦</span> Stationery Item</a><a href="/purchase/cleaning" class="nav-btn"><span class="btn-icon">🧹</span> Cleaning Item</a><a href="/car-requests" class="nav-btn active"><span class="btn-icon">🚗</span> Car Request</a><a href="/login" class="nav-btn"><span class="btn-icon">🔐</span> Sign in</a></nav></aside><section class="main-content"><p class="eyebrow">Request form 04</p><h1>Car<br><em>request</em></h1><p class="lede">Request an official vehicle for college travel, field work, or an approved campus programme.</p><form class="request-form" action="/car-requests" method="post"><div class="section-heading"><span>01</span><h3>Travel details</h3></div><div class="form-grid"><label>Department<select name="department" required><option value="">Select department</option>${departmentOptions}</select></label><label>Purpose<input name="purpose" placeholder="e.g. Official campus visit" required></label><label>Travel date<input name="travel_date" type="date" required></label><label>Passenger count<input name="passenger_count" type="number" min="1" required></label><label>Pickup location<input name="pickup_location" placeholder="e.g. SVIT Vasad" required></label><label>Destination<input name="destination" placeholder="e.g. Ahmedabad" required></label><label>Pickup time<input name="pickup_time" type="time" required></label><label>Return time<input name="return_time" type="time"></label></div><div class="section-heading"><span>02</span><h3>Requester details</h3></div><div class="form-grid"><label>Name<input name="requester_name" placeholder="Full name" required></label><label>Mobile number<input name="requester_mobile" type="tel" pattern="[0-9]{10}" placeholder="10-digit mobile number" required></label><label>Email address<input name="requester_email" type="email" placeholder="name@svitvasad.ac.in" required></label><label>Additional notes<textarea name="remarks" placeholder="Any driver, luggage, or accessibility details"></textarea></label></div><button type="submit">Send car request <span>↗</span></button></form></section></div><footer><span>Auditorium Registration Application</span><span>Admissiondata / 2026</span></footer></main>${req.query.submitted === '1' ? '<script>alert("Car request submitted successfully.");</script>' : ''}</body></html>`);
});

app.post('/car-requests', async (req, res) => {
  const request = { department: String(req.body.department || '').trim(), purpose: String(req.body.purpose || '').trim(), travel_date: req.body.travel_date, passenger_count: Number(req.body.passenger_count), pickup_location: String(req.body.pickup_location || '').trim(), destination: String(req.body.destination || '').trim(), pickup_time: req.body.pickup_time, return_time: req.body.return_time || null, requester_name: String(req.body.requester_name || '').trim(), requester_mobile: String(req.body.requester_mobile || '').trim(), requester_email: String(req.body.requester_email || '').trim().toLowerCase(), remarks: String(req.body.remarks || '').trim(), status: 'pending' };
  if (!request.department || !request.purpose || !request.travel_date || !Number.isInteger(request.passenger_count) || request.passenger_count < 1 || !request.pickup_location || !request.destination || !request.pickup_time || !request.requester_name || !request.requester_mobile || !request.requester_email) return res.status(400).send('All required car request fields must be filled.');
  if (supabase) {
    const { error } = await supabase.from('car_requests').insert(request);
    if (error) return res.status(error.code === 'PGRST205' ? 503 : 500).send(error.code === 'PGRST205' ? 'Database setup required. Run supabase/schema.sql in the Supabase SQL Editor.' : error.message);
  } else {
    localCarRequests.unshift({ id: Date.now(), created_at: new Date().toISOString(), ...request });
  }
  res.redirect('/car-requests?submitted=1');
});

app.get('/admin/car-requests', requireLogin, async (req, res) => {
  if (!isAdmin(req.session.user)) return res.status(403).send('Admin access required.');
  const requests = await getCarRequests();
  const rows = requests.length ? requests.map((request) => `<tr><td>${escapeHtml(request.department)}</td><td>${escapeHtml(request.purpose)}<small>${escapeHtml(request.pickup_location)} to ${escapeHtml(request.destination)}</small></td><td>${escapeHtml(request.travel_date)}<small>${escapeHtml(request.pickup_time || '')}${request.return_time ? ` - ${escapeHtml(request.return_time)}` : ''}</small></td><td>${escapeHtml(request.passenger_count)}</td><td>${escapeHtml(request.requester_name)}<small>${escapeHtml(request.requester_mobile)}<br>${escapeHtml(request.requester_email)}</small></td><td><span class="status ${request.status === 'approved' ? 'approved' : request.status === 'rejected' ? 'rejected' : 'pending'}">${escapeHtml(request.status)}</span></td><td>${request.status === 'pending' ? `<form class="request-actions" action="/admin/car-requests/${request.id}/approve" method="post"><button class="small-button" type="submit">Approve</button></form><form class="request-actions reject-form" action="/admin/car-requests/${request.id}/reject" method="post"><input name="remarks" placeholder="Reject remarks" required><button class="small-button reject-button" type="submit">Reject</button></form>` : escapeHtml(request.rejection_remarks || '')}</td></tr>`).join('') : '<tr><td colspan="7">No car requests yet.</td></tr>';
  res.send(`<!doctype html><html lang="en"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"><title>Car request approvals</title><link rel="stylesheet" href="/styles.css"></head><body><main class="shell panel"><header class="masthead"><div><p class="kicker">${escapeHtml(req.session.user.role)}</p><h1>Car request<br><em>approval</em></h1></div><a class="page-nav" href="/admin/pages">Back to admin pages</a></header><section class="panel-intro"><p class="eyebrow">Section 04</p><h2>Car requests.</h2><p class="lede">Review official vehicle requests and record the decision.</p></section><div class="table-wrap"><table><thead><tr><th>Department</th><th>Travel</th><th>Date & time</th><th>Passengers</th><th>Requester</th><th>Status</th><th>Action</th></tr></thead><tbody>${rows}</tbody></table></div></main></body></html>`);
});

for (const action of ['approve', 'reject']) {
  app.post(`/admin/car-requests/:id/${action}`, requireLogin, async (req, res) => {
    if (!isAdmin(req.session.user)) return res.status(403).send('Admin access required.');
    const values = action === 'approve' ? { status: 'approved' } : { status: 'rejected', rejection_remarks: String(req.body.remarks || '').trim() };
    if (action === 'reject' && !values.rejection_remarks) return res.status(400).send('Rejection remarks are required.');
    if (supabase) {
      const { error } = await supabase.from('car_requests').update(values).eq('id', req.params.id);
      if (error) return res.status(500).send(error.message);
    } else {
      const request = localCarRequests.find((candidate) => String(candidate.id) === req.params.id);
      if (request) Object.assign(request, values);
    }
    res.redirect('/admin/car-requests');
  });
}

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

const localPurchaseRequests = [];
const localPurchaseStock = [];
const purchaseApprovalSettings = {
  stationary: { roles: ['head', 'admin_officer', 'principal', 'none'], threshold: 10000 },
  local: { roles: ['head', 'principal', 'chairman', 'purchase_officer'], threshold: 10000 },
  cleaning: { roles: ['head', 'admin_officer', 'principal', 'none'], threshold: 10000 }
};

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

const canManagePurchases = (user) => isAdmin(user) || user?.role === 'purchase_officer' || user?.role === 'purchase_clerk';

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
  res.send(`<!doctype html><html><head><meta charset="utf-8"><title>Purchase requisition slip</title><style>body{font:14px Arial;max-width:860px;margin:40px auto;color:#17231f}h1{text-align:center;font-size:24px;margin:0}h2{text-align:center;font-size:18px;font-weight:400;margin:8px 0 28px}.meta{display:flex;justify-content:space-between;border-bottom:1px solid #17231f;padding:12px 0}.slip{width:100%;border-collapse:collapse;margin-top:22px}.slip th,.slip td{border:1px solid #17231f;padding:9px;text-align:left}.slip th{background:#17231f;color:#fff}.signatures{display:grid;grid-template-columns:repeat(4,1fr);gap:25px;margin-top:100px}.signatures div{border-top:1px solid;padding-top:10px}@media print{button{display:none}}@media(max-width:600px){.signatures{grid-template-columns:1fr 1fr}}</style></head><body><button onclick="print()">Print / Save as PDF</button><h1>Sardar Vallabhbhai Patel Institute of Technology, Vasad</h1><h2>Requisition Slip for Departmental ${typeLabel}</h2><div class="meta"><span>Dept: ${escapeHtml(request.department)}</span><span>Date: ${escapeHtml(request.created_at ? new Date(request.created_at).toLocaleDateString('en-IN') : '')}</span></div><table class="slip"><thead><tr><th>Sr.</th><th>Item</th><th>Admin Level</th><th>Nos</th><th>Stock</th>${request.purchase_type === 'stationary' ? '<th>Purpose</th>' : ''}</tr></thead><tbody>${printRows}</tbody></table><div class="signatures"><div>Department Head</div><div>Admin Officer</div><div>Principal</div><div>Chairman</div></div></body></html>`);
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
  res.send(`<!doctype html><html lang="en"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"><title>${config.title} ${config.emphasis}</title><link rel="stylesheet" href="/styles.css"><style>.stock-cell{font-weight:600;color:var(--ink)}.stock-cell.out{color:var(--orange)}</style></head><body><main class="shell"><div class="college-heading"><h1>SVIT VASAD</h1></div><div class="request-layout"><aside class="side-panel"><h2>Purchase<br><em>desk</em></h2><p class="sub-title">Choose a request category.</p><div class="rule"></div><nav class="nav-buttons"><a href="/" class="nav-btn"><span class="btn-icon">🏛️</span> Auditorium Permission</a><a href="/maintenance" class="nav-btn"><span class="btn-icon">🔧</span> Maintenance Request</a><a href="/purchase/local" class="nav-btn${req.params.type === 'local' ? ' active' : ''}"><span class="btn-icon">🏪</span> Local Purchase</a><a href="/purchase/stationary" class="nav-btn${req.params.type === 'stationary' ? ' active' : ''}"><span class="btn-icon">📦</span> Purchase Stationery</a><a href="/purchase/cleaning" class="nav-btn${req.params.type === 'cleaning' ? ' active' : ''}"><span class="btn-icon">🧹</span> Cleaning Items</a><a href="/purchase/electric" class="nav-btn${req.params.type === 'electric' ? ' active' : ''}"><span class="btn-icon">⚡</span> Electric Items</a><a href="/login" class="nav-btn"><span class="btn-icon">🔐</span> Sign in</a></nav></aside><section class="main-content"><p class="eyebrow">Purchase form</p><h1>${config.title}<br><em>${config.emphasis}</em></h1><p class="lede">${config.description}</p><form class="request-form" action="/purchase" method="post"><input type="hidden" name="purchase_type" value="${req.params.type}"><div class="section-heading"><span>01</span><h3>Item details</h3></div><label>Department<select name="department" required><option value="">Select department</option>${departmentOptions}</select></label>${itemFields}<label>Unit price (₹)<input name="unit_price" type="number" min="0" step="0.01" placeholder="e.g. 250.00"></label><label>Description<textarea name="description" placeholder="Describe the item and purpose..."></textarea></label><label>Vendor name<input name="vendor" placeholder="Vendor name"></label><div class="section-heading"><span>02</span><h3>Your details</h3></div><div class="form-grid"><label>Name<input name="requester_name" placeholder="Full name" required></label><label>Mobile number<input name="requester_mobile" type="tel" pattern="[0-9]{10}" placeholder="10-digit mobile number" required></label><label>Email address<input name="requester_email" type="email" placeholder="name@svitvasad.ac.in" required></label><label>Priority<select name="priority"><option value="low">Low</option><option value="medium" selected>Medium</option><option value="high">High</option><option value="urgent">Urgent</option></select></label></div><button type="submit">${config.button} <span>↗</span></button></form></section></div><footer><span>Auditorium Registration Application</span><span>Admissiondata / 2026</span></footer></main>${req.query.submitted === '1' ? '<script>alert("Purchase request submitted successfully.");</script>' : ''}</body></html>`);
});

app.post('/purchase', async (req, res) => {
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

  res.redirect(`/purchase/${purchaseType}?submitted=1`);
});

app.get('/admin/purchase/stock', requireLogin, async (req, res) => {
  if (!canManagePurchases(req.session.user)) return res.status(403).send('Purchase Officer or Clerk access required.');
  const stock = await getPurchaseStock();
  const categoryOptions = Object.keys(stockCategories).map((category) => `<option value="${category}">${category[0].toUpperCase() + category.slice(1)} Items</option>`).join('');
  const catalogJson = JSON.stringify(stockCategories);
  const rows = stock.length ? stock.map((item) => `<tr><td>${escapeHtml(item.category || 'misc')}</td><td>${escapeHtml(item.department)}</td><td>${escapeHtml(item.item_name)}</td><td>${escapeHtml(item.stock_quantity)}</td><td><form class="stock-inline" action="/admin/purchase/stock/${item.id}/delete" method="post"><button class="small-button reject-button" type="submit">Delete</button></form></td></tr>`).join('') : '<tr><td colspan="5">No stock records yet.</td></tr>';
  res.send(`<!doctype html><html lang="en"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"><title>Stock register | Purchase</title><link rel="stylesheet" href="/styles.css"><style>.stock-register{margin-top:30px}.stock-form{display:grid;gap:10px}.stock-row{display:grid;grid-template-columns:1fr 1fr 1.5fr 1fr auto;gap:10px;align-items:end}.stock-row select,.stock-row input{min-width:0;padding:11px;border:1px solid var(--line);background:transparent;font:13px Arial}.stock-actions{display:flex;gap:12px;flex-wrap:wrap;margin:18px 0}.stock-inline{margin:0}.register-table{margin-top:25px}@media(max-width:800px){.stock-row{grid-template-columns:1fr 1fr}.stock-row button{grid-column:span 2}}</style></head><body><main class="shell panel"><header class="masthead"><div><p class="kicker">${escapeHtml(req.session.user.role)}</p><h1>Stock<br><em>register</em></h1></div><a class="page-nav" href="/admin/purchase">Back to purchase desk</a></header><section class="panel-intro"><p class="eyebrow">Inventory control</p><h2>Department-wise stock register.</h2><p class="lede">Save available stock for stationery, cleaning, electrical, plumbing, and miscellaneous items.</p></section><section class="stock-register"><div class="section-heading"><span>01</span><h3>Add or update stock</h3></div><form class="stock-form" action="/admin/purchase/stock" method="post"><div class="stock-row"><select class="stock-category" name="category[]" required>${categoryOptions}</select><input name="department[]" placeholder="Department" required><select class="stock-item" name="item_name[]" required></select><input name="stock_quantity[]" type="number" min="0" placeholder="Quantity" required><button class="remove-stock" type="button" aria-label="Remove stock row" hidden>×</button></div><button class="add-slot" id="add-stock" type="button">+ Add stock row</button><button type="submit">Save stock</button></form><div class="stock-actions"><a class="page-nav" href="/admin/purchase/stock/template">Download stock template</a><form action="/admin/purchase/stock/upload" method="post" enctype="multipart/form-data"><input type="file" name="stock_file" accept=".xlsx,.xls" required><button class="small-button" type="submit">Upload Excel</button></form></div><div class="table-wrap register-table"><table><thead><tr><th>Category</th><th>Department</th><th>Item</th><th>Available stock</th><th>Action</th></tr></thead><tbody>${rows}</tbody></table></div></section></main><script>const stockCategories=${catalogJson};const stockList=document.querySelector('.stock-form');const stockRow=stockList.querySelector('.stock-row');function updateStockItems(row){const select=row.querySelector('.stock-category');const item=row.querySelector('.stock-item');item.innerHTML='<option value="">Select item</option>'+stockCategories[select.value].map((name)=>'<option value="'+name+'">'+name+'</option>').join('');}function updateStockRows(){const rows=stockList.querySelectorAll('.stock-row');rows.forEach((row)=>{row.querySelector('.remove-stock').hidden=rows.length===1;updateStockItems(row);});}stockList.querySelector('#add-stock').addEventListener('click',()=>{const row=stockRow.cloneNode(true);row.querySelectorAll('input').forEach((input)=>input.value='');row.querySelector('.stock-category').selectedIndex=0;row.querySelector('.remove-stock').hidden=false;row.querySelector('.remove-stock').addEventListener('click',()=>{row.remove();updateStockRows();});stockList.insertBefore(row,stockList.querySelector('#add-stock'));updateStockRows();});updateStockRows();</script></body></html>`);
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

app.post('/admin/purchase/stock', requireLogin, async (req, res) => {
  if (!canManagePurchases(req.session.user)) return res.status(403).send('Purchase Officer or Clerk access required.');
  const categories = Array.isArray(req.body.category) ? req.body.category : [req.body.category];
  const departments = Array.isArray(req.body.department) ? req.body.department : [req.body.department];
  const itemNames = Array.isArray(req.body.item_name) ? req.body.item_name : [req.body.item_name];
  const quantities = Array.isArray(req.body.stock_quantity) ? req.body.stock_quantity : [req.body.stock_quantity];
  for (const [index, itemName] of itemNames.entries()) {
    const values = { category: String(categories[index] || 'misc').trim().toLowerCase(), department: String(departments[index] || '').trim(), item_name: String(itemName || '').trim(), stock_quantity: Number(quantities[index]) };
    if (!values.department || !values.item_name || !Number.isInteger(values.stock_quantity) || values.stock_quantity < 0 || !stockCategories[values.category]) continue;
    if (supabase) { const { error } = await supabase.from('purchase_stock').upsert(values, { onConflict: 'department,item_name' }); if (error) return res.status(error.code === 'PGRST205' ? 503 : 500).send(error.code === 'PGRST205' ? 'Run the purchase_stock SQL migration first.' : error.message); }
    else { const current = localPurchaseStock.find((item) => item.department === values.department && item.item_name === values.item_name); if (current) Object.assign(current, values); else localPurchaseStock.push({ id: Date.now() + localPurchaseStock.length, ...values }); }
  }
  res.redirect('/admin/purchase');
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

  const purchaseApprovalAction = (req, user) => {
    if (req.status !== 'pending') return '<span class="muted">Completed</span>';
    return `<form class="request-actions" action="/admin/purchase/${req.id}/approve" method="post"><button class="small-button" type="submit">Approve</button></form><form class="request-actions reject-form" action="/admin/purchase/${req.id}/reject" method="post"><input name="remarks" placeholder="Reject remarks" required><button class="small-button reject-button" type="submit">Reject</button></form>`;
  };

  const purchaseStatusDisplay = (req) => {
    const statusClass = req.status === 'approved' ? 'approved' : req.status === 'rejected' ? 'rejected' : 'pending';
    let html = `<span class="status ${statusClass}">${escapeHtml(statusLabels[req.status] || req.status)}</span>`;
    if (req.rejection_remarks) {
      html += `<small>Remarks: ${escapeHtml(req.rejection_remarks)}</small>`;
    }
    return html;
  };

  const rows = allRequests.length ? allRequests.map((req) => {
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
    return `<tr>
      <td>${typeIcons[req.purchase_type] || '📋'} ${escapeHtml(typeLabels[req.purchase_type] || req.purchase_type)}</td>
      <td>${escapeHtml(req.department)}</td>
      <td>${itemDetails}<small>Total: ${escapeHtml(req.quantity)} × ₹${escapeHtml(req.unit_price)} = ₹${totalPrice}</small></td>
      <td>${escapeHtml(req.description)}<small>Vendor: ${escapeHtml(req.vendor || 'N/A')}</small></td>
      <td><span class="priority-badge" style="background:${priorityBg[req.priority] || '#f0f0f0'};color:${priorityColors[req.priority] || 'var(--ink)'}">${escapeHtml(req.priority.toUpperCase())}</span></td>
      <td>${escapeHtml(req.requester_name)}<small>${escapeHtml(req.requester_mobile)}</small><small>${escapeHtml(req.requester_email)}</small></td>
      <td>${createdDate}<small>${createdTime}</small></td>
      <td>${purchaseStatusDisplay(req)} <a class="page-nav" href="/admin/purchase/${req.id}/print" target="_blank">Print / PDF</a></td>
      <td>${purchaseApprovalAction(req, user)}</td>
    </tr>`;
  }).join('') : '<tr><td colspan="9">No purchase requests yet.</td></tr>';

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
  if (request.status !== 'pending') return res.status(409).send('This request has already been processed.');

  if (supabase) {
    const { error } = await supabase.from('purchase_requests').update({ status: 'approved' }).eq('id', req.params.id);
    if (error) return res.status(500).send(error.message);
  } else if (request) {
    request.status = 'approved';
  }

  if (mailer && request?.requester_email) {
    try {
      await mailer.sendMail({
        from: senderEmail,
        to: request.requester_email,
        subject: `Purchase request approved: ${request.item_name}`,
        text: `Your purchase request has been approved.\n\nItem: ${request.item_name}\nQuantity: ${request.quantity}\nUnit Price: ₹${request.unit_price}\nPriority: ${request.priority}\nStatus: Approved\n\nPlease proceed with the purchase.`
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

  if (supabase) {
    const { error } = await supabase.from('purchase_requests').update({ status: 'rejected', rejection_remarks: remarks }).eq('id', req.params.id);
    if (error) return res.status(500).send(error.message);
  } else if (request) {
    request.status = 'rejected';
    request.rejection_remarks = remarks;
  }

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

app.listen(port, () => {
  console.log(`Auditorium permissions running at http://localhost:${port}`);
});
