'use client'

import { useRouter } from 'next/navigation';
import React, { createContext, useState, useContext, useEffect } from 'react';
import CryptoJS from 'crypto-js';

const AuthContext = createContext();

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
    const router = useRouter();
    const [user, setUser] = useState(() => {
        if (typeof window !== 'undefined') {
            const encryptedUser = localStorage.getItem('user');
            if (encryptedUser) {
                const bytes = CryptoJS.AES.decrypt(encryptedUser, process.env.NEXT_PUBLIC_ENCRYPTION_SECRET_KEY);
                const decryptedUser = JSON.parse(bytes.toString(CryptoJS.enc.Utf8));
                return decryptedUser;
            }
        }
        return null;
    });
    const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {
        if (typeof window !== 'undefined') {
            const encryptedUser = CryptoJS.AES.encrypt(JSON.stringify(user), process.env.NEXT_PUBLIC_ENCRYPTION_SECRET_KEY).toString();
            localStorage.setItem('user', encryptedUser);
        }
    }, [user]);

    const login = async (phone, password) => {

        if (!phone || !password) {
            alert("Fill up properly!")
            return;
        }

        setIsLoading(true);

        phone = phone.replace(/^\+91/, '');
        const digits = phone.replace(/\D/g, '');
        if (digits.length !== 10) {
            alert("Error: Not a valid phone number!");
            setIsLoading(false);
            return null;
        }

        phone = digits;

        const response = await fetch('/api/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                phone: phone,
                password: password,
            }),
        });
        if (response.status !== 200) {
            alert("Login Failed");
            setIsLoading(false);
            return;
        }
        const jsonData = await response.json();
        const user = jsonData.user;

        console.log(user);
        setTimeout(() => {
            setUser(user);
            setIsLoading(false)
            router.push('/')
        }, 500);
    };



    const logout = () => {
        setIsLoading(true);
        setUser(null);
        setIsLoading(false);
    };

    return (
        <AuthContext.Provider value={{ user, login, logout, isLoading, setIsLoading }}>
            {children}
        </AuthContext.Provider>
    );
};






// const router = useRouter();
    // const [user, setUser] = useState(() => {
    //     if (typeof window !== 'undefined') {
    //         const storedUser = localStorage.getItem('user');
    //         return storedUser ? JSON.parse(storedUser) : null;
    //     }
    //     return null;
    // });
    // const [isLoading, setIsLoading] = useState(false);

    // useEffect(() => {
    //     if (typeof window !== 'undefined') {
    //         localStorage.setItem('user', JSON.stringify(user));
    //     }
    // }, [user]);