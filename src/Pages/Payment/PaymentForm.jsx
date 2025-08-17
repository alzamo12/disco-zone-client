import { CardElement, useElements, useStripe } from '@stripe/react-stripe-js';
import { useState } from 'react';
import useAxiosSecure from '../../hooks/useAxiosSecure';
import useAuth from '../../hooks/useAuth';
import { useMutation } from '@tanstack/react-query';
import toast from 'react-hot-toast';
import { motion } from 'framer-motion';

const CARD_OPTIONS = {
    style: {
        base: {
            iconColor: '#ccc',
            color: '#fff',
            fontSize: '16px',
            '::placeholder': { color: '#777' },
            backgroundColor: 'transparent',
        },
        invalid: {
            iconColor: '#ef4444',
            color: '#ef4444',
        },
    },
};
const PaymentForm = () => {
    const stripe = useStripe();
    const elements = useElements();
    const [error, setError] = useState("");
    const axiosSecure = useAxiosSecure();
    const { user } = useAuth();

    const mutation = useMutation({
        mutationFn: async ({ updateUser, toastId }) => {
            const res = await axiosSecure.put(`/user/${user?.email}`, updateUser);
            return res.data
        },
        onSuccess: (data, variables) => {
            toast.dismiss(variables.toastId)
            toast.success("You have become a gold member")
            // console.log(variables)
        },
        onError: (err, variables) => {
            toast.dismiss(variables.toastId)
        }
    })

    const handleSubmit = async (e) => {
        e.preventDefault()
        const toastId = toast.loading("Payment is Processing");
        if (!stripe || !elements) {
            return toast.dismiss(toastId)
        };

        const card = elements.getElement(CardElement);
        if (!card) {
            return toast.dismiss(toastId)
        }

        const { error, paymentMethod } = await stripe.createPaymentMethod({
            type: 'card',
            card,
        });

        if (error) {
            console.log(error)
            toast.dismiss(toastId)
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
        });

        if (result.error) {
            toast.dismiss(toastId)
            console.log("result error", result.error)
        }
        else {
            if (result.paymentIntent.status === 'succeeded') {
                console.log("Payment Succeeded")
                const updateUser = {
                    badge: "gold"
                }
                mutation.mutate({ updateUser, toastId })
            }
        }
    }

    return (
        // <div>
        //     <form className='space-y-4 bg-white p-6 rounded-xl shadow-md w-full max-w-md mx-auto'
        //         onSubmit={handleSubmit}>
        //         <CardElement className='p-2 border rounded'>
        //         </CardElement>
        //         <button className='bg-neutral text-white btn' type='Submit' disabled={!stripe}>Pay</button>
        //     {error && <p>{error}</p>}
        //     </form>
        // </div>
        <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.4 }}
            className="flex items-center justify-center p-4"
        >
            <motion.form
                onSubmit={handleSubmit}
                initial={{ y: 20 }}
                animate={{ y: 0 }}
                transition={{ delay: 0.2, duration: 0.4 }}
                className="w-full max-w-md bg-primary rounded-2xl shadow-2xl p-8 space-y-6"
            >
                <h2 className="text-2xl font-bold text-center text-white">Complete Payment</h2>

                <div className="p-4 bg-gray-700 rounded-lg border border-gray-600">
                    <CardElement options={CARD_OPTIONS} />
                </div>

                {error && (
                    <motion.p
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        className="text-red-500 text-sm text-center"
                    >
                        {error}
                    </motion.p>
                )}

                <motion.button
                    type="submit"
                    disabled={!stripe}
                    whileHover={{ scale: 1.03 }}
                    whileTap={{ scale: 0.97 }}
                    className="w-full py-3 btn-outline border-accent border rounded-full text-white font-semibold disabled:opacity-50 transition"
                >
                    Pay Now
                </motion.button>
            </motion.form>
        </motion.div>
    );
};

export default PaymentForm;