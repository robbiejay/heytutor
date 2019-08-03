const mongoose = require('mongoose');
const uniqueValidator = require('mongoose-unique-validator');

const tutorSchema = mongoose.Schema({
  firstname: { type: String },
  lastname: { type: String },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true }
});

tutorSchema.plugin(uniqueValidator);

module.exports = mongoose.model('Tutor', tutorSchema);
