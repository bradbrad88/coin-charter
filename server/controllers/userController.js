// Import models and methods
const { ObjectId } = require("mongoose").Types;
const { Users } = require("../models");

// '/users'
// Get all Users
const getUsersAll = async (req, res) => {
  try {
    const usersAll = await Users.find();
    !usersAll
      ? res.status(404).json({ message: "Could not get users." })
      : res.json(usersAll);
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
};

// Post User
const postUser = async (req, res) => {
  try {
    const createUser = await Users.create(req.body);
    !createUser
      ? res.status(404).json({ message: "Could not create user." })
      : res.json(createUser);
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
};

// '/users/:userId
// Get singular User
const getUser = async (req, res) => {
  try {
    const findUser = await Users.findOne({ _id: req.params.userId });
    !findUser
      ? res.status(404).json({ message: "Could not find user." })
      : res.status(200).json(findUser);
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
};

// Update singular User
const updateUser = async (req, res) => {
  try {
    const updatedUser = await Users.findOneAndUpdate(
      { _id: req.params.userId },
      { username: req.body.username, email: req.body.email, bio: req.body.bio },
      { new: true },
    );
    !updatedUser
      ? res.status(404).json({ message: "Could not update user." })
      : res.status(200).json(updatedUser);
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
};

// Delete singular User
const deleteUser = async (req, res) => {
  try {
    const deletedUser = await Users.findOneAndDelete({
      _id: req.params.userId,
    });
    !deletedUser
      ? res.status(404).json({ message: "Could not delete user." })
      : res.status(200).json(deletedUser);
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
};

module.exports = {
  getUsersAll,
  getUser,
  postUser,
  updateUser,
  deleteUser,
};
