import { useEffect } from "react";
import "./App.css";
import { TodoForm, Todos } from "./Components";
import { useDispatch } from "react-redux";
import { setTodos } from "./Store/TodoSlice";

function App() {
  const dispatch = useDispatch();

  useEffect(() => {
    const fetchTodos = async () => {
      try {
        const res = await fetch("http://localhost:8080/api/v1/todos");
        const data = await res.json();
        dispatch(setTodos(data.data));
      } catch (error) {
        console.error("Failed to fetch todos", error);
      }
    };
    fetchTodos();
  }, [dispatch]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-900 via-pink-900 to-orange-900 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-3xl mx-auto">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-white mb-2">Todo App</h1>
          <p className="text-pink-200">
            Stay organized and boost your productivity
          </p>
        </div>
        <div className="bg-white/10 backdrop-blur-lg rounded-2xl shadow-xl p-6">
          <TodoForm />
          <Todos />
        </div>
      </div>
    </div>
  );
}

export default App;
