import { CardElement, useElements, useStripe } from '@stripe/react-stripe-js';
import { useState } from 'react';

const PaymentForm = () => {
    const stripe = useStripe();
    const elements = useElements();
    const [error, setError] = useState("");

    const handleSubmit = async (e) => {
        e.preventDefault()
        if (!stripe || !elements) {
            return;
        };

        const card = elements.getElement(CardElement);
        if (!card) {
            return;
        }

        const { error, paymentMethod } = await stripe.createPaymentMethod({
            type: 'card',
            card,
        });

        if (error) {
            console.log(error)
            setError(error.message)
        }
        else {
            setError("")
            console.log(paymentMethod)
        }
    }

    return (
        <div>
            <form className='space-y-4 bg-white p-6 rounded-xl shadow-md w-full max-w-md mx-auto'
                onSubmit={handleSubmit}>
                <CardElement className='p-2 border rounded'>
                </CardElement>
                <button className='bg-neutral text-white btn' type='Submit' disabled={!stripe}>Pay</button>
            {error && <p>{error}</p>}
            </form>
        </div>
    );
};

export default PaymentForm;