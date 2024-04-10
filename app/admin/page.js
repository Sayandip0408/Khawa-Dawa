'use client'

import Footer from '@/components/Footer';
import { useAuth } from '@/utils/auth'
import { useRouter } from 'next/navigation';
import React, { useEffect, useRef, useState } from 'react'
import Image from 'next/image'
import { CiEdit } from "react-icons/ci";
import { MdDeleteOutline } from "react-icons/md";
import { toast } from 'react-toastify'
import Loader from '@/components/Loader';

const Admin = () => {
    const { user, isLoading, setIsLoading } = useAuth();
    const router = useRouter();
    const isMounted = useRef(false);
    const [itemName, setItemName] = useState('');
    const [price, setPrice] = useState('');
    const [description, setDescription] = useState('');
    const [itemImg, setItemImg] = useState('');
    const [itemCategory, setItemCategory] = useState('');
    const [orders, setOrders] = useState([]);
    const [menu, setMenu] = useState([]);
    const [status, setStatus] = useState('pending');

    const handleChange = (e) => {
        setStatus(e.target.value);
    };

    const fetchMenu = async () => {
        setIsLoading(true)
        try {
            const res = await fetch(process.env.NEXT_PUBLIC_MENU_ADMIN, {
                headers: {
                    method: 'GET',
                    Accept: 'application/json'
                }
            });
            const jsonRes = await res.json();
            setMenu(jsonRes.menus);
            toast.success('All items fetched successfully!', {
                position: "top-left",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "dark",
            });
            setIsLoading(false)
        } catch (error) {
            console.log('Error: unable to fetch menus');
            setIsLoading(false)
        }
    }

    const addMenu = async (e) => {
        e.preventDefault();
        setIsLoading(true);
        const res = await fetch(process.env.NEXT_PUBLIC_MENU_ADMIN, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                itemName, price, itemImg, description, itemCategory
            })
        });
        if (!res.ok) {
            // show error msg
            toast.error('Error: Unable to fetch contents', {
                position: "top-left",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "dark",
            });
            console.log("Error");
            setIsLoading(false)
        }
        else {
            // show success msg
            toast.success('Added ' + itemName, {
                position: "top-left",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "dark",
            });
            setItemName('')
            setItemImg('')
            setItemCategory('')
            setDescription('')
            setPrice('')
            fetchMenu();
            setIsLoading(false);
        }
    }

    const deleteItem = async (_id) => {
        const res = await fetch(process.env.NEXT_PUBLIC_MENU_ADMIN, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                _id
            })
        });
        if (res.status === 200) {
            console.log('Deleted');
            // show success msg
            toast.success('Item Deleted', {
                position: "top-left",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "dark",
            });
            fetchMenu();
        }
        else {
            // show error msg
            toast.error('Unable to Delete', {
                position: "top-left",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "dark",
            });
            console.log('error');
        }
    }

    const getOrders = async () => {
        try {
            const res = await fetch(process.env.NEXT_PUBLIC_ORDER_ADMIN, {
                headers: {
                    Accept: 'application/json',
                    method: 'GET'
                }
            });
            const resJson = await res.json();
            const data = resJson.orders;
            setOrders(data);
        } catch (error) {
            console.log(error);
        }
    }

    useEffect(() => {
        if (!isMounted.current) {
            isMounted.current = true;
            return;
        }
        if (user === null || user.admin !== true) {
            router.push('/authentication/login')
        }
        else {
            getOrders();
            fetchMenu();
        }
    }, [user, setIsLoading])

    return !isLoading ? (
        <main className="bg-transparent h-[calc(100vh-64px)] overflow-y-scroll p-2">
            <div className='h-fit w-full grid grid-cols-1 lg:grid-cols-2 gap-2'>
                <div className='h-full bg-red-50 rounded-lg'>
                    {
                        orders && orders.length > 0 ?
                            orders.slice(0, 4).map((item, index) => (
                                <div key={item._id} className='p-2'>
                                    <p className='font-bold font-Nunito'>Order {index + 1}: ⬇️</p>
                                    <h3 className='font-bold font-Nunito text-2xl text-red-600'>{item.orderName}</h3>
                                    <p className='font-semibold font-Nunito'>{item.address}</p>
                                    <p className='uppercase font-bold font-Nunito'>{item.status}</p>
                                </div>
                            )) :
                            <div className='h-full w-full flex items-center justify-center p-2'>
                                <h1 className='text-xl font-bold font-Nunito'>No Orders Yet ☹️</h1>
                            </div>
                    }
                </div>
                <div className='h-fit p-2'>
                    <h2 className='h-8 flex items-center justify-center text-white text-center mb-2 font-bold font-Nunito bg-red-800 rounded-md'>*** Add New Food Item ***</h2>
                    <form onSubmit={addMenu} className='h-full w-full flex flex-col justify-around gap-2'>
                        <input type='text' placeholder='Item Name' value={itemName} onChange={(e) => setItemName(e.target.value)} className='h-8 lg:h-10 rounded-md px-1 text-sm focus:outline-none border border-red-800 bg-red-100 font-semibold font-Nunito' required />
                        <input type='text' placeholder='Item Price' value={price} onChange={(e) => setPrice(e.target.value)} className='h-8 lg:h-10 rounded-md px-1 text-sm focus:outline-none border border-red-800 bg-red-100 font-semibold font-Nunito' required />
                        <input type='text' placeholder='Item Image' value={itemImg} onChange={(e) => setItemImg(e.target.value)} className='h-8 lg:h-10 rounded-md px-1 text-sm focus:outline-none border border-red-800 bg-red-100 font-semibold font-Nunito' required />
                        <input type='text' placeholder='Item Category' value={itemCategory} onChange={(e) => setItemCategory(e.target.value)} className='h-8 lg:h-10 rounded-md px-1 text-sm focus:outline-none border border-red-800 bg-red-100 font-semibold font-Nunito' required />
                        <textarea type='text' placeholder='Item Description' value={description} onChange={(e) => setDescription(e.target.value)} rows={10} className='resize-none rounded-md px-1 text-sm focus:outline-none border border-red-800 bg-red-100 font-semibold font-Nunito' required />
                        <button type='submit' className={`h-8 ${isLoading ? 'bg-red-100 cursor-wait' : 'bg-red-800 cursor-pointer'} lg:h-10 flex items-center justify-center rounded-md font-bold font-Nunito text-white`}>{isLoading ? 'Wait' : 'Add'}</button>
                    </form>
                </div>
            </div>
            <div className='p-2'>
                <h1 className='text-center font-bold font-Nunito text-xl'>🍟 Your Menu 🍔</h1>
                <div className='p-2 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-2'>
                    {
                        menu.map((m) => (
                            <div key={m._id} className='p-2 bg-red-50 rounded-lg shadow-md flex items-center border border-red-200'>
                                <Image src={m.itemImg} alt='item image' height={100} width={100} className='rounded-md' />
                                <div className='h-full w-full p-2'>
                                    <p className='text-xl font-bold font-Nunito'>{m.itemName}</p>
                                    <p className='font-bold font-Nunito'>₹ {m.price}.00</p>
                                    <button className='h-8 px-2 mx-1 text-lg bg-blue-600 hover:bg-blue-700 rounded-lg text-white' onClick={() => router.push(`/admin/edit-product/${m._id}`)}><CiEdit /></button>
                                    <button className='h-8 px-2 mx-1 text-lg bg-red-600 hover:bg-red-700 rounded-lg text-white' onClick={() => deleteItem(m._id)}><MdDeleteOutline /></button>
                                </div>
                            </div>
                        ))
                    }
                </div>
            </div>
            <Footer />
        </main>
    ) : <Loader />
}

export default Admin