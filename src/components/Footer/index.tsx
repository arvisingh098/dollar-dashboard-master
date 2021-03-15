import * as React from "react";

//Icons
import { IoLogoTwitter } from "react-icons/io";
import { FaDiscord, FaTelegramPlane } from "react-icons/fa";
import { AiFillGithub, AiFillMediumCircle } from "react-icons/ai";

//Styles
import "./index.css";

//Components
import Link from "../../components/Link";

export interface FooterProps {}

const Footer: React.SFC<FooterProps> = () => {
  return (
    <div className="Footer">
      <div className="brand-container">
        <div className="circle"></div>
        <span>Control Loop</span>
      </div>

      <div className="links-container">
        <Link href="/app">App</Link>
        <Link href="/help">Help</Link>
        <Link href="/faq">Faq</Link>
      </div>

      <div className="social-media-icons-container">
        <span>
          <FaTelegramPlane size={28} className="Icon"></FaTelegramPlane>
        </span>
        <span>
          <IoLogoTwitter size={28} className="Icon"></IoLogoTwitter>
        </span>
        <span>
          <FaDiscord size={28} className="Icon"></FaDiscord>
        </span>
        <span>
          <AiFillMediumCircle size={28} className="Icon"></AiFillMediumCircle>
        </span>
        <span>
          <AiFillGithub size={28} className="Icon"></AiFillGithub>
        </span>
      </div>
    </div>
  );
};

export default Footer;
