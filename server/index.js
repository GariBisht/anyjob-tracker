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
    const raw = fs.readFileSync(DATA_FILE, 'utf8');
    return JSON.parse(raw || '[]');
  } catch (err) {
    return [];
  }
}

function saveJobs(jobs) {
  fs.writeFileSync(DATA_FILE, JSON.stringify(jobs, null, 2));
}

app.get('/api/jobs', (req, res) => {
  const jobs = loadJobs();
  res.json(jobs);
});

app.post('/api/jobs', (req, res) => {
  const jobs = loadJobs();
  const job = req.body;

  if (!job || !job.id) {
    return res.status(400).json({ error: 'Job must include an id' });
  }

  jobs.push(job);
  saveJobs(jobs);
  res.status(201).json(job);
});

app.put('/api/jobs/:id', (req, res) => {
  const id = parseInt(req.params.id, 10);
  const jobs = loadJobs();
  const index = jobs.findIndex((j) => j.id === id);
  if (index === -1) return res.status(404).json({ error: 'Not found' });

  const updated = { ...jobs[index], ...req.body };
  jobs[index] = updated;
  saveJobs(jobs);
  res.json(updated);
});

app.delete('/api/jobs/:id', (req, res) => {
  const id = parseInt(req.params.id, 10);
  let jobs = loadJobs();
  const beforeLength = jobs.length;
  jobs = jobs.filter((j) => j.id !== id);
  if (jobs.length === beforeLength) return res.status(404).json({ error: 'Not found' });
  saveJobs(jobs);
  res.status(204).end();
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