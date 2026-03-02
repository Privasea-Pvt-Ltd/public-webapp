import React, { useContext, useEffect } from 'react'
import { AppContext } from '../context/AppContext'
import { Navigate } from 'react-router-dom';
import Loader from '../components/Loader/Loader';
import axios from 'axios';

function VerificationRoute({ children }) {
    const { isVerified, authCheck } = useContext(AppContext);

    /*
    Fetch the parameters from the URL generated after the user enters their email or phone number during the initial login step. 
    On the verification page, extract the generated cipher text and send it to the backend for validation. 
    The backend verifies the cipher text against the associated email or phone number and, 
    upon successful validation, sends a verification code to the user and this verification page will be shown. 
    After the verification is completed, the user is redirected to the dashboard.  
    */
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
