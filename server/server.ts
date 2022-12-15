require("dotenv").config();
const path = require("path");
const { createServer } = require("http");
const { WebSocketServer } = require("ws");
const { ApolloServer } = require("@apollo/server");
const { useServer } = require("graphql-ws/lib/use/ws");
const db = require("./config/connection");
const express = require("express");
const { expressMiddleware } = require("@apollo/server/express4");
const { gqlAuthMiddleware, wsAuthMiddleware } = require("./utils/auth");
const cors = require("cors");
const { json } = require("body-parser");
const {
  ApolloServerPluginDrainHttpServer,
} = require("@apollo/server/plugin/drainHttpServer");
const { makeExecutableSchema } = require("@graphql-tools/schema");
const { typeDefs, resolvers } = require("./schemas");
const router = require("./routes");

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
app.use(require("cookie-parser")());
app.use(express.static(path.join(__dirname, "../client/dist")));

// Function for starting the apollo server
const startApolloServer = async (typeDefs, resolvers, context) => {
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
    await new Promise((resolve) => httpServer.listen({ port: PORT }, resolve));
    console.log(`Server listening on port ${PORT}`);
  });
};

startApolloServer(typeDefs, resolvers, gqlAuthMiddleware);
