//manage the authenticated state and provides login and logout functions

"use client"

import { createContext, useContext, useEffect, useState } from 'react';

//AuthContext: Manages the authentication state and provides login and logout functions.
const AuthContext = createContext();

const getFromLocalStorage = () => {
    if (typeof window !== 'undefined') {
        const token = localStorage.getItem('token');
        return token || 'undefined';
    }
    return 'undefined';
}


//AuthProvider: Wraps the entire application to provide authentication context
export const AuthProvider = ({ children }) => {
    const [authenticated, setAuthenticated] = useState(false);

    useEffect(() => {
        const token = getFromLocalStorage();
        if (token != 'undefined') {
            setAuthenticated(true);
        }
    }, []);

    const login = (token) => {
        localStorage.setItem('token', token);
        setAuthenticated(true);
    };

    const logout = () => {
        localStorage.removeItem('token');
        setAuthenticated(false);
    };

    return (
        <AuthContext.Provider value={{ authenticated, login, logout }}>
            {children}
        </AuthContext.Provider>
    )
}

export const useAuth = () => useContext(AuthContext);