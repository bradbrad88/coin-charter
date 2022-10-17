import NavItem from "./NavItem";
import { Link } from "react-router-dom";

const Header = () => {
  return (
    <div className="flex justify-between p-5 border mt-8">
      <Link to={"/"}>
        <h1 className="text-5xl pl-72">Coin Charter</h1>
      </Link>
      <nav className="self-end flex gap-5 pr-72">
        <NavItem path={"/"} title={"Home"} />
        <NavItem path={"/friends"} title={"Friends"} />
        <NavItem path={"/charts"} title={"Charts"} />
        <NavItem path={"/dashboard"} title={"Dashboard"} />
      </nav>
    </div>
  );
};

export default Header;
