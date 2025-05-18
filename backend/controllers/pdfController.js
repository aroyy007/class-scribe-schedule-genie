const PDFDocument = require('pdfkit');

exports.generatePDF = async (req, res) => {
  try {
    const doc = new PDFDocument();
    const scheduleData = req.body;

    // Validate input data
    if (!Array.isArray(scheduleData) || scheduleData.length === 0) {
      return res.status(400).json({ error: 'Invalid schedule data provided' });
    }

    // Set response headers
    res.setHeader('Content-Type', 'application/pdf');
    res.setHeader('Content-Disposition', 'attachment; filename=class-schedule.pdf');

    // Build PDF
    doc.fontSize(18).text('Class Schedule', { align: 'center' });
    doc.moveDown();

    // Add semester and section information if available
    if (scheduleData[0].semester && scheduleData[0].section) {
      doc.fontSize(14)
        .text(`Semester: ${scheduleData[0].semester}  |  Section: ${scheduleData[0].section}`, { align: 'center' });
      doc.moveDown();
    }

    // Create a table header
    doc.fontSize(12).font('Helvetica-Bold');
    doc.text('Day', 50, doc.y, { width: 80 });
    doc.text('Time', 130, doc.y - doc.currentLineHeight(), { width: 120 });
    doc.text('Course', 250, doc.y - doc.currentLineHeight(), { width: 100 });
    doc.text('Room', 350, doc.y - doc.currentLineHeight(), { width: 80 });
    doc.text('Faculty', 430, doc.y - doc.currentLineHeight(), { width: 120 });
    
    doc.moveDown();
    doc.font('Helvetica');

    // Add horizontal rule
    doc.moveTo(50, doc.y).lineTo(550, doc.y).stroke();
    doc.moveDown(0.5);

    // Add schedule items
    scheduleData.forEach(item => {
      const timeSlot = `${item.startTime} - ${item.endTime}`;
      const courseInfo = `${item.course} (Sec: ${item.section})`;
      
      doc.fontSize(11)
        .text(item.day, 50, doc.y, { width: 80 })
        .text(timeSlot, 130, doc.y - doc.currentLineHeight(), { width: 120 })
        .text(courseInfo, 250, doc.y - doc.currentLineHeight(), { width: 100 })
        .text(item.room, 350, doc.y - doc.currentLineHeight(), { width: 80 })
        .text(item.faculty, 430, doc.y - doc.currentLineHeight(), { width: 120 });

      doc.moveDown();
    });

    // Add footer with timestamp
    doc.fontSize(9).text(`Generated on: ${new Date().toLocaleString()}`, 50, 700, { align: 'center' });

    doc.pipe(res);
    doc.end();
  } catch (err) {
    console.error('PDF generation error:', err);
    res.status(500).json({ error: 'PDF generation failed' });
  }
};