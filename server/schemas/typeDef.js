const { gql } = require("apollo-server-express");

const typeDefs = gql`
  scalar DateTime

  type User {
    _id: ID
    username: String
    subTitle: String
    email: String
    bio: String
    comments: [Comment]
    friends: [Friend]
    receivedFriendRequests: [FriendRequest]
    friendCount: Int
    postCount: Int
    favCoins: [FavouriteCoin]
    favCoinCount: Int
    charts: [Chart]
    chartCount: Int
    image: String
  }

  type Friend {
    friend: User
    createdAt: String
  }

  type FavouriteCoin {
    coin: Coin
    createdAt: String
  }

  type FriendRequest {
    userId: String
    username: String
    image: String
    bio: String
    subTitle: String
    createdAt: String
  }

  type Activity {
    id: ID
    username: String
    createdAt: String
    text: String
    value: String
    path: String
    image: String
  }

  type Comment {
    _id: ID
    commentText: String
    createdAt: DateTime
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
    coinId: String
    coinName: String
    symbol: String
    chartTitle: String
    chartDescription: String
    username: String!
    userId: String
    imageThumbnail: String
    imageMedium: String
    imageSmall: String
    chartComments: [Comment]
    upVotes: [User]
    downVotes: [User]
    createdAt: DateTime!
  }

  type Query {
    users: [User]
    comments: [Comment]
    coins: [Coin]
    charts: [Chart]
    user(id: ID!): User
    comment(comment: ID!): Comment
    coin(coinId: String!): Coin
    chart(chartId: ID!): Chart
    searchUsers(query: String!): [User]
    friendRequests: [FriendRequest]
    friends: [Friend]
    recentActivity: [Activity]
  }

  type Mutation {
    addUser(username: String!, password: String!, email: String!): User
    loginUser(username: String!, password: String!): User
    logoutUser: Boolean
    addImage(image: String!): String
    addBio(bio: String!): String
    addCoin(
      coinId: String!
      coinName: String!
      symbol: String!
      image: String!
    ): User
    removeCoin(coinId: String!): User
    addChart(
      coinId: String!
      coinName: String!
      symbol: String!
      chartTitle: String
      chartDescription: String
      username: String
      userId: String
      imageThumbnail: String
      imageMedium: String
      imageSmall: String
    ): Chart
    upVoteChart(id: ID!, vote: Boolean): Chart
    downVoteChart(id: ID!, vote: Boolean): Chart
    sendFriendRequest(
      friendId: ID!
      userId: ID!
      username: String!
      image: String
      bio: String
      subTitle: String
    ): Boolean
    acceptFriendRequest(friendId: ID!): User
    declineFriendRequest(friendId: ID!): Boolean
  }
`;

module.exports = typeDefs;
