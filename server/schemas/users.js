export const typeDef = `
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
`;
