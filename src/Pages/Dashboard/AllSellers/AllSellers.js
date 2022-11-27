import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import React, { useContext } from 'react';
import { confirmAlert } from 'react-confirm-alert';
import { AuthContext } from '../../../AuthProvider/AuthProvider';
import toast from 'react-hot-toast';

const AllSellers = () => {
    const { userInfo } = useContext(AuthContext);

    const { data: allSellers = [], refetch } = useQuery({
        queryKey: ['allSellers', userInfo],
        queryFn: () => axios(`http://localhost:5000/sellers?email=${userInfo.email}`, {
            headers: {
                authorization: `bearer ${localStorage.getItem('accessToken')}`
            }
        }).then(result => result.data)
    });

    const handleRemoveSeller = email => {

        confirmAlert({
            title: 'Confirm Delete',
            buttons: [
                {
                    label: 'Yes',
                    onClick: () => {
                        axios.delete(`http://localhost:5000/user?email=${email}`).then(() => {
                            refetch();
                            toast.success('Successfully Deleted');
                        });
                    }
                },
                {
                    label: 'No',
                    onClick: () => { }
                }
            ]
        });

    };

    const handleVerify = seller => {
        confirmAlert({
            title: 'Varify User?',
            buttons: [
                {
                    label: 'Yes',
                    onClick: () => {
                        seller.isVarified = true;
                        axios.put(`http://localhost:5000/user`, seller).then(() => {
                            refetch();
                            toast.success('Seller Varified');
                        });
                        refetch();
                    }
                },
                {
                    label: 'No',
                    onClick: () => { }
                }
            ]
        });
        
    };

    return (
        <div className='p-4'>
            <div className="overflow-x-auto">
                <table className="table w-full">
                    <thead>
                        <tr>
                            <th></th>
                            <th>Name</th>
                            <th>Email</th>
                            <th></th>
                            <th></th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            allSellers.map((seller, i) => <tr key={i}>
                                <th>{i + 1}</th>
                                <td>{seller.name}</td>
                                <td>{seller.email}</td>
                                <td>
                                    <button disabled={seller?.isVarified ? true : false} className='btn btn-primary text-base-200' onClick={() => handleVerify(seller)}>
                                        {
                                            seller?.isVarified ? 'Varified' : 'Verify Seller'
                                        }
                                    </button>
                                </td>
                                <td><button className='btn btn-primary text-base-200' onClick={() => handleRemoveSeller(seller?.email)}>Remove</button></td>
                            </tr>)
                        }
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default AllSellers;