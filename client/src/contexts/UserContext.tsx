import { useEffect, useState } from "react";
import { useMutation } from "@apollo/client";
import { ADD_USER, LOGOUT_USER, ADD_PROFILE_IMAGE } from "src/graphql/queries";
import createCtx from "./index";
import useFetch from "hooks/useFetch";

import type { Crop } from "react-image-crop";
import type { Config } from "hooks/useFetch";

interface Ctx {
  user: User | null;
  isLoggedIn: boolean;
  loading: boolean;
  loginUser: (user: User) => void;
  logoutUser: () => void;
  signUpUser: (newUser: NewUser) => void;
  updateImage: (image: File, crop: Crop) => void;
}
interface User {
  _id: string;
  username: string;
  image?: string;
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
  const [addUser, { data: signupData, loading }] = useMutation(ADD_USER);
  const [logoutUserMutation] = useMutation(LOGOUT_USER);
  const [addProfileImage, { data: imageData }] = useMutation(ADD_PROFILE_IMAGE);
  const { postRequest } = useFetch();

  useEffect(() => {
    localStorage.setItem("user", JSON.stringify(user));
  }, [user]);

  useEffect(() => {
    if (signupData) {
      loginUser(signupData.addUser);
    }
  }, [signupData]);

  useEffect(() => {
    if (imageData)
      setUser((prevState) => {
        if (!prevState) return null;
        return {
          ...prevState,
          image: imageData.addImage as string,
        };
      });
  }, [imageData]);

  const loginUser = (user: User) => {
    setUser(user);
  };

  const logoutUser = () => {
    logoutUserMutation();
    setUser(null);
  };

  const signUpUser = (newUser: NewUser) => {
    console.log(newUser);
    addUser({ variables: { ...newUser } });
  };

  const updateImage = async (image: File, crop: Crop) => {
    const data = new FormData();
    data.append("image", image);
    data.append("crop", JSON.stringify(crop));
    const req: Config = {
      data,
      url: `/api/user/${user?._id}/upload-image`,
    };
    const res = await postRequest<{ url: string }>(req);
    if (!res) return;

    addProfileImage({ variables: { image: res.url } });
    setUser((prevState: any) => ({ ...prevState, image: res.url }));
  };

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
      }}
    >
      {children}
    </UserProvider>
  );
};

export default useCtx;
