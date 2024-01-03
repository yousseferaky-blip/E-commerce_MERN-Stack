import React from 'react';
import { Elements } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';
import CheckoutForm from './CheckoutForm';

const stripePromise = loadStripe('pk_test_51OTnLLGoqXNjMzFsRnjV3ugASESJSG2DMBl5Qepz1PUCvYbccUGnpSZQAvytYMpc7vhBaPCm9fPRDZbEr0EycejL00VKmvBbns');

const StripeContainer = () => {
  return (
    <Elements stripe={stripePromise}>
  <CheckoutForm amount={1000} />
</Elements>
  );
};

export default StripeContainer;
