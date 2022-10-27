const { gql } = require("apollo-server-express");

const typeDefs = gql`
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
