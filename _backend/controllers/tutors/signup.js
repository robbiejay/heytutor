const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const Tutor = require('../../models/tutors');

exports.createTutor = (req, res, next) => {
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
}
