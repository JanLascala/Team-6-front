import { useStripe, useElements, CardNumberElement, CardExpiryElement, CardCvcElement } from '@stripe/react-stripe-js';
import { useState } from 'react';
import { useGlobalContext } from '../Contexts/GlobalContext';
import OrderSummary from '../Components/OrderSummary.jsx'

export default function CheckoutForm({ clientSecret, orderId, customerData, cart }) {
    const stripe = useStripe();
    const elements = useElements();
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const { clearCart } = useGlobalContext();
    const [paymentMessage, setPaymentMessage] = useState(null);

    // Common elements style
    const commonOptions = {
        style: {
            base: {
                fontSize: '16px',
                color: '#424770',
                fontFamily: 'Arial, sans-serif',
                '::placeholder': {
                    color: '#aab7c4',
                },
                padding: '10px',
            },
            invalid: {
                color: '#9e2146',
                iconColor: '#9e2146'
            },
        },
        hidePostalCode: true,
        hideIcon: true,
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setPaymentMessage(null);

        if (!stripe || !elements || !clientSecret) return;

        const result = await stripe.confirmCardPayment(clientSecret, {
            payment_method: {
                card: elements.getElement(CardNumberElement),
                billing_details: {
                    name: customerData.name,
                    email: customerData.email,
                    address: {
                        line1: customerData.address,
                    },
                },
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
        <div className='position-relative container p-1'>
            <div className="row">
                <div className="col-md-6 pe-md-4">
                    <form onSubmit={handleSubmit} style={{ maxWidth: 400, margin: '0 auto' }} className="payment-form">
                        <h4 className="mb-4">Payment details</h4>

                        <div className="mb-3">
                            <label className="form-label mb-2">Card number</label>
                            <div className="form-control p-3 bg-light">
                                <CardNumberElement options={commonOptions} />
                            </div>
                        </div>

                        <div className="row">

                            <div className="col-6 mb-3">
                                <label className="form-label mb-2">Expiration date</label>
                                <div className="form-control p-3 bg-light">
                                    <CardExpiryElement options={commonOptions} />
                                </div>
                            </div>

                            <div className="col-6 mb-3">
                                <label className="form-label mb-2">CVC</label>
                                <div className="form-control p-3 bg-light">
                                    <CardCvcElement options={commonOptions} />
                                </div>
                            </div>
                        </div>

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
                            className="btn btn-primary mt-3 w-100"
                        >
                            {loading ?
                                <div className="d-flex align-items-center justify-content-center">
                                    <span className="spinner-border spinner-border-sm me-2" role="status" aria-hidden="true"></span>
                                    <span>Loading...</span>
                                </div>
                                : "Pay"
                            }
                        </button>
                    </form>
                </div>

                <div className="col-md-6 ps-md-4 border-start">
                    <div id='order-summary-container'>
                        <OrderSummary />
                    </div>
                </div>
            </div>
        </div>
    );
}
