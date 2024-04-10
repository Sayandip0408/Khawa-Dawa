'use-client'

import "./globals.css";
import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer } from 'react-toastify'
import { AuthProvider } from "@/utils/auth";
import Navbar from "@/components/Navbar";

export const metadata = {
  title: "Khawa-Dawa (খাওয়া-দাওয়া)",
  description: "Khawa-Dawa (খাওয়া-দাওয়া) is a Kolkata based restaurant cum food delivery website.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className='w-full h-fit bg-gradient-to-b from-[#fdc5c5] to-[#fdf4f4] overflow-hidden'>
        <AuthProvider>
          <Navbar />
          {children}
          <ToastContainer />
        </AuthProvider>
      </body>
    </html>
  );
}
