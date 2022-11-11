require("dotenv").config();
const express = require("express");
const { ApolloServer } = require("apollo-server-express");
const path = require("path");
const db = require("./config/connection");
const { typeDefs, resolvers } = require("./schemas");
const { gqlAuthMiddleware } = require("./utils/auth");
const router = require("./routes");

// Create express app
const app = express();

// Default to port 3001 if not port specified in env variables
const PORT = process.env.PORT || 3001;

app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(require("cookie-parser")());

if (process.env.NODE_ENV === "production") {
  app.use(express.static(path.join(__dirname, "../client/dist")));
}

// Serve the custom api routes
app.use(router);

// Serve the react client
app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "../client/dist/index.html"));
});

// Function for starting the apollo server
const startApolloServer = async (typeDefs, resolvers, context) => {
  // Create apollo server with typeDefs, resolvers and context middleware
  const server = new ApolloServer({
    typeDefs,
    resolvers,
    context,
  });

  await server.start();

  server.applyMiddleware({ app });

  // Once db connection has been established, set the app to listen on specified port
  db.once("open", () => {
    app.listen(PORT, () => {
      console.log(`API server running on port ${PORT}!`);
      console.log(
        `Use GraphQL at http://localhost:${PORT}${server.graphqlPath}`,
      );
    });
  });
};

startApolloServer(typeDefs, resolvers, gqlAuthMiddleware);
