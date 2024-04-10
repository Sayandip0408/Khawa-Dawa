'use client'

import React, { useEffect, useRef, useState } from 'react'
import { useRouter } from 'next/navigation';
import { useAuth } from '@/utils/auth'
import Image from 'next/image';
import Loader from '@/components/Loader';
import Footer from '@/components/Footer';
import { toast } from 'react-toastify'
import { FaLocationDot } from 'react-icons/fa6';

const CheckOut = () => {
    const { user, isLoading, setIsLoading } = useAuth();
    const router = useRouter();
    const isMounted = useRef(false);
    const [cartItems, setCartItems] = useState([]);

    const [name, setName] = useState('');
    const [phone, setPhone] = useState('');
    const [houseNo, setHouseNo] = useState('');
    const [city, setCity] = useState('');
    const [locality, setLocality] = useState('');
    const [pin, setPin] = useState('');
    const [district, setDistrict] = useState('');
    const [state, setState] = useState('');


    const clearCart = async () => {
        const res = await fetch('/api/cart', {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                userId: user._id
            })
        });
        if (!res.status === 200) {
            toast.error('Error while clearing your cart items', {
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
            toast.success('Cart cleared!', {
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
    }

    const placeOrder = async () => {
        const totalPrice = cartItems.reduce((total, item) => total + parseInt(item.price), 0);
        const fullAddress = `${houseNo}, ${locality}, ${city}, ${district}, ${state}, India, ${pin}`;
        const orderName = cartItems.map(item => `${item.quantity} ${item.itemName}`).join(', ');

        const res = await fetch(process.env.NEXT_PUBLIC_ADD_ORDER, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                orderName, address: fullAddress, price: totalPrice, orderImg: cartItems[0].itemImg, orderFor: name, phone, orderedBy: user._id, status: 'pending'
            })
        });
        if (!res.status === 201) {
            toast.error('Error while placing your order', {
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
            clearCart();
            toast.success('Hooray! Order Placed!', {
                position: "top-left",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "dark",
            });
            router.push('/orders');
        }

    }

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
            <h3 className='text-center text-2xl font-bold font-Nunito my-2 capitalize text-red-600 w-full flex items-center justify-center gap-2'><FaLocationDot />delivery location</h3>
            <section className='p-2 mx-auto w-full lg:w-[40%] '>
                <div className='bg-red-50 shadow-md rounded-md h-80 flex flex-col justify-around p-2'>
                    <input type='text' value={name} onChange={(e) => setName(e.target.value)} placeholder='Name' required className='h-8 w-full px-1 bg-transparent border-b border-transparent focus:outline-none focus:border-black' />
                    <input type='text' value={phone} onChange={(e) => setPhone(e.target.value)} placeholder='Phone' required className='h-8 w-full px-1 bg-transparent border-b border-transparent focus:outline-none focus:border-black' />
                    <input type='text' value={houseNo} onChange={(e) => setHouseNo(e.target.value)} placeholder='House No.' required className='h-8 w-full px-1 bg-transparent border-b border-transparent focus:outline-none focus:border-black' />
                    <input type='text' value={locality} onChange={(e) => setLocality(e.target.value)} placeholder='Locality' required className='h-8 w-full px-1 bg-transparent border-b border-transparent focus:outline-none focus:border-black' />
                    <input type='text' value={city} onChange={(e) => setCity(e.target.value)} placeholder='City' required className='h-8 w-full px-1 bg-transparent border-b border-transparent focus:outline-none focus:border-black' />
                    <input type='text' value={district} onChange={(e) => setDistrict(e.target.value)} placeholder='District' required className='h-8 w-full px-1 bg-transparent border-b border-transparent focus:outline-none focus:border-black' />
                    <input type='text' value={state} onChange={(e) => setState(e.target.value)} placeholder='State' required className='h-8 w-full px-1 bg-transparent border-b border-transparent focus:outline-none focus:border-black' />
                    <input type='text' value={pin} onChange={(e) => setPin(e.target.value)} placeholder='Pin Code' required className='h-8 w-full px-1 bg-transparent border-b border-transparent focus:outline-none focus:border-black' />
                </div>
            </section>
            <section className='p-2 grid grid-cols-1 gap-2'>
                {cartItems.map((item) => (
                    <div key={item._id} className='h-32 w-full lg:w-[40%] mx-auto bg-red-50 shadow-md rounded-md flex'>
                        <Image src={item.itemImg} alt='item image' height={128} width={128} className='rounded-tl-md rounded-bl-md' />
                        <div className='h-full w-full flex flex-col justify-around p-2'>
                            <h4 className='font-bold font-Nunito text-xl text-red-800'>{item.itemName} <span className='text-base'>(Qty. {item.quantity})</span></h4>
                            <p className='font-bold font-Nunito text-red-800 text-sm'>₹<span className='text-xl'>{item.price}</span>.00</p>
                            <button className='bg-red-600 hover:bg-red-700 rounded-md text-white max-w-80 h-8 active:scale-90 font-bold font-Nunito' onClick={() => removeItem(item)}>Remove Item</button>
                        </div>
                    </div>
                ))}
                <p className='font-bold font-Nunito mt-5 mb-2 text-center'>🥳 <span className='font-black font-Nunito'>Cash On delivery</span> in every order 🎉</p>
                <button className='bg-green-600 w-[250px] h-10 mx-auto mb-5 rounded-full shadow-md font-bold font-Nunito text-white hover:bg-green-700 active:scale-90' onClick={placeOrder}>Place Order</button>
            </section>
            <Footer />
        </main>
    )
}

export default CheckOut