import React, { useEffect, useState } from "react";
import NFTCard from "../components/NFTCard/NFTCard";
import { ethers } from "ethers";
import NFTTOkenABI from "../artifacts/contracts/myToken.sol/MyToken.json";
import NFTMarketplaceABI from "../artifacts/contracts/myNFT.sol/MyNFT.json";
import axios from 'axios';
import Loader from "../components/Loader/Loader";

function allNFTs() {

  // eslint-disable-next-line react-hooks/rules-of-hooks
  const [NFTData, setNFTData] = useState();

  // eslint-disable-next-line react-hooks/rules-of-hooks
  useEffect( () => {
    getItems();
  },[]);
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

  const getItems =async () => {
    const provider = new ethers.providers.Web3Provider(window.ethereum,"any");
    const signer = await provider.getSigner();
    let marketplaceContract = new ethers.Contract(
      process.env.NEXT_PUBLIC_MARKETPLACE_CONTRACT_ADDRESS,
      NFTMarketplaceABI.abi,
      signer
    );
    let tokenContract = new ethers.Contract(
      process.env.NEXT_PUBLIC_NFTTOKN_CONTRACT_ADDRESS,
      NFTTOkenABI.abi,
      signer
    )
    const data =await marketplaceContract.getAllNFTs();
    let newItems = await Promise.all(
      data.map(async (d) => {
        console.log(d);
        const tokenUri = await tokenContract.tokenURI(d._tokenId);
        console.log(tokenUri);
          const meta = await axios.get(tokenUri);
          const price = ethers.utils.formatUnits(d.price.toString(), "ether");
          const imageUrl = `https://ipfs.io/ipfs/${meta.data.image.substr(7)}`;
          return {
            price,
            tokenId: d._tokenId.toNumber(),
            seller: d.seller,
            owner: d.owner,
            image: imageUrl,
            name: meta.data.name,
            desc: meta.data.description,
          };
        // const tokenUri = await contract.tokenURI(d.tokenId);
      })
    )
    setNFTData(newItems);
    console.log(newItems);
  }

  return (
    <div className="container my-8">
      <div className="">
        <span className="text-white text-3xl font-bold">Our Product</span>
        <div>
          <div className={`grid ${NFTData ? 'grid-cols-3' : ''} gap-9 mt-8`}>
            {
              NFTData ? NFTData.map((NFTCardData) => {
                return <NFTCard key={NFTCardData.title} data={NFTCardData} />;
              }) :<span className="flex justify-center my-auto"> <Loader /> </span>

            }
            {/* {NFTCardList.map((NFTCardData) => {
              return <NFTCard key={NFTCardData.title} data={NFTCardData} />;
            })} */}
          </div>
        </div>
      </div>
    </div>
  );
}

export default allNFTs;
