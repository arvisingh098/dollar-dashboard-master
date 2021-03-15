import React, { useState } from "react";

import { Link } from "react-router-dom";

//Logo
import Logo from "../../assets/logo/logo.png";

import "./style.css";

export interface NavProps {}

const Nav: React.SFC<NavProps> = () => {
  const [showNavbar, setShowNavbar] = useState(false);
  return (
    <div className="Navbar">
      <div className="ascii-art">
        <img src={Logo} alt="" />
      </div>
      <div
        className="close-navbar-mobile"
        onClick={() => {
          setShowNavbar(!showNavbar);
        }}
      >
        <i className="fas fa-bars" />
      </div>
      <ul className={`nav-itens ${showNavbar ? "show" : ""}`}>
        <li>
          <Link to="/dao">DAO</Link>
        </li>
        <li>
          <Link to="/pool">Lp Rewards</Link>
        </li>
        <li>
          <Link to="/regulation">Regulation</Link>
        </li>
        <li>
          <Link to="/governance">Governance</Link>
        </li>
        <li>
          <Link to="/trade">Trade</Link>
        </li>
        <li>
          <Link to="/coupons">Coupons</Link>
        </li>
      </ul>
    </div>
  );
};

export default Nav;
