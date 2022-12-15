import { useState } from "react";
import useUserContext from "contexts/UserContext";
import FormField from "common/FormField";
import Button from "common/Button";

const Password = () => {
  const [formState, setFormState] = useState({ email: "", password: "" });
  const { loginUser } = useUserContext();

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
    <form className="flex flex-col gap-3">
      <FormField
        label="Email"
        name="email"
        onChange={inputChange}
        value={formState.email}
        placeholder="Email..."
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
    </form>
  );
};

export default Password;
