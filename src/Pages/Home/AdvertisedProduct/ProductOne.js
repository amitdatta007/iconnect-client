import React from 'react';
import { GoVerified } from 'react-icons/go';

const ProductOne = ({product}) => {
    const { brand, model, img, originalPrice, resellPrice, sellerVerified, sellerName, sellerEmail, sellerAddress, sellerPhone, description, date, condition
    } = product;
    return (
        <div className="card bg-base-100 shadow-xl">
            <figure><img className='w-full h-60' src={img} alt="" /></figure>
            <div className="card-body">
                <div>
                    <p className='text-2xl font-bold'>{`${brand} ${model}`}</p>
                    <p className='flex items-center gap-1 text-[14px]'>Posted on {date} by {sellerName} {sellerVerified && <GoVerified className='text-blue-500' />}</p>
                </div>
                <div>
                    <p>{description}</p>
                    <p className='font-semibold'>Condition: {condition}</p>
                </div>
                <div>
                    <p className='font-semibold'>Original Price: {originalPrice} bdt</p>
                    <p className='font-semibold'>Resell Price: {resellPrice} bdt</p>
                    <p className='font-semibold'>Email: {sellerEmail} bdt</p>
                    <p className='font-semibold'>Phone: {sellerPhone} bdt</p>
                    <p className='font-semibold'>Address: {sellerAddress} bdt</p>
                </div>
            </div>
        </div>
    );
};

export default ProductOne;