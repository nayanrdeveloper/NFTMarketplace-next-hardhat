import React from "react";
import { FaBeer, FaArrowRight } from 'react-icons/fa';
import Image from "next/image";

function NFTStepCard({data}) {
  return (
    <div className="flex flex-col gap-6 bg-[#24243557] px-3 py-6 rounded-xl hover:-translate-y-2 duration-300">
        <Image src={data.image} alt="shape" width={110} height={110} className="" />
      <h4 className="text-[#acacac]">STEP-{data.step}</h4>
      <h5 className="text-2xl text-white">{data.title}</h5>
      <p className="text-[#acacac]">
       {data.desc}
      </p>
      <span className="text-[#acacac]"><FaArrowRight /></span>
    </div>
  );
}

export default NFTStepCard;
