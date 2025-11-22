import express from 'express';
import { getTodo, createTodo, updateTodo, completeTodo, deleteTodo } from '../controller/todoController.js';

const router = express.Router();

// /api/todos
router.get("/", getTodo);

// /api/todos
router.post("/", createTodo);

// /api/todos/:id
router.put("/:id", updateTodo);

// /api/todos/:id/done
router.patch("/:id/done", completeTodo);

//  /api/todos/:id
router.delete("/:id", deleteTodo);

export default router;