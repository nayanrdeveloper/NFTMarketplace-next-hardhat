import Image from "next/image";
import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { FaHeart } from "react-icons/fa";
import axios from "axios";
import NFTTOkenABI from "../../artifacts/contracts/myToken.sol/MyToken.json";
import NFTMarketplaceABI from "../../artifacts/contracts/myNFT.sol/MyNFT.json";
import { ToastContainer, toast } from "react-toastify";

import { ethers } from "ethers";
import Loader from "../../components/Loader/Loader";

function title() {
  // eslint-disable-next-line react-hooks/rules-of-hooks
  const router = useRouter();
  const { tokenId } = router.query;
  // eslint-disable-next-line react-hooks/rules-of-hooks
  const [NFTData, setNFTData] = useState();
  // let stringTitle;
  // if (title) {
  //   stringTitle = title.toString();
  //   console.log(stringTitle);
  // }

  // eslint-disable-next-line react-hooks/rules-of-hooks
  useEffect(() => {
    if (tokenId) {
      getNFTData();
    }
  }, [tokenId]);

  const getNFTData = async () => {
    const provider = new ethers.providers.Web3Provider(window.ethereum, "any");
    const signer = await provider.getSigner();
    let marketplaceContact = new ethers.Contract(
      process.env.NEXT_PUBLIC_MARKETPLACE_CONTRACT_ADDRESS,
      NFTMarketplaceABI.abi,
      signer
    );
    let tokenContract = new ethers.Contract(
      process.env.NEXT_PUBLIC_NFTTOKN_CONTRACT_ADDRESS,
      NFTTOkenABI.abi,
      signer
    );
    const data = await marketplaceContact.getListedTokenByTokenId(tokenId);
    // console.log(data);
    const tokenURI = await tokenContract.tokenURI(`${tokenId}`);
    const meta = await axios.get(tokenURI);
    meta = meta.data;
    // console.log(meta);
    // const price =await ethers.utils.formatUnits(meta.price.toString(), "ether");
    const imageUrl = `https://ipfs.io/ipfs/${meta.image.substr(7)}`;
    let item = {
      price: meta.price,
      itemId: data.itemId.toNumber(),
      tokenId: tokenId,
      seller: data.seller,
      owner: data.owner,
      image: imageUrl,
      name: meta.name,
      description: meta.description,
    }
    setNFTData(item);
    console.log(item);  
  };

  const butNFT = async () => {
    const provider = new ethers.providers.Web3Provider(window.ethereum, "any");
    const signer = await provider.getSigner();
    const marketplaceNFT = new ethers.Contract(
      process.env.NEXT_PUBLIC_MARKETPLACE_CONTRACT_ADDRESS,
      NFTMarketplaceABI.abi,
      signer
    );
    const price = await ethers.utils.parseUnits(NFTData.price.toString(), "ether");
    const transaction = await marketplaceNFT.executeSale(process.env.NEXT_PUBLIC_NFTTOKN_CONTRACT_ADDRESS,NFTData.itemId, {
      value: price,
    });
    await transaction.wait();
    toast.error("All Fields are required!!!", {
      position: "top-right",
      autoClose: 3000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
    });
  };

  return (
    <div className="container my-8">
      <div className="">
        <span className="text-white text-3xl font-bold">Product Details</span>
        {NFTData ? (
          <div className="grid grid-cols-2 mt-8">
            <div>
              <Image src={NFTData.image} alt="" height={450} width={450} />
            </div>
            <div className="flex flex-col gap-3">
              <div className="flex justify-between">
                <h3 className="text-3xl text-white font-bold">
                  {NFTData.name}
                </h3>
                <span className="text-white flex my-auto p-2 bg-[#242435] rounded-md">
                  <FaHeart className="mt-1 mr-1" />
                  200
                </span>
              </div>
              <span className="text-[#00a3ff]">{NFTData.price}wETH</span>
              <span className="text-white font-bold">
                Category <span className="text-[#acacac]"> royalties</span>
              </span>
              <p className="text-[#acacac]">{NFTData.description}</p>
              <p className="text-[#acacac]"><span className="text-white">Seller:</span> {NFTData.seller}</p>
              <button
                onClick={butNFT}
                className="inline w-32 bg-[#212e48] py-2 px-2 rounded-xl text-white hover:bg-[#00a3ff]"
              >
                Buy Now
              </button>
              <ToastContainer theme="dark" />
            </div>
          </div>
        ) : (
          <span className="flex justify-center my-auto">
            {" "}
            <Loader />{" "}
          </span>
        )}
      </div>
    </div>
  );
}

export default title;
