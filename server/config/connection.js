require("dotenv").config();
const { PrismaClient } = require("@prisma/client");
const applyMiddleware = require("../utils/prisma-middleware");

const prisma = new PrismaClient({ log: ["query"] });

applyMiddleware(prisma);

module.exports = prisma;
