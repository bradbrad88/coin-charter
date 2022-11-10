import { useEffect, useState } from "react";
import { useMutation } from "@apollo/client";
import {
  ADD_USER,
  LOGIN_USER,
  LOGOUT_USER,
  ADD_PROFILE_IMAGE,
  ADD_BIO,
  ADD_FRIEND,
  ADD_COIN,
  REMOVE_COIN,
} from "src/graphql/queries";
import createCtx from "./index";
import useFetch from "hooks/useFetch";

import type { Crop } from "react-image-crop";
import type { Config } from "hooks/useFetch";

interface Ctx {
  user: User | null;
  isLoggedIn: boolean;
  loading: boolean;
  loginUser: ({
    username,
    password,
  }: {
    username: string;
    password: string;
  }) => void;
  logoutUser: () => void;
  signUpUser: (newUser: NewUser) => void;
  updateImage: (image: File, crop: Crop) => void;
  addBio: (bio: string) => void;
  addFriend: (friendId: string) => void;
  addCoin: (coin: Coin) => void;
  removeCoin: (coinId: string) => void;
}

export interface User {
  _id: string;
  username: string;
  subTitle: string;
  bio: string;
  friendCount: number;
  postCount: number;
  image?: string;
  friends: User[];
  favCoins: Coin[];
}

interface Coin {
  coinId: string;
  coinName: string;
  symbol: string;
  image: string;
}

interface Prototypes {
  children: React.ReactNode;
}

interface NewUser {
  username: string;
  email: string;
  password: string;
}

const localUser = JSON.parse(localStorage.getItem("user") as string) || null;
const [useCtx, UserProvider] = createCtx<Ctx>();

export const Provider = ({ children }: Prototypes) => {
  const [user, setUser] = useState<User | null>(localUser);
  const { postRequest } = useFetch();
  const [logoutUserMutation] = useMutation(LOGOUT_USER);
  const [addUser, { data: signupData, loading }] = useMutation(ADD_USER);
  const [loginUserMutation, { data: loginData }] = useMutation(LOGIN_USER);
  const [addProfileImage, { data: imageData }] = useMutation(ADD_PROFILE_IMAGE);
  const [addBioMutation, { data: bioData }] = useMutation(ADD_BIO);
  const [addFriendMutation, { data: friendData }] = useMutation(ADD_FRIEND);
  const [addCoinMutation, { data: coinData }] = useMutation(ADD_COIN);
  const [removeCoinMutation, { data: removeCoinData }] =
    useMutation(REMOVE_COIN);

  // Update local storage with user state data whenever it changes
  useEffect(() => {
    localStorage.setItem("user", JSON.stringify(user));
  }, [user]);

  // If the signup-data from signup mutation changes then update user state
  useEffect(() => {
    if (signupData) {
      authenticateUser(signupData.addUser);
    }
  }, [signupData]);

  // If the login-data from login mutation changes then update user state
  useEffect(() => {
    if (loginData) {
      authenticateUser(loginData.loginUser);
    }
  }, [loginData]);

  // If the image-data from image mutation changes then update user state
  useEffect(() => {
    if (imageData) {
      setUser((prevState) => {
        if (!prevState) return null;
        return {
          ...prevState,
          // The appended query string forces an image reload as the src string changes
          image: (imageData.addImage + "?time=" + Date.now()) as string,
        };
      });
    }
  }, [imageData]);

  // If the bio-data from bio mutation changes then update user state
  useEffect(() => {
    if (bioData) {
      setUser((prevState) => {
        if (!prevState) return null;
        return {
          ...prevState,
          bio: bioData.addBio,
        };
      });
    }
  }, [bioData]);

  // If the friend-data from friend mutation changes then update user state
  useEffect(() => {
    if (friendData) {
      setUser((prevState) => {
        if (!prevState) return null;
        return {
          ...prevState,
          friendCount: friendData.addFriend.friendCount,
          friends: friendData.addFriend.friends,
        };
      });
    }
  }, [friendData]);

  useEffect(() => {
    if (coinData) {
      setUser((prevState) => {
        if (!prevState) return null;
        return {
          ...prevState,
          favCoins: coinData.addCoin.favCoins,
        };
      });
    }
  }, [coinData]);

  useEffect(() => {
    if (removeCoinData) {
      setUser((prevState) => {
        if (!prevState) return null;
        return {
          ...prevState,
          favCoins: removeCoinData.removeCoin.favCoins,
        };
      });
    }
  }, [removeCoinData]);

  // Helper function
  const authenticateUser = (user: User) => {
    setUser(user);
  };

  // Function exposed to context consumer for logging in
  const loginUser = ({
    username,
    password,
  }: {
    username: string;
    password: string;
  }) => {
    loginUserMutation({ variables: { username, password } });
  };

  // Function exposed to context consumer for logging out
  const logoutUser = () => {
    logoutUserMutation();
    setUser(null);
  };

  // Function exposed to context consumer for signing up
  const signUpUser = (newUser: NewUser) => {
    addUser({ variables: { ...newUser } });
  };

  // Function exposed to context consumer for updating image
  const updateImage = async (image: File, crop: Crop) => {
    const data = new FormData();
    data.append("image", image);
    data.append("crop", JSON.stringify(crop));
    const req: Config = {
      data,
      url: `/api/user/${user?._id}/upload-image`,
    };
    const res = await postRequest<{ url: string }>(req);
    if (!res) {
      logoutUser();
      return;
    }

    addProfileImage({ variables: { image: res.url } });
    setUser((prevState: any) => ({ ...prevState, image: res.url }));
    // Reset the image in http cache
    fetch(res.url, { cache: "reload", mode: "no-cors" });
  };

  const addBio = (bio: string) => {
    addBioMutation({ variables: { bio } });
  };

  const addFriend = (friendId: string) => {
    addFriendMutation({ variables: { friendId } });
  };

  const addCoin = (coin: Coin) => {
    addCoinMutation({ variables: { ...coin } });
  };

  const removeCoin = (coinId: string) => {
    removeCoinMutation({ variables: { coinId } });
  };

  // Property exposed to context consumer for checking if a user exists in state
  const isLoggedIn = !!user;

  return (
    <UserProvider
      value={{
        user,
        loginUser,
        logoutUser,
        signUpUser,
        loading,
        isLoggedIn,
        updateImage,
        addBio,
        addFriend,
        addCoin,
        removeCoin,
      }}
    >
      {children}
    </UserProvider>
  );
};

export default useCtx;
