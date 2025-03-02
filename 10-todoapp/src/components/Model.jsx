import React from "react";
import { createPortal } from "react-dom";

function Model({ children, ref, btnCaption }) {
  return createPortal(
    <dialog ref={ref} className="backdrop:bg-stone-900/90">
      {children}
      <form action="dialog">
        <button>{btnCaption}</button>
      </form>
    </dialog>,
    document.getElementById("modal-root")
  );
}

export default Model;
