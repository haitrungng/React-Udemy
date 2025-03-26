import React, { useContext } from "react";
// @ts-ignore
import logo from "../assets/logo.jpg";
import { CartContext } from "../store/CartContext";
import { UserProgressContext } from "../store/UserProgressContext";

const Header = () => {
  const { showDialog } = useContext(UserProgressContext);
  const { orderedMeals } = useContext(CartContext);
  console.log(orderedMeals);
  return (
    <div id="main-header">
      <div id="title">
        <img src={logo} />
        <h1>REACTFOOD</h1>
      </div>
      <button
        onClick={() => {
          showDialog("cart");
        }}
      >
        Cart ({orderedMeals ? orderedMeals.length : "0"})
      </button>
    </div>
  );
};

export default Header;
