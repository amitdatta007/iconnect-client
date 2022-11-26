import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import React, { useContext } from 'react';
import { AuthContext } from '../../../AuthProvider/AuthProvider';
import { confirmAlert } from 'react-confirm-alert';
import toast from 'react-hot-toast';

const AllBuyers = () => {

    const { userInfo } = useContext(AuthContext);

    

    const { data: allBuyers = [], refetch } = useQuery({
        queryKey: ['allBuyers', userInfo],
        queryFn: () => axios(`http://localhost:5000/buyers?email=${userInfo.email}`, {
            headers: {
                authorization: `bearer ${localStorage.getItem('accessToken')}`
            }
        }).then(result => result.data)
    });

    const handleRemoveBuyer = email => {

        confirmAlert({
            title: 'Confirm Delete',
            buttons: [
                {
                    label: 'Yes',
                    onClick: () => {
                        axios.delete(`http://localhost:5000/user?email=${email}`).then(result => {
                            console.log(result.data);
                        });
                        refetch();
                        toast('hello')
                    }
                },
                {
                    label: 'No',
                    onClick: () => {}
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
                        </tr>
                    </thead>
                    <tbody>
                        {
                            allBuyers.map((buyer, i) => <tr key={i}>
                                <th>{i + 1}</th>
                                <td>{buyer.name}</td>
                                <td>{buyer.email}</td>
                                <td><button className='btn btn-primary text-base-200' onClick={() => handleRemoveBuyer(buyer?.email)}>Remove</button></td>
                            </tr>)
                        }
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default AllBuyers;