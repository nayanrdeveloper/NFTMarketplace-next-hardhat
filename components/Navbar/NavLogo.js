import React from 'react'
import Image from 'next/image';

function NavLogo() {
  return (
    <div className='flex space-x-2'>
        <Image width={45} height={45}u src="/troodon.png" alt='logo' />
        <h1 className='text-white text-2xl my-auto'>Troodon</h1>
    </div>
  )
}

export default NavLogo