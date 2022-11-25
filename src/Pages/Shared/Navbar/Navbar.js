import React, { useContext, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { AuthContext } from '../../../AuthProvider/AuthProvider';
import useToken from '../../../Hooks/useToken';
import NavItem from '../NavItem/NavItem';
import { HiMenu, HiX, HiMoon, HiSun, HiUser } from 'react-icons/hi'
import { useScrollLock } from '../../../Hooks/useScrollLock';

const Navbar = () => {
    const [menuIsOpen, setMenuIsOpen] = useState(false);
    const { user, logout } = useContext(AuthContext);
    const [userEmail, setUserEmail] = useState('');
    const { lockScroll, unlockScroll } = useScrollLock();
    const darkModeData = localStorage.getItem('isDarkMode') || false;
    const [isDarkMode, setIsDarkMode] = useState(darkModeData);

    useEffect(() => {
        if (isDarkMode) {
            document.querySelector('html').setAttribute('data-theme', 'night');
            localStorage.setItem('isDarkMode', true);
        } else {
            document.querySelector('html').setAttribute('data-theme', 'winter');
            localStorage.removeItem('isDarkMode');
        }
    }, [isDarkMode]);


    menuIsOpen ? lockScroll() : unlockScroll();

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
        <nav className='px-2 md:px-0 py-4 flex justify-between items-center'>
            <Link className='z-20' to='/'>
                <h2 className='text-3xl font-bold text-primary'>
                    <span>i</span>
                    <span>Connect</span>
                </h2>
            </Link>
            <div className={`${menuIsOpen ? 'top-0 left-0' : 'top-[-200vh] left-0'} z-10 flex justify-center items-center flex-col md:flex-row absolute md:static w-full h-full md:w-fit md:h-fit bg-base-100 gap-2 md:gap-6 duration-500 ease-in-out md:duration-[0s]`}>
                <NavItem name='Dashboard' path='/dashboard' />
                <NavItem name='Blog' path='/blog' />
                {
                    user?.uid ? <button onClick={handleSignOut} className='btn md:hidden'>Sign Out</button> : <Link className='btn md:hidden' to='/login'>Sign In</Link>
                }
            </div>
            <div className='flex items-center gap-4'>

                <div className='z-20 theme-icon text-4xl' onClick={() => setIsDarkMode(!isDarkMode)}>
                    {
                        isDarkMode ? <HiMoon /> : <HiSun />

                    }
                </div>

                {
                    user?.uid &&



                    <div className="dropdown dropdown-end z-20">
                        <label tabIndex={0}><div className='w-8 h-8 border-[1px] p-1 border-primary rounded-full flex justify-center items-center'>
                            {
                                user?.photoUrl ?
                                '' :
                                <HiUser className='text-base-content text-3xl' />
                            }
                        </div></label>
                        <ul tabIndex={0} className="dropdown-content menu p-2 shadow bg-base-300 rounded-box w-52">
                            
                        </ul>
                    </div>
                }


                <div className='hidden md:block'>
                    {
                        user?.uid ? <button onClick={handleSignOut} className='btn'>Sign Out</button> : <Link className='btn' to='/login'>Sign In</Link>
                    }
                </div>



                <label className="swap swap-rotate md:hidden z-20">
                    <input onClick={() => setMenuIsOpen(!menuIsOpen)} type="checkbox" />
                    <HiMenu className='swap-off fill-current h-12 w-12' />
                    <HiX className="swap-on fill-current h-12 w-12" />
                </label>
            </div>
        </nav>
    );
};

export default Navbar;