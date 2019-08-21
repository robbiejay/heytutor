const Tutor = require('../../../models/tutors');

exports.updateBio = (req,res,next) => {
  let profilePath = req.body.profile;
  const url = req.protocol + "://" + req.get("host");
  profilePath = url + "/_backend/images/" + req.file.filename
  const bioCredentials = new Tutor({
    _id: req.body.id,
    bio: req.body.bio,
    location: req.body.location,
    profilePath: profilePath
  });
  console.log(bioCredentials);
  Tutor.updateOne({_id: req.params.id}, bioCredentials)
  .then(result => {
    console.log(result);
    res.status(200).json({ message: 'You just successfully updated the bio credentials my dude!'});
  });
}

exports.checkBio = (req,res,next) => {
  Tutor.findOne({_id: req.params.id}, {bio: 1, location: 1, profilePath: 1}).then(credentials => {
    res.status(200).json({
      message: 'Bio fetched successfully',
      bio: credentials
    })
  })
}
