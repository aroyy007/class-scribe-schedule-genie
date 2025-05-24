const express = require('express');
const router = express.Router();
const { getSchedule, importCSV } = require('../controllers/scheduleController');
const { generatePDF } = require('../controllers/pdfController');

// Schedule routes
router.post('/schedule', getSchedule);
router.post('/generate-pdf', generatePDF);

// CSV import route (if needed via API)
router.post('/import-csv', importCSV);

module.exports = router;