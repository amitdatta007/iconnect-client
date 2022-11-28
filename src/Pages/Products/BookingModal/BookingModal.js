import axios from 'axios';
import React, { useContext } from 'react';
import toast from 'react-hot-toast';
import { AuthContext } from '../../../AuthProvider/AuthProvider';
import {GoVerified} from 'react-icons/go';
import {useNavigate} from 'react-router-dom';

const BookingModal = ({item}) => {
    const { brand, model, img, originalPrice, resellPrice, sellerVerified, sellerName, sellerEmail, sellerAddress, sellerPhone, description, date, condition
    } = item;

    const navigate = useNavigate();

    const {userInfo} = useContext(AuthContext);
    const {name, email} = userInfo;

    const handleBooking = e => {
        e.preventDefault();
        const phone = e.target.phone.value;
        const address = e.target.address.value;
        const bookedProduct = {
            ...item,
            paid: false,
            bookedByName: name,
            bookedByEmail: email,
            bookedByPhone: phone,
            bookedByAddress: address
        };

        axios.post('https://iconnect-server.vercel.app/booking', bookedProduct).then(res => {
            if (res.data.acknowledged) {
                toast.success('Successfully Booked!');
                const p = { ...item };
                p.isAvaiable = false;
                axios.put('https://iconnect-server.vercel.app/product', p).then(() => {
                    navigate('/dashboard/myorders')
                })
            } else {
                toast.error('Already Booked')
                
            };
        });
    };

    return (
        <>
            <input type="checkbox" id="booking-modal" className="modal-toggle" />
            <div className="modal">
                <div className="modal-box flex flex-col gap-10 bottom-0 absolute sm:static w-full">
                    <div className='flex justify-between'>
                        <div>
                            <p className='text-2xl font-bold'>{`${brand} ${model}`}</p>
                            <p className='flex items-center gap-1 text-[14px]'>Posted on {date} by {sellerName} {sellerVerified && <GoVerified className='text-blue-500' />}</p>
                        </div>
                        <label htmlFor="booking-modal" className="btn btn-sm btn-circle">✕</label>
                    </div>

                    <form className='w-full flex flex-col gap-6' onSubmit={handleBooking}>
                        <input type="text" defaultValue={`${resellPrice} bdt`} disabled className="input input-bordered" />

                        <input name='name' defaultValue={name} type="text" placeholder="Full Name" className="input input-bordered" disabled />
                        <input name='email' defaultValue={email} type="email" placeholder="Email" className="input input-bordered" disabled />
                        <input name='phone' type="number" placeholder="Phone Number" className="input input-bordered" required />
                        <input name='address' type="text" placeholder="Address" className="input input-bordered" required />
                        <input type="submit" value="Book Now" className='btn' />
                    </form>
                </div>
            </div>
        </>
    );
};

export default BookingModal;