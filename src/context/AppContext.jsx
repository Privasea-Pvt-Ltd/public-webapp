import { createContext, useEffect, useState } from "react";
import { Endpoints } from "../constants/endpoints.js";
import axios from "axios";

export const AppContext = createContext();

export const AppContextProvider = (props) => {
    const backendURL = Endpoints.BACKEND_URL;
    const [isLoggedIn, setIsLoggedIn] = useState(null);
    const [isVerified, setIsVerified] = useState(null);
    const [authName, setAuthName] = useState(null);
    const [authEmail, setAuthEmail] = useState(null);

    useEffect(() => {
        axios.defaults.withCredentials = true;
        axios.get(`${backendURL}/is-authenticated`)
            .then(res => {
                const isAuth = res?.data?.authenticated || res?.data?.data?.authenticated;
                if (isAuth) {
                    setIsLoggedIn(true);
                    axios.get(`${backendURL}/profile`)
                        .then(res => {
                            setAuthName(res.data?.name);
                            setAuthEmail(res.data?.email);
                            setIsVerified(res.data?.isAccountVerified);
                        }).catch(() => {
                            setAuthName(null);
                            setAuthEmail(null);
                            setIsVerified(null);
                        });
                } else {
                    setIsLoggedIn(false);
                    setIsVerified(false);
                }
            })
            .catch(() => {
                setIsLoggedIn(false);
                setIsVerified(false);
            });
    }, []);

    const contextValue = {
        backendURL,
        isLoggedIn, setIsLoggedIn,
        isVerified, setIsVerified,
        authName, setAuthName,
        authEmail, setAuthEmail,
    }

    return (
        <AppContext.Provider value={contextValue}>
            {props.children}
        </AppContext.Provider>
    )
}