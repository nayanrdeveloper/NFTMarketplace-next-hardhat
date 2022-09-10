import React, { useEffect, useState } from "react";
import { FaFileUpload } from "react-icons/fa";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { NFTStorage, File } from "nft.storage";
import AOS from "aos";
import "aos/dist/aos.css";
import ClipLoader from "react-spinners/ClipLoader";
import blogABI from "../../artifacts/contracts/blog.sol/Blog.json";
import { ethers } from "ethers";
import connectWallet from "../../walletConnect";

function BlogCreate() {
  useEffect(() => {
    AOS.init();
    AOS.refresh();
  });
  // eslint-disable-next-line react-hooks/rules-of-hooks
  const [blogData, setBlogData] = useState({
    title: "",
    desc: "",
    imageUrl: "",
    category: "",
  });

  const [isLoading, setIsLoading] = useState(false);

  const onchangeBlogInput = (event) => {
    setBlogData({
      ...blogData,
      [event.target.name]: event.target.value,
    });
  };

  const onSubmitBlog = async (event) => {
    event.preventDefault();
    const imageFile = event.target.file.files[0];
    if (!blogData.title || !blogData.desc || !blogData.category) {
      toast.error("All Fields are required!!!", {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
    } else {
      try {
        setIsLoading(true);
        const nftStorage = new NFTStorage({
          token: process.env.NEXT_PUBLIC_NFT_STORAGE_KEY,
        });
        console.log(nftStorage);
        const link = await nftStorage.store({
          image: imageFile,
          name: blogData.title,
          description: blogData.desc,
          category: blogData.category,
        });
        console.log(link);
        const ipfsURL = `https://ipfs.io/ipfs/${link.url.substr(7)}`;
        connectWallet.connectWallet();
        const provider = new ethers.providers.Web3Provider(window.ethereum);
        const signer = await provider.getSigner();
        console.log(signer);

        const blogContract = new ethers.Contract(
          process.env.NEXT_PUBLIC_BLOG_CONTRACT_ADDRESS,
          blogABI.abi,
          signer
        );
        let traction = await blogContract.createBlog(
          blogData.title,
          ipfsURL,
          blogData.category
        );
        await traction.wait();
        console.log(traction);
        setIsLoading(false);
        setBlogData({
          title: "",
          desc: "",
          imageUrl: "",
          category: "",
        });
        toast.success("Blog are Upload Successfully", {
          position: "top-right",
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        });
      } catch (error) {
        toast.error("Something to wrong please after some time", {
          position: "top-right",
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        });
        console.log(error);
      }
    }
  };
  return (
    <div className="container my-8">
      <ToastContainer theme="dark" />
      <div className="">
        <span className="text-white text-3xl font-bold">Blog Create</span>
        <form onSubmit={onSubmitBlog}>
          <div className="flex gap-x-10 mt-8">
            <div className="justify-center my-auto" data-aos="fade-right">
              <p className="text-white">Upload file</p>
              <div className="py-6 mt-7 flex justify-center text-center my-auto flex-col border-2 border-dashed border-[#575767]">
                <input
                  type="file"
                  name="file"
                  className="w-full h-full opacity-0"
                />
                <FaFileUpload className="mx-auto text-3xl text-[#00a3ff]" />
                <p className="text-[#acacac]">Choose a File</p>
                <p className="text-[#acacac]">PNG, WEBP</p>
              </div>
            </div>
            <div
              className="flex flex-col border border-[#ffffff14] p-10 bg-[#24243557] rounded-lg gap-4 w-full"
              data-aos="fade-left"
            >
              <div className="flex flex-col gap-2">
                <label htmlFor="title" className="text-[#acacac]">
                  Blog Title
                </label>
                <input
                  type="text"
                  onChange={onchangeBlogInput}
                  name="title"
                  value={blogData.title}
                  required
                  id="title"
                  placeholder=" What is Blockchain?"
                  className="h-12 w-full bg-[#242435] border-2 border-[#ffffff14] text-white rounded-md focus:border focus:border-[#00a3ff]"
                />
              </div>
              <div className="flex flex-col gap-2">
                <label htmlFor="category" className="text-[#acacac]">
                  Blog Category
                </label>
                <select
                  onChange={onchangeBlogInput}
                  name="category"
                  value={blogData.category}
                  id="category"
                  className="h-12 w-full bg-[#242435] border-2 border-[#ffffff14] text-white rounded-md focus:border focus:border-[#00a3ff]"
                >
                  <option value="marketing">Marketing</option>
                  <option value="blockchain">Blockchain</option>
                  <option value="design">Design</option>
                  <option value="development">Development</option>
                </select>
              </div>
              <div className="flex flex-col gap-2">
                <label htmlFor="desc" className="text-[#acacac]">
                  Description
                </label>
                <textarea
                  id="desc"
                  onChange={onchangeBlogInput}
                  value={setBlogData.desc}
                  name="desc"
                  placeholder=" Blog Description"
                  className="h-36 w-full bg-[#242435] border-2 border-[#ffffff14] text-white rounded-md focus:border focus:border-[#00a3ff]"
                />
              </div>
              <button
                // onClick={onSubmitProduct}
                type="submit"
                className={`flex py-4 px-6 bg-[#00a3ff] hover:bg-[#212e48] text-white rounded-md ${
                  isLoading ? "w-44" : "w-36"
                }`}
              >
                {isLoading && <ClipLoader color="white" className="mr-2" />}
                Submit Blog
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}

export default BlogCreate;
