const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const Tutor = require('../../models/tutors');


exports.loginTutor = (req, res, next) => {
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
}
