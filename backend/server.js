require('dotenv').config();
const express = require('express');
const cors = require('cors');
const path = require('path');
const connectDB = require('./config/db');

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Serve static files (if needed)
app.use('/data', express.static(path.join(__dirname, 'data')));

// Database Connection
// connectDB();

// Routes
app.use('/api', require('./routes/api'));

// Health Check
app.get('/api/health', (req, res) => res.send('OK'));

// Documentation route (optional)
app.get('/api/docs', (req, res) => {
  res.json({
    endpoints: [
      {
        method: 'POST',
        path: '/api/schedule',
        description: 'Get schedule for a specific semester and section',
        body: { semester: 'number', section: 'number' }
      },
      {
        method: 'POST',
        path: '/api/generate-pdf',
        description: 'Generate PDF from schedule data',
        body: 'array of schedule objects'
      }
    ]
  });
});

// Error handler middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ error: 'Something went wrong on the server!' });
});

// 404 handler
app.use((req, res) => {
  res
    .status(404)
    .json({ error: 'Resource not found', path: req.originalUrl });
});

const PORT = 5100;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));