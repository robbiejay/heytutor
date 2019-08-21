const Tutor = require('../../../models/tutors');

exports.updateSubject = (req,res,next) => {
  const subjectCredentials = new Tutor({
    _id: req.body.id,
    subject: req.body.subject,
    price: req.body.price,
    specialisationList: req.body.specialisationList
  });
  console.log(subjectCredentials);
  Tutor.updateOne({_id: req.params.id}, subjectCredentials)
  .then(result => {
    console.log(result);
    res.status(200).json({ message: 'You just successfully updated the subject credentials!'})
  });
}

exports.checkSubject = (req,res,next) => {
  Tutor.findOne({_id: req.params.id}, {subject: 1, price: 1, specialisationList: 1}).then(credentials => {
    res.status(200).json({
      message: 'Subject fetched successfully',
      subject: credentials
    })
  })
}
