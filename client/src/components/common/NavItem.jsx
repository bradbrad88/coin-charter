import { Link, useLocation } from "react-router-dom";

const NavItem = ({ title, path, onClick }) => {
  const location = useLocation();
  const active = location.pathname.split("/")[1] === path.replace("/", "");
  return (
    <Link
      className={`hover:translate-x-1 transition-all duration-300 ${
        active ? "" : ""
      }`}
      to={path}
      onClick={onClick}
    >
      <div className={`w-fit ${active ? "border-b" : ""}`}>{title}</div>
    </Link>
  );
};

export default NavItem;
