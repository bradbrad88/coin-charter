import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import useUserContext from "contexts/UserContext";
import FormField from "common/FormField";
import Button from "common/Button";

const Login = () => {
  const [formState, setFormState] = useState({ username: "", password: "" });
  const { isLoggedIn, loginUser } = useUserContext();
  const nav = useNavigate();

  // If the user is already logged in then navigate to dashboard
  useEffect(() => {
    if (isLoggedIn) nav("/profile");
  }, [isLoggedIn]);

  const inputChange: React.ChangeEventHandler<HTMLInputElement> = (e) => {
    setFormState((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  };

  const onLogin: React.PointerEventHandler<HTMLButtonElement> = (e) => {
    loginUser({ ...formState });
  };

  return (
    <div className="p-3 md:w-96 md:mx-auto">
      <div className="flex justify-between">
        <h2 className="text-lg font-bold">Login</h2>
      </div>
      <form className="flex flex-col gap-3">
        <FormField
          label="Username"
          name="username"
          onChange={inputChange}
          value={formState.username}
          placeholder="Username..."
        />
        <FormField
          label="Password"
          name="password"
          type="password"
          onChange={inputChange}
          value={formState.password}
          placeholder="Password..."
        />
        <Button onClick={onLogin}>Login</Button>
        <div>
          Don't already have an account?{" "}
          <Link
            to={"/signup"}
            className="hover:text-indigo-700 transition-colors font-bold"
          >
            Sign Up
          </Link>
        </div>
      </form>
    </div>
  );
};

export default Login;
