import { Link, useLocation } from "react-router-dom";

const NavItem = ({ title, path }) => {
  const location = useLocation();
  const active = location.pathname.split("/")[1] === path.replace("/", "");
  return (
    <Link
      className={`hover:text-indigo-600 hover:opacity-80 transition-colors ${
        active ? "text-xl" : ""
      }`}
      to={path}
    >
      {title}
    </Link>
  );
};

export default NavItem;
