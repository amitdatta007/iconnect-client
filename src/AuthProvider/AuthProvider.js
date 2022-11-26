import React, { createContext, useEffect, useState } from 'react';
import {createUserWithEmailAndPassword, getAuth, GoogleAuthProvider, onAuthStateChanged, signInWithEmailAndPassword, signInWithPopup, signOut, updateProfile} from 'firebase/auth';
import app from '../Firebase/firebase.config';
import { useQuery } from '@tanstack/react-query';
import axios from 'axios';

export const AuthContext = createContext();
const auth = getAuth(app);

const AuthProvider = ({children}) => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);


    // third party auth provider
    const googleProvider = new GoogleAuthProvider();


    // Sign up and update profile 
    const createUser = (email, password) => {
        setLoading(true);
        return createUserWithEmailAndPassword(auth, email, password);
    };

    const updateUser = name => {
        return updateProfile(auth.currentUser, {
            displayName: name,
        });
    };


    // login method
    const loginUser = (email, password) => {
        setLoading(true);
        return signInWithEmailAndPassword(auth, email, password);
    };



    //third party login method
    const googleLogin = () => {
        setLoading(true);
        return signInWithPopup(auth, googleProvider);
    };

    const logout = () => {
        return signOut(auth);
    };


    

    // user observer

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, currentUser => {
            setUser(currentUser);
            setLoading(false);
        });
        return () => unsubscribe();
    }, []);

    const { data: userInfo = {}, refetch:updateRole} = useQuery({
        queryKey: ["userInfo", user],
        queryFn: () => axios(`http://localhost:5000/user?email=${user?.email}`, {
            headers: {
                authorization: `bearer ${localStorage.getItem('accessToken')}`
            }
        }).then(result => result.data)
    });

    

    

    const value = {
        user,
        createUser,
        googleLogin,
        loginUser,
        updateUser,
        logout,
        loading,
        userInfo,
        updateRole
    };

    return (
        <AuthContext.Provider value={value}>
            {children}
        </AuthContext.Provider>
    );
};

export default AuthProvider;