import React, { useState } from "react";
import { FaFileUpload } from "react-icons/fa";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function createNFT() {
  // eslint-disable-next-line react-hooks/rules-of-hooks
  const [productData, setProductData] = useState({
    name: "",
    price: "",
    desc: "",
  });

  const onchangeProductInput = (event) => {
    setProductData({
      ...productData,
      [event.target.name]: event.target.value,
    });
  };

  const onSubmitProduct = (event) => {
    event.preventDefault();
    if (!productData.name || !productData.desc || !productData.price ){
      toast.error("All Fields are required!!!", {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
    }
    
  };

  return (
    <div className="container my-8">
      <ToastContainer theme="dark" />
      <div className="">
        <span className="text-white text-3xl font-bold">Create New NFT</span>
        <div className="flex gap-x-10 mt-8">
          <div className="justify-center my-auto">
            <p className="text-white">Upload file</p>
            <div className="py-6 mt-7 flex justify-center text-center my-auto flex-col border-2 border-dashed border-[#575767]">
              <input type="file" className="w-full h-full opacity-0" />
              <FaFileUpload className="mx-auto text-3xl text-[#00a3ff]" />
              <p className="text-[#acacac]">Choose a File</p>
              <p className="text-[#acacac]">PNG, WEBP, MP4, or MP3.</p>
              <p className="text-[#acacac]">MAx 1Gb.</p>
            </div>
          </div>
          <div className="flex flex-col border border-[#ffffff14] p-10 bg-[#24243557] rounded-lg gap-4 w-full">
            <div className="flex flex-col gap-2">
              <label htmlFor="name" className="text-[#acacac]">
                Product Name
              </label>
              <input
                type="text"
                onChange={onchangeProductInput}
                value={productData.name}
                required
                id="name"
                placeholder=" e.g. Digital Awesome NFT"
                className="h-12 w-full bg-[#242435] border-2 border-[#ffffff14] text-white rounded-md focus:border focus:border-[#00a3ff]"
              />
            </div>
            <div className="flex flex-col gap-2">
              <label htmlFor="desc" className="text-[#acacac]">
                Description
              </label>
              <textarea
                id="desc"
                onChange={onchangeProductInput}
                value={productData.desc}
                placeholder=" Enter NFT Description"
                className="h-36 w-full bg-[#242435] border-2 border-[#ffffff14] text-white rounded-md focus:border focus:border-[#00a3ff]"
              />
            </div>
            <div className="flex flex-col gap-2">
              <label htmlFor="price" className="text-[#acacac]">
                Product Price
              </label>
              <input
                type="number"
                onChange={onchangeProductInput}
                value={productData.price}
                id="price"
                placeholder=" e.g. 20"
                className="h-12 w-full bg-[#242435] border-2 border-[#ffffff14] text-white rounded-md focus:border focus:border-[#00a3ff]"
              />
            </div>
            <button
              onClick={onSubmitProduct}
              className="py-4 px-6 bg-[#00a3ff] hover:bg-[#212e48] text-white rounded-md w-40"
            >
              Submit Item
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default createNFT;
