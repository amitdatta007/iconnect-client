import React, { useContext } from 'react';
import { AuthContext } from '../../../AuthProvider/AuthProvider';
import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import { confirmAlert } from 'react-confirm-alert';
import toast from 'react-hot-toast';

const MyProducts = () => {
    const {userInfo} = useContext(AuthContext);

    const {data: myProducts = [], refetch} = useQuery({
        queryKey: ['myProducts', userInfo],
        queryFn: () => axios(`http://localhost:5000/myproducts?email=${userInfo.email}`, {
            headers: {
                authorization: `bearer ${localStorage.getItem('accessToken')}`
            }
        }).then(res => res.data)
    });

    const handleAdvertise = product => {
        confirmAlert({
            title: 'Advertisement?',
            buttons: [
                {
                    label: 'Yes',
                    onClick: () => {
                        axios.post('http://localhost:5000/advertise', product).then(res => {
                            if(res.data.acknowledged){
                                toast.success('Successfully ad');
                            } else{
                                toast.error('Already added');
                            };
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

    const handleDelete = product => {
        confirmAlert({
            title: 'Delete this product?',
            buttons: [
                {
                    label: 'Yes',
                    onClick: () => {
                        axios.delete(`http://localhost:5000/product?id=${product}`).then(res => {
                            toast.success('Successfully Deleted');
                            refetch();
                        });
                    }
                },
                {
                    label: 'No',
                    onClick: () => { }
                }
            ]
        });
    }

    return (
        <div className='p-4'>
            <div className="overflow-x-auto">
                <table className="table w-full">
                    <thead>
                        <tr>
                            <th></th>
                            <th>Name</th>
                            <th>Price</th>
                            <th></th>
                            <th></th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            myProducts.map((p, i) => <tr key={i}>
                                <th>{i + 1}</th>
                                <td>{`${p.brand} ${p.model}`}</td>
                                <td>{`${p.resellPrice} bdt`}</td>
                                <td>
                                    <button className='btn btn-primary' onClick={() => handleAdvertise(p)}>Advertise</button>
                                </td>
                                <td>
                                    <button className='btn btn-primary' onClick={() => handleDelete(p._id)}>Delete</button>
                                </td>
                            </tr>)
                        }
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default MyProducts;