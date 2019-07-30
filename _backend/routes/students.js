const express = require('express');
const Student = require('../models/students');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const path = require('path');
const checkAuth = require('../middleware/check-auth');


const router = express.Router();

router.post('/signup', (req, res, next) => {
bcrypt.hash(req.body.password, 10)
  .then(hash => {
    const student = new Student({
      firstname: req.body.firstname,
      lastname: req.body.lastname,
      email: req.body.email,
      password: hash
    });
    student.save()
      .then(result => {
        res.status(201).json({
          message: "A new student is born!",
          student: {
            ...result,
            id: result._id
          }
        })
      })
      .catch(err => {
        res.status(500).json({
          error: err
        });
      });
  })
});

router.post('/signin', (req, res, next) => {
  let fetchedStudent;
  Student.findOne({ email: req.body.email })
    .then(student => {
      if (!student) {
        return res.status(401).json({
          message: "Authorization failure"
        })
      }
      fetchedStudent = student;
      return bcrypt.compare(req.body.password, student.password)
    })
    .then(result => {
      if (!result) {
        return res.status(401).json({
          message: "Authorization failure"
        });
      }
      const token = jwt.sign(
        { email: fetchedStudent.email, studentId: fetchedStudent._id},
        'generations_pass_here_some_they_rise_some_they_fall',
       { expiresIn: "6h" }
     );
     res.status(200).json({
       token: token,
       studentId: fetchedStudent._id,
       expiresIn: 21600
     });
    })
    .catch( err => {
      return res.status(401).json({
        message: "Authorization failure"
      })
    });
});

module.exports = router;
