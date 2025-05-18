const Schedule = require('../models/Schedule');

exports.getSchedule = async (req, res) => {
  try {
    const { semester, section } = req.body;
    
    // Validate input
    if (!semester || !section) {
      return res.status(400).json({ error: 'Semester and section are required' });
    }
    
    // Convert to integers if they're strings
    const semesterNum = parseInt(semester);
    const sectionNum = parseInt(section);
    
    // Find schedules matching the criteria
    const schedules = await Schedule.find({
      semester: semesterNum,
      section: sectionNum
    });
    
    // If no schedules found, return empty array with appropriate message
    if (!schedules || schedules.length === 0) {
      return res.status(404).json({ 
        message: 'No schedule found for the specified semester and section',
        data: []
      });
    }

    // Return the found schedules
    res.status(200).json(schedules);
  } catch (err) {
    console.error('Schedule fetch error:', err);
    res.status(500).json({ error: 'Server error', message: err.message });
  }
};