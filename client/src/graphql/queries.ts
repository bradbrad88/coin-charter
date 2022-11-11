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
        coin {
          _id
          coinId
          coinName
          symbol
          image
        }
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
          coin {
            _id
            coinId
            coinName
            symbol
            image
          }
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
        coin {
          _id
          coinId
          coinName
          symbol
          image
        }
      }
      friends {
        friend {
          _id
          username
          subTitle
          bio
          image
          friendCount
          postCount
          favCoins {
            coin {
              _id
              coinId
              coinName
              symbol
              image
            }
          }
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

export const QUERY_COIN_CHART = gql`
  query GetCoinChart($coinId: String!) {
    coin(coinId: $coinId) {
      coinCharts {
        _id
        coinId
        coinName
        symbol
        chartTitle
        chartDescription
        username
        userId
        imageThumbnail
        imageMedium
        imageSmall
        upVotes
        downVotes
        chartComments {
          _id
          commentText
          createdAt
        }
      }
    }
  }
`;

export const QUERY_ALL_COIN_CHARTS = gql`
  query GetCoinCharts($coinId: String!) {
    coin(coinId: $coinId) {
      coinCharts {
        _id
        chartTitle
        downVotes
        upVotes
        username
        userId
        imageSmall
        createdAt
        coinId
        coinName
      }
    }
  }
`;

export const QUERY_CHART = gql`
  query Query($chartId: ID!) {
    chart(chartId: $chartId) {
      _id
      coinId
      coinName
      symbol
      chartTitle
      chartDescription
      username
      userId
      imageThumbnail
      imageMedium
      imageSmall
      chartComments {
        _id
        commentText
        createdAt
      }
      upVotes
      downVotes
      createdAt
    }
  }
`;

export const QUERY_ALL_CHARTS = gql`
  query QueryAllCharts {
    charts {
      _id
      coinId
      coinName
      symbol
      chartTitle
      chartDescription
      username
      userId
      imageThumbnail
      imageMedium
      imageSmall
      upVotes
      downVotes
      createdAt
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
        coin {
          symbol
          image
          coinName
          coinId
          _id
        }
      }
    }
  }
`;

export const REMOVE_COIN = gql`
  mutation RemoveCoin($coinId: String!) {
    removeCoin(coinId: $coinId) {
      favCoins {
        coin {
          symbol
          image
          coinName
          coinId
          _id
        }
      }
    }
  }
`;

export const ADD_CHART = gql`
  mutation addChart(
    $coinId: String!
    $coinName: String!
    $symbol: String!
    $chartTitle: String!
    $chartDescription: String!
    $imageThumbnail: String!
    $imageMedium: String!
    $imageSmall: String!
  ) {
    addChart(
      coinId: $coinId
      coinName: $coinName
      symbol: $symbol
      chartTitle: $chartTitle
      chartDescription: $chartDescription
      imageThumbnail: $imageThumbnail
      imageMedium: $imageMedium
      imageSmall: $imageSmall
    ) {
      coinId
      coinName
      symbol
      chartTitle
      chartDescription
      username
      userId
      imageThumbnail
      imageMedium
      imageSmall
    }
  }
`;

export const GET_FRIEND_REQUESTS = gql`
  query FriendRequests {
    friendRequests {
      createdAt
      image
      subTitle
      userId
      username
    }
  }
`;

export const ACCEPT_FRIEND_REQUEST = gql`
  mutation AcceptFriendRequest($friendId: ID!) {
    acceptFriendRequest(friendId: $friendId) {
      friends {
        friend {
          _id
          username
          subTitle
          bio
          image
          friendCount
          postCount
        }
      }
    }
  }
`;

export const SEND_FRIEND_REQUEST = gql`
  mutation SendFriendRequest(
    $friendId: ID!
    $userId: ID!
    $username: String!
    $image: String
    $bio: String
    $subTitle: String
  ) {
    sendFriendRequest(
      friendId: $friendId
      userId: $userId
      username: $username
      image: $image
      bio: $bio
      subTitle: $subTitle
    )
  }
`;

export const DECLINE_FRIEND_REQEST = gql`
  mutation DeclineFriendRequest($friendId: ID!) {
    declineFriendRequest(friendId: $friendId)
  }
`;

export const GET_FRIENDS = gql`
  query Friends {
    friends {
      friend {
        _id
        username
        subTitle
        email
        bio
        friends {
          friend {
            _id
            image
            subTitle
            username
            bio
          }
        }
        friendCount
        postCount
        chartCount
        favCoinCount
        favCoins {
          coin {
            _id
            coinName
            coinId
            symbol
            image
          }
        }
        charts {
          _id
          coinId
          coinName
          symbol
          chartTitle
          chartDescription
          username
          imageThumbnail
          imageMedium
          imageSmall
          upVotes
          downVotes
        }
        image
      }
    }
  }
`;

export const FRIEND_ACTIVITY = gql`
  query FriendActivity {
    recentActivity {
      id
      username
      createdAt
      text
      value
      path
      image
    }
  }
`;
