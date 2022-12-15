// const router = require("express").Router();
import { Router } from "express";
import apiRoute from "./api/index.js";
const router = Router();

router.use("/api", apiRoute);

// module.exports = route;
export default router;
