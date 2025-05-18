const express = require('express');
const router = express.Router();
const { getSchedule } = require('../controllers/scheduleController');
const { generatePDF } = require('../controllers/pdfController');

router.post('/schedule', getSchedule);
router.post('/generate-pdf', generatePDF);

module.exports = router;