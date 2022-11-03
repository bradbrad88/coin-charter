import NavItem from "./NavItem";

const NavBar = ({ close }) => {
  return (
    <nav className="flex gap-3 flex-col lg:flex-row text-white lg:text-gray-900">
      <NavItem path={"/"} title={"Home"} onClick={close} />
      <NavItem path={"/friends"} title={"Friends"} onClick={close} />
      <NavItem path={"/charts"} title={"Charts"} onClick={close} />
      <NavItem path={"/dashboard"} title={"Dashboard"} onClick={close} />
      {/*temporary in here while dev */}
      <NavItem path={"/coin"} title={"Coin"} onClick={close} />
      <NavItem path="/login" title={"Login"} onClick={close} />
    </nav>
  );
};

export default NavBar;
