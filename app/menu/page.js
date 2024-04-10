'use client'

import Footer from '@/components/Footer';
import { useAuth } from '@/utils/auth'
import { useRouter } from 'next/navigation';
import React, { useEffect, useRef, useState } from 'react'
import TabBar from '@/components/TabBar';
import Loader from '@/components/Loader';

const Menu = () => {
    const { user, isLoading, setIsLoading } = useAuth();
    const router = useRouter();
    const isMounted = useRef(false);
    const [menu, setMenu] = useState([]);
    const [mainMenu, setMainMenu] = useState([]);
    const [bevMenu, setBevMenu] = useState([]);


    const fetchMenu = async () => {
        setIsLoading(true)
        try {
            const res = await fetch(process.env.NEXT_PUBLIC_MENU, {
                headers: {
                    method: 'GET',
                    Accept: 'application/json'
                }
            });
            const jsonRes = await res.json();
            const m = jsonRes.menus;
            setMenu(m);
            const mainCourse = m.filter(item => item.itemCategory === 'Main');
            const beverages = m.filter(item => item.itemCategory === 'Beverage');
            setMainMenu(mainCourse);
            setBevMenu(beverages);
            setIsLoading(false)
        } catch (error) {
            console.log('Error: unable to fetch menus');
            setIsLoading(false)
        }
    }

    const tabs = [
        {
            title: 'All Items',
            content: menu,
        },
        {
            title: 'Main Courses',
            content: mainMenu,
        },
        {
            title: 'Beverages',
            content: bevMenu,
        },
    ];

    useEffect(() => {
        if (!isMounted.current) {
            isMounted.current = true;
            return;
        }

        if (user === null) {
            router.push('/authentication/login')
        } else {
            fetchMenu();
        }
    }, [user, setIsLoading])

    return !isLoading ? (
        <main className="bg-transparent h-[calc(100vh-64px)] overflow-y-scroll p-2">
            <h1 className='text-center text-2xl font-bold text-red-700 font-Pacifico'>Khawa-Dawa's Menu</h1>
            <TabBar tabs={tabs} />
            <Footer />
        </main>
    ) : <Loader />
}

export default Menu