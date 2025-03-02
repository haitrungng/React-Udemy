import React from "react";

function Input({ label, isTextArea = false, type = "text", ...props }) {
  const styling = `w-full p-1 border-b-2`;
  const inputUI = isTextArea ? (
    <textarea
      {...props}
      className={`w-full p-1 border-b-2 rounded-sm border-stone-300 bg-stone-200 text-stone-600
        focus:outline-none focus:border-stone-600`}
    />
  ) : (
    <input type={type} {...props} className={styling} />
  );
  return (
    <>
      <p className="flex flex-col gap-1 my-4">
        <label className="text-sm font-bold uppercase text-stone-500">
          {label}
        </label>
        {inputUI}
      </p>
    </>
  );
}

export default Input;
