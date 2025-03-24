import React from "react";
// @ts-ignore
import logo from "../assets/logo.jpg";

const Header = () => {
  return (
    <div id="main-header">
      <div id="title">
        <img src={logo} />
        <h1>REACTFOOD</h1>
      </div>
      <button>Cart</button>
    </div>
  );
};

export default Header;
