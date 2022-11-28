import axios from 'axios';
import React from 'react';
import { useState } from 'react';
import { useContext } from 'react';
import { useForm } from "react-hook-form";
import toast from 'react-hot-toast';
import { Link, useNavigate } from 'react-router-dom';
import { AuthContext } from '../../AuthProvider/AuthProvider';
import useToken from '../../Hooks/useToken';

const Signup = () => {
    const { register, handleSubmit } = useForm();
    const { createUser, googleLogin, updateUser, updateRole } = useContext(AuthContext);
    const [error, setError] = useState(null);
    const [userEmail, setUserEmail] = useState('');
    const [accType, setAccType] = useState('buyer')
    const [token] = useToken(userEmail);
    const navigate = useNavigate();

    if(token){
        console.log('success');
    }

    const handleSignUp = data => {
        setError(null);
        const { name, email, password, confirmPassword, agree } = data;
    
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
            .then(() => {
                updateUser(name)
                    .then(() => {
                        saveUser(name, email, accType);
                    });
            })
            .catch(err => {
                if (err.code === 'auth/email-already-in-use') {
                    setError('Email Already Used');
                };
            });
    };

    const saveUser = (name, email, accountType) => {
        const user = { name, email, accountType, isVarified: false };
        axios.post('https://iconnect-server.vercel.app/users', user)
            .then(() => {
                setUserEmail(email);
                toast.success('Account Successfully Created');
                navigate('/');
            });
    };

    const handleGoogleLogin = () => {
        googleLogin()
            .then(result => {
                const {displayName, email} = result.user;
                saveUser(displayName, email, accType);
            })
            .catch(err => {
                console.log(err)
            });
    };

    const handleAccountType = e => {
        const acc = e.target.value;
        setAccType(acc);
    };

    updateRole();

    return (
        <div className='flex justify-center items-center'>
            <div className='w-[98%] max-w-md flex flex-col gap-0 p-4 sm:p-8 bg-base-100 my-10 rounded-xl shadow-xl'>
                <h2 className='text-3xl font-semibold'>Create Account</h2>
                <form onSubmit={handleSubmit(handleSignUp)} className='flex flex-col gap-4 mt-6'>
                    <input type="text" placeholder="Full Name" className="input input-primary input-bordered w-full focus:outline-none" {...register("name")} required />
                    <input type="email" placeholder="Email Address" className="input input-primary input-bordered w-full focus:outline-none" {...register("email")} required />
                    <input type="password" placeholder="Password" className="input input-primary input-bordered w-full focus:outline-none" {...register("password")} required />
                    <input type="password" placeholder="Confirm Password" className="input input-primary input-bordered w-full focus:outline-none" {...register("confirmPassword")} required />
                    <select {...register('AccountType')} onBlur={handleAccountType} className="select select-primary w-full focus:outline-none" required>
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
                    <input className='btn' type="submit" value='Sign up'/>
                </form>
                <div className="divider">OR</div>
                <button className='btn btn-outline' onClick={handleGoogleLogin}>Sign In with Google</button>
                <p className='text-center text-medium mt-4'>Already Have an Account? <Link className='text-primary hover:underline' to='/login'>Sign In</Link> </p>
            </div>
        </div>
    );
};

export default Signup;