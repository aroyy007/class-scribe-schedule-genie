const mongoose = require('mongoose');

const scheduleSchema = new mongoose.Schema({
  semester: { type: Number, required: true },
  section: { type: Number, required: true },
  day: { type: String, required: true },
  startTime: { type: String, required: true },
  endTime: { type: String, required: true },
  course: { type: String, required: true },
  sectionCode: { type: String, required: true },
  room: { type: String, required: true },
  faculty: { type: String, required: true },
  type: { 
    type: String, 
    required: true,
    enum: ['lecture', 'tutorial', 'lab', 'exam', 'free']
  }
});

module.exports = mongoose.model('Schedule', scheduleSchema);