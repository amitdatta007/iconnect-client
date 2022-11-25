import React from 'react';
import { Link } from 'react-router-dom';

const Catagory = ({ catagory }) => {
    const { catagoryId, catagoryName, catagoryImg } = catagory;
    return (
        <Link to={`/catagory/${catagoryId}`} className='bg-base-300 w-full max-w-[240px] flex gap-2 items-center p-3 rounded-lg hover:bg-base-content hover:text-base-300'>
            <img className='w-20' src={catagoryImg} alt="" />
            <p className='text-[20px]'>{catagoryName}</p>
        </Link>
    );
};

export default Catagory;