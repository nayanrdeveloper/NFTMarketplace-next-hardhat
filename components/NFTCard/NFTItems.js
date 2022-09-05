import Link from 'next/link';
import React from 'react';
import { FaBeer, FaArrowRight } from 'react-icons/fa';
import NFTCard from './NFTCard';

function NFTItems() {
    const NFTCardList = [
        {
            "title": "Orthogon#720",
            "price": "0.668",
            "likes": "028",
            "image": "/design2.webp"
        },
        {
            "title": "Orthogon#710",
            "price": "0.668",
            "likes": "253",
            "image": "/design1.webp"
        },
        {
            "title": "Orthogon#750",
            "price": "0.668",
            "likes": "120",
            "image": "/design3.webp"
        },
        {
            "title": "Orthogon#770",
            "price": "0.668",
            "likes": "207",
            "image": "/design4.webp"
        },
    ]
  return (
    <div className='container mb-5'>
        <div className='flex justify-between mt-10 gap-6'>
            <p className='text-3xl text-white font-medium'>Newest Items</p>
            <Link href="/allNFTs"><p className='text-2xl text-[#acacac] flex hover:cursor-pointer'>View All <FaArrowRight className='ml-2 mt-1' /></p></Link>
        </div>
        <div className='grid grid-cols-3 mt-8 gap-9'>
            {
                NFTCardList.map((NFTCardData) => {
                    return <NFTCard key={NFTCardData.title} data={NFTCardData} />
                })
            }
            
        </div>
    </div>
  )
}

export default NFTItems