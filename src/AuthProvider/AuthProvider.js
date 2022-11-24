import React, { createContext, useEffect, useState } from 'react';
import {createUserWithEmailAndPassword, getAuth, GoogleAuthProvider, onAuthStateChanged, signInWithEmailAndPassword, signInWithPopup, updateProfile} from 'firebase/auth';
import app from '../Firebase/firebase.config';

export const AuthContext = createContext();
const auth = getAuth(app);

const AuthProvider = ({children}) => {
    const [user, setUser] = useState(null);


    // third party auth provider
    const googleProvider = new GoogleAuthProvider();


    // Sign up and update profile 
    const createUser = (email, password) => {
        return createUserWithEmailAndPassword(auth, email, password);

    };

    const updateUser = name => {
        return updateProfile(auth.currentUser, {
            displayName: name,
        });
    };


    // login method
    const loginUser = (email, password) => {
        return signInWithEmailAndPassword(auth, email, password);
    };



    //third party login method
    const googleLogin = () => {
        return signInWithPopup(auth, googleProvider);
    };


    // user observer

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, currentUser => {
            setUser(currentUser);
        });
        return () => unsubscribe();
    }, []);

    const value = {
        user,
        createUser,
        googleLogin,
        loginUser,
        updateUser,
    };

    return (
        <AuthContext.Provider value={value}>
            {children}
        </AuthContext.Provider>
    );
};

export default AuthProvider;