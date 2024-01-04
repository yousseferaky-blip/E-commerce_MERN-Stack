import React, { useState } from 'react';
import { useStripe, useElements, CardElement } from '@stripe/react-stripe-js';
import './payment.css'; 
import { BASE_URL } from '../../components/api/Api';

const CheckoutForm = ({ amount }) => {
  const stripe = useStripe();
  const elements = useElements();
  const [paymentError, setPaymentError] = useState(null);

  const handleSubmit = async (event) => {
    event.preventDefault();
  
    if (!stripe || !elements) {
      return;
    }
  
    const { token, error } = await stripe.createToken(elements.getElement(CardElement));
  
    if (error) {
      setPaymentError(error.message);
    } else {
      console.log('Amount:', amount); 
      handlePayment(token);
    }
  };

  const handlePayment = async (token) => {
    try {
      const response = await fetch(`${BASE_URL}/create-payment-intent`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ token: token.id }),
      });

      if (response.ok) {
        console.log('Payment successful!');
      } else {
        console.error('Payment failed.');
      }
    } catch (error) {
      console.error('Error processing payment:', error);
    }
  };

  return (
    <form className="checkout-form" onSubmit={handleSubmit}>
      <CardElement options={{ style: { base: { fontSize: '16px' } } }} />
      <button type="submit" disabled={!stripe} className="pay-button">
        Pay Now
      </button>
      {paymentError && <div className="error-message">{paymentError}</div>}
    </form>
  );
};

export default CheckoutForm;
