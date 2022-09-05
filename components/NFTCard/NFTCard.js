import React from "react";
import Image from "next/image";
import { FaHeart } from 'react-icons/fa';

function NFTCard({data}) {
  return (
    <div>
      <div className="p-2 bg-[#242435] rounded-lg hover:shadow-2xl hover:shadow-[#00a3ff]">
        <Image src={data.image} height={330} width={330} alt="title" className="transform transition duration-500 hover:scale-110" />
        <h4 className="text-white text-2xl font-bold">{data.title}</h4>
        <div className="flex justify-between">
          <span className="text-[#00a3ff]">{data.price}wETH</span>
          <span className="text-white flex"><FaHeart  className="mt-1 mr-1"/>{data.likes}</span>
        </div>
      </div>
    </div>
  );
}

export default NFTCard;