import React, { useContext } from 'react'
import { AppContext } from '../context/AppContext'
import { Navigate } from 'react-router-dom';
import Loader from '../components/Loader/Loader';

function VerificationRoute({ children }) {
    const { isVerified } = useContext(AppContext);

    if (isVerified === null) {
        return <Loader />;
    }

    return !isVerified ? children : <Navigate to="/public-webapp/login" replace />;

}

export default VerificationRoute
