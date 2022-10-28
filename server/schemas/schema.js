import { typeDef as Users } from "./users";
import { typeDef as Comments } from "./comments";
import { typeDef as Coins } from "./coins";
import { typeDef as Charts } from "./charts";

const Query = `
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

makeExecutableSchema({
  typeDefs: [Query, Users, Comments, Coins, Charts],
  resolvers: {},
});
