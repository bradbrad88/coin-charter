const { gql } = require("apollo-server-express");

//TODO change around models and then change queries to match

const typeDefs = gql`
  type Users {
    _id: ID
    username: String
    subTitle: String
    email: String
    bio: String
    comments: [Comments]
    friends: [Users]
    favCoins: [String]
  }

  type Query {
    users: [Users]
    comments: [Comments]
    coins: [Coins]
    charts: [Charts]
    user(user: ID!): Users
    comment(comment: ID!): Comments
    coin: Coins
    chart: Charts
  }
`;

module.exports = typeDefs;
