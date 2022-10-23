// Import routes and methods
const router = require("express").Router();
const {
  getUsersAll,
  getUser,
  postUser,
} = require("../../controllers/userController");

// '/api/users
router.route("/").get(getUsersAll).post(postUser);

// '/api/user/:userId'
router.route("/:userId").get(getUser);

module.exports = router;
