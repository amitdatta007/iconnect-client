import React, { useContext } from 'react';
import { AuthContext } from '../../../AuthProvider/AuthProvider';
import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import { confirmAlert } from 'react-confirm-alert';
import toast from 'react-hot-toast';

const ReportedProducts = () => {
    const { userInfo } = useContext(AuthContext);

    const { data: reportedProducts = [], refetch } = useQuery({
        queryKey: ['reportedProducts', userInfo],
        queryFn: () => axios(`http://localhost:5000/report?email=${userInfo.email}`, {
            headers: {
                authorization: `bearer ${localStorage.getItem('accessToken')}`
            }
        }).then(result => result.data)
    });

    const handleDelete = id => {
        confirmAlert({
            title: 'Delete Product?',
            buttons: [
                {
                    label: 'Yes',
                    onClick: () => {
                        axios.delete(`http://localhost:5000/product?id=${id}`).then(() => {
                            axios.delete(`http://localhost:5000/report?id=${id}`).then(() => {
                                refetch();
                                toast.success('Successfully Deleted');
                            })
                        })
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
                            <th></th>
                            <th>Name</th>
                            <th>Price</th>
                            <th></th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            reportedProducts.map((p, i) => <tr key={i}>
                                <th>{i + 1}</th>
                                <th><img src={p.img} className='h-16 w-16 rounded' alt="" /></th>
                                <td>{`${p.brand} ${p.model}`}</td>
                                <td>{`${p.resellPrice} bdt`}</td>
                                <td><button className='btn btn-primary' onClick={() => handleDelete(p._id)}>Delete</button></td>
                            </tr>)
                        }
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default ReportedProducts;