'use client'

import React, { useEffect, useRef, useState } from 'react'
import { useAuth } from '@/utils/auth'
import { useRouter } from 'next/navigation';
import Footer from '@/components/Footer';
import Image from 'next/image';

const Orders = () => {
  const { user, isLoading, setIsLoading } = useAuth();
  const router = useRouter();
  const isMounted = useRef(false);
  const [orderItems, setOrderItems] = useState([]);

  const fetchOrders = async () => {
    setIsLoading(true);
    const res = await fetch(process.env.NEXT_PUBLIC_GET_USER_ORDER_URL + '/' + user._id, {
      headers: {
        method: 'GET',
        Accept: 'application/json'
      }
    });
    const jsonRes = await res.json();
    const data = jsonRes.orderItems;
    setOrderItems(data);
    setIsLoading(false);
  }

  useEffect(() => {
    if (!isMounted.current) {
      isMounted.current = true;
      return;
    }

    if (user === null) {
      router.push('/authentication/login')
    } else {
      fetchOrders();
    }
  }, [user])

  return (
    <main className="bg-transparent h-[calc(100vh-64px)] overflow-y-scroll">
      <div className='p-2 w-full md:w-[75%] lg:w-[50%] mx-auto min-h-[70vh]'>
        {
          orderItems.length > 0 ?
            orderItems.map((item) => (
              <div key={item._id} className='h-fit w-full grid grid-cols-1 lg:grid-cols-12 bg-red-50 rounded-lg my-2'>
                <div className='lg:col-span-3 flex items-center justify-center'>
                  <Image src={item.orderImg} alt='image' height={200} width={200} className='rounded-lg lg:rounded-none lg:rounded-tl-lg lg:rounded-bl-lg shadow-md h-full' />
                </div>
                <div className='lg:col-span-9 grid grid-cols-2'>
                  <div className='p-1 lg:flex flex-col justify-center gap-2'>
                    <h3 className='font-bold font-Nunito text-lg'>{item.orderName}</h3>
                    <h5 className='font-bold font-Nunito'>₹{item.price}.00 (COD)</h5>
                    <h6 className={`font-bold font-Nunito uppercase ${item.status === 'pending' ? 'text-blue-600' : item.status === 'confirmed' ? 'text-yellow-600' : item.status === 'delivered' ? 'text-green-600' : 'text-purple-600'}`}>{item.status === 'pending' ? '🔵 Pending' : item.status === 'confirmed' ? '🟠 Confirmed' : item.status === 'delivered' ? '🟢 Delivered' : '🟣 Out For Delivery'}</h6>
                  </div>
                  <div className='p-1 lg:flex flex-col justify-center gap-2'>
                    <p className='font-semibold font-Nunito capitalize'>{item.address}</p>
                    <p className='font-semibold font-Nunito capitalize'>+91{item.phone}</p>
                  </div>
                </div>
              </div>
            )) :
            <div className='min-h-[70vh] w-full flex items-center justify-center'>
              <h1 className='font-bold text-xl'>0️⃣ You have no orders ☹️</h1>
            </div>
        }
      </div>
      <Footer />
    </main>
  )
}

export default Orders