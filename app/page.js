'use client'

import { useAuth } from "@/utils/auth";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import Image from 'next/image'
import heroImg from '../public/heroBg.png';
import { BiSolidRightArrow } from "react-icons/bi";
import Link from "next/link";
import Footer from "@/components/Footer";

export default function Home() {
  const { user, logout } = useAuth();
  const router = useRouter();
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  return (
    <main className="bg-transparent h-[calc(100vh-64px)] overflow-y-scroll">
      <section id="hero" className="w-full h-fit grid grid-cols-1 lg:grid-cols-2">
        <div className="h-80 lg:h-[500px] lg:order-2 flex items-center justify-center">
          <Image src={heroImg} alt="heroImg" height={400} />
        </div>
        <div className="h-80 lg:h-[500px] flex flex-col items-start justify-around px-10 lg:pl-28">
          <h4 className="h-10 w-fit px-3 flex items-center justify-center rounded-full bg-[#f8d8d8] text-red-500 font-semibold font-LibreBaskerville">Feast Your Senses</h4>
          <h1 className="text-3xl lg:text-5xl font-black font-LibreBaskerville">Bon Appétit: <span className="text-red-500"><br></br>Delicious Dining<br></br></span>Delivered Fast</h1>
          <p className="text-slate-600 font-Nunito lg:text-lg font-medium">Indulge in a culinary journey with our exquisite selection, delivered straight to your door.</p>
          <Link href='/menu' className="h-12 w-fit px-10 bg-red-500 rounded-full flex items-center justify-center gap-2 uppercase text-white font-bold hover:bg-red-600">Order Now <BiSolidRightArrow /></Link>
        </div>
      </section>
      <Footer />
    </main>
  );
}
