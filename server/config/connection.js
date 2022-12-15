import "dotenv/config";

import { PrismaClient } from "@prisma/client";

import applyMiddleware from "../utils/prisma-middleware.js";

const prisma = new PrismaClient({ log: ["query"] });

applyMiddleware(prisma);

export default prisma;
