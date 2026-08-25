require('dotenv').config();

const express = require('express');
const session = require('express-session');
const path = require('node:path');
const { createClient } = require('@supabase/supabase-js');

const app = express();
const port = process.env.PORT || 3000;
const requests = [];
const localAuditoriums = [
  { id: 1, name: 'Architecture Auditorium', approval_1_role: 'head', approval_2_role: 'electrician', approval_3_role: 'principal' },
  { id: 2, name: 'Aeronautical Auditorium', approval_1_role: 'head', approval_2_role: 'electrician', approval_3_role: 'principal' }
];
const users = [
  { id: 'admin', password: 'admin123', name: 'System administrator', role: 'admin', department: 'All departments' },
  { id: 'hod-computer', password: 'hod123', name: 'Computer Engineering HOD', role: 'head', department: 'Computer Engineering' },
  { id: 'maintenance', password: 'maintenance123', name: 'Maintenance officer', role: 'maintenance', department: 'All departments' },
  { id: 'electrician', password: 'electrician123', name: 'Electrician', role: 'electrician', department: 'All departments' },
  { id: 'principal', password: 'principal123', name: 'Principal', role: 'principal', department: 'All departments' },
  { id: 'higher-authority', password: 'authority123', name: 'Higher authority', role: 'higher_authority', department: 'All departments' }
];
const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.SUPABASE_ANON_KEY;
const supabase = process.env.SUPABASE_URL && supabaseKey
  ? createClient(process.env.SUPABASE_URL, supabaseKey)
  : null;

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

