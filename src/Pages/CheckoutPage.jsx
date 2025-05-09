import { useStripe, useElements, CardElement } from '@stripe/react-stripe-js';

export default function CheckoutPage() {
    const stripe = useStripe();
    const elements = useElements();

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!stripe || !elements) return;

        const { error, paymentIntent } = await stripe.confirmCardPayment(elements._clientSecret, {
            payment_method: {
                card: elements.getElement(CardElement),
            },
        });

        if (error) {
            console.error(error.message);
        } else if (paymentIntent.status === 'succeeded') {
            alert('Payment successful!');
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            <CardElement />
            <button type="submit" disabled={!stripe}>Pay</button>
        </form>
    );
}
