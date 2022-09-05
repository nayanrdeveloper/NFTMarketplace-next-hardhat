import Image from "next/image";
import React from "react";
import { FaHeart } from 'react-icons/fa';

function title() {
  return (
    <div className="container my-8">
      <div className="">
        <span className="text-white text-3xl font-bold">Product Details</span>
        <div className="grid grid-cols-2 mt-8">
          <div>
              <Image src="/design3.webp" alt="" height={450} width={450} />
          </div>
          <div className="flex flex-col gap-3">
            <div className="flex justify-between">
                <h3 className="text-3xl text-white font-bold">cAtal7</h3>
                <span className="text-white flex my-auto p-2 bg-[#242435] rounded-md"><FaHeart  className="mt-1 mr-1"/>200</span>
            </div>
            <span className="text-[#00a3ff]">0.025wETH</span>
            <span className="text-white font-bold">Category <span className="text-[#acacac]"> royalties</span></span>
            <button className="inline w-32 bg-[#212e48] py-2 px-2 rounded-xl text-white hover:bg-[#00a3ff]">Buy Now</button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default title;
