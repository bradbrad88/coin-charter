import { Link } from "react-router-dom";
import NavBar from "./NavBar";
import HamburgerButton from "./HamburgerButton";
import { useState, useEffect } from "react";
import { TbArrowBackUp } from "react-icons/tb";
import SearchBar from "features/search/SearchBar";
import logo from "src/assets/logo.png";
import invertLogo from "src/assets/logo small invert.png";

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
    <div className="flex lg:justify-between justify-center p-5 border-b relative gap-5">
      <div className="flex lg:hidden absolute left-0 top-7 pl-5">
        <HamburgerButton onClick={() => setHideNav(false)} />
      </div>
      <Link to={"/"} className="">
        <div>
          <img src={logo} alt="logo" className="h-8 sm:h-20" />
        </div>
      </Link>
      <div
        className={`${
          hideNav ? "" : "translate-x-full"
        } fixed top-0 bottom-0 left-[-100vw] right-[100vw] transition-transform bg-white w-full lg:relative lg:flex lg:translate-x-0 lg:transition-none lg:left-0`}
      >
        <div className="flex lg:items-end flex-col lg:flex-row gap-3 bg-indigo-800 bg-opacity-80 p-6 h-full w-full lg:justify-between lg:p-0 lg:bg-white">
          <div className="absolute w-full left-0 top-3 flex justify-center lg:hidden">
            <img src={invertLogo} alt="inverted logo" className="h-10" />
          </div>
          <div className="flex lg:hidden">
            <button
              className="ml-auto translate-x-2 -translate-y-2"
              onClick={() => setHideNav(true)}
            >
              <TbArrowBackUp color="white" size={24} />
            </button>
          </div>
          <div className="w-full lg:px-10">
            <SearchBar closeSidebar={() => setHideNav(true)} />
          </div>
          <div className="flex flex-col lg:flex-row-reverse gap-5 lg:items-center">
            <NavBar close={() => setHideNav(true)} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Header;
