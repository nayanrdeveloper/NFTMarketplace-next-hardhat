import React from "react";
import FooterSocialMedia from "./FooterSocialMedia";
import { FaFacebook, FaTwitter, FaInstagram, FaLinkedin } from "react-icons/fa";

function Footer() {
    const socialMediaIconList = [FaFacebook, FaTwitter, FaInstagram, FaLinkedin];
  return (
    <footer className="px-16 py-8 border-t border-[#ffffff14]">
      <div className="flex justify-between text-[#acacac]">
        <div className="flex gap-2">
          <span className="border-r border-[#ffffff14] px-2">
            ©2022 Nuron, Inc. All rights reserved
          </span>
          <ul className="flex gap-2">
            <li>Terms</li>
            <li>Privacy Policy</li>
          </ul>
        </div>
        <div className="flex">
          <FooterSocialMedia />
        </div>
      </div>
    </footer>
  );
}

export default Footer;
