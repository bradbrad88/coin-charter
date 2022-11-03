import createCtx from "./index";

interface User {
  username: string;
  email: string;
  bio: string;
  subTitle: string;
}

interface Ctx {
  user: User;
}

const [useCtx, Provider] = createCtx<Ctx>();

export { Provider };

export default useCtx;
