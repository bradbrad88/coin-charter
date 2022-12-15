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
import { gqlAuthMiddleware, wsAuthMiddleware } from "./utils/auth.js";
import cors from "cors";
import bodyParser from "body-parser";
import cookieParser from "cookie-parser";
import { ApolloServerPluginDrainHttpServer } from "@apollo/server/plugin/drainHttpServer";
import { makeExecutableSchema } from "@graphql-tools/schema";
import { typeDefs, resolvers } from "./schemas/index.js";
import router from "./routes/index.js";

const __dirname = url.fileURLToPath(new URL(".", import.meta.url));
const { json } = bodyParser;

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

app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "../client/dist")));

// Function for starting the apollo server
const startApolloServer = async (
  typeDefs: any,
  resolvers: any,
  context: any,
) => {
  //
  const schema = makeExecutableSchema({ typeDefs, resolvers });

  // Handle  shutdown of webserver
  const serverCleanup = useServer(
    { schema, context: wsAuthMiddleware },
    wsServer,
  );

  // Create apollo server with typeDefs, resolvers and context middleware
  const server = new ApolloServer({
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
  await server.start();

  // Serve graphql queries
  app.use("/graphql", cors(), json(), expressMiddleware(server, { context }));

  // Serve the custom api routes
  app.use(router);

  // Serve the react client
  app.get("*", (req, res) => {
    const file = path.join(__dirname, "../client/dist/index.html");
    res.sendFile(file);
  });

  db.$connect().then(async () => {
    await new Promise((resolve: any) =>
      httpServer.listen({ port: PORT }, resolve),
    );
    console.log(`Server listening on port ${PORT}`);
  });
};

startApolloServer(typeDefs, resolvers, gqlAuthMiddleware);
