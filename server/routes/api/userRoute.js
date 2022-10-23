// Import routes and methods
const router = require("express").Router();
const {
  getUsersAll,
  getUser,
  postUser,
  updateUser,
  deleteUser,
} = require("../../controllers/userController");

// '/api/users
router.route("/").get(getUsersAll).post(postUser);

// '/api/user/:userId'
router.route("/:userId").get(getUser).put(updateUser).delete(deleteUser);

module.exports = router;
