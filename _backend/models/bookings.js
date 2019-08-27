const mongoose = require('mongoose');

const bookingSchema = mongoose.Schema({
  studentId: { type: String, required: true},
  tutorId: { type: String, required: true},
  price : { type: Number, required: true},
  subject : { type: String, required: true},
  tutorName: { type: String, required: true },
  date: { type: Date, required: true },
  time: { type: String, required: true},
  location: { type: String, required: true },
  description: { type: String },
  confirmed: { type: Boolean },
  payment_received: { type: Boolean },
  booking_date: { type: Date }

});

module.exports = mongoose.model('Booking', bookingSchema);
