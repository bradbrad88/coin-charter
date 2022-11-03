import { useEffect, useState } from "react";
import createCtx from "./index";
import { useMutation } from "@apollo/client";
import { ADD_USER } from "src/graphql/queries";

interface Ctx {
  user: User | null;
  loginUser: (newUser: User) => void;
  logoutUser: () => void;
  signUpUser: (newUser: NewUser) => void;
  loading: boolean;
}
interface User {
  _id: string;
  username: string;
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
  const [addUser, { data, loading }] = useMutation(ADD_USER);

  useEffect(() => {
    localStorage.setItem("user", JSON.stringify(user));
  }, [user]);

  useEffect(() => {
    if (data) {
      loginUser(data.addUser);
    }
  }, [data]);

  const loginUser = (newUser: User) => {
    setUser(newUser);
  };

  const logoutUser = () => {
    setUser(null);
  };

  const signUpUser = (newUser: NewUser) => {
    console.log(newUser);
    addUser({ variables: { ...newUser } });
  };

  return (
    <UserProvider value={{ user, loginUser, logoutUser, signUpUser, loading }}>
      {children}
    </UserProvider>
  );
};

export default useCtx;
