import { createContext, useEffect, useState } from "react";
import { Endpoints } from "../constants/endpoints.js";
import axios from "axios";
import { toast } from "react-toastify";

export const AppContext = createContext();

export const AppContextProvider = (props) => {
    const backendURL = Endpoints.BACKEND_URL;
    const [isLoggedIn, setIsLoggedIn] = useState(true);

    const contextValue = {
        backendURL,
        isLoggedIn, setIsLoggedIn,
    }

    return (
        <AppContext.Provider value={contextValue}>
            {props.children}
        </AppContext.Provider>
    )
}