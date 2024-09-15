import React from "react";
import { Link, useLocation } from "react-router-dom";
import { IoMdPerson } from "react-icons/io";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { UserActions } from "../store/userSlice";

const Header = () => {
  const location = useLocation();
  const currentPath = location.pathname;
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const userData = useSelector((state) => state.user.user);

  const navItems = [
    { id: 1, name: "Browse", icon: null, link: "/" },
    { id: 2, name: "About", icon: null, link: "/about" },
    { id: 3, name: "Join Us", icon: null, link: "/join" },
    { id: 4, name: "Login", icon: IoMdPerson, link: "/login" },
  ];

  const navItems1 = [
    { id: 1, name: "Browse", icon: null, link: "/" },
    { id: 3, name: "Wallet", icon: null, link: "/wallet" },
    { id: 4, name: "Profile", icon: IoMdPerson, link: "/profile" },
  ];

  const logout = () => {
    localStorage.removeItem("token");
    dispatch(UserActions.removeUser());
    navigate("/login");
  };

  return (
    <div className="fixed top-0 bg-white shadow-md z-10 w-full flex items-center justify-between gap-2 px-4 md:px-6 py-2">
      <Link to="/">
        <img src="/logo.svg" alt="logo" className="h-[20px]" />
      </Link>
      <div className="flex items-center gap-3 py-2 gap-x-10">
        {userData ? (
          <>
            {navItems1.map(({ id, name, icon: Icon, link }) => (
              <Link to={link} key={id}>
                <div
                  className={`font-semibold text-lg flex items-center gap-2 cursor-pointer relative hover:text-[#EF375C] text-[1.15rem] ${
                    currentPath === link ? "text-[#EF375C]" : "text-black"
                  }`}
                >
                  {Icon && <Icon />}
                  <span>{name}</span>
                </div>
              </Link>
            ))}
            <div
              className={`font-semibold text-lg flex items-center gap-2 cursor-pointer relative hover:text-[#EF375C] text-[1.15rem]`}
              onClick={logout}
            >
              <span>Logout</span>
            </div>
          </>
        ) : (
          <>
            {navItems.map(({ id, name, icon: Icon, link }) => (
              <Link to={link} key={id}>
                <div
                  className={`font-semibold text-lg flex items-center gap-2 cursor-pointer relative hover:text-[#EF375C] text-[1.15rem] ${
                    currentPath === link ? "text-[#EF375C]" : "text-black"
                  }`}
                >
                  {Icon && <Icon />}
                  <span>{name}</span>
                </div>
              </Link>
            ))}
          </>
        )}
      </div>
    </div>
  );
};

export default Header;
