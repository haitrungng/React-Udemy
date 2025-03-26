import { useRef, useContext } from "react";

import CartModal from "./CartModal.jsx";
import { CartContext } from "../store/shopping-cart-context.jsx";

export default function Header() {
  const cartCtx = useContext(CartContext);

  const modal = useRef();

  function handleOpenCartClick() {
    modal.current.open();
  }
  return (
    <>
      <CartModal ref={modal} />
      <header id="main-header">
        <div id="main-title">
          <img src="logo.png" alt="Elegant model" />
          <h1>Elegant Context</h1>
        </div>
        <p>
          <button onClick={handleOpenCartClick}>
            Cart ({cartCtx.items.length})
          </button>
        </p>
      </header>
    </>
  );
}
