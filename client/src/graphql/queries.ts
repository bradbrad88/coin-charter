import { gql } from "@apollo/client";

export const ADD_USER = gql`
  mutation AddUser($username: String!, $password: String!, $email: String!) {
    addUser(username: $username, password: $password, email: $email) {
      _id
      username
      subTitle
      bio
      image
      friendCount
      postCount
      favCoins {
        _id
        coinId
        coinName
        symbol
        image
      }
      friends {
        _id
        username
        subTitle
        bio
        image
        friendCount
        postCount
        favCoins {
          _id
          coinId
          coinName
          symbol
          image
        }
      }
    }
  }
`;

export const LOGIN_USER = gql`
  mutation loginUser($username: String!, $password: String!) {
    loginUser(username: $username, password: $password) {
      _id
      username
      subTitle
      bio
      image
      friendCount
      postCount
      favCoins {
        _id
        coinId
        coinName
        symbol
        image
      }
      friends {
        _id
        username
        subTitle
        bio
        image
        friendCount
        postCount
        favCoins {
          _id
          coinId
          coinName
          symbol
          image
        }
      }
    }
  }
`;

export const LOGOUT_USER = gql`
  mutation LogoutUser {
    logoutUser
  }
`;

export const ADD_PROFILE_IMAGE = gql`
  mutation addImage($image: String!) {
    addImage(image: $image)
  }
`;

export const ADD_BIO = gql`
  mutation addBio($bio: String!) {
    addBio(bio: $bio)
  }
`;

export const ADD_FRIEND = gql`
  mutation addFriend($friendId: ID!) {
    addFriend(friendId: $friendId) {
      _id
      username
      subTitle
      bio
      image
      friendCount
      postCount
    }
  }
`;

export const QUERY_USERS = gql`
  query getUsers {
    users {
      _id
      username
      bio
      subTitle
    }
  }
`;

export const SEARCH_USERS = gql`
  query searchUsers($query: String!) {
    searchUsers(query: $query) {
      _id
      username
      subTitle
      image
    }
  }
`;

export const QUERY_USER = gql`
  query getUser($id: ID!) {
    user(id: $id) {
      _id
      username
      subTitle
      bio
      image
      friendCount
      postCount
      favCoins {
        _id
        coinId
        coinName
        symbol
        image
      }
    }
  }
`;

export const ADD_COIN = gql`
  mutation AddCoin(
    $coinId: String!
    $coinName: String!
    $symbol: String!
    $image: String!
  ) {
    addCoin(
      coinId: $coinId
      coinName: $coinName
      symbol: $symbol
      image: $image
    ) {
      favCoins {
        symbol
        image
        coinName
        coinId
        _id
      }
    }
  }
`;

export const REMOVE_COIN = gql`
  mutation RemoveCoin($coinId: String!) {
    removeCoin(coinId: $coinId) {
      favCoins {
        symbol
        image
        coinName
        coinId
        _id
      }
    }
  }
`;

export const ADD_CHART = gql`
  mutation addChart(
    $coinId: String!
    $coinName: String!
    $chartDescription: String!
    $imageThumbnail: String!
    $imageMedium: String!
    $imageSmall: String!
  ) {
    addChart(
      coinId: $coinId
      coinName: $coinName
      chartDescription: $chartDescription
      imageThumbnail: $imageThumbnail
      imageMedium: $imageMedium
      imageSmall: $imageSmall
    ) {
      coinId
      coinName
      chartDescription
      imageThumbnail
      imageMedium
      imageSmall
    }
  }
`;
