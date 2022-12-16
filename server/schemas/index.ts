import { readFileSync } from "fs";
import resolvers from "./resolvers.js";

const typeDefs = readFileSync("./schemas/schema.graphql", {
  encoding: "utf-8",
});

export { resolvers, typeDefs };
