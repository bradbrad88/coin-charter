import "dotenv/config";
import * as url from "url";
import path from "path";
import { createServer } from "http";
import { WebSocketServer } from "ws";
import { ApolloServer } from "@apollo/server";
import { useServer } from "graphql-ws/lib/use/ws";
import db from "./config/connection.js";
import express from "express";
import { expressMiddleware } from "@apollo/server/express4";
import {
  gqlAuthMiddleware as context,
  wsAuthMiddleware,
} from "./utils/auth.js";
import cors from "cors";
import bodyParser from "body-parser";
import cookieParser from "cookie-parser";
import { ApolloServerPluginDrainHttpServer } from "@apollo/server/plugin/drainHttpServer";
import { makeExecutableSchema } from "@graphql-tools/schema";
import { resolvers, typeDefs } from "./schemas/index.js";
import router from "./routes/index.js";

// __dirname does not exist in ESM ecmascript modules - recreate with the following:
const __dirname = url.fileURLToPath(new URL(".", import.meta.url));

// Create express app
const app = express();

// Create a http server that handles express app as well as websocket connection required for subscriptions
const httpServer = createServer(app);

// Create web socket server to handle subscription events over graphql
const wsServer = new WebSocketServer({
  server: httpServer,
  path: "/graphql",
});

// Default to port 3001 if not port specified in env variables
const PORT = process.env.PORT || 3001;

// Define express app middleware
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "../client/dist")));

// Create Apollo schema from typeDefs and resolvers
const schema = makeExecutableSchema({ typeDefs, resolvers });

// Handle graceful shutdown of webserver
const serverCleanup = useServer(
  { schema, context: wsAuthMiddleware },
  wsServer,
);

// Create Apollo server with typeDefs, resolvers and context middleware
const graphqlServer = new ApolloServer({
  schema,
  plugins: [
    ApolloServerPluginDrainHttpServer({ httpServer }),
    {
      async serverWillStart() {
        return {
          async drainServer() {
            await serverCleanup.dispose();
          },
        };
      },
    },
  ],
});

// Apollo server must be started before passing to expressMiddleware
await graphqlServer.start();

// Serve graphql queries
app.use(
  "/graphql",
  cors(),
  bodyParser.json(),
  expressMiddleware(graphqlServer, { context }),
);

// Serve the custom api routes
app.use(router);

// Serve the react client
app.get("*", (req, res) => {
  const file = path.join(__dirname, "../client/dist/index.html");
  res.sendFile(file);
});

await db.$connect();

httpServer.listen({ port: PORT }, () =>
  console.log("Server listening on port ", PORT),
);
