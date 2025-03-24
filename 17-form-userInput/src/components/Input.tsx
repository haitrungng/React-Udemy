import React from "react";

const Input = ({ label, id, error = undefined, ...props }) => {
  return (
    <div className="control">
      <label htmlFor={id}>{label}</label>
      <input id={id} {...props} required minLength={6} />
      <div className="control-error">{error && <p>{error}</p>}</div>
    </div>
  );
};

export default Input;
