const path = require('path');
const express = require('express');
const mongoose = require('mongoose');
const app = express();
const bodyParser = require('body-parser');

const bulletinRoutes = require('./routes/bulletins');
const studentRoutes = require('./routes/students');
const tutorRoutes = require('./routes/tutors');

mongoose.connect(
 'mongodb+srv://robbie:$impsons10HEYTUTOR@heytutor-vlnhh.azure.mongodb.net/test?retryWrites=true&w=majority',
 {useNewUrlParser: true}
)
.then(() => {
  console.log('Connected to the database!')
})
.catch(() => {
  console.log('Connection Failed!');
});

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use("/_backend/images", express.static(path.join(__dirname, "images")));
app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', "*");
  res.setHeader('Access-Control-Allow-Headers',
  "Origin, X-Requested-With, Content-Type, Accept, Authorization"
);
  res.setHeader('Access-Control-Allow-Methods',
  "GET, POST, PATCH, PUT, DELETE, OPTIONS"
);
  next();
});

app.use('/api/bulletins', bulletinRoutes);
app.use('/api/students', studentRoutes);
app.use('/api/tutors', tutorRoutes);

module.exports = app;
