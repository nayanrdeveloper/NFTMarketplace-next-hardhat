import Image from "next/image";
import React from "react";
import { FaFacebook, FaTwitter, FaInstagram, FaLinkedin } from "react-icons/fa";

function FooterSocialMedia() {
  return (
    <div>
      <ul className="flex gap-2">
        <li>
          <div className="rounded-full p-2 text-2xl bg-[#242435] hover:bg-[#00a3ff] hover:text-white">
            <FaFacebook />
          </div>
        </li>
        <li>
          <div className="rounded-full p-2 text-2xl bg-[#242435] hover:bg-[#00a3ff] hover:text-white">
            <FaTwitter />
          </div>
        </li>
        <li>
          <div className="rounded-full p-2 text-2xl bg-[#242435] hover:bg-[#00a3ff] hover:text-white">
            <FaInstagram />
          </div>
        </li>
        <li>
          <div className="rounded-full p-2 text-2xl bg-[#242435] hover:bg-[#00a3ff] hover:text-white">
            <FaLinkedin />
          </div>
        </li>
      </ul>
    </div>
  );
}

export default FooterSocialMedia;
