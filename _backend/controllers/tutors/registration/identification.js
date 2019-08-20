const Tutor = require('../../../models/tutors');

exports.updateIdentification = (req,res,next) => {
    const url = req.protocol + "://" + req.get("host");
    const identificationData = new Tutor({
      _id: req.body.id,
      cvPath: url + "/_backend/documents/" + req.files.cv[0].filename,
      identificationPath: url + "/_backend/documents/" + req.files.identification[0].filename
  });
  console.log(identificationData);
  Tutor.updateOne({_id: req.params.id}, identificationData).then(result => {
    console.log(result);
    console.log(res);
    res.status(200).json({message: 'You just successfully updated the user credentials my boy!'})
  })
}

exports.checkIdentification = (req,res,next) => {
  console.log('triggered');
  Tutor.findOne({_id: req.params.id}, {cvPath: 1, identificationPath: 1}).then(credentials => {
    console.log(credentials);
    res.status(200).json({
      message: 'Identification fetched successfully',
      identification: credentials
    })
  })
}
