const mongoose = require('mongoose');

const bookingSchema = mongoose.Schema({
  studentId: { type: String, required: true},
  tutorId: { type: String, required: true},
  price : { type: String, required: true},
  date: { type: String, required: true },
  time: { type: String, required: true},
  location: { type: String, required: true },
  description: { type: String },
  confirmed: { type: String },
  payment_received: { type: String }

});

module.exports = mongoose.model('Booking', bookingSchema);
