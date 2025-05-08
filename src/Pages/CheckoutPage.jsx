import { useStripe, useElements, CardElement } from '@stripe/react-stripe-js';

export default function CheckoutPage() {
    const stripe = useStripe();
    const elements = useElements();
}
