const path = require('path');
const express = require('express');
const mongoose = require('mongoose');
const app = express();
const bodyParser = require('body-parser');

const bulletinRoutes = require('./routes/bulletins');
const studentRoutes = require('./routes/students');
const tutorRoutes = require('./routes/tutors');
const bookingRoutes = require('./routes/bookings');
const paymentRoutes = require('./routes/payments');

mongoose.connect(
 'mongodb+srv://robbie:$impsons10HEYTUTOR@heytutor-vlnhh.azure.mongodb.net/test?retryWrites=true&w=majority',
 {useNewUrlParser: true}
)
.then(() => {
  console.log('\x1b[32m%s\x1b[0m', 'Connected to the database!')
})
.catch(() => {
  console.log('\x1b[31m%s\x1b[0m', 'Connection Failed!');
});

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use("/images", express.static(path.join(__dirname, "images")));
app.use("/", express.static(path.join(__dirname, "angular")));

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
app.use('/api/bookings', bookingRoutes);
app.use('/api/payments', paymentRoutes);
app.use((req, res, next) => {
  res.sendFile(path.join(__dirname, 'angular', 'index.html'));
});


module.exports = app;
