const Schedule = require('../models/Schedule');

exports.getSchedule = async (req, res) => {
  try {
    const { semester, section } = req.body;
    
    // Improved validation with more descriptive error messages
    if (semester === undefined || semester === null) {
      return res.status(400).json({ error: 'Semester is required' });
    }
    
    if (section === undefined || section === null) {
      return res.status(400).json({ error: 'Section is required' });
    }
    
    // Log the received data for debugging
    console.log('Received request with data:', { 
      semester, 
      section, 
      body: req.body,
      contentType: req.headers['content-type']
    });
    
    // Convert to integers if they're strings
    const semesterNum = parseInt(semester);
    const sectionNum = parseInt(section);
    
    // Additional validation for numeric values
    if (isNaN(semesterNum)) {
      return res.status(400).json({ error: 'Semester must be a valid number' });
    }
    
    if (isNaN(sectionNum)) {
      return res.status(400).json({ error: 'Section must be a valid number' });
    }
    
    // Find schedules matching the criteria
    const schedules = await Schedule.find({
      semester: semesterNum,
      section: sectionNum
    });
    
    console.log(`Found ${schedules.length} schedule items for semester ${semesterNum}, section ${sectionNum}`);
    
    // If no schedules found, return empty array with appropriate message
    if (!schedules || schedules.length === 0) {
      return res.status(404).json({ 
        message: 'No schedule found for the specified semester and section',
        data: []
      });
    }

    // Sort the schedules by day and time
    const sortedSchedules = schedules.sort((a, b) => {
      // Day sorting
      const days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
      const dayDiff = days.indexOf(a.day) - days.indexOf(b.day);
      
      if (dayDiff !== 0) return dayDiff;
      
      // Time sorting if days are the same
      // Convert time to 24-hour format for comparison
      const timeA = a.startTime.split(':');
      const timeB = b.startTime.split(':');
      
      const hourA = parseInt(timeA[0]);
      const hourB = parseInt(timeB[0]);
      
      return hourA - hourB;
    });

    // Return the found schedules
    res.status(200).json(sortedSchedules);
  } catch (err) {
    console.error('Schedule fetch error:', err);
    res.status(500).json({ error: 'Server error', message: err.message });
  }
};

// Add a new endpoint to import CSV data
exports.importCSV = async (req, res) => {
  try {
    // This would be implemented if you want to allow CSV uploads via API
    // For now, we'll use the separate import script
    res.status(501).json({ message: 'CSV import functionality not implemented in API yet' });
  } catch (err) {
    console.error('CSV import error:', err);
    res.status(500).json({ error: 'Server error', message: err.message });
  }
};