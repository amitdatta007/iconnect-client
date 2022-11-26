import React, { useContext } from 'react';
import { NavLink, Outlet } from 'react-router-dom';
import { AuthContext } from '../AuthProvider/AuthProvider';
import Navbar from '../Pages/Shared/Navbar/Navbar';
import { HiMenu, HiX } from 'react-icons/hi';

const DashboardLayout = () => {
    const { userInfo, updateRole } = useContext(AuthContext);

    updateRole();

    

    return (
        <div>
            <Navbar />
            <div className="drawer drawer-mobile">

                <input id="my-drawer-2" type="checkbox" className="drawer-toggle" />

                <div className="drawer-content bg-primary bg-opacity-50 p-4 flex flex-col gap-4 items-start">
                    <label htmlFor="my-drawer-2" className="drawer-button lg:hidden">
                        <HiMenu className='swap-off fill-current h-12 w-12' />
                    </label>
                    <div className='w-full'>
                        <Outlet />
                    </div>
                </div>
                <div className="drawer-side">
                    <label htmlFor="my-drawer-2" className="drawer-overlay"></label>
                    <div className="menu p-4 w-80 text-base-content bg-base-100 flex flex-col gap-4">
                        <label htmlFor="my-drawer-2" className="drawer-button lg:hidden w-fit">
                            <HiX className='swap-off fill-current h-12 w-12' />
                        </label>
                        {
                            userInfo.accountType === "admin" && <>
                                <NavLink className={`${(isActive) => isActive ? 'text-primary' : null} bg-base-200 bg-opacity-50 font-medium rounded-lg px-3 py-2 hover:bg-primary hover:text-base-100`} to='/dashboard/allsellers'>All Sellers</NavLink>


                                <NavLink className={`${(isActive) => isActive ? 'text-primary' : null} bg-base-200 bg-opacity-50 font-medium rounded-lg px-3 py-2 hover:bg-primary hover:text-base-100`} to='/dashboard/allbuyers' >All Buyers</NavLink>


                                <NavLink className={`${(isActive) => isActive ? 'text-primary' : null} bg-base-200 bg-opacity-50 font-medium rounded-lg px-3 py-2 hover:bg-primary hover:text-base-100`} to='/'>Reported Items</NavLink>
                            </>
                        }
                        {
                            userInfo.accountType === "seller" && <>
                                <NavLink className={`${(isActive) => isActive ? 'text-primary' : null} bg-base-200 bg-opacity-50 font-medium rounded-lg px-3 py-2 hover:bg-primary hover:text-base-100`} to='/dashboard/addproduct'>Add A product</NavLink>

                                <NavLink className={`${(isActive) => isActive ? 'text-primary' : null} bg-base-200 bg-opacity-50 font-medium rounded-lg px-3 py-2 hover:bg-primary hover:text-base-100`} to='/'>My Products</NavLink>
                            </>
                        }
                        {
                            userInfo.accountType === "buyer" && <>
                                <NavLink className={`${(isActive) => isActive ? 'text-primary' : null} bg-base-200 bg-opacity-50 font-medium rounded-lg px-3 py-2 hover:bg-primary hover:text-base-100`} to='/'>My orders</NavLink>
                            </>
                        }
                    </div>
                </div>
            </div>
        </div>
    );
};

export default DashboardLayout;