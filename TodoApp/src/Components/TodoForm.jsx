import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { createTodo } from "../Store/TodoSlice";

function TodoForm() {
  const dispatch = useDispatch();
  const [title, setTitle] = useState("");

  const handleAddTodo = (e) => {
    e.preventDefault();
    dispatch(createTodo({ title: title, description: "New Todo Description" }));
    setTitle("");
  };

  return (
    <form onSubmit={handleAddTodo} className="mb-8">
      <div className="flex gap-4">
        <input
          type="text"
          className="flex-1 rounded-lg border-2 border-pink-500/30 bg-purple-900/30 text-white placeholder-pink-200/50 focus:border-pink-500 focus:ring-2 focus:ring-pink-500/20 text-base outline-none py-3 px-4 transition-all duration-200"
          placeholder="What needs to be done?"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        <button
          type="submit"
          className="bg-gradient-to-r from-pink-500 to-orange-500 hover:from-pink-600 hover:to-orange-600 text-white font-semibold py-3 px-6 rounded-lg transition-all duration-200 transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-pink-500/20"
        >
          Add Task
        </button>
      </div>
    </form>
  );
}

export default TodoForm;
