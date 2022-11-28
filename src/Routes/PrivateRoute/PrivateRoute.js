import React, { useContext } from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { AuthContext } from '../../AuthProvider/AuthProvider';

const PrivateRoute = ({children}) => {
    const {user, loading } = useContext(AuthContext);
    const loacation = useLocation();

    if(loading){
        return <p>Loading...</p>
    }

    if(user?.uid){
        return children;
    }

    return <Navigate to='/login' state={{from: loacation}} replace></Navigate>
};

export default PrivateRoute;