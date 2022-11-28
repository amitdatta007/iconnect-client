import React from 'react';
import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import ProductOne from './ProductOne';

const AdvertisedProduct = () => {

    const {data: products = [], isLoading} = useQuery({
        queryHash: ['products'],
        queryFn: () => axios('http://localhost:5000/advertise').then(res => res.data)
    });

    if(isLoading){
        return <p></p>
    }

    if(products.length){
        return (
            <div>
                <h1 className='text-2xl font-bold'>Total Phones Found in this Catagory: {products.length}</h1>
                <div className='my-10 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4'>
                    {
                        products.map(product => <ProductOne key={product._id} product={product} />)
                    }
                </div>
            </div>
        );
    }  
};

export default AdvertisedProduct;