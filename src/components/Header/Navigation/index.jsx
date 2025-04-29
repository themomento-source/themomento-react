import React, { useState, useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  
  useMediaQuery,
  useTheme,
} from "@mui/material";
import { BsPerson } from "react-icons/bs";

import { BsCamera } from "react-icons/bs";
import { FaPhotoVideo } from "react-icons/fa";
import { MyContext } from "../../../App";
import "../Navigation/style.css";

const Navigation = ({ mainMenuItems }) => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));
  const navigate = useNavigate();
  const context = useContext(MyContext);

  const mobileMenuItems = [
    { name: "Photos", icon: <BsCamera />, path: "/photolisting" },
    { name: "Submit Photo ", icon: <FaPhotoVideo />, path: context.isLogin ? `/my-account/${context.userData?._id}` : "/login" },
    { name: "Account", icon: <BsPerson />, path: context.isLogin ? `/my-account/${context.userData?._id}` : "/login" },
  ];

  const handleHomeClick = () => {
    navigate("/");
    window.location.reload();
  };

  return (
    <>
      {/* Desktop Navigation */}
      <nav className="hidden md:block py-2 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between">
            <div className="flex-1 flex justify-center">
              <ul className="flex items-center gap-4">
                {mainMenuItems.map((item) => (
                  <li key={item.name} className="relative group">
                    {item.name === "Home" ? (
                      <button
                        onClick={handleHomeClick}
                        className="text-gray-900 text-[18px] hover:!bg-amber-400 px-2 py-2 font-pt-serif 
                        bg-transparent border-none cursor-pointer transition-colors duration-200"
                      >
                        {item.name}
                      </button>
                    ) : (
                      <Link
                        to={item.path}
                        className="text-gray-900 capitalize text-[18px] hover:bg-amber-400 px-2 py-2 font-pt-serif  no-underline inline-block transition-colors duration-200"
                      >
                        {item.name}
                      </Link>
                    )}
                    {item.hasSubmenu && (
                      <div className="absolute hidden group-hover:block top-full left-0 w-48 bg-gray-50 shadow-lg rounded-lg py-2">
                        {item.submenu.map((subItem) => (
                          <Link
                            key={subItem.name}
                            to={subItem.path}
                            className="block px-4 py-2 text-gray-900 hover:bg-amber-400 font-serif capitalize transition-colors duration-200"
                          >
                            {subItem.name}
                          </Link>
                        ))}
                      </div>
                    )}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </nav>

      {/* Mobile Bottom Navigation */}
      {isMobile && (
        <div className="mobile-bottom-nav fixed bottom-0 left-0 right-0 bg-white border-t shadow-lg z-50 md:hidden">
          <div className="flex justify-around items-center h-full">
            {mobileMenuItems.map((item) => (
              <div key={item.name} className="flex flex-col items-center">
                <Link
                  to={item.path}
                  className="!text-gray-900 hover:!bg-amber-200 flex flex-col items-center p-2 rounded-full transition-colors duration-200"
                >
                  {item.icon}
                </Link>
                <span className="text-xs !text-gray-900 font-serif capitalize">
                  {item.name}
                </span>
              </div>
            ))}
          </div>
        </div>
      )}
    </>
  );
};

export default Navigation;