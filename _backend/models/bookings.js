const mongoose = require('mongoose');

const bookingSchema = mongoose.Schema({
  studentId: { type: String, required: true},
  tutorId: { type: String, required: true},
  price : { type: Number, required: true},
  date: { type: String, required: true },
  time: { type: String, required: true},
  location: { type: String, required: true },
  description: { type: String },
  confirmed: { type: Boolean },
  payment_received: { type: Boolean }

});

module.exports = mongoose.model('Booking', bookingSchema);
