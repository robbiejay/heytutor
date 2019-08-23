const Tutor = require('../../models/tutors');

exports.getTutor = (req,res,next) => {
  Tutor.findOne({_id: req.params.id}).then(profile => {
    res.status(200).json({
      message: 'Tutor fetched successfully',
      tutor: profile
    });
  });
}

exports.getTutors = (req,res,next) => {
  Tutor.find().then(profiles => {
    res.status(200).json({
      message: 'Tutors fetched successfully',
      tutors: profiles
    });
  });
}
