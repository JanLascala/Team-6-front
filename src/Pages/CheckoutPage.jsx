import { useStripe, useElements, CardElement } from '@stripe/react-stripe-js';
import { useState } from 'react';
import { useGlobalContext } from '../Contexts/GlobalContext';

import OrderSummary from '../Components/OrderSummary.jsx'

export default function CheckoutForm({ clientSecret, orderId, customerData }) {
    const stripe = useStripe();
    const elements = useElements();
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const { clearCart } = useGlobalContext();
    const [paymentMessage, setPaymentMessage] = useState(null); // State for message
    console.log("checkoutform mounted");
    console.log(`the orderId is ${orderId}`);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setPaymentMessage(null); // Reset message

        if (!stripe || !elements || !clientSecret) return;

        const result = await stripe.confirmCardPayment(clientSecret, {
            payment_method: {
                card: elements.getElement(CardElement),
            }
        });

        setLoading(false);

        if (result.error) {
            setError(result.error.message);
            setPaymentMessage({ text: `Payment failed: ${result.error.message}`, type: 'error' });
        } else {
            if (result.paymentIntent.status === 'succeeded') {
                setPaymentMessage({ text: 'Payment successful!', type: 'success' });

                if (clearCart) {
                    clearCart();
                    console.log("Carrello svuotato");
                }
            } else {
                setPaymentMessage({ text: 'Payment failed!', type: 'error' });
            }
        }

        await updateOrderStatus(orderId);
    };

    const updateOrderStatus = async (orderId) => {
        try {
            const response = await fetch('http://localhost:3000/orders/change-order-status', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ orderId, customerEmail: customerData.email, customerAddress: customerData.address, customerName: customerData.name, customerPhone: customerData.phone }),

            });

            const result = await response.json();

            if (response.ok) {
                console.log(`Order status updated: ${result.message}`);
            } else {
                console.error(`Failed to update order status: ${result.error}`);
            }
        } catch (err) {
            console.error('Error updating order status:', err);
        }
    };

    return (
            <div className='position-relative'>
                <div className="position-absolute end-0">
                    <OrderSummary />
                </div>
                <form onSubmit={handleSubmit} style={{ maxWidth: 400, margin: '0 auto' }}>
                    <CardElement />
                    {error && <p className="text-danger mt-2">{error}</p>}

                    {/* Displaying the message box */}
                    {paymentMessage && (
                        <div
                            className={`mt-3 p-3 text-white ${paymentMessage.type === 'success' ? 'bg-success' : 'bg-danger'}`}
                            style={{ borderRadius: '5px' }}
                        >
                            {paymentMessage.text}
                        </div>
                    )}

                    <button
                        type="submit"
                        disabled={!stripe || loading || !clientSecret}
                        className="btn btn-primary mt-3"
                    >
                        {loading ? "Processing..." : "Pay"}
                    </button>
                </form>
        </div>

    );
}
