const route = require("express").Router();
const apiRoute = require("./api");

route.use("/api", apiRoute);

module.exports = route;
