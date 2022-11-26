import React from 'react';
import { useForm } from "react-hook-form";
import { Link } from 'react-router-dom';

const AddProducts = () => {
    const { register, handleSubmit } = useForm();

    const handleAddProduct = data => {
        console.log(data)
    }

    return (
        <div className='flex justify-center items-center flex-col'>
            <h2 className='text-center text-3xl font-bold'>Add a phone for sell</h2>
            <div className='w-[98%] max-w-md flex flex-col gap-0 p-4 sm:p-8 bg-base-100 my-10 rounded-xl shadow-xl'>
                <form onSubmit={handleSubmit(handleAddProduct)} className='flex flex-col gap-4'>
                    <input type="text" placeholder="Brand Name" className="input input-primary input-bordered w-full focus:outline-none" {...register("brand")} required />

                    <input type="text" placeholder="Model Name" className="input input-primary input-bordered w-full focus:outline-none" {...register("model")} required />

                    <select {...register('condition')} className="select select-primary w-full focus:outline-none" placeholder='Choose Tpye of Your Phone' required>
                        <option value='Excellent'>Excellent</option>
                        <option value='Good'>Good</option>
                        <option value='Fair'>Fair</option>
                    </select>

                    <select {...register('catagoryId')} className="select select-primary w-full focus:outline-none" placeholder='Choose Tpye of Your Phone' required>
                        <option value='101'>Basic Phone</option>
                        <option value='102'>Smart Phone</option>
                        <option value='103'>Tablet Phone</option>
                    </select>

                    <textarea {...register("description")} className="textarea textarea-primary resize-none h-20 focus:outline-none" placeholder="Phone Description"></textarea>

                    <input type="number" placeholder="Price (bdt)" className="input input-primary input-bordered w-full focus:outline-none" {...register("price")} required />

                    <input type="number" placeholder="contact Number)" className="input input-primary input-bordered w-full focus:outline-none" {...register("sellerPhone")} required />

                    <input type="text" placeholder="Address" className="input input-primary input-bordered w-full focus:outline-none" {...register("sellerAddress")} required />

                
                    
                    <input className='btn' type="submit" />
                </form>
            </div>
        </div>
    );
};

export default AddProducts;