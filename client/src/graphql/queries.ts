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
