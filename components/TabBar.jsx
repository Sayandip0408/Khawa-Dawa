import React, { useState } from 'react';
import Image from 'next/image'
import { useAuth } from '@/utils/auth';
import { toast } from 'react-toastify'

const TabBar = ({ tabs }) => {
    const [activeTab, setActiveTab] = useState(0);
    const { user } = useAuth();
    const [quantities, setQuantities] = useState(new Array(tabs[activeTab].content.length).fill(1));

    const handleTabClick = (index) => {
        setActiveTab(index);
    };

    const addToCart = async (item, index) => {
        const res = await fetch(process.env.NEXT_PUBLIC_ADD_TO_CART_URL, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                itemName: item.itemName, price: item.price, itemImg: item.itemImg, quantity: quantities[index].toString(), orderedBy: user._id
            }),
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
            return;
        }
        toast.success('Item added to your cart', {
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

    return (
        <div className="w-full h-fit">
            <div className="w-full h-fit flex items-center justify-center gap-3 my-2 py-2">
                {tabs.map((tab, index) => (
                    <button
                        key={index}
                        onClick={() => handleTabClick(index)}
                        className={index === activeTab ? 'border border-red-700 bg-red-700 rounded-md px-2 py-1 text-white font-bold font-Nunito' : 'border border-red-500 rounded-md px-2 py-1 text-red-500 font-bold font-Nunito'}
                    >
                        {tab.title}
                    </button>
                ))}
            </div>
            <div className="tab-content">
                <div className='w-full lg:w-[85vw] mx-auto h-fit grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-2 lg:gap-3'>
                    {tabs[activeTab].content.map((item, index) => (
                        <div key={item._id} className='bg-red-50 rounded-lg w-full h-fit grid grid-cols-6 border border-red-200 shadow-md'>
                            <div className='col-span-2 flex items-center justify-center'>
                                <Image src={item.itemImg} alt='item' width={400} height={400} className='rounded-tl-lg rounded-bl-lg h-full' />
                            </div>
                            <div className='col-span-4 p-1 flex flex-col justify-around'>
                                <h2 className='text-2xl font-bold font-Nunito text-red-700'>{item.itemName}</h2>
                                <p className='text-sm text-slate-400 font-bold font-Nunito'>Price: <span className='font-bold font-Nunito text-green-700 text-base'>₹{item.price}</span></p>
                                <p className='line-clamp-2 text-sm font-semibold font-Nunito'>Desc: {item.description}</p>
                                <div className='grid grid-cols-2 gap-1'>
                                    <button className='bg-red-500 hover:bg-red-600 font-bold font-Nunito w-full rounded py-1 my-1 text-white active:scale-90' onClick={() => addToCart(item, index)}>Add</button>
                                    <input type='number' className='bg-red-500 hover:bg-red-600 font-bold font-Nunito w-full rounded p-1 my-1 text-white active:scale-90 text-center'
                                        value={quantities[index]}
                                        onChange={(e) => {
                                            const inputValue = parseInt(e.target.value);
                                            if (!isNaN(inputValue) && inputValue >= 1 && inputValue <= 5) {
                                                const newQuantities = [...quantities];
                                                newQuantities[index] = inputValue;
                                                setQuantities(newQuantities);
                                            }
                                        }}
                                    />
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default TabBar;
