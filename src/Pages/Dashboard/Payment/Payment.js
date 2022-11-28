import React from 'react';
import { useLoaderData } from 'react-router-dom';
import { loadStripe } from '@stripe/stripe-js';
import { Elements } from '@stripe/react-stripe-js'
import CheckOutForm from './CheckOutForm';

const stripePromise = loadStripe(process.env.REACT_APP_STRIPE);

const Payment = () => {
    const { data:product } = useLoaderData();
    return (
        <Elements stripe={stripePromise}>
            <CheckOutForm product={product} />
        </Elements>
    );
};

export default Payment;