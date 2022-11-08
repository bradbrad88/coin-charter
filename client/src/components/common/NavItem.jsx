import { Link, useLocation } from "react-router-dom";

const NavItem = ({ title, path, onClick, disableActiveStyling }) => {
  const location = useLocation();
  const active =
    location.pathname.split("/")[1] === path.replace("/", "") &&
    !disableActiveStyling;
  return (
    <Link
      className={`transition-all duration-300 lg:hover:text-primary lg:hover:underline ${
        active ? "" : ""
      }`}
      to={path}
      onClick={onClick}
    >
      <div
        className={`w-fit ${
          active
            ? "border-b lg:border-none lg:scale-110 lg:text-primary lg:font-medium"
            : ""
        }`}
      >
        {title}
      </div>
    </Link>
  );
};

export default NavItem;
