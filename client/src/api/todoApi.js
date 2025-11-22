import axios from "axios";

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;


export const api = axios.create({
  baseURL: `${API_BASE_URL}`,
  headers: {
    "Content-Type": "application/json"
  }
});

// GET all todos
export const fetchAllTodos = () => api.get("/")

// Create new Todo
export const createNewTodo = (todo) => 
    api.post("/", todo);

// Update todo
export const updateTodo = (id, todoData) => 
    api.put(`/${id}`, todoData);

// Toggle complete status 
export const completeTodo = (id) =>
    api.patch(`/${id}/done`);

// Delete todo
export const deleteTodo = (id) => 
    api.delete(`/${id}`);