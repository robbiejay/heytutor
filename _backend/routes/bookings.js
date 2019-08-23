const express = require('express');
const path = require('path');
const Booking = require('../models/bookings');
const router = express.Router();

router.post(
  '',
  (req, res, next) => {
    console.log(req.body);
    const booking = new Booking({
      studentId: req.body.studentId,
      tutorId: req.body.tutorId,
      price: req.body.price,
      date: req.body.date,
      time: req.body.time,
      location: req.body.location,
      description: req.body.description
    });
    booking.save()
    .then(result => {
      res.status(201).json({
        message: 'Booking posted!',
        booking: {
          ...result,
          id: result._id
        }
      })
    })
  }
)


module.exports = router;
