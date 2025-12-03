import React, {useContext } from 'react'
import { AppContext } from './context/AppContext'
import { Navigate } from 'react-router-dom';

function ProtectedRoute({children}) {
    const {isLoggedIn} = useContext(AppContext);

    return isLoggedIn ? children : <Navigate to="/public-webapp/auth" replace/>;
}

export default ProtectedRoute
