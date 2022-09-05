import React from 'react'
import Image from 'next/image'

function HeroSection() {
  return (
    <div className='grid grid-cols-2 container py-16'>
        <div className='flex flex-col gap-6'>
            <h2 className='text-white text-5xl leading-normal'>Discover Digital Art, Collect and Sell Your Specific NFTs.</h2>
            <p className='text-2xl text-[#acacac]'>Partner with one of the worlds largest retailers to showcase your brand and products.</p>
            <div className='flex space-x-3'>
                <button className='py-4 px-6 bg-[#00a3ff] hover:bg-[#212e48] text-white rounded-md w-40'>Get Started </button>
                <button className='py-4 px-6 bg-[#212e48] hover:bg-[#00a3ff] text-white rounded-md w-40'>Create </button>
            </div>
        </div>
        <div className=''>
            <Image width={500} height={500}  src="/slider12.webp" alt='slider' /> 
        </div>
    </div>
  )
}

export default HeroSection