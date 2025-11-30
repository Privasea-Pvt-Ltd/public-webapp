import React, {useContext } from 'react'
import { AppContext } from './context/AppContext'
import { Navigate } from 'react-router-dom';

function ProtectedRoute({children}) {
    const {isLoggedIn} = useContext(AppContext);

    if(!isLoggedIn){
        return <Navigate to="/public-webapp/auth" replace/>;
    }

    return children;
}

export default ProtectedRoute
