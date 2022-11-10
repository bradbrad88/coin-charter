const { gql } = require("apollo-server-express");

// TODO create a scalar for date type

const typeDefs = gql`
  type User {
    _id: ID
    username: String
    subTitle: String
    email: String
    bio: String
    comments: [Comment]
    friends: [User]
    friendCount: Int
    postCount: Int
    favCoins: [Coin]
    image: String
  }

  type Comment {
    _id: ID
    commentText: String
    createdAt: String
    username: User
  }

  type Coin {
    _id: ID
    coinName: String
    coinId: String
    symbol: String
    image: String
    coinComments: [Comment]
    coinCharts: [Chart]
  }

  type Chart {
    _id: ID
    coinId: Coin
    coinName: String
    chartDescription: String
    chartComments: [Comment]
  }

  type Query {
    users: [User]
    comments: [Comment]
    coins: [Coin]
    charts: [Chart]
    user(id: ID!): User
    comment(comment: ID!): Comment
    coin(coin: ID!): Coin
    chart(chart: ID!): Chart
    searchUsers(query: String!): [User]
  }

  type Mutation {
    addUser(username: String!, password: String!, email: String!): User
    loginUser(username: String!, password: String!): User
    logoutUser: Boolean
    addImage(image: String!): String
    addBio(bio: String!): String
    addFriend(friendId: ID!): User
    addCoin(
      coinId: String!
      coinName: String!
      symbol: String!
      image: String!
    ): User
    removeCoin(coinId: String!): User
  }
`;

module.exports = typeDefs;
