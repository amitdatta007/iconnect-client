import React from 'react';
import { useState } from 'react';
import { useContext } from 'react';
import { useForm } from "react-hook-form";
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { AuthContext } from '../../AuthProvider/AuthProvider';
import useToken from '../../Hooks/useToken';
import axios from 'axios';
import toast from 'react-hot-toast';

const Login = () => {
    const { register, handleSubmit } = useForm();
    const { loginUser, googleLogin } = useContext(AuthContext);
    const [error, setError] = useState(null);
    const [userEmail, setUserEmail] = useState('');
    const [token] = useToken(userEmail);
    const location = useLocation();
    const navigate = useNavigate();
    const from = location.state?.from?.pathname || '/';

    if(token){
        console.log('success')
    };

    const handleSignin = data => {
        setError(null);
        const { email, password } = data;

        if (password.length < 6) {
            setError('Password Must Be 6 Character or More');
            return;
        };
        loginUser(email, password)
            .then(result => {
                const {displayName, email} = result.user;
                saveUser(displayName, email, 'buyer');
            })
            .catch(err => {
                if (err.code === 'auth/user-not-found') {
                    setError('User Not Found!');

                };
                if (err.code === 'auth/wrong-password') {
                    setError('Wrong Password!');
                };
            });
    };

    const saveUser = (name, email, accountType) => {
        const user = { name, email, accountType, isVarified: false };
        axios.post('https://iconnect-server.vercel.app/users', user)
            .then(() => {
                setUserEmail(email);
                toast.success('Login Success');
                navigate(from, {replace: true});
            });
    };


    const handleGoogleLogin = () => {
        googleLogin()
            .then(result => {
                const {displayName, email} = result.user;
                saveUser(displayName, email, 'buyer');
            })
            .catch(err => {
                console.log(err)
            })
    };

    return (
        <div className='flex justify-center items-center'>
            <div className='w-[98%] max-w-md flex flex-col gap-0 p-4 sm:p-8 bg-base-100 my-10 rounded-xl shadow-xl'>
                <h2 className='text-3xl font-semibold'>Login Account</h2>
                <form onSubmit={handleSubmit(handleSignin)} className='flex flex-col gap-4 mt-6'>
                    <input type="email" placeholder="Email Address" className="input input-primary input-bordered w-full focus:outline-none" {...register("email")} required />
                    <div className='flex flex-col items-end gap-1'>
                        <input type="password" placeholder="Password" className="input input-primary input-bordered w-full focus:outline-none" {...register("password")} required />
                        <Link className='text-[14px] hover:underline' to='/'>Forgot Password?</Link>
                    </div>
                    <div className='bg-error rounded-lg mt-1'>
                        {
                            error && <p className='text-center text-white py-1'>{error}</p>
                        }
                    </div>
                    <input className='btn' type="submit" value='Sign in' />
                </form>
                <div className="divider">OR</div>
                <button className='btn btn-outline' onClick={handleGoogleLogin}>Sign In with Google</button>
                <p className='text-center text-medium mt-4'>Don't Have an Account? <Link className='text-primary hover:underline' to='/signup'>Sign Up</Link> </p>
            </div>
        </div>
    );
};

export default Login;