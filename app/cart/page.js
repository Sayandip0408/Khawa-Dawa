'use client'

import Footer from '@/components/Footer';
import { useAuth } from '@/utils/auth'
import { useRouter } from 'next/navigation';
import React, { useEffect, useRef, useState } from 'react'
import Image from 'next/image';
import Loader from '@/components/Loader';
import { toast } from 'react-toastify'

const Cart = () => {
    const { user, isLoading, setIsLoading } = useAuth();
    const router = useRouter();
    const isMounted = useRef(false);
    const [cartItems, setCartItems] = useState([]);

    const fetchCartItems = async () => {
        setIsLoading(true);
        const res = await fetch('/api/cart/' + user._id, {
            headers: {
                method: 'GET',
                Accept: 'application/json'
            }
        });
        const jsonRes = await res.json();
        const data = jsonRes.cartItems;
        setCartItems(data);
        setIsLoading(false);
    }

    const removeItem = async (item) => {
        const res = await fetch('/api/cart/' + item._id, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                'userId': item.orderedBy, 'cartId': item._id
            })
        });
        if (!res.ok) {
            toast.error('Network error', {
                position: "top-left",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "dark",
            });
        } else {
            toast.success('Item Deleted!', {
                position: "top-left",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "dark",
            });
        }
        fetchCartItems();
    }

    useEffect(() => {
        if (!isMounted.current) {
            isMounted.current = true;
            return;
        }

        if (user === null) {
            router.push('/authentication/login')
        } else {
            fetchCartItems();
        }
    }, [user])

    return isLoading ? <Loader /> : (
        <main className="bg-transparent h-[calc(100vh-64px)] overflow-y-scroll">
            <section className='p-2 grid grid-cols-1 gap-2'>
                {cartItems.length > 0 ? cartItems.map((item) => (
                    <div key={item._id} className='h-32 w-full lg:w-[40%] mx-auto bg-red-50 shadow-md rounded-md flex'>
                        <Image src={item.itemImg} alt='item image' height={128} width={128} className='rounded-tl-md rounded-bl-md' />
                        <div className='h-full w-full flex flex-col justify-around p-2'>
                            <h4 className='font-bold font-Nunito text-xl text-red-800'>{item.itemName} <span className='text-base'>(Qty. {item.quantity})</span></h4>
                            <p className='font-bold font-Nunito text-red-800 text-sm'>₹<span className='text-xl'>{item.price}</span>.00</p>
                            <button className='bg-red-600 hover:bg-red-700 rounded-md text-white max-w-80 h-8 active:scale-90 font-bold font-Nunito' onClick={() => removeItem(item)}>Remove Item</button>
                        </div>
                    </div>
                )) : <div className='h-80 md:h-[500px] lg:h-[600px] w-full flex items-center justify-center bg-red-50 rounded-lg shadow-md'>
                    <h1 className='text-xl lg:text-3xl font-bold font-Nunito'>🥡 Your cart is empty ☹️</h1>
                </div>}
                <button className={`bg-green-600 w-[250px] h-10 mx-auto my-5 rounded-full shadow-md font-bold font-Nunito text-white hover:bg-green-700 active:scale-90 ${cartItems.length <= 0 ? 'hidden' : 'block'}`} onClick={() => router.push('/check-out')}>Check Out</button>
            </section>
            <Footer />
        </main>
    )
}

export default Cart