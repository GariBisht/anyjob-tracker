const express = require('express');
const cors = require('cors');
const fs = require('fs');
const path = require('path');

const DATA_FILE = path.join(__dirname, 'data', 'jobs.json');
const PORT = process.env.PORT || 4000;

const app = express();
app.use(cors());
app.use(express.json());

function loadJobs() {
  try {
    if (!fs.existsSync(DATA_FILE)) {
      fs.writeFileSync(DATA_FILE, '[]', 'utf8');
      return [];
    }
    const raw = fs.readFileSync(DATA_FILE, 'utf8');
    return JSON.parse(raw || '[]');
  } catch (err) {
    console.error('Failed to load jobs file:', err);
    return [];
  }
}

function saveJobs(jobs) {
  try {
    fs.writeFileSync(DATA_FILE, JSON.stringify(jobs, null, 2), 'utf8');
    return true;
  } catch (err) {
    console.error('Failed to save jobs file:', err);
    throw new Error('Failed to save jobs');
  }
}

const VALID_STATUSES = ['Applied', 'Interview', 'Offer', 'Rejected'];
function validateJobPayload(payload) {
  if (!payload) return 'Missing job payload.';
  if (!payload.company || String(payload.company).trim().length < 2) return 'Company is required and must be at least 2 characters.';
  if (!payload.role || String(payload.role).trim().length < 2) return 'Role is required and must be at least 2 characters.';
  if (payload.status && !VALID_STATUSES.includes(payload.status)) return 'Invalid status.';
  return null;
}

app.get('/api/jobs', (req, res, next) => {
  try {
    const jobs = loadJobs();
    res.json(jobs);
  } catch (err) {
    next(err);
  }
});

app.post('/api/jobs', (req, res, next) => {
  try {
    const payload = req.body;
    const validationError = validateJobPayload(payload);
    if (validationError) return res.status(400).json({ error: validationError });

    const jobs = loadJobs();
    const id = payload.id ? Number(payload.id) : Date.now();
    const newJob = {
      id,
      company: String(payload.company).trim(),
      role: String(payload.role).trim(),
      status: payload.status || 'Applied',
      appliedDate: payload.appliedDate || new Date().toISOString().slice(0, 10),
    };

    jobs.push(newJob);
    saveJobs(jobs);
    res.status(201).json(newJob);
  } catch (err) {
    next(err);
  }
});

app.put('/api/jobs/:id', (req, res, next) => {
  try {
    const id = Number(req.params.id);
    if (!id) return res.status(400).json({ error: 'Invalid id' });

    const payload = req.body;
    if (payload.status && !VALID_STATUSES.includes(payload.status)) return res.status(400).json({ error: 'Invalid status' });

    const jobs = loadJobs();
    const index = jobs.findIndex((j) => Number(j.id) === id);
    if (index === -1) return res.status(404).json({ error: 'Not found' });

    const updated = { ...jobs[index], ...payload };
    jobs[index] = updated;
    saveJobs(jobs);
    res.json(updated);
  } catch (err) {
    next(err);
  }
});

app.delete('/api/jobs/:id', (req, res, next) => {
  try {
    const id = Number(req.params.id);
    if (!id) return res.status(400).json({ error: 'Invalid id' });

    let jobs = loadJobs();
    const beforeLength = jobs.length;
    jobs = jobs.filter((j) => Number(j.id) !== id);
    if (jobs.length === beforeLength) return res.status(404).json({ error: 'Not found' });
    saveJobs(jobs);
    res.status(204).end();
  } catch (err) {
    next(err);
  }
});

// health
app.get('/api/health', (req, res) => res.json({ status: 'ok' }));

// central error handler
app.use((err, req, res, next) => {
  console.error('Unhandled error:', err);
  const status = err.status || 500;
  res.status(status).json({ error: err.message || 'Internal server error' });
});

function startServer(port, attempts = 0) {
  const maxAttempts = 10;
  const server = app.listen(port, () => {
    console.log(`AnyJob Tracker API listening on http://localhost:${port}`);
  });

  server.on('error', (err) => {
    if (err.code === 'EADDRINUSE') {
      if (attempts >= maxAttempts) {
        console.error(`Port ${port} is in use and maximum retries reached. Exiting.`);
        process.exit(1);
      }
      console.warn(`Port ${port} is in use; trying port ${port + 1}...`);
      setTimeout(() => startServer(port + 1, attempts + 1), 200);
    } else {
      console.error(err);
      process.exit(1);
    }
  });
}

startServer(Number(PORT));