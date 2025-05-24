// Script to import CSV data into MongoDB
require('dotenv').config();
const fs = require('fs');
const path = require('path');
const csv = require('csv-parser');
const mongoose = require('mongoose');
const connectDB = require('./config/db');

// Import Schedule model
const Schedule = require('./models/Schedule');

// Connect to MongoDB
connectDB();

// Function to convert time format (if needed)
const formatTime = (time) => {
  return time; // CSV already has the right format
};

// Function to determine the class type
const determineClassType = (courseCode) => {
  if (courseCode.includes('CSE')) {
    return 'lecture'; // Default for CSE courses
  } else if (courseCode.includes('AA')) {
    return 'lecture'; // Default for AA courses
  } else {
    return 'lecture'; // Default type
  }
};

// Clear existing data (optional)
const clearExistingData = async () => {
  try {
    await Schedule.deleteMany({});
    console.log('Existing schedule data cleared');
  } catch (err) {
    console.error('Error clearing existing data:', err);
    process.exit(1);
  }
};

// Import data from CSV
const importData = async () => {
  try {
    // Clear existing data first (optional)
    await clearExistingData();
    
    const results = [];
    
    // Read CSV file
    fs.createReadStream(path.join(__dirname, 'data', 'class_schedule.csv'))
      .pipe(csv())
      .on('data', (data) => {
        // Transform CSV data to match Schedule schema
        const scheduleItem = {
          semester: parseInt(data.semester),
          section: parseInt(data.section),
          day: data.day,
          startTime: data.time.split('-')[0].trim(),
          endTime: data.time.split('-')[1].trim(),
          course: data.course_code,
          sectionCode: data.section.toString(),
          room: data.room,
          faculty: data.instructor,
          type: determineClassType(data.course_code)
        };
        
        results.push(scheduleItem);
      })
      .on('end', async () => {
        try {
          // Insert data to MongoDB
          await Schedule.insertMany(results);
          console.log(`Successfully imported ${results.length} schedule items`);
          mongoose.disconnect();
        } catch (err) {
          console.error('Error importing data to MongoDB:', err);
        }
      });
  } catch (err) {
    console.error('Error importing data:', err);
    process.exit(1);
  }
};

// Run the import process
importData();