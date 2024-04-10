'use client'

import React, { useState, useEffect } from 'react';
import Loader from '@/components/Loader';
import { useAuth } from '@/utils/auth';
import { useRouter } from 'next/navigation';
import Image from 'next/image'
import heroImg from '../../../public/heroBg.png';
import Link from 'next/link';

const Login = () => {
    const [phone, setPhone] = useState('');
    const [password, setPassword] = useState('');
    const { login, isLoading, user } = useAuth();
    const router = useRouter();

    const handleLogin = async (e) => {
        e.preventDefault();
        login(phone, password);
    };

    useEffect(() => {
        if (user) {
            router.push('/')
        }
    }, [user, isLoading])


    return isLoading ? <Loader /> : (
        <main className='h-[calc(100vh-64px)] overflow-y-scroll'>
            <div className='grid grid-cols-1 lg:grid-cols-2'>
                <div className="h-80 lg:h-[calc(100vh-64px)] flex items-center justify-center">
                    <Image src={heroImg} alt="heroImg" height={400} />
                </div>
                <div className='h-[calc(100vh-384px)] lg:h-[calc(100vh-64px)] flex items-center justify-center p-2'>
                    <form onSubmit={handleLogin} className='bg-red-50 h-full lg:h-[400px] w-full lg:w-fit flex flex-col justify-around rounded-xl p-2 lg:p-5'>
                        <h1 className='w-full text-xl font-semibold text-center'>Khawa-Dawa Login</h1>
                        <input type='text' placeholder='+91 000 0000 000' value={phone} onChange={(e) => setPhone(e.target.value)} className='w-full lg:w-[400px] h-10 rounded-lg focus:outline-none border-red-200 focus:border-red-700 border px-2' />
                        <input type='password' placeholder='********' value={password} onChange={(e) => setPassword(e.target.value)} className='w-full lg:w-[400px] h-10 rounded-lg focus:outline-none border-red-200 focus:border-red-700 border px-2' />
                        <button type='submit' className='w-full lg:w-[400px] h-10 rounded-lg bg-red-600 text-white font-semibold hover:bg-red-700'>Login</button>
                        <p className='text-center'>Don't have an account? <Link href='/authentication/register' className='font-semibold text-red-600'>Register</Link></p>
                    </form>
                </div>
            </div>
        </main>
    );
};

export default Login;
