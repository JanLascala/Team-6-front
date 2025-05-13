import React, { useState } from 'react';
import { Elements } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';
import { useGlobalContext } from '../Contexts/GlobalContext.jsx';
import CheckoutPage from './CheckoutPage.jsx';

// Initialize Stripe with the publishable key
const stripePromise = loadStripe('pk_test_51RMR05FSjhx1khJeIPoZjR7MAjlZ8MznKApnIVMz63MBET3v3vifQFlPyLB7DXIIryz1Hij6bYGlti5RjtvvVeDH00bxQyOiQq');

export default function StripeApp() {
    // Access shopping cart from global context
    const { cart } = useGlobalContext();
    // console.log("this is the normal cart data!")
    // console.log(cart)
    // Create a safe version of cart with only necessary data for API
    const safeCart = cart.map(item => ({
        id: item.productId,
        slug: item.slug,
        quantity: item.quantity,
        nAvailable: item.nAvailable
    }));
    // console.log("this is thecart data sent to the api!")
    // console.log(safeCart)

    // Stripe client secret for payment intent
    const [clientSecret, setClientSecret] = useState('');

    // Save data user enters in the form
    const [formData, setFormData] = useState({
        name: '',
        surname: '',
        address: '',
        email: '',
        phone: ''
    });
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [orderId, setOrderId] = useState(null)

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError(null);

        try {
            // Call backend API to create a payment intent
            const response = await fetch('http://localhost:3000/orders/create-payment-intent', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    cart: safeCart,
                    description: 'Vinyl purchase',
                    customerName: `${formData.name} ${formData.surname}`,
                    customerEmail: formData.email,
                    customerPhone: formData.phone,
                    customerAddress: formData.address,
                })
            });

            const data = await response.json();
            if (data.clientSecret) {
                setClientSecret(data.clientSecret);
                setOrderId(data.orderId)
            } else {
                throw new Error('Missing client secret');
            }
        } catch (err) {
            console.error(err);
            setError('Failed to create payment. Please try again.');
        }

        setLoading(false);
    };

    // Customer information form
    if (!clientSecret) {
        return (
            <div className="container mt-5" style={{ maxWidth: 500 }}>
                <h2 className="mb-4">Enter your details</h2>
                <form onSubmit={handleSubmit}>
                    <div className="mb-3">
                        <label className="form-label">Name</label>
                        <input name="name" className="form-control" onChange={handleChange} required />
                    </div>
                    <div className="mb-3">
                        <label className="form-label">Surname</label>
                        <input name="surname" className="form-control" onChange={handleChange} required />
                    </div>
                    <div className="mb-3">
                        <label className="form-label">Address</label>
                        <input name="address" type="address" className="form-control" onChange={handleChange} required />
                    </div>
                    <div className="mb-3">
                        <label className="form-label">Email</label>
                        <input name="email" type="email" className="form-control" onChange={handleChange} required />
                    </div>
                    <div className="mb-3">
                        <label className="form-label">Phone</label>
                        <input name="phone" type="tel" className="form-control" onChange={handleChange} />
                    </div>
                    {error && <div className="alert alert-danger">{error}</div>}
                    <button type="submit" className="btn btn-primary" disabled={loading}>
                        {loading ? 'Loading...' : 'Proceed to Payment'}
                    </button>
                </form>
            </div>
        );
    }

    return (
        // Stripe payment form when client secret is available
        <Elements options={{ clientSecret }} stripe={stripePromise}>
            <CheckoutPage clientSecret={clientSecret} orderId={orderId} customerData={formData} cart={safeCart} />
        </Elements>
    );
}
