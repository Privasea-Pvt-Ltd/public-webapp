import { createContext, useEffect, useState } from "react";
import { Endpoints } from "../constants/endpoints.js";
import axios from "axios";

export const AppContext = createContext();

export const AppContextProvider = (props) => {
    const backendURL = Endpoints.BACKEND_URL;
    const [isLoggedIn, setIsLoggedIn] = useState(null);
    // const [isVerified, setIsVerified] = useState(null);
    const [authEmail, setAuthEmail] = useState(null);


    const authCheck = () => {
        axios.defaults.withCredentials = true;
        axios.get(`${backendURL}/is-authenticated`)
            .then(res => {
                const resData = res?.data?.data;
                const profile = resData?.profile;
                if (resData?.authenticated) {
                    setIsLoggedIn(true);
                    setAuthEmail(profile?.email);
                    // setIsVerified(profile?.isAccountVerified ? "verified" : "not_verified");
                } else {
                    setIsLoggedIn(false);
                    // setIsVerified("none");
                }
            })
            .catch(() => {
                setIsLoggedIn(false);
                // setIsVerified("none");
            });
    }

    useEffect(() => {
        authCheck();
    }, []);

    const contextValue = {
        backendURL,
        isLoggedIn, setIsLoggedIn,
        // isVerified, setIsVerified,
        authEmail, setAuthEmail,
        authCheck
    }

    return (
        <AppContext.Provider value={contextValue}>
            {props.children}
        </AppContext.Provider>
    )
}