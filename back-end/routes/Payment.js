const express = require('express');
const router = express.Router();
const {createPaymentIntent} = require('../controllers/Payment');


router.post('/create-payment-intent', createPaymentIntent);

module.exports = router;
