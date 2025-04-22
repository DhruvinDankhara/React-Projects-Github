import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const createTodo = createAsyncThunk(
  "todos/createTodo",
  async (todo, { rejectWithValue }) => {
    try {
      const response = await axios.post("http://localhost:8080/api/v1/todos/", {
        title: todo.title,
        description: todo.description,
      });
      return response.data.data;
    } catch (err) {
      return rejectWithValue(err.response.data);
    }
  }
);

export const deleteTodo = createAsyncThunk(
  "todos/deleteTodo",
  async (id, { rejectWithValue }) => {
    try {
      await axios.delete(`http://localhost:8080/api/v1/todos/${id}`);
      return id;
    } catch (err) {
      return rejectWithValue(err.response.data);
    }
  }
);

export const updateTodo = createAsyncThunk(
  "todos/updateTodo",
  async (todo, { rejectWithValue }) => {
    try {
      const response = await axios.patch(
        `http://localhost:8080/api/v1/todos/${todo._id}`,
        {
          title: todo.title,
        }
      );
      return response.data.data;
    } catch (err) {
      return rejectWithValue(err.response.data);
    }
  }
);

export const toggleComplete = createAsyncThunk(
  "todos/toggleComplete",
  async (todo, { rejectWithValue }) => {
    try {
      const response = await axios.patch(
        `http://localhost:8080/api/v1/todos/toggle/status/${todo._id}`
      );
      return response.data.data;
    } catch (err) {
      return rejectWithValue(err.response.data);
    }
  }
);

const initialState = {
  todos: [],
};

const todoSlice = createSlice({
  name: "Todo",
  initialState,
  reducers: {
    setTodos: (state, action) => {
      state.todos = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(createTodo.fulfilled, (state, action) => {
        state.todos = [...state.todos, action.payload];
      })
      .addCase(createTodo.rejected, (state, action) => {
        console.error("Failed to create todo:", action.payload);
      })
      .addCase(deleteTodo.fulfilled, (state, action) => {
        state.todos = state.todos.filter((todo) => todo._id !== action.payload);
      })
      .addCase(deleteTodo.rejected, (state, action) => {
        console.error("Failed to delete todo:", action.payload);
      })
      .addCase(updateTodo.fulfilled, (state, action) => {
        state.todos = state.todos.map((todo) =>
          todo._id === action.payload._id ? action.payload : todo
        );
      })
      .addCase(updateTodo.rejected, (state, action) => {
        console.error("Failed to update todo:", action.payload);
      })
      .addCase(toggleComplete.fulfilled, (state, action) => {
        state.todos = state.todos.map((todo) =>
          todo._id === action.payload._id ? action.payload : todo
        );
      })
      .addCase(toggleComplete.rejected, (state, action) => {
        console.error("Failed to toggle todo completion:", action.payload);
      });
  },
});

export const { setTodos } = todoSlice.actions;
export default todoSlice.reducer;
