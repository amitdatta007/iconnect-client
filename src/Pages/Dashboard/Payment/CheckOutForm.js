import React, { useEffect, useState } from 'react';
import { CardElement, useStripe, useElements } from '@stripe/react-stripe-js';
import toast from 'react-hot-toast';
import axios from 'axios';
import {useNavigate} from 'react-router-dom';


const CheckOutForm = ({ product }) => {
    const stripe = useStripe();
    const elements = useElements();
    const [error, setError] = useState('');
    const [clientSecret, setClientSecret] = useState("");
    const { resellPrice, bookedByName, bookedByEmail } = product;

    const navigate = useNavigate()

    useEffect(() => {
        // Create PaymentIntent as soon as the page loads
        fetch("http://localhost:5000/create-payment-intent", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ resellPrice }),
        })
            .then((res) => res.json())
            .then((data) => setClientSecret(data.clientSecret));
    }, [resellPrice]);

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!stripe || !elements) {
            return;
        };

        const card = elements.getElement(CardElement);

        if (card == null) {
            return;
        }

        const { error, paymentMethod } = await stripe.createPaymentMethod({
            type: 'card',
            card,
        });

        if (error) {
            setError(error.message);
        } else {
            setError('');
        };
        const { paymentIntent, error: confirmError } = await stripe.confirmCardPayment(
            clientSecret,
            {
                payment_method: {
                    card: card,
                    billing_details: {
                        name: bookedByName,
                        email: bookedByEmail,
                    },
                },
            },
        );

        if(confirmError){
            setError(confirmError.message);
            return;
        };

        if(paymentIntent.status === "succeeded"){
            
            const paidProduct = {
                ...product,
                transitonID: paymentIntent.id,
            };
            paidProduct.paid = true;

            axios.put('http://localhost:5000/booking', paidProduct).then(() => {
                toast.success('Payment Success.');
                navigate('/dashboard/myorders')
            });
        };
    };

    return (
        <div className='bg-base-100 w-96 mx-auto rounded-xl'>
            <form onSubmit={handleSubmit} className='px-6 py-8 flex flex-col gap-4'>
                <CardElement
                    options={{
                        style: {
                            base: {
                                fontSize: '16px',
                                color: '#424770',
                                '::placeholder': {
                                    color: '#aab7c4',
                                },
                            },
                            invalid: {
                                color: '#9e2146',
                            },
                        },
                    }}
                />
                <p className='text-error text-center'>{error}</p>
                <button type="submit" disabled={!stripe || !clientSecret} className='btn btn-primary'>
                    Pay Now
                </button>
            </form>
        </div>
    );
};

export default CheckOutForm;