async function renderRequestPage(req, res) {
  try {
    const auditoriums = await getAuditoriums();
    const page = require('node:fs').readFileSync(path.join(__dirname, 'public', 'index.html'), 'utf8');
    const options = auditoriums.length
      ? auditoriums.map((name) => `<label class="choice"><input type="radio" name="auditorium" value="${escapeHtml(name)}" required><span>${escapeHtml(name)}</span></label>`).join('')
      : '<p class="empty-rooms">No auditoriums are currently available. An administrator must unlock a room before it can be selected.</p>';
    res.send(page.replace(/<fieldset><legend>Choose auditorium<\/legend>[\s\S]*?<\/fieldset>/, `<fieldset><legend>Choose auditorium</legend>${options}</fieldset>`));
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

app.get('/login', (req, res) => res.sendFile(path.join(__dirname, 'public', 'login.html')));

app.post('/login', (req, res) => {
  const user = users.find((candidate) => candidate.id === req.body.user_id && candidate.password === req.body.password);
  if (!user) return res.status(401).send('Invalid user ID or password. <a href="/login">Try again</a>');
  req.session.user = { id: user.id, name: user.name, role: user.role, department: user.department };
  res.redirect('/admin');
});

app.post('/logout', requireLogin, (req, res) => req.session.destroy(() => res.redirect('/login')));

app.use((req, res, next) => {
  if (req.path !== '/admin') return next();
  const send = res.send.bind(res);
  res.send = (body) => send(typeof body === 'string' ? body.replace('<h3>Auditoriums</h3>', '<h3>Auditoriums</h3><a class="page-nav" href="/admin/auditoriums/manage">Manage auditorium list ↗</a>') : body);
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
    ? allRequests : allRequests.filter((request) => request.department === user.department);
  const rows = visibleRequests.length ? visibleRequests.map((request) => requestRow(request, user, auditoriumConfigs)).join('') : `<tr><td colspan="${user.role === 'admin' ? 8 : 5}">No requests yet.</td></tr>`;
  const userRows = user.role === 'admin' ? users.map((candidate) => `<tr><td>${escapeHtml(candidate.id)}</td><td>${escapeHtml(candidate.name)}</td><td>${escapeHtml(candidate.department)}</td><td>${escapeHtml(candidate.role)}</td></tr>`).join('') : '';
  const auditoriums = user.role === 'admin' ? auditoriumConfigs : [];
  const requestHead = user.role === 'admin' ? '<th>Department</th><th>Programme</th><th>Date & time</th><th>Auditorium</th><th>Faculty</th><th>Requester</th><th>Status</th><th>Action</th>' : '<th>Programme</th><th>When</th><th>Room</th><th>Status</th><th>Action</th>';
  res.send(`<!doctype html><html lang="en"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"><title>Admin panel | Auditorium permissions</title><link rel="stylesheet" href="/styles.css"></head><body><main class="shell panel"><header class="masthead"><div><p class="kicker">SVIT Vasad / ${escapeHtml(user.role)}</p><h1>Approval<br><em>desk</em></h1></div><form action="/logout" method="post"><button class="quiet" type="submit">Sign out</button></form></header><section class="panel-intro"><p class="eyebrow">Signed in as ${escapeHtml(user.name)}</p><h2>Requests in your lane.</h2><p class="lede">Department head → electrician → principal → maintenance.</p></section><section class="table-wrap"><table><thead><tr>${requestHead}</tr></thead><tbody>${rows}</tbody></table></section>${user.role === 'admin' ? `<section class="user-management"><div class="section-heading"><span>02</span><h3>Department user IDs</h3></div><table><thead><tr><th>User ID</th><th>Name</th><th>Department</th><th>Role</th></tr></thead><tbody>${userRows}</tbody></table><form class="create-user" action="/admin/users" method="post"><input name="id" placeholder="new-user-id" required><input name="name" placeholder="Full name" required><input name="department" placeholder="Department" required><select name="role"><option value="department_user">Department user</option><option value="head">Department head</option><option value="maintenance">Maintenance officer</option><option value="electrician">Electrician</option><option value="principal">Principal</option></select><input name="password" placeholder="Temporary password" required><button type="submit">Create user ID</button></form></section><section class="user-management"><div class="section-heading"><span>03</span><h3>Auditoriums</h3></div><p class="small-copy">${auditoriums.length} rooms available on the public request form.</p><form class="create-user" action="/admin/auditoriums" method="post"><input name="name" placeholder="New auditorium name" required><button type="submit">Add auditorium</button></form></section>` : ''}</main></body></html>`);
});

app.post('/admin/auditoriums', requireLogin, async (req, res) => {
  if (req.session.user.role !== 'admin') return res.status(403).send('Admin access required.');
  const name = String(req.body.name || '').trim();
  if (!name) return res.status(400).send('Auditorium name is required.');
  if (supabase) {
    const { error } = await supabase.from('auditoriums').insert({ name });
    if (error) return res.status(error.code === 'PGRST205' ? 503 : 500).send(error.code === 'PGRST205' ? 'Database setup required. Run supabase/schema.sql in the Supabase SQL Editor.' : error.message);
  } else if (!localAuditoriums.some((auditorium) => auditorium.name === name)) {
    localAuditoriums.push({ id: Date.now(), name, approval_1_role: 'head', approval_2_role: 'electrician', approval_3_role: 'principal' });
  }
  res.redirect('/admin');
});

app.get('/admin/auditoriums/manage', requireLogin, async (req, res) => {
  if (req.session.user.role !== 'admin') return res.status(403).send('Admin access required.');
  const auditoriums = await getAuditoriumConfigs();
  const roleOptions = (selected) => ['none', 'head', 'electrician', 'principal', 'maintenance'].map((role) => `<option value="${role}"${role === selected ? ' selected' : ''}>${role}</option>`).join('');
  const rows = auditoriums.map((auditorium) => auditorium.is_locked ? `<form class="auditorium-row locked" action="/admin/auditoriums/${auditorium.id}/lock" method="post"><strong>${escapeHtml(auditorium.name)}</strong><span>Locked: hidden from request form</span><button type="submit">Unlock</button></form>` : `<form class="auditorium-row" action="/admin/auditoriums/${auditorium.id}" method="post"><input name="name" value="${escapeHtml(auditorium.name)}" required><select name="approval_1_role">${roleOptions(auditorium.approval_1_role)}</select><select name="approval_2_role">${roleOptions(auditorium.approval_2_role)}</select><select name="approval_3_role">${roleOptions(auditorium.approval_3_role)}</select><span>Unlocked: visible on request form</span><button type="submit">Save changes</button><button formaction="/admin/auditoriums/${auditorium.id}/delete" type="submit">Delete</button><button formaction="/admin/auditoriums/${auditorium.id}/lock" type="submit">Lock</button></form>`).join('');
  res.send(`<!doctype html><html lang="en"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"><title>Manage auditoriums</title><link rel="stylesheet" href="/styles.css"></head><body><main class="shell panel"><header class="masthead"><h1>Manage <em>rooms</em></h1><a class="page-nav" href="/admin">Back to admin</a></header><section class="panel-intro"><p class="eyebrow">Admin only</p><h2>Room options and approvals.</h2><p class="lede">Edit names, configure first, second, and third approval roles, or delete a room.</p></section><section class="auditorium-list">${rows}</section></main></body></html>`);
});

app.post('/admin/auditoriums/:id', requireLogin, async (req, res) => {
  if (req.session.user.role !== 'admin') return res.status(403).send('Admin access required.');
  const current = (await getAuditoriumConfigs()).find((auditorium) => String(auditorium.id) === req.params.id);
  if (!current) return res.status(404).send('Auditorium not found.');
  if (current.is_locked) return res.status(409).send('Unlock the auditorium before editing it.');
  const values = { name: String(req.body.name || '').trim(), approval_1_role: req.body.approval_1_role, approval_2_role: req.body.approval_2_role, approval_3_role: req.body.approval_3_role };
  if (!values.name) return res.status(400).send('Auditorium name is required.');
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

function requestRow(request, user, auditoriumConfigs) {
  const status = `<span class="status ${escapeHtml(request.status)}">${escapeHtml(request.status.replaceAll('_', ' '))}</span>`;
  if (user.role === 'admin') {
    return `<tr><td>${escapeHtml(request.department)}</td><td>${escapeHtml(request.program)}</td><td>${escapeHtml(request.date)} to ${escapeHtml(request.end_date)}<small>${escapeHtml(request.duration)} · ${escapeHtml(request.start_time)} - ${escapeHtml(request.end_time)}</small></td><td>${escapeHtml(request.auditorium)}</td><td>${escapeHtml(request.faculty_name)}</td><td>${escapeHtml(request.requester_id)}</td><td>${status}</td><td>${approvalAction(request, user, auditoriumConfigs)}</td></tr>`;
  }
  return `<tr><td>${escapeHtml(request.program)}<small>${escapeHtml(request.department)}</small></td><td>${escapeHtml(request.date)} to ${escapeHtml(request.end_date)}<small>${escapeHtml(request.duration)} · ${escapeHtml(request.start_time)} - ${escapeHtml(request.end_time)}</small></td><td>${escapeHtml(request.auditorium)}</td><td>${status}</td><td>${approvalAction(request, user, auditoriumConfigs)}</td></tr>`;
}

function approvalAction(request, user, auditoriumConfigs) {
  const auditorium = auditoriumConfigs.find((candidate) => candidate.name === request.auditorium) || {};
  const transition = approvalTransition(request, auditorium);
  const canApprove = user.role === 'admin' || (transition && user.role === transition.role && !(user.role === 'head' && request.department !== user.department));
  if (!canApprove) return '<span class="muted">Waiting</span>';
  return `<form action="/admin/requests/${encodeURIComponent(request.id)}/approve" method="post"><button class="small-button" type="submit">Approve</button></form>`;
}

function approvalTransition(request, auditorium) {
  const roles = [auditorium.approval_1_role || 'head', auditorium.approval_2_role || 'electrician', auditorium.approval_3_role || 'principal'];
  const stageByStatus = { pending: 0, first_approved: 1, second_approved: 2 };
  let stage = stageByStatus[request.status];
  if (stage === undefined) return null;
  while (stage < roles.length && roles[stage] === 'none') stage += 1;
  if (stage >= roles.length) return null;
  let nextStage = stage + 1;
  while (nextStage < roles.length && roles[nextStage] === 'none') nextStage += 1;
  return { role: roles[stage], status: nextStage >= roles.length ? 'approved' : `${nextStage}_approved` };
}

app.post('/admin/users', requireLogin, (req, res) => {
  if (req.session.user.role !== 'admin') return res.status(403).send('Admin access required.');
  if (users.some((user) => user.id === req.body.id)) return res.status(409).send('User ID already exists.');
  users.push({ id: req.body.id, password: req.body.password, name: req.body.name, role: req.body.role, department: req.body.department });
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
  if (user.role !== 'admin' && user.role !== transition.role && !(user.role === 'head' && transition.role === 'head' && user.department === request.department)) return res.status(403).send('This request is waiting for another approver.');
  if (supabase) {
    return supabase.from('requests').update({ status: transition.status }).eq('id', req.params.id)
      .then(({ error }) => error ? res.status(500).send(error.message) : res.redirect('/admin'));
  }
  request.status = transition.status;
  res.redirect('/admin');
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
  const request = {
    department: req.body.department,
    program: req.body.program,
    date: req.body.date,
    start_time: req.body.start_time,
    end_time: req.body.end_time,
    duration: req.body.duration || '1 day',
    end_date: req.body.end_date || req.body.date,
    auditorium: req.body.auditorium,
    faculty_name: req.body.faculty_name,
    requester_id: req.session.user?.id || 'public',
    status: 'pending'
  };

  if (!request.department || !request.program || !request.date || !request.auditorium) {
    return res.status(400).send('Department, program, date, and auditorium are required.');
  }

  if (!['1 day', '2 days', 'multiple days'].includes(request.duration)) return res.status(400).send('Please choose a valid duration.');
  if (request.duration === '1 day') request.end_date = request.date;
  if (request.duration !== '1 day' && (!request.end_date || request.end_date < request.date)) return res.status(400).send('Please choose a valid end date.');

  if (!(await getAuditoriums()).includes(request.auditorium)) return res.status(400).send('Please choose an available auditorium.');

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

  res.redirect('/?submitted=1');
});

app.listen(port, () => {
  console.log(`Auditorium permissions running at http://localhost:${port}`);
});
