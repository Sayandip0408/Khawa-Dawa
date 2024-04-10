'use client'

import { useAuth } from '@/utils/auth'
import { useRouter } from 'next/navigation';
import React, { useEffect, useRef, useState } from 'react'
import { toast } from 'react-toastify'

const EditProduct = ({ params }) => {
    const [item, setItem] = useState({});
    const { user, isLoading, setIsLoading } = useAuth();
    const router = useRouter();
    const isMounted = useRef(false);
    const [newName, setNewName] = useState('')
    const [newImg, setNewImg] = useState('')
    const [newDesc, setNewDesc] = useState('')
    const [newPrice, setNewPrice] = useState('')
    const [newCat, setNewCat] = useState('')

    const { _id } = params;

    const fetchItem = async () => {
        const res = await fetch(process.env.NEXT_PUBLIC_MENU_ADMIN + '/' + _id);
        if (!res.ok) {
            toast.error('Some error occurred!', {
                position: "top-left",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "dark",
            });
            return;
        }
        const jsonRes = await res.json();
        const data = jsonRes.message;
        setItem(data);
        setNewName(data.itemName);
        setNewPrice(data.price);
        setNewImg(data.itemImg);
        setNewDesc(data.description);
        setNewCat(data.itemCategory);
    }

    const editData = async (e) => {
        e.preventDefault();
        const res = await fetch(process.env.NEXT_PUBLIC_MENU_ADMIN, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                _id: item._id,
                itemName: newName,
                itemImg: newImg,
                price: newPrice,
                itemCategory: newCat,
                description: newDesc,
            })
        });

        if (!res.ok) {
            toast.error('Some error occurred!', {
                position: "top-left",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "dark",
            });
            return;
        }
        toast.success('Updated!', {
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

    useEffect(() => {
        if (!isMounted.current) {
            isMounted.current = true;
            return;
        }
        if (user === null || user.admin !== true) {
            router.push('/authentication/login')
        }
        else {
            fetchItem();
        }
    }, [user, fetchItem, router])

    return (
        <main className="bg-transparent h-[calc(100vh-64px)] overflow-y-scroll p-2">
            <h1 className='font-bold font-Nunito text-2xl text-center bg-red-700 text-white rounded-md'>👨🏻‍💻 Edit Product ✍️</h1>
            <form className='p-2 flex flex-col justify-around gap-2' onSubmit={editData}>
                <input type='text' placeholder='Item Name' value={newName} onChange={(e) => setNewName(e.target.value)} className='px-1 h-8 rounded-md font-semibold font-Nunito' />
                <input type='text' placeholder='Item Price' value={newPrice} onChange={(e) => setNewPrice(e.target.value)} className='px-1 h-8 rounded-md font-semibold font-Nunito' />
                <input type='text' placeholder='Item Image' value={newImg} onChange={(e) => setNewImg(e.target.value)} className='px-1 h-8 rounded-md font-semibold font-Nunito' />
                <input type='text' placeholder='Item Category' value={newCat} onChange={(e) => setNewCat(e.target.value)} className='px-1 h-8 rounded-md font-semibold font-Nunito' />
                <textarea type='text' placeholder='Item Description' value={newDesc} onChange={(e) => setNewDesc(e.target.value)} rows={8} className='px-1 resize-none rounded-md font-semibold font-Nunito' />
                <button type='submit' className='bg-green-600 hover:bg-green-700 h-8 rounded-md font-bold font-Nunito uppercase text-white hover:text-white'>Submit ☑️</button>
            </form>
        </main>
    )
}

export default EditProduct