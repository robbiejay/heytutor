const express = require('express');
const Tutor = require('../models/tutors');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const path = require('path');
const checkAuth = require('../middleware/check-auth');

const router = express.Router();

router.post('/signup', (req, res, next) => {
bcrypt.hash(req.body.password, 10)
  .then(hash => {
    const tutor = new Tutor({
      firstname: req.body.firstname,
      lastname: req.body.lastname,
      email: req.body.email,
      password: hash
    });
    tutor.save()
      .then(result => {
        res.status(201).json({
          message: "A new tutor is born!",
          tutor: {
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
  let fetchedTutor;
  console.log(req.body.email);
  Tutor.findOne({ email: req.body.email })
    .then(tutor => {
      console.log(tutor);
      if (!tutor) {
        return res.status(401).json({
          message: "Authorization failure"
        })
      }
      fetchedTutor = tutor;
      return bcrypt.compare(req.body.password, tutor.password).catch(err => {
        console.log(err);
      })
    })
    .then(result => {
      if (!result) {
        return res.status(401).json({
          message: "Authorization failure"
        });
      }
      const token = jwt.sign(
        { email: fetchedTutor.email, tutorId: fetchedTutor._id},
        'generations_pass_here_some_they_rise_some_they_fall',
       { expiresIn: "6h" }
     );
     res.status(200).json({
       token: token,
       tutorId: fetchedTutor._id,
       expiresIn: 21600
     });
    })
    .catch(err => {
      res.status(401).json({
        message: "Authorization failure"
      })
    });
});

module.exports = router;
