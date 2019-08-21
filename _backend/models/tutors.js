const mongoose = require('mongoose');
const uniqueValidator = require('mongoose-unique-validator');

// const SpecialisationSchema = mongoose.Schema({
//   title: { type: String}
// });
//
// const Specialisation = mongoose.model('Specialisation', SpecialisationSchema)

const tutorSchema = mongoose.Schema({
  firstname: { type: String },
  lastname: { type: String },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  identificationPath: { type: String },
  cvPath: { type: String },
  bio: { type: String },
  location: { type: String },
  profilePath: { type: String },
  subject: {type: String},
  price: {type: Number},
  specialisationList: [String],
  monday: {type: String},
  tuesday: {type: String},
  wednesday: {type: String},
  thursday: {type: String},
  friday: {type: String},
  saturday: {type: String},
  sunday: {type: String}
});

tutorSchema.plugin(uniqueValidator);

module.exports = mongoose.model('Tutor', tutorSchema);
