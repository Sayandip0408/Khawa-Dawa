'use client'

import React, { useState, useEffect } from 'react';
import Loader from '@/components/Loader';
import { useAuth } from '@/utils/auth';
import { useRouter } from 'next/navigation';
import Link from 'next/link';

const Register = () => {
  const [phone, setPhone] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [houseNo, setHouseNo] = useState('');
  const [city, setCity] = useState('');
  const [locality, setLocality] = useState('');
  const [pin, setPin] = useState('');
  const [district, setDistrict] = useState('');
  const [state, setState] = useState('');

  const { login, isLoading, setIsLoading, user } = useAuth();
  const router = useRouter();

  const handleRegistration = async (e) => {
    e.preventDefault();

    if (!phone || !password || !name || !houseNo || !city || !locality || !district || !state || !pin) {
      alert("Fill up properly!")
      return;
    }

    const remove91 = phone.replace(/^\+91/, '');
    const digits = remove91.replace(/\D/g, '');
    if (digits.length !== 10) {
      alert("Error: Not a valid phone number!");
      return null;
    }
    setPhone(digits);

    setIsLoading(true)

    const response = await fetch(process.env.NEXT_PUBLIC_REGISTER, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        name, phone:digits, password, houseNo, city, locality, district, state, pin
      }),
    });

    if (response.status === 400) {
      alert('Registration failed!')
      setIsLoading(false)
      return;
    }

    if (response.status === 401) {
      alert('User already exists!')
      setIsLoading(false)
      return;
    }

    setIsLoading(false)

    login(phone, password);
  };

  useEffect(() => {
    if (user) {
      router.push('/')
    }
  }, [user, isLoading])

  return isLoading ? <Loader /> : (
    <main className='h-[calc(100vh-64px)] w-full flex items-center justify-center overflow-y-scroll p-2'>
      <form onSubmit={handleRegistration} className='bg-red-50 h-full lg:h-[670px] w-full lg:w-fit flex flex-col justify-around rounded-xl p-2 lg:p-5'>
        <h1 className='w-full text-xl font-semibold text-center'>Khawa-Dawa Registration</h1>
        <input type='text' placeholder='John Doe' value={name} onChange={(e) => setName(e.target.value)} className='w-full lg:w-[400px] h-10 rounded-lg focus:outline-none border-red-200 focus:border-red-700 border px-2' />
        <input type='text' placeholder='+91 000 0000 000' value={phone} onChange={(e) => setPhone(e.target.value)} className='w-full lg:w-[400px] h-10 rounded-lg focus:outline-none border-red-200 focus:border-red-700 border px-2' />
        <input type='password' placeholder='********' value={password} onChange={(e) => setPassword(e.target.value)} className='w-full lg:w-[400px] h-10 rounded-lg focus:outline-none border-red-200 focus:border-red-700 border px-2' />
        <input type='text' placeholder='House / Apartment No.' value={houseNo} onChange={(e) => setHouseNo(e.target.value)} className='w-full lg:w-[400px] h-10 rounded-lg focus:outline-none border-red-200 focus:border-red-700 border px-2' />
        <input type='text' placeholder='Locality' value={locality} onChange={(e) => setLocality(e.target.value)} className='w-full lg:w-[400px] h-10 rounded-lg focus:outline-none border-red-200 focus:border-red-700 border px-2' />
        <input type='text' placeholder='City' value={city} onChange={(e) => setCity(e.target.value)} className='w-full lg:w-[400px] h-10 rounded-lg focus:outline-none border-red-200 focus:border-red-700 border px-2' />
        <input type='text' placeholder='District' value={district} onChange={(e) => setDistrict(e.target.value)} className='w-full lg:w-[400px] h-10 rounded-lg focus:outline-none border-red-200 focus:border-red-700 border px-2' />
        <input type='text' placeholder='State' value={state} onChange={(e) => setState(e.target.value)} className='w-full lg:w-[400px] h-10 rounded-lg focus:outline-none border-red-200 focus:border-red-700 border px-2' />
        <input type='text' placeholder='Pin No.' value={pin} onChange={(e) => setPin(e.target.value)} className='w-full lg:w-[400px] h-10 rounded-lg focus:outline-none border-red-200 focus:border-red-700 border px-2' />
        <button type='submit' className='w-full lg:w-[400px] h-10 rounded-lg bg-red-600 text-white font-semibold hover:bg-red-700'>Register</button>
        <p className='text-center'>Already have an account? <Link href='/authentication/login' className='font-semibold text-red-600'>Login</Link></p>
      </form>
    </main>
  );
}

export default Register