const express = require('express');
const path = require('path');
const router = express.Router();
const Booking = require('../models/bookings');

const stripe = require('stripe')('sk_test_Gfz2bLKCQvkThjBNdPrMlZR000HMry4HyU');

router.post('/order/:id', async (req, res) => {
  console.log(req.body);
  const token = req.body.token.id;
  const price = req.body.price;
  (async () => {
    const charge = await stripe.charges.create({
      amount: price * 100,
      currency: 'hkd',
      description: req.body.token.name +  ', ' + req.body.price + ', ' + req.body.token.created,
      source: token,
    })

    console.log(charge);
    if(charge.paid === true) {
      const paymentCredentials = new Booking({
        _id: req.body.id,
        booking_date: req.body.bookingDate,
        payment_received: true
      })

      Booking.updateOne({_id: req.params.id}, paymentCredentials).then(result => {
        console.log(result);
        res.status(201).json({
          message: 'Payment successful!',
        })
      })
    }
  })();
})

module.exports = router;
