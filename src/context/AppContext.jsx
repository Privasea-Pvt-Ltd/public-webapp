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

    // useEffect(() => {
    //     axios.defaults.withCredentials = true;
    //     axios.get(`${backendURL}/is-authenticated`)
    //         .then(res => {
    //             const isAuth = res?.data?.authenticated || res?.data?.data?.authenticated;
    //             if (isAuth) {
    //                 setIsLoggedIn(true);
    //                 axios.get(`${backendURL}/profile`)
    //                     .then(res => {
    //                         setAuthName(res.data?.name);
    //                         setAuthEmail(res.data?.email);
    //                         setIsVerified(res.data?.isAccountVerified);
    //                     }).catch(() => {
    //                         setAuthName(null);
    //                         setAuthEmail(null);
    //                         setIsVerified(null);
    //                     });
    //             } else {
    //                 setIsLoggedIn(false);
    //                 setIsVerified(false);
    //             }
    //         })
    //         .catch(() => {
    //             setIsLoggedIn(false);
    //             setIsVerified(false);
    //         });
    // }, []);

    axios.defaults.withCredentials = true;

    // -------------------------------------
    // FETCH PROFILE (common function)
    // -------------------------------------
    const loadProfile = async () => {
        try {
            const res = await axios.get(`${backendURL}/profile`);
            setAuthName(res.data?.name);
            setAuthEmail(res.data?.email);
            setIsVerified(res.data?.isAccountVerified);
        } catch (err) {
            setAuthName(null);
            setAuthEmail(null);
            setIsVerified(null);
        }
    };

    // -------------------------------------
    // RUN ON PAGE LOAD
    // -------------------------------------
    useEffect(() => {
        const checkAuth = async () => {
            try {
                const res = await axios.get(`${backendURL}/is-authenticated`);
                const authenticated =
                    res?.data?.authenticated ||
                    res?.data?.data?.authenticated;

                if (authenticated) {
                    await loadProfile();   // fetch profile on first load
                    setIsLoggedIn(true);
                } else {
                    setIsLoggedIn(false);
                    setIsVerified(false);
                }
            } catch {
                setIsLoggedIn(false);
                setIsVerified(false);
            }
        };

        checkAuth();
    }, []);


    // -------------------------------------
    // AFTER LOGIN — RELOAD PROFILE IMMEDIATELY
    // -------------------------------------
    // useEffect(() => {
    //     if (isLoggedIn === true) {
    //         loadProfile();
    //     }
    // }, [isLoggedIn]);

    const contextValue = {
        backendURL,
        isLoggedIn, setIsLoggedIn,
        isVerified, setIsVerified,
        authName, setAuthName,
        authEmail, setAuthEmail,
        loadProfile
    }

    return (
        <AppContext.Provider value={contextValue}>
            {props.children}
        </AppContext.Provider>
    )
}