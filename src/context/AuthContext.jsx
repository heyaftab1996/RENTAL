import React, { createContext, useState, useContext, useEffect } from 'react';
import axios from 'axios';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(() => {
        const storedUser = localStorage.getItem('user');
        return storedUser ? JSON.parse(storedUser) : null;
    });

    useEffect(() => {
        if (user) {
            localStorage.setItem('user', JSON.stringify(user));
        } else {
            localStorage.removeItem('user');
        }
    }, [user]);

    const login = async (email, password) => {
        try {
            const response = await axios.post('http://localhost:8000/api/login', { email, password });
            if (response.data.status === 'success') {
                setUser(response.data.user);
                return true;
            } else {
                return false;
            }
        } catch (error) {
            console.error("Login error:", error);
            return false;
        }
    };

    const signup = async (email, password) => {
        try {
            const response = await axios.post('http://localhost:8000/api/register', { email, password });
            if (response.data.status === 'success') {
                setUser(response.data.user);
                return true;
            } else {
                return false;
            }
        } catch (error) {
            console.error("Signup error:", error);
            return false;
        }
    };

    const logout = () => {
        setUser(null);
    };

    return (
        <AuthContext.Provider value={{ user, login, signup, logout }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => {
    return useContext(AuthContext);
};
