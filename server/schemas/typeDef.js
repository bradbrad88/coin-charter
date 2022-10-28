const { gql } = require("apollo-server-express");

// TODO create a scalar for date type

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

  type Comments {
    _id: ID
    commentText: String
    createdAt: Date
    username: Users
  }

  type Query {
    users: [Users]
    comments: [Comments]
    coins: [Coins]
    charts: [Charts]
    user(user: ID!): Users
    comment(comment: ID!): Comments
    coin(coin: ID!): Coins
    chart(chart: ID!): Charts
  }
`;

module.exports = typeDefs;
