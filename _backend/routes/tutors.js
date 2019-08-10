const express = require('express');
const multer = require('multer');
const Tutor = require('../models/tutors');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const path = require('path');
const checkAuth = require('../middleware/check-auth');

const router = express.Router();

const IMG_TYPE_MAP = {
  'image/png': 'png',
  'image/jpeg': 'jpg',
  'image/jpg': 'jpg'
};

const DOC_TYPE_MAP = {
  'application/pdf': 'pdf',
  'application/vnd.ms-powerpoint': 'ppt',
  'application/vnd.ms-excel': 'xls',
  'application/msword': 'doc'
}

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    const identificationValid = IMG_TYPE_MAP[file.mimetype];
    const cvValid = DOC_TYPE_MAP[file.mimetype];
    let error = new Error('Invalid MIME type');
    if(identificationValid || cvValid) {
      error = null;
    }
    cb(error, 'documents');
  },
  filename: (req,file,cb) => {
    const identificationValid = IMG_TYPE_MAP[file.mimetype];
    const cvValid = DOC_TYPE_MAP[file.mimetype];

    const name = file.originalname.toLowerCase().split(" ").join("-");

    if (identificationValid ) {
    cb(null,'ID-' + name + '-' + Data.now() + '.' + ext);
  }
  if(cvValid) {
    cb(null,'ID-' + name + '-' + Data.now() + '.' + ext);
  }
  }
});

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

router.put(
  '/identification/:id',
  checkAuth,
  multer({ storage: storage}).fields([
    {name: "cv",
     name: "identification"}
  ]),
  (req,res,next) => {
    const identificationData = new Tutor({
      _id: req.body.tutorId,
      cvPath: url + "/documents/" + req.files.cv[0].filename,
      identificationPath: url + "/documents/" + req.files.identification[0].filename
    });

    TutorupdateOne({_id: req.params.id}, identificationData).then(result => {
      res.status(200).json({message: 'You just successfully updated the user credentials my boy!'})
    })

  }
)

module.exports = router;
