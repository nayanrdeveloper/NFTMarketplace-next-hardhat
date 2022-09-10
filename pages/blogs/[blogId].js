import Image from "next/image";
import React, { useEffect, useState } from "react";
import { ethers } from "ethers";
import { useRouter } from "next/router";
import axios from "axios";
import blogABI from "../../artifacts/contracts/blog.sol/Blog.json";
import Loader from "../../components/Loader/Loader";

function blogDetails() {
  // eslint-disable-next-line react-hooks/rules-of-hooks
  const router = useRouter();
  const { blogId } = router.query;
  // eslint-disable-next-line react-hooks/rules-of-hooks
  const [blogData, setBlogData] = useState("");
  // eslint-disable-next-line react-hooks/rules-of-hooks
  const [isLoading, setIsLoading] = useState(false);
  // eslint-disable-next-line react-hooks/rules-of-hooks
  useEffect(() => {
    if (blogId) {
      getBlogData();
    }
  }, [blogId]);
  const getBlogData = async () => {
    setIsLoading(true);
    const provider = new ethers.providers.Web3Provider(window.ethereum);
    const signer = await provider.getSigner();
    const blogContract = new ethers.Contract(
      process.env.NEXT_PUBLIC_BLOG_CONTRACT_ADDRESS,
      blogABI.abi,
      signer
    );
    const blogData = await blogContract.getBlogById(blogId);
    const meta = await axios.get(blogData._blogUrl);
    const imageUrl = `https://ipfs.io/ipfs/${meta.data.image.substr(7)}`;
    const data = {
      title: blogData._title,
      desc: meta.data.description,
      image: imageUrl,
      category: blogData._category,
      blogId: blogData._blogId.toNumber(),
    };
    setBlogData(data);
    setIsLoading(false);
  };
  return (
    <div className="container my-8">
      {blogData ? (
        <div className="">
          <span className="text-white text-3xl font-bold">Blog Details</span>
          <div className="flex flex-col gap-x-10 gap-y-4 mt-8">
            <p className="text-white text-3xl font-extrabold">
              {blogData.title}
            </p>
            <time className="text-[#acacac]">10 may, 2021</time>
            <Image
              src={blogData.image}
              alt="design_7"
              height={400}
              width={400}
            />
            <p className="text-[#acacac]">{blogData.desc}</p>
          </div>
        </div>
      ) : (
        <span className="flex justify-center my-auto">
          {" "}
          <Loader />{" "}
        </span>
      )}
    </div>
  );
}

export default blogDetails;
