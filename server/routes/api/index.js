const router = require("express").Router();

const { expressAuthMiddleware } = require("../../utils/auth");
const userRouter = require("./user");

const authUser = (req, res, next) => {
  const { user } = req;
  const { userId } = req.params;
  if (user._id !== userId) {
    return res.sendStatus(401);
  }
  next();
};

router.use("/user/:userId", expressAuthMiddleware, authUser, userRouter);

module.exports = router;
