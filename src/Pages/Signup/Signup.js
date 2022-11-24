import React from 'react';
import { useState } from 'react';
import { useContext } from 'react';
import { useForm } from "react-hook-form";
import { Link } from 'react-router-dom';
import { AuthContext } from '../../AuthProvider/AuthProvider';

const Signup = () => {
    const { register, handleSubmit } = useForm();
    const { createUser, googleLogin, updateUser } = useContext(AuthContext);
    const [error, setError] = useState(null);

    const handleSignUp = data => {
        const { name, email, password, confirmPassword, accountType, agree } = data;
        setError(null);

        if (password.length < 6) {
            setError('Password Must Be 6 Character or More');
            return;
        };

        if (password !== confirmPassword) {
            setError('Password Does Not Match');
            return;
        };

        if (!agree) {
            setError('Accept Terms and Privary');
            return;
        };

        createUser(email, password)
            .then(result => {
                updateUser(name)
                    .then(() => {
                        
                    });
            })
            .catch(err => {
                if (err.code === 'auth/email-already-in-use') {
                    setError('Email Already Used');
                };
            })
    };

    const handleGoogleLogin = () => {
        googleLogin()
            .then(result => {
                console.log(result.user)
            })
            .catch(err => {
                console.log(err)
            })
    };

    return (
        <div className='flex justify-center items-center'>
            <div className='w-[98%] max-w-md flex flex-col gap-0 p-4 sm:p-8 bg-base-100 my-10 rounded-xl shadow-xl'>
                <h2 className='text-3xl font-semibold'>Create Account</h2>
                <form onSubmit={handleSubmit(handleSignUp)} className='flex flex-col gap-4 mt-6'>
                    <input type="text" placeholder="Full Name" className="input input-primary input-bordered w-full focus:outline-none" {...register("name")} required />
                    <input type="email" placeholder="Email Address" className="input input-primary input-bordered w-full focus:outline-none" {...register("email")} required />
                    <input type="password" placeholder="Password" className="input input-primary input-bordered w-full focus:outline-none" {...register("password")} required />
                    <input type="password" placeholder="Confirm Password" className="input input-primary input-bordered w-full focus:outline-none" {...register("confirmPassword")} required />
                    <select {...register('AccountType')} className="select select-primary w-full focus:outline-none" required>
                        <option value='buyer'>Buyer Account</option>
                        <option value='seller'>Seller Account</option>
                    </select>
                    <div className='flex gap-2'>
                        <input {...register('agree')} type="checkbox" className="checkbox checkbox-primary" />
                        <p>I agree with Terms and Privacy</p>
                    </div>
                    <div className='bg-error rounded-lg mt-1'>
                        {
                            error && <p className='text-center text-white py-1'>{error}</p>
                        }
                    </div>
                    <input className='btn' type="submit" />
                </form>
                <div className="divider">OR</div>
                <button className='btn btn-outline' onClick={handleGoogleLogin}>Sign In with Google</button>
                <p className='text-center text-medium mt-4'>Already Have an Account? <Link className='text-primary' to='/login'>Sign In</Link> </p>
            </div>
        </div>
    );
};

export default Signup;