'use client'

import React, { useEffect, useState } from 'react'
import { GiForkKnifeSpoon, GiTechnoHeart } from "react-icons/gi";
import Link from 'next/link'
import { useAuth } from '@/utils/auth';
import { useRouter } from 'next/navigation';
import { FaAngleRight } from "react-icons/fa6";
import { IoIosHelpCircle } from "react-icons/io";
import { RiMenuFoldLine } from "react-icons/ri";
import { MdAdminPanelSettings, MdRestaurantMenu } from "react-icons/md";
import { IoAlertCircle, IoCube, IoFastFood, IoLogoInstagram, IoHelpCircleSharp, IoHome, IoLogoFacebook, IoLogoGithub, IoReorderFour, IoBasketSharp } from "react-icons/io5";

const Navbar = () => {
    const { user } = useAuth();
    const [isClient, setIsClient] = useState(false);
    const router = useRouter();
    const [showSideBar, setShowSideBar] = useState(false);
    const [showTooltipForHelp, setShowTooltipForHelp] = useState(false);
    const [showTooltipForCart, setShowTooltipForCart] = useState(false);

    const handleMouseEnterForHelp = () => {
        setShowTooltipForHelp(true);
    };

    const handleMouseLeaveForHelp = () => {
        setShowTooltipForHelp(false);
    };

    const handleMouseEnterForCart = () => {
        setShowTooltipForCart(true);
    };

    const handleMouseLeaveForCart = () => {
        setShowTooltipForCart(false);
    };

    useEffect(() => {
        setIsClient(true);
    }, [showSideBar, setShowSideBar]);

    return (
        <nav className='h-16 w-full bg-transparent flex items-center justify-between px-3 lg:px-10 sticky top-0'>
            <Link href='/' className='h-10 w-fit flex items-center justify-center gap-2 active:scale-90'>
                <div className='bg-red-500 h-10 w-10 rounded flex items-center justify-center text-white text-2xl'>
                    <GiForkKnifeSpoon />
                </div>
                <div className='h-10 w-fit lg:flex items-center justify-center'>
                    <h1 className='text-black font-bold text-base lg:text-2xl font-Pacifico'>খাওয়া-দাওয়া</h1>
                    <h1 className='text-red-600 font-bold text-xs lg:text-base font-Pacifico'>(Khawa-Dawa)</h1>
                </div>
            </Link>
            <ul className='h-10 w-fit lg:flex items-center gap-5 hidden'>
                <Link href='/' className='font-bold font-Nunito border-b-2 border-transparent hover:border-black'>Home</Link>
                {
                    isClient && (
                        user === null || user.admin === false ?
                            <></> : <Link href='/admin' className='font-bold font-Nunito border-b-2 border-transparent hover:border-black'>Admin</Link>
                    )
                }
                <Link href='/menu' className='font-bold font-Nunito border-b-2 border-transparent hover:border-black'>Menu</Link>
                <Link href='/orders' className='font-bold font-Nunito border-b-2 border-transparent hover:border-black'>Orders</Link>
                <Link href='/about' className='font-bold font-Nunito border-b-2 border-transparent hover:border-black'>About</Link>
            </ul>
            <div className='h-10 w-fit hidden lg:flex items-center gap-3'>
                <div className="relative h-10 w-fit flex items-center justify-center">
                    <div
                        className="cursor-pointer inline-block"
                        onMouseEnter={handleMouseEnterForHelp}
                        onMouseLeave={handleMouseLeaveForHelp}
                    >
                        <Link href='/help' className='text-2xl'><IoIosHelpCircle /></Link>
                    </div>
                    {showTooltipForHelp && <div className="absolute top-[100%] left-[50%] translate-x-[-50%] bg-[#333] text-white py-[5px] px-[10px] rounded text-sm z-[999]">Help</div>}
                </div>
                {
                    isClient && (
                        user === null ?
                            <></> :
                            <div className="relative h-10 w-fit flex items-center justify-center">
                                <div
                                    className="cursor-pointer inline-block"
                                    onMouseEnter={handleMouseEnterForCart}
                                    onMouseLeave={handleMouseLeaveForCart}
                                >
                                    <Link href='/cart' className='text-2xl'><IoBasketSharp /></Link>
                                </div>
                                {showTooltipForCart && <div className="absolute top-[100%] left-[50%] translate-x-[-50%] bg-[#333] text-white py-[5px] px-[10px] rounded text-sm z-[999]">Cart</div>}
                            </div>
                    )
                }
                {
                    isClient && (
                        user === null ?
                            <button onClick={() => router.push('/authentication/login')}>Login</button> :
                            <div className='h-10 w-fit'>
                                <h1 className='text-base font-bold font-Nunito'>Hello, <span className='text-red-500 text-xl font-bold'>{user.name}</span></h1>
                                <Link href='/profile' className='text-xs flex items-center text-red-500 font-semibold'>See Profile <FaAngleRight /></Link>
                            </div>
                    )
                }
            </div>
            <button className='text-3xl hover:bg-red-300 rounded p-2 lg:hidden text-red-600' onClick={() => setShowSideBar(!showSideBar)}>{showSideBar ? <MdRestaurantMenu /> : <RiMenuFoldLine />}</button>
            <div className={`bg-[#fdc5c5] h-[calc(100vh-64px)] w-full overflow-hidden fixed top-16 left-0 flex ${!showSideBar ? 'translate-x-full' : 'translate-x-0'} transition-transform duration-300 ease-in-out overflow-hidden lg:hidden`}>
                <div className='p-5 h-full w-full grid grid-rows-4'>
                    <ul className='flex flex-col justify-around'>
                        {
                            isClient && (
                                user === null ?
                                    <button onClick={() => {
                                        router.push('/authentication/login')
                                        setShowSideBar(false)
                                    }} className='h-10 w-[80%] bg-red-800 mx-auto rounded-md font-semibold border border-red-900 text-red-100'>Login</button> :
                                    <div className='h-10 w-fit'>
                                        <h1 className='text-base font-bold font-Nunito text-black'>Hello, <span className='text-red-500 text-2xl font-bold'>{user.name}</span></h1>
                                        <Link href='/profile' className='text-xs flex items-center text-red-500 font-bold font-Nunito' onClick={() => setShowSideBar(false)}>See Profile <FaAngleRight /></Link>
                                    </div>
                            )
                        }
                        <Link href='/' className='text-lg font-bold font-Nunito w-full h-fit flex items-center gap-2' onClick={() => setShowSideBar(false)}>
                            <IoHome className='text-2xl' />
                            Home
                        </Link>
                    </ul>
                    <ul className='flex flex-col justify-around row-span-3'>
                        {
                            isClient && (
                                user === null || user.admin === false ?
                                    <></> : <Link href='/admin' className='text-lg font-bold font-Nunito w-full h-fit flex items-center gap-2' onClick={() => setShowSideBar(false)}>
                                        <MdAdminPanelSettings className='text-2xl' />
                                        Admin
                                    </Link>
                            )
                        }
                        <Link href='/menu' className='text-lg font-bold font-Nunito w-full h-fit flex items-center gap-2' onClick={() => setShowSideBar(false)}>
                            <IoFastFood className='text-2xl' />
                            Menu
                        </Link>
                        <Link href='/cart' className='text-lg font-bold font-Nunito w-full h-fit flex items-center gap-2' onClick={() => setShowSideBar(false)}>
                            <IoBasketSharp className='text-2xl' />
                            Cart
                        </Link>
                        <Link href='/orders' className='text-lg font-bold font-Nunito w-full h-fit flex items-center gap-2' onClick={() => setShowSideBar(false)}>
                            <IoCube className='text-2xl' />
                            Orders
                        </Link>
                        <Link href='/about' className='text-lg font-bold font-Nunito w-full h-fit flex items-center gap-2' onClick={() => setShowSideBar(false)}>
                            <IoAlertCircle className='text-2xl' />
                            About
                        </Link>
                        <Link href='/help' className='text-lg font-bold font-Nunito w-full h-fit flex items-center gap-2' onClick={() => setShowSideBar(false)}>
                            <IoHelpCircleSharp className='text-2xl' />
                            Help
                        </Link>
                        <div className='w-full h-fit flex items-center justify-around'>
                            <a href='https://www.facebook.com/sayandip.adhikary.96' onClick={() => setShowSideBar(false)} className='p-1 rounded-full bg-red-500 text-white text-lg'><IoLogoFacebook /></a>
                            <a href='https://www.instagram.com/sayan.dip7/' onClick={() => setShowSideBar(false)} className='p-1 rounded-full bg-red-500 text-white text-lg'><IoLogoInstagram /></a>
                            <a href='https://github.com/Sayandip0408' onClick={() => setShowSideBar(false)} className='p-1 rounded-full bg-red-500 text-white text-lg'><IoLogoGithub /></a>
                            <a href='https://sayandip-adhikary.vercel.app/' onClick={() => setShowSideBar(false)} className='p-1 rounded-full bg-red-500 text-white text-lg'><GiTechnoHeart /></a>
                        </div>
                    </ul>
                </div>
            </div>
        </nav>
    )
}

export default Navbar