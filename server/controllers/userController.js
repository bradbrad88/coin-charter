// Import models and methods
const { ObjectId } = require("mongoose").Types;
const { Users } = require("../models");

// '/users'
// Get all Users
const getUsersAll = (req, res) => {
  Users.find()
    .then(async (users) => {
      const usersObj = {
        users,
      };
      return res.json(usersObj);
    })
    .catch((err) => {
      console.log(err);
      return res.status(500).json(err);
    });
};

// Post User
const postUser = (req, res) => {
  Users.create(req.body)
    .then((user) => res.json(user))
    .catch((err) => res.status(500).json(err));
};

// '/users/:userId
const getUser = (req, res) => {
  Users.findOne({ _id: req.params.userId })
    .select("-__v")
    .then(async (user) => {
      !user
        ? res.status(404).json({ message: "No user with this ID" })
        : res.json(user);
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json(err);
    });
};

module.exports = {
  getUsersAll,
  getUser,
  postUser,
};
