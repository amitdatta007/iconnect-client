import React from 'react';
import Navbar from '../Shared/Navbar/Navbar';
import {Link} from 'react-router-dom';

const NotFound = () => {
    return (
        <div>
            <Navbar />
            <div className='flex flex-col gap-4 justify-center items-center h-[calc(100vh-80px)]'>
                <h2 className='text-5xl text-center font-extrabold'><span className='text-primary'>404</span> | Not Found!</h2>
                <p className='text-center font-semibold'>Go Back to <Link className='text-primary hover:underline' to='/'>Home</Link></p>
            </div>
        </div>
    );
};

export default NotFound;