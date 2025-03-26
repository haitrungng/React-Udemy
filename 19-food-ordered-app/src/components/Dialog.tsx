import React, { useCallback, useContext, useEffect } from "react";
import ReactDOM from "react-dom";
import Cart from "./Cart";
import Checkout from "./Checkout";
import Confirmation from "./Confirmation";
import { UserProgressContext } from "../store/UserProgressContext";

const Dialog = () => {
  const { progress, dialogRef } = useContext(UserProgressContext);

  return ReactDOM.createPortal(
    <dialog className="modal" ref={dialogRef} open={progress !== ""}>
      {progress === "cart" && <Cart />}
      {progress === "checkout" && <Checkout />}
      {progress === "confirm" && <Confirmation />}
    </dialog>,
    // @ts-ignore
    document.getElementById("modal-root")
  );
};

export default Dialog;
