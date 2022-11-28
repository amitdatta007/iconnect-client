import React, { useContext } from 'react';
import { AuthContext } from '../../../AuthProvider/AuthProvider';
import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import { Link } from 'react-router-dom';

const MyOrders = () => {
    const { userInfo } = useContext(AuthContext);

    const { data: myOrders = [], refetch } = useQuery({
        queryKey: ['myOrders', userInfo],
        queryFn: () => axios(`http://localhost:5000/myorders?email=${userInfo.email}`, {
            headers: {
                authorization: `bearer ${localStorage.getItem('accessToken')}`
            }
        }).then(res => res.data)
    });

    return (
        <div className='p-4'>
            <div className="overflow-x-auto">
                <table className="table w-full">
                    <thead>
                        <tr>
                            <th></th>
                            <th></th>
                            <th>Name</th>
                            <th>Price</th>
                            <th></th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            myOrders.map((p, i) => <tr key={i}>
                                <th>{i + 1}</th>
                                <th><img src={p.img} className='h-16 w-16 rounded' alt="" /></th>
                                <td>{`${p.brand} ${p.model}`}</td>
                                <td>{`${p.resellPrice} bdt`}</td>
                                <td>
                                    {
                                        !p.paid ? <Link className='btn btn-primary' to={`/dashboard/payment/${p._id}`} >Pay Now</Link> : <button className='btn btn-primary' disabled>Paid</button>
                                    }
                                </td>
                            </tr>)
                        }
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default MyOrders;