import { useStripe, useElements, CardElement } from '@stripe/react-stripe-js';
import { useState } from 'react';
import { useGlobalContext } from '../Contexts/GlobalContext';

import OrderSummary from '../Components/OrderSummary.jsx'

export default function CheckoutForm({ clientSecret, orderId, customerData, cart }) {
    console.log("This is the safe cart inside the checkout component!")
    console.log(cart)
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

        await updateOrderStatus(orderId, cart);
    };

    const updateOrderStatus = async (orderId, cart) => {
        try {
            const response = await fetch('http://localhost:3000/orders/change-order-status', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    orderId,
                    customerEmail: customerData.email,
                    customerAddress: customerData.address,
                    customerName: customerData.name,
                    customerPhone: customerData.phone
                }),
            });

            const result = await response.json();

            if (response.ok) {
                console.log(`Response from server: ${result.message}`);

                if (result.message.toLowerCase().includes('succeeded')) {
                    console.log('Payment confirmed, proceeding to update stock...');

                    const updates = cart.map(item => ({
                        slug: item.slug,
                        nAvailable: item.nAvailable - item.quantity
                    }));

                    const stockUpdateResponse = await fetch('http://localhost:3000/api/vinyls/update_quantity', {
                        method: 'PATCH',
                        headers: {
                            'Content-Type': 'application/json',
                        },
                        body: JSON.stringify({ updates }),
                    });

                    const stockUpdateResult = await stockUpdateResponse.json();

                    if (stockUpdateResponse.ok) {
                        console.log('Stock updated:', stockUpdateResult.message);
                    } else {
                        console.error('Failed to update stock:', stockUpdateResult.error);
                    }
                } else {
                    console.warn('Payment did not succeed. Skipping stock update.');
                }
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
