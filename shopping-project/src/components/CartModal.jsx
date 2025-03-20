import { forwardRef, useImperativeHandle, useRef, useContext } from "react";
import { createPortal } from "react-dom";
import Cart from "./Cart";
import { CartContext } from "../store/shopping-cart-context";

const CartModal = forwardRef(function Modal({ title }, ref) {
  const dialog = useRef();

  const cartCtx = useContext(CartContext);
  const cartQuantity = cartCtx.items.length;
  let modalActions = <button>Close</button>;

  if (cartQuantity > 0) {
    modalActions = (
      <>
        <button>Close</button>
        <button>Checkout</button>
      </>
    );
  }

  useImperativeHandle(ref, () => {
    return {
      open: () => {
        dialog.current.showModal();
      },
    };
  });

  return createPortal(
    <dialog id="modal" ref={dialog}>
      <h2>{title}</h2>
      <Cart />
      <form method="dialog" id="modal-actions">
        {modalActions}
      </form>
    </dialog>,
    document.getElementById("modal")
  );
});

export default CartModal;
