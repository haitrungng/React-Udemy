import React from "react";
import NewTask from "./NewTask";

const Task = ({ onAdd, onDelete, tasks }) => {
  console.log(tasks);
  return (
    <section>
      <h2 className="text-2xl font-bold text-stone-700 mb-4">Tasks</h2>
      <NewTask onAdd={onAdd} />
      {tasks.length === 0 ? (
        <p className="text-stone-800 mb-4">
          This project does not have any tasks yet
        </p>
      ) : (
        <ul className="p-4 bg-stone-100 rounded-md">
          {tasks.map((task) => (
            <li key={task.id} className="flex my-4 justify-between">
              <span className="text-stone-600">{task.title}</span>
              <button
                className="text-stone-700 hover:text-red-400"
                onClick={() => onDelete(task.id)}
              >
                Clear
              </button>
            </li>
          ))}
        </ul>
      )}
    </section>
  );
};

export default Task;
