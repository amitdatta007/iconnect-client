import React from 'react';
import { useLoaderData } from 'react-router-dom';
import SingleProduct from '../SingleProduct/SingleProduct';

const Products = () => {
    const { data: products } = useLoaderData();


    return (
        <div>
            <h1 className='text-2xl font-bold'>Total Phones Found in this Catagory: {products.length}</h1>
            <div className='my-10 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4'>
                {
                    products.map(product => <SingleProduct key={product._id} product={product} />)
                }
            </div>
        </div>
    );
};

export default Products;