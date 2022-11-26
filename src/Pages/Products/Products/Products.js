import React from 'react';
import { useLoaderData } from 'react-router-dom';

const Products = () => {
    const {data:products} = useLoaderData();
    console.log(products);
    return (
        <div>
            <h1>products found: {products.length}</h1>
        </div>
    );
};

export default Products;