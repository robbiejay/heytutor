const mongoose = require('mongoose');

const bulletinSchema = mongoose.Schema({
  fullname: { type: String, required: true},
  subject: { type: String, required: true},
  price : { type: String, required: true},
  location: { type: String, required: true },
  description: { type: String, required: true},
  timePosted: { type: String, required: true },

});

module.exports = mongoose.model('Bulletin', bulletinSchema);
