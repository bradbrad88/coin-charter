import { Link } from "react-router-dom";

const SignupLink = () => {
  return (
    <div>
      Don't already have an account?{" "}
      <Link
        to={"/signup"}
        className="hover:text-indigo-700 transition-colors font-bold"
      >
        Sign Up
      </Link>
    </div>
  );
};

export default SignupLink;
