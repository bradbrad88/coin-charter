import { Link } from "react-router-dom";
import NavBar from "./NavBar";
import HamburgerButton from "./HamburgerButton";
import { useState, useEffect } from "react";
import SearchBar from "./SearchBar";
import { TbArrowBackUp } from "react-icons/tb";
import logo from "src/assets/logo.png";

const Header = () => {
  const [hideNav, setHideNav] = useState(true);
  useEffect(() => {
    const onResize = () => {
      setHideNav(true);
    };
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, []);
  return (
    <div className="flex lg:justify-between justify-center p-5 border-b relative">
      <div className="flex lg:hidden absolute left-0 pl-5">
        <HamburgerButton onClick={() => setHideNav(false)} />
      </div>
      <Link to={"/"} className="center">
        <div>
          <img src={logo} alt="logo" className="h-20" />
        </div>
      </Link>
      <div
        className={`${
          hideNav ? "" : "translate-x-full"
        } fixed overflow-hidden top-0 bottom-0 left-[-100vw] right-[100vw] transition-transform bg-white lg:relative lg:flex lg:translate-x-0 lg:transition-none lg:left-0`}
      >
        <div className="flex flex-col gap-3 bg-indigo-800 bg-opacity-80 p-6 h-full w-full lg:p-0 lg:bg-white">
          <div className="flex lg:hidden">
            <button
              className="ml-auto translate-x-2 -translate-y-2"
              onClick={() => setHideNav(true)}
            >
              <TbArrowBackUp color="white" size={24} />
            </button>
          </div>
          <div className="flex flex-col lg:flex-row-reverse gap-5 lg:items-center">
            <SearchBar />
            <NavBar close={() => setHideNav(true)} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Header;
