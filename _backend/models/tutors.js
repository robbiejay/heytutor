const mongoose = require('mongoose');
const uniqueValidator = require('mongoose-unique-validator');

const tutorSchema = mongoose.Schema({
  firstname: { type: String },
  lastname: { type: String },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  identificationPath: { type: String },
  cvPath: { type: String },
  bio: { type: String },
  profilePath: { type: String },
  subject: {type: String},
  specialisationList: {type: String}
});

tutorSchema.plugin(uniqueValidator);

module.exports = mongoose.model('Tutor', tutorSchema);
