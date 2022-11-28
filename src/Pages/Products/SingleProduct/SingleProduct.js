import axios from 'axios';
import React from 'react';
import { confirmAlert } from 'react-confirm-alert';
import toast from 'react-hot-toast';
import { GoVerified } from 'react-icons/go';

const SingleProduct = ({ product, setItem }) => {
    const { brand, model, img, originalPrice, resellPrice, sellerVerified, sellerName, sellerEmail, sellerAddress, sellerPhone, description, date, condition
    } = product;

    console.log(sellerVerified)

    const handleReport = product => {
        confirmAlert({
            title: 'Confirm Report?',
            buttons: [
                {
                    label: 'Yes',
                    onClick: () => {
                        axios.post(`http://localhost:5000/report`, product).then(() => {
                            toast.success('Successfully Reported');
                        });
                    }
                },
                {
                    label: 'No',
                    onClick: () => { }
                }
            ]
        });
    }

    

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
                </div>
                <div className='flex justify-between'>
                    <button className='btn btn-outline btn-accent' onClick={() => handleReport(product)}>Report Item</button>
                    <label onClick={() => setItem(product)} htmlFor="booking-modal" className='btn btn-primary text-base-100' >Book Now</label>
                </div>
            </div>
        </div>
    );
};

export default SingleProduct;