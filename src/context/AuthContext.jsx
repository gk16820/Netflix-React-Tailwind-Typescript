import React, { createContext, useContext, useState, useEffect } from 'react';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [isAuthenticated, setIsAuthenticated] = useState(false);

    useEffect(() => {
        const storedUser = localStorage.getItem('netflix_user');
        if (storedUser) {
            setUser(JSON.parse(storedUser));
            setIsAuthenticated(true);
        }
    }, []);

    const login = (email, password) => {
        // Mock login - derive name from email if name not available
        const namePart = email.split('@')[0];
        const displayName = namePart.charAt(0).toUpperCase() + namePart.slice(1);
        const userData = { email, name: displayName };
        setUser(userData);
        setIsAuthenticated(true);
        localStorage.setItem('netflix_user', JSON.stringify(userData));
    };

    const signup = (name, email, password) => {
        // Mock signup
        const userData = { name, email };
        setUser(userData);
        setIsAuthenticated(true);
        localStorage.setItem('netflix_user', JSON.stringify(userData));
    };

    const logout = () => {
        setUser(null);
        setIsAuthenticated(false);
        localStorage.removeItem('netflix_user');
    };

    return (
        <AuthContext.Provider value={{ user, isAuthenticated, login, signup, logout }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => useContext(AuthContext);
