import React, { useContext, useEffect } from 'react'
import { AppContext } from '../context/AppContext'
import { Navigate } from 'react-router-dom';
import Loader from '../components/Loader/Loader';
import axios from 'axios';

function ProtectedRoute({ children }) {
    const { isLoggedIn, authCheck } = useContext(AppContext);

    useEffect(() => {
        authCheck();
    }, []);

    if (isLoggedIn === null) {
        return <Loader />;
    }
    
    return isLoggedIn ? children : <Navigate to="/public-webapp/login" replace />;
}

export default ProtectedRoute
