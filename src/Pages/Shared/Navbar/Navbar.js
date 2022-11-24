import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { AuthContext } from '../../../AuthProvider/AuthProvider';
import NavItem from '../NavItem/NavItem';

const Navbar = () => {
    const {user} = useContext(AuthContext);

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
                login
                {
                    user && <p>{user.email}</p>
                }
            </div>
        </nav>
    );
};

export default Navbar;