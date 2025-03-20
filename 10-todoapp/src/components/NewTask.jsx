import React, { useRef } from "react";

const NewTask = ({ onAdd }) => {
  const enterTask = useRef();

  function handleAddClick() {
    onAdd(enterTask.current.value);
    enterTask.current.value = "";
    enterTask.current.blur();
  }

  return (
    <div className="flex gap-4 items-center">
      <input
        type="text"
        name=""
        id=""
        className="w-64 px-2 py-1 rounded-sm bg-stone-200"
        ref={enterTask}
        onKeyDown={(e) => {
          if (e.key === "Enter") {
            handleAddClick();
            enterTask.current.blur();
          }
        }}
      />
      <button
        className="text-stone-700 hover:text-stone-950"
        onClick={handleAddClick}
      >
        Add Task
      </button>
    </div>
  );
};

export default NewTask;
