const { todos } = require("../models");
exports.getAllTodos = async (req, res) => {
  try {
    let todoData = await todos.findAll();

    return res.status(200).json({
      success: true,
      data: todoData,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      success: false,
      message: "Server Error",
      error,
    });
  }
};

exports.createTodos = async (req, res) => {
  try {
    const { text } = req.body;

    const createOnDb = await todos.create({
      text,
    });
    return res.status(200).json({
      success: true,
      message: "todos created successfully",
      data: createOnDb,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      success: false,
      message: "Error finding todo",
      error,
    });
  }
};

exports.getTodoById = async (req, res) => {
  try {
    const id = req.params.id;

    const getTodoById = await todos.findOne({
      where: { id: id },
    });
    return res.status(200).json({
      success: true,
      message: "todos found",
      data: getTodoById,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      success: false,
      message: "Error finding one todo",
      error,
    });
  }
};

exports.updateTodo = async (req, res) => {
  try {
    const id = req.params.id;

    const { body } = req;

    const updateTodo = await todos.update(body, {
      where: { id: id },
    });

    return res.status(200).json({
      success: true,
      message: "todos updated",
      data: updateTodo,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      success: false,
      message: "Error Updating todo",
      error,
    });
  }
};

exports.deleteTodo = async (req, res) => {
  try {
    const id = req.params.id;

    const deleteTodo = await todos.destroy({
      where: { id: id },
    });

    return res.status(200).json({
      success: true,
      message: "todos deleted",
      data: deleteTodo,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      success: false,
      message: "Error Deleting one todo",
      error,
    });
  }
};
