const { User } = require("../models");

exports.getAllUsers = async (req, res) => {
  try {
    const userData = await User.findAll();
    return res.status(200).json({
      success: true,
      data: userData,
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

exports.createUser = async (req, res) => {
  try {
    const { fullName, email, password } = req.body;
    const createOnDb = await User.create({
      fullName,
      email,
      password,
    });
    return res.status(200).json({
      success: true,
      message: "User created successfully",
      data: createOnDb,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      success: false,
      message: "Error creating User",
      error,
    });
  }
};

exports.getUserById = async (req, res) => {
  try {
    const id = req.params.id;

    const getUserById = await User.findOne(body, {
      where: { id: id },
    });
    return res.status(200).json({
      success: true,
      message: "User found",
      data: getUserById,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      success: false,
      message: "Error finding User",
      error,
    });
  }
};
