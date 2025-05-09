import React, { useEffect, useState } from 'react';
import { Elements } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';
import CheckoutPage from './CheckoutPage.jsx';

const stripePromise = loadStripe('pk_test_51RMR05FSjhx1khJeIPoZjR7MAjlZ8MznKApnIVMz63MBET3v3vifQFlPyLB7DXIIryz1Hij6bYGlti5RjtvvVeDH00bxQyOiQq');

export default function StripeApp() {
    const [clientSecret, setClientSecret] = useState('');

    useEffect(() => {
        fetch('http://localhost:3000/create-payment-intent', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
        })
            .then(res => res.json())
            .then(data => setClientSecret(data.clientSecret));
    }, []);

    return (
        clientSecret && (
            <Elements options={{ clientSecret }} stripe={stripePromise}>
                <CheckoutPage />
            </Elements>
        )
    );
}