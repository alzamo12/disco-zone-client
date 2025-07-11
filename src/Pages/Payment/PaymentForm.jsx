import { CardElement, useElements, useStripe } from '@stripe/react-stripe-js';
import { useState } from 'react';
import useAxiosSecure from '../../hooks/useAxiosSecure';
import useAuth from '../../hooks/useAuth';
import { useMutation } from '@tanstack/react-query';
import toast from 'react-hot-toast';

const PaymentForm = () => {
    const stripe = useStripe();
    const elements = useElements();
    const [error, setError] = useState("");
    const axiosSecure = useAxiosSecure();
    const {user} = useAuth();

    const mutation  = useMutation({
        mutationFn: async(updateUser) => {
            const res = await axiosSecure.put(`/user/${user?.email}`, updateUser);
            return res.data
        },
        onSuccess: () => {
            toast.success("You have become a gold member")
        }
    })

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

        const res = await axiosSecure.post("/create-payment-intent");
        console.log("data from payment intent", res.data);

        const clientSecret = res.data.clientSecret;

        const result = await stripe.confirmCardPayment(clientSecret, {
            payment_method: {
                card: elements.getElement(CardElement),
                billing_details: {
                    name: user?.displayName
                }
            }
        })

        if(result.error){
            console.log("result error", result.error)
        }
        else{
            if(result.paymentIntent.status === 'succeeded'){
                console.log("Payment Succeeded")
                const updateUser = {
                    badge: "gold"
                }
                mutation.mutate(updateUser)
            }
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