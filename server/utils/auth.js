const jwt = require("jsonwebtoken");

const secret = process.env.JWT_SECRET;

if (!secret) throw new Error("JWT_SECRET missing from server .env file");

const expiration = "2h";

module.exports = {
  authMiddleware: function ({ req, res }) {
    let token =
      req.body.token ||
      req.query.token ||
      req.headers.authorization ||
      req.cookies.token;

    if (req.headers.authorization) {
      token = token.split(" ").pop().trim();
    }

    if (!token) {
      return req;
    }

    try {
      const { data } = jwt.verify(token, secret, { maxAge: expiration });
      req.user = data;
    } catch {
      res.clearCookie("token");
      console.log("Invalid token");
    }

    return req;
  },
  signToken: function ({ _id }) {
    const payload = { _id };
    return jwt.sign({ data: payload }, secret, { expiresIn: expiration });
  },
};
