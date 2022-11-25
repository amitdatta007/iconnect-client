import React from 'react';
import phones from '../../../assets/phones.png';

const Banner = () => {
    return (
        <div className="flex flex-col-reverse md:flex-row gap-4 py-6 px-8">
            <div className='w-full flex flex-col justify-center items-start gap-3'>
                <h1 className='text-4xl font-bold'>Want to Buy Used Phone? </h1>
                <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Corporis facilis unde ex quas, soluta rem sint commodi, nisi laborum voluptates repellendus suscipit amet itaque eveniet!</p>
                <button className='btn'>btn</button>
            </div>
            <div className='w-full'>
                <img className='w-full' src={phones} alt="" />
            </div>
        </div>
    );
};

export default Banner;