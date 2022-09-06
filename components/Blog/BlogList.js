import Image from "next/image";
import Link from "next/link";
import React from "react";
import { CgTime } from 'react-icons/cg';


function BlogList() {
    const blogList = [
        {
            image: '/design2.webp',
            title: 'Ayan Dog GIF',
            category: 'NFTs',
            time: '2',
        },
        {
            image: '/design1.webp',
            title: 'Decentraland and Meta Verse',
            category: 'Marketing',
            time: '4',
        },
        {
            image: '/design4.webp',
            title: 'Beeple Everydays The First 10 Days',
            category: 'Design',
            time: '3',
        },
        {
            image: '/design7.jpg',
            title: 'NFTs are too important for best artists',
            category: 'NFTs',
            time: '2',
        },
    ]
  return (
    <div>
      <div className="container my-8">
        <div className="">
          <span className="text-white text-3xl font-bold">Blogs</span>
          <div className="grid grid-cols-2 mt-8 gap-5">
            {
                blogList.map((blogData, index) => {
                    return <div key={index} className="flex flex-col gap-2 p-5 bg-[#24243557] rounded-md">
                    <Image
                      src={blogData.image}
                      alt="design2"
                     width={350}
                     height={350}
                    />
                    <div className="flex justify-between">
                      <span className="text-[#00a3ff]">{blogData.category}</span>
                      <span className="flex gap-1 text-[#acacac]"><CgTime className="my-auto" /> {blogData.time} min Read</span>
                    </div>
                    <Link href={`blogs/${blogData.title}`}><div className="text-white text-2xl cursor-pointer">{blogData.title} </div></Link>
                  </div>
                })
            }
          </div>
        </div>
      </div>
    </div>
  );
}

export default BlogList;
