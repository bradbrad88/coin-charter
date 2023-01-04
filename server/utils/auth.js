import jwt from "jsonwebtoken";

const secret = process.env.JWT_SECRET;
const TOKEN_AGE = 1000 * 60 * 60 * 24;

if (!secret) throw new Error("JWT_SECRET missing from server .env file");

const expiration = "24h";

const authMiddleware = (req, res) => {
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
};

export const gqlAuthMiddleware = ({ req, res }) => {
  authMiddleware(req, res);
  return req;
};

export const expressAuthMiddleware = (req, res, next) => {
  authMiddleware(req, res);
  if (!req.user) return res.sendStatus(401);
  next();
};

export const wsAuthMiddleware = (ctx) => {
  // Set connectionParams in link on client then access them on ctx.connectionParams

  return { user: null };
};

export const signToken = ({ id }) => {
  const payload = { id };
  return jwt.sign({ data: payload }, secret, { expiresIn: expiration });
};

export const setCookie = (res, token) => {
  res.cookie("token", token, {
    httpOnly: true,
    maxAge: TOKEN_AGE,
  });
};
