import React, { useContext, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { AuthContext } from '../../../AuthProvider/AuthProvider';
import useToken from '../../../Hooks/useToken';
import NavItem from '../NavItem/NavItem';

const Navbar = () => {
    const {user, logout} = useContext(AuthContext);
    const [userEmail, setUserEmail] = useState('');
    
    useEffect(() => {
        setUserEmail(user?.email || '')
    }, [user]);

    const [token] = useToken(userEmail);



    const handleSignOut = () => {
        logout().then(() => {
            setUserEmail('');
            localStorage.removeItem('accessToken');
        });
    };

    return (
        <nav className='flex justify-between items-center h-16'>
            <Link to='/'>
                <h2 className='text-3xl font-bold text-primary'>
                    <span>i</span>
                    <span>Connect</span>
                </h2>
            </Link>
            <div className='flex gap-6'>
                <NavItem name='Dashboard' path='/dashboard' />
                <NavItem name='Blog' path='/blog' />
            </div>
            <div>
                {
                    user?.uid ? <button onClick={handleSignOut} className='btn'>Sign Out</button> : <Link className='btn' to='/login'>Sign In</Link>
                }
            </div>
        </nav>
    );
};

export default Navbar;