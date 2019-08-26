const express = require('express');
const path = require('path');
const router = express.Router();

const stripe = require('stripe')('sk_test_Gfz2bLKCQvkThjBNdPrMlZR000HMry4HyU');

router.post('/order', async (req, res) => {
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
  })();
})

module.exports = router;
