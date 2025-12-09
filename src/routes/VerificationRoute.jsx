import React, { useContext, useEffect } from 'react'
import { AppContext } from '../context/AppContext'
import { Navigate } from 'react-router-dom';
import Loader from '../components/Loader/Loader';
import axios from 'axios';

function VerificationRoute({ children }) {
    const { isVerified, authCheck } = useContext(AppContext);

    useEffect(() => {
        console.log("Verification");
        authCheck();
    }, []);


    if (isVerified === null) {
        return <Loader />;
    }

    if (isVerified === "none" || isVerified === "verified") {
        <Navigate to="/public-webapp/login" replace />;
    }

    // if(isVerified === "not_verified"){
    // }

    return children;
    // return isVerified ? children : <Navigate to="/public-webapp/login" replace />;

}

export default VerificationRoute
