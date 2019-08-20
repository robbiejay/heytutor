const Tutor = require('../../../models/tutors');

exports.updateAvailability = (req, res, next) => {
  const scheduleCredentials = new Tutor({
    _id: req.body.id,
    monday: req.body.monday,
    tuesday: req.body.tuesday,
    wednesday: req.body.wednesday,
    thursday: req.body.thursday,
    friday: req.body.friday,
    saturday: req.body.saturday,
    sunday: req.body.sunday
  });
  console.log(scheduleCredentials);
  Tutor.updateOne({_id: req.params.id}, scheduleCredentials)
  .then(result => {
    console.log(result);
    res.status(200).json({ message: 'You just successfully updated the schedule!'})
  })
}

exports.checkAvailability = (req,res,next) => {
  Tutor.findOne({_id: req.params.id}, {monday: 1, tuesday: 1, wednesday: 1, thursday: 1, friday: 1, saturday: 1, sunday: 1}).then(credentials => {
    res.status(200).json({
      message: 'Availability fetched successfully',
      availability: credentials
    })
  })
}
