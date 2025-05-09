import { useStripe, useElements, CardElement } from '@stripe/react-stripe-js';
import { useState } from 'react';

export default function CheckoutForm({ clientSecret }) {
    const stripe = useStripe();
    const elements = useElements();
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);

        if (!stripe || !elements || !clientSecret) return;

        const result = await stripe.confirmCardPayment(clientSecret, {
            payment_method: {
                card: elements.getElement(CardElement),
            }
        });

        setLoading(false);

        if (result.error) {
            setError(result.error.message);
        } else if (result.paymentIntent.status === 'succeeded') {
            alert('Payment successful!');
        }
    };
    console.log(stripe)
    console.log(loading)
    console.log(clientSecret)

    return (
        <form onSubmit={handleSubmit} style={{ maxWidth: 400, margin: '0 auto' }}>
            <CardElement />
            {error && <p className="text-danger mt-2">{error}</p>}
            <button
                type="submit"
                disabled={!stripe || loading || !clientSecret}
                className="btn btn-primary mt-3"
            >
                {loading ? "Processing..." : "Pay"}
            </button>
        </form>
    );
}
