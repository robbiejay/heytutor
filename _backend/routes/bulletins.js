const express = require('express');
const Bulletin = require('../models/bulletins');
const router = express.Router();

router.post(
  '',
  (req, res, next) => {
    console.log(req.body);
    const bulletin = new Bulletin({
      fullname: req.body.fullname,
      subject: req.body.subject,
      location: req.body.location,
      price: req.body.price,
      description: req.body.description,
      timePosted: req.body.timePosted
    });
    bulletin.save()
    .then(result => {
      res.status(201).json({
        message: 'Bulletin posted!',
        bulletin: {
          ...result,
          id: result._id
        }
      })
    })
  }
)

router.get(
  '',
  (req, res, next) => {
    Bulletin.find().then(bulletins => {
      res.status(200).json({
        message: 'Bulletins fetched successfully',
        bulletins: bulletins
      })
    })
  }
)

module.exports = router;
