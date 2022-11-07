import NavItem from "./NavItem";
import useUserContext from "contexts/UserContext";

const NavBar = ({ close }) => {
  const { logoutUser, isLoggedIn } = useUserContext();
  const Logout = () => {
    logoutUser();
    close();
  };
  return (
    <nav className="flex gap-3 flex-col lg:flex-row text-white lg:text-gray-900">
      <NavItem path={"/"} title={"Home"} onClick={close} />
      <NavItem path={"/charts"} title={"Charts"} onClick={close} />
      {/* TEMPORARY*/}
      <NavItem path={"/chart"} title={"chart"} onClick={close} />
      {/*temporary in here while dev */}
      {/* <NavItem path={"/coin"} title={"Coin"} onClick={close} /> */}
      {isLoggedIn && (
        <>
          <NavItem path={"/profile"} title={"Profile"} onClick={close} />
          <NavItem path={"/friends"} title={"Friends"} onClick={close} />
          <NavItem
            path="/"
            title={"Logout"}
            onClick={Logout}
            disableActiveStyling
          />
        </>
      )}
      {!isLoggedIn && <NavItem path="/login" title={"Login"} onClick={close} />}
    </nav>
  );
};

export default NavBar;
