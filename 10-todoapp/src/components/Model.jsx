import React from "react";
import { createPortal } from "react-dom";

function Model({ children, ref, btnCaption }) {
  return createPortal(
    <dialog ref={ref} className="backdrop:bg-stone-900/90 rounded-md p-4">
      {children}
      <form action="dialog" className="text-right">
        <button className="px-6 py-2 rounded-md bg-stone-800 text-stone-50 hover:bg-stone-950 ">
          {btnCaption}
        </button>
      </form>
    </dialog>,
    document.getElementById("modal-root")
  );
}

export default Model;
