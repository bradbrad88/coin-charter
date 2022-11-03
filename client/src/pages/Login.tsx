import FormField from "common/FormField";
import { useState } from "react";
import Button from "common/Button";
import { Link } from "react-router-dom";

const Login = () => {
  const [formState, setFormState] = useState({ username: "", password: "" });

  const inputChange: React.ChangeEventHandler<HTMLInputElement> = (e) => {
    setFormState((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  };

  const onLogin: React.PointerEventHandler<HTMLButtonElement> = (e) => {
    console.log("login");
  };

  return (
    <div className="p-3 md:w-96 md:mx-auto">
      <div className="flex justify-between">
        <h2 className="text-lg font-bold">Login</h2>
        <Link
          to={"/signup"}
          className="bg-lime-400 border-[1px] border-lime-600 bg-opacity-70 py-1 px-2 rounded-sm hover:bg-opacity-100 transition-colors "
        >
          Create a new account
        </Link>
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
          onChange={inputChange}
          value={formState.password}
          placeholder="Password..."
        />
        <Button onClick={onLogin}>Login</Button>
      </form>
    </div>
  );
};

export default Login;
