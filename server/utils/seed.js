// Import connection, models and seed data
const connection = require("../config/connection");
const { Users } = require("../models");
const { userSeed } = require("./data");

connection.on("error", (err) => err);

// Create connection and load seed data into the models
connection.once("open", async () => {
  console.log("Connected");

  // Drop any existing documents from models
  await Users.deleteMany({});

  // Insert new dataseed into models
  await Users.collection.insertMany(userSeed);

  console.log("Seed complete");
});
