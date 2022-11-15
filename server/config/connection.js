require("dotenv").config();
const { connect, connection } = require("mongoose");

// On deployment will check for environment variable, if not then local
// const connectionString =
const url =
  process.env.MONGODB_URI || "mongodb://127.0.0.1:27017/coinCharterDB";

// Create connection to MongoDB
connect(url, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

module.exports = connection;
