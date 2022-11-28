import React from 'react';

const Services = () => {
    return (
        <div className='my-10'>
            <h1 className='text-2xl font-bold'>Services</h1>
            <div className='flex flex-col md:flex-row gap-6 p-10'>
                <div className='bg-primary bg-opacity-75 p-6 w-full rounded-xl'>
                    <h2 className='text-3xl font-bold'>Buy Used Phones</h2>
                    <p>Lorem, ipsum dolor sit amet consectetur adipisicing elit. Est porro cupiditate natus illum quibusdam officiis minima qui. Rem dicta, est ab cumque dolores repellendus placeat, architecto consequatur impedit quia doloremque?</p>
                </div>
                <div className='bg-primary bg-opacity-75 p-6 w-full rounded-xl'>
                    <h2 className='text-3xl font-bold'>Sell Used Phones</h2>
                    <p>Lorem, ipsum dolor sit amet consectetur adipisicing elit. Est porro cupiditate natus illum quibusdam officiis minima qui. Rem dicta, est ab cumque dolores repellendus placeat, architecto consequatur impedit quia doloremque?</p>
                </div>
            </div>
        </div>
    );
};

export default Services;