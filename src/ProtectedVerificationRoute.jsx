import React, { useContext, useEffect } from 'react'
import { AppContext } from './context/AppContext'
import { Navigate } from 'react-router-dom';
import Loader from './components/Loader/Loader';

function ProtectedVerificationRoute({ children }) {
    const { isLoggedIn, isVerified } = useContext(AppContext);

    if (isLoggedIn === null || isVerified === null) {
        return <Loader />;
    }

    if (!isLoggedIn) {
        return <Navigate to="/public-webapp/login" replace />;
    }

    // If already verified, prevent access to OTP page
    if (isVerified) {
        return <Navigate to="/public-webapp/dashboard" replace />;
    }

    return children;

    // return isVerified ? children : <Navigate to="/public-webapp/login" replace />;

}

export default ProtectedVerificationRoute
