import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import FormField from "common/FormField";
import Button from "common/Button";
import useUserCtx from "src/contexts/UserContext";

const Signup = () => {
  const [formState, setFormState] = useState({
    username: "",
    password: "",
    email: "",
  });

  const { signUpUser, loading, user } = useUserCtx();
  const nav = useNavigate();

  useEffect(() => {
    if (user) {
      nav("/profile");
    }
  }, [user]);

  const inputChange: React.ChangeEventHandler<HTMLInputElement> = (e) => {
    setFormState((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  };

  const onLogin: React.PointerEventHandler<HTMLButtonElement> = (e) => {
    console.log(formState);
    e.preventDefault();
    signUpUser({ ...formState });
  };

  return (
    <div className="p-3 md:w-96 md:mx-auto">
      <div className="flex justify-between">
        <h2 className="text-lg font-bold">Signup</h2>
      </div>
      <form className="flex flex-col gap-3">
        <FormField
          label="Choose a username"
          name="username"
          onChange={inputChange}
          value={formState.username}
          placeholder="Username..."
        />
        <FormField
          label="Provide your email address"
          name="email"
          onChange={inputChange}
          value={formState.email}
          placeholder="Email address..."
        />
        <FormField
          label="Create a secure password"
          name="password"
          onChange={inputChange}
          value={formState.password}
          placeholder="Password..."
          type="password"
        />
        <Button onClick={onLogin} loading={loading}>
          Create Account
        </Button>
      </form>
    </div>
  );
};

export default Signup;
