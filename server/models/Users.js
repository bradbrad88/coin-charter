// Import Mongoose methods
const { Schema, model } = require("mongoose");

// setup validators here

// coins favourites can be subdoc of Users
// Favourite coins schema

// Users schema
const userSchema = new Schema({
  username: {
    type: String,
    unique: true,
    required: true,
    trim: true,
    maxLength: [15, "Too long, needs to be under 15 characters"],
  },
  // optional if we want email and then can add email validator
  email: {
    type: String,
    unique: true,
    required: true,
    //validate with validator method above
    // match with regex
  },
  bio: {
    type: String,
    required: false,
    maxLength: [250, "Too long, needs to be under 250 characters"],
  },
});
