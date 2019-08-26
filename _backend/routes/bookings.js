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
      subject: req.body.subject,
      tutorName: req.body.tutorName,
      date: req.body.date,
      time: req.body.time,
      location: req.body.location,
      description: req.body.description,
      confirmed: false,
      payment_received: false,
    });

    Booking.remove({studentId: req.body.studentId, payment_received: false}).then(unpaidBookings => {
      console.log(unpaidBookings);
    })

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

router.get(
  '/:id',
  (req, res, next) => {
    Booking.find({tutorId: req.params.id}).then(bookings => {
      res.status(200).json({
        message: 'Bookings fetched successfully',
        bookings: bookings
      });
    })
  }
)

router.get(
  '/unpaid/:id',
  (req,res,next) => {
    Booking.find({studentId: req.params.id, payment_received: false}).then(booking => {
      res.status(200).json({
        message: 'Booking fetched successfully',
        booking: booking
      });
    })
  }
)


module.exports = router;
