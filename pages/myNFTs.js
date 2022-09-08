import React, { useEffect, useState } from "react";
import NFTCard from "../components/NFTCard/NFTCard";
import marketplaceABI from "../artifacts/contracts/myNFT.sol/MyNFT.json";
import tokenABI from "../artifacts/contracts/myToken.sol/MyToken.json";
import axios from 'axios';
import {ethers} from 'ethers';
import Loader from "../components/Loader/Loader";

function myNFTs() {
  const NFTCardList = [
    {
      title: "Orthogon#720",
      price: "0.668",
      likes: "028",
      image: "/design2.webp",
    },
    {
      title: "Orthogon#710",
      price: "0.668",
      likes: "253",
      image: "/design1.webp",
    },
    {
      title: "Orthogon#750",
      price: "0.668",
      likes: "120",
      image: "/design3.webp",
    },
    {
      title: "Orthogon#770",
      price: "0.668",
      likes: "207",
      image: "/design4.webp",
    },
    {
      title: "Orthogon#770",
      price: "0.668",
      likes: "207",
      image: "/design7.jpg",
    },
    {
      title: "Orthogon#770",
      price: "0.668",
      likes: "207",
      image: "/design8.webp",
    },
    {
      title: "Orthogon#770",
      price: "0.668",
      likes: "207",
      image: "/design10.jpg",
    },
  ];

  // eslint-disable-next-line react-hooks/rules-of-hooks
  const [myNFTData, setMyNFTData] = useState();
  // eslint-disable-next-line react-hooks/rules-of-hooks
  useEffect(() => {
    getMyAllNFT();
  },[]);

  const getMyAllNFT = async () => {
    const provider = new ethers.providers.Web3Provider(window.ethereum, "any");
    const signer = await provider.getSigner();
    const marketplaceContract = new ethers.Contract(process.env.NEXT_PUBLIC_MARKETPLACE_CONTRACT_ADDRESS,marketplaceABI.abi,signer);
    const tokenContract = new ethers.Contract(process.env.NEXT_PUBLIC_NFTTOKN_CONTRACT_ADDRESS, tokenABI.abi, signer);
    const data = await marketplaceContract.getMyNFT();
    let newItems = await Promise.all(
      data.map(async (d) => {
        const tokenUri = await tokenContract.tokenURI(d._tokenId);
        const meta = await axios.get(tokenUri);
        const price = ethers.utils.formatUnits(d.price.toString(), "ether");
        const imageUrl = `https://ipfs.io/ipfs/${meta.data.image.substr(7)}`;
        return {
          price: price,
          tokenId: d._tokenId.toNumber(),
          itemId: d.itemId.toNumber(),
          seller: d.seller,
          owner: d.owner,
          image: imageUrl,
          name: meta.data.name,
          desc: meta.data.description,
        };
      })
    )
    setMyNFTData(newItems);
    console.log(newItems);
  }
  return (
    <div className="container my-8">
      <div className="">
        <span className="text-white text-3xl font-bold">My Product</span>
        <div className={`grid ${myNFTData ? 'grid-cols-3' : ''} gap-9 mt-8`}>
            {
              myNFTData ? myNFTData.map((NFTCardData) => {
                return <NFTCard key={NFTCardData.title} data={NFTCardData} />;
              }) :<span className="flex justify-center my-auto"> <Loader /> </span>

            }
            {/* {NFTCardList.map((NFTCardData) => {
              return <NFTCard key={NFTCardData.title} data={NFTCardData} />;
            })} */}
          </div>
      </div>
    </div>
  );
}

export default myNFTs;
