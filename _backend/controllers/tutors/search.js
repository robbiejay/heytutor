const Tutor = require('../../models/tutors');


exports.getTutors = (req,res,next) => {
  Tutor.find().then(profiles => {
    res.status(200).json({
      message: 'Tutors fetched successfully',
      tutors: profiles
    });
  });
}
