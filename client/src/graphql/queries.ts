import { gql } from "@apollo/client";

export const ADD_USER = gql`
  mutation AddUser($username: String!, $password: String!, $email: String!) {
    addUser(username: $username, password: $password, email: $email) {
      _id
      username
      email
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
