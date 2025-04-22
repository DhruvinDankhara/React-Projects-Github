import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { updateTodo, deleteTodo, toggleComplete } from "../Store/TodoSlice";

function Todos() {
  const dispatch = useDispatch();
  const todos = useSelector((state) => state.todo.todos);

  const [editingId, setEditingId] = useState(null);
  const [editedTitle, setEditedTitle] = useState("");

  const handleEditTodo = (todo) => {
    setEditingId(todo._id);
    setEditedTitle(todo.title);
  };

  const handleSaveTodo = (todo) => {
    dispatch(updateTodo({ _id: todo._id, title: editedTitle }));
    setEditingId(null);
    setEditedTitle("");
  };

  const handleRemoveTodo = (todo) => {
    dispatch(deleteTodo(todo._id));
  };

  const handleToggleComplete = (todo) => {
    dispatch(toggleComplete(todo));
  };

  return (
    <div>
      {todos && todos.length > 0 ? (
        <ul className="space-y-4">
          {todos.map((todo) => (
            <li
              key={todo._id}
              className={`group transition-all duration-200 ${
                todo.isComplete
                  ? "bg-purple-900/30 border-pink-500/20"
                  : "bg-purple-900/30 hover:bg-purple-800/40 border-pink-500/20"
              } border rounded-xl p-4`}
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-4">
                  <input
                    type="checkbox"
                    checked={todo.isComplete}
                    onChange={() => handleToggleComplete(todo)}
                    className={`w-5 h-5 rounded border-2 transition-all duration-200 cursor-pointer ${
                      todo.isComplete
                        ? "border-pink-500 bg-pink-500 checked:bg-pink-500 checked:border-pink-500"
                        : "border-pink-500/30 bg-purple-900/30 checked:bg-pink-500 checked:border-pink-500"
                    } focus:ring-2 focus:ring-pink-500/20`}
                  />
                  <div className="flex">
                    {editingId === todo._id ? (
                      <input
                        type="text"
                        value={editedTitle}
                        autoFocus
                        onChange={(e) => setEditedTitle(e.target.value)}
                        className="w-auto bg-purple-900/30 text-white border-2 border-pink-500/30 rounded-lg px-3 py-2 focus:outline-none focus:border-pink-500 text-lg font-medium"
                      />
                    ) : (
                      <h2
                        className={`text-lg font-medium transition-all duration-200 ${
                          todo.isComplete
                            ? "line-through text-pink-300/70"
                            : "text-white"
                        }`}
                      >
                        {todo.title}
                      </h2>
                    )}
                  </div>
                </div>
                <div className="flex gap-2 ml-4">
                  {editingId === todo._id ? (
                    <button
                      onClick={() => handleSaveTodo(todo)}
                      className="bg-gradient-to-r from-pink-500 to-orange-500 hover:from-pink-600 hover:to-orange-600 text-white px-4 py-2 rounded-lg transition-all duration-200 transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-pink-500/20"
                    >
                      Save
                    </button>
                  ) : (
                    <button
                      onClick={() => handleEditTodo(todo)}
                      className={`${
                        todo.isComplete
                          ? "bg-pink-500/20 hover:bg-pink-500/30 text-pink-300"
                          : "bg-gradient-to-r from-pink-500 to-orange-500 hover:from-pink-600 hover:to-orange-600 text-white"
                      } px-4 py-2 rounded-lg transition-all duration-200 transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-pink-500/20`}
                    >
                      Edit
                    </button>
                  )}
                  <button
                    onClick={() => handleRemoveTodo(todo)}
                    className="bg-gradient-to-r from-red-500 to-pink-500 hover:from-red-600 hover:to-pink-600 text-white p-2 rounded-lg transition-all duration-200 transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-red-500/20"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      strokeWidth={1.5}
                      stroke="currentColor"
                      className="w-5 h-5"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0"
                      />
                    </svg>
                  </button>
                </div>
              </div>
            </li>
          ))}
        </ul>
      ) : (
        <div className="text-center py-12">
          <div className="text-6xl mb-4">📝</div>
          <p className="text-xl text-white font-medium mb-2">No tasks yet!</p>
          <p className="text-pink-200">Add a new task to get started</p>
        </div>
      )}
    </div>
  );
}

export default Todos;
