import React from 'react'
import loader from '../public/loader.gif'
import Image from 'next/image'

const Loader = () => {
  return (
    <main className='h-[100vh] w-full bg-white flex items-center justify-center'>
      <Image src={loader} alt='loader' height={300} width={300} />
    </main>
  )
}

export default Loader