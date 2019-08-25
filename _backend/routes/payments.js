const express = require('express');
const path = require('path');
const router = express.Router();

const stripe = require('stripe')('sk_test_Gfz2bLKCQvkThjBNdPrMlZR000HMry4HyU');

router.post('/order', async (req, res) => {
  console.log(req.body);
  const token = req.body.id;

  (async () => {
    const charge = await stripe.charges.create({
      amount: 100 * 100,
      currency: 'hkd',
      description: 'This is my test charge',
      source: token,
    })
  })();
})

module.exports = router;
