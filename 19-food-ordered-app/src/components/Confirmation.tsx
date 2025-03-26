import React, { useContext } from "react";
import { UserProgressContext } from "../store/UserProgressContext";

const Confirmation = () => {
  const { hideDialog } = useContext(UserProgressContext);
  return (
    <>
      <h2>Success</h2>
      <p>Your order has been placed!</p>
      <div className="modal-actions">
        <button className="button" onClick={() => hideDialog()}>
          Close
        </button>
      </div>
    </>
  );
};

export default Confirmation;
