'use client'

import { useAuth } from '@/utils/auth'
import { useRouter } from 'next/navigation';
import React, { useEffect } from 'react'

const Profile = () => {
    const { user, logout } = useAuth();
    const router = useRouter();
    useEffect(() => {
        if (user === null) {
            router.push('/authentication/login')
        }
        console.log(user);
    }, [user])
    return (
        <main className="bg-transparent h-[calc(100vh-64px)] overflow-y-scroll">
            <h1>Profile</h1>
            <button onClick={logout}>Logout</button>
        </main>
    )
}

export default Profile