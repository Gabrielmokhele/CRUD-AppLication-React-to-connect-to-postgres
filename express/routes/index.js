// main file for all my express routes that will be exported and imported into the server file

const express = require("express");
const { getAllTodos ,createTodos, getTodoById, updateTodo, deleteTodo } = require("../controllers/Todos");
const router = express.Router();


router.get("/todos", getAllTodos);

router.post("/todos", createTodos);

router.get("/todos/:id", getTodoById);

router.patch("/todos/:id", updateTodo);

router.delete("/todos/:id", deleteTodo);

module.exports = router;
