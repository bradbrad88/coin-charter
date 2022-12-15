import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import useUserContext from "contexts/UserContext";
import Password from "src/components/features/login/Password";
import SignupLink from "src/components/features/login/SignupLink";
import GoogleOAuth from "src/components/features/login/GoogleOAuth";
import MagicLink from "src/components/features/login/MagicLink";

const Login = () => {
  const { isLoggedIn } = useUserContext();
  const nav = useNavigate();

  // If the user is already logged in then navigate to dashboard
  useEffect(() => {
    if (isLoggedIn) nav("/profile");
  }, [isLoggedIn]);

  return (
    <div className="flex flex-col p-3 md:w-96 md:mx-auto gap-3">
      <h2 className="text-lg font-bold -mb-2">Login</h2>
      <MagicLink />
      <Or />
      <GoogleOAuth />
      <Or />
      <Password />
      <SignupLink />
    </div>
  );
};

const Or = () => {
  return (
    <div className="relative my-3">
      <hr />
      <span className="bg-white absolute left-1/2 -translate-x-1/2 top-1/2 -translate-y-1/2 px-5 text-slate-300">
        or
      </span>
    </div>
  );
};

export default Login;
