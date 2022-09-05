import React from "react";
import NavItem from "./NavItem";
import NavLogo from "./NavLogo";

function Navbar() {
  const navItems = ["Home", "About", "Explore", "Pages", "Blog", "Contact"];
  return (
    <div className="flex justify-between py-3 border-b border-[#ffffff14] backdrop-blur-[9px] p-5">
      <NavLogo />
      <ul className="flex my-auto ml-7">
        <li className="text-[#acacac] px-4 text-center py-1 cursor-pointer">Home</li>
        <li className="text-[#acacac] px-4 text-center py-1 cursor-pointer">About</li>
        <li className="text-[#acacac] px-4 text-center py-1 cursor-pointer">Explore</li>
        <li className="text-[#acacac] px-4 text-center py-1 cursor-pointer">Blog</li>
      </ul>
      <div className="my-auto">
        <button className="bg-[#212e48] py-2 px-2 rounded-xl text-white">Connect Wallet</button>
      </div>
    </div>
  );
}

export default Navbar;
