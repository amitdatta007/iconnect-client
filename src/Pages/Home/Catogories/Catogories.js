import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import React from 'react';
import Catagory from '../Catagory/Catagory';

const Catogories = () => {
    const { data: catagories = [] } = useQuery({
        queryKey: ["catagories"],
        queryFn: () => axios('http://localhost:5000/catagories').then(result => result.data)
    });

    return (
        <div>
            <h2 className='text-2xl font-semibold'>Browse used phones by category</h2>
            <div className='flex flex-col md:flex-row max-w-3xl mx-auto my-4 gap-4 justify-center items-center'>
                {
                    catagories.map(catagory => <Catagory key={catagory._id} catagory={catagory} />)
                }
            </div>
        </div>
    );
};

export default Catogories;