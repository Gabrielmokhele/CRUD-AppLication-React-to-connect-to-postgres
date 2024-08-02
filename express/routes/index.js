const express = require("express");
const {
  getAllTodos,
  createTodos,
  getTodoById,
  updateTodo,
  deleteTodo,
} = require("../controllers/Todos");
const {
  getAllUsers,
  createUser,
  getUserById,
} = require("../controllers/Users");
const router = express.Router();

router.get("/todos", getAllTodos);
router.post("/todos", createTodos);
router.get("/todos/:id", getTodoById);
router.patch("/todos/:id", updateTodo);
router.delete("/todos/:id", deleteTodo);

router.get("/users", getAllUsers);
router.post("/users", createUser);
router.get("/users/:id", getUserById);

module.exports = router;
