import React, { useState, useContext } from "react";
import { Link } from "react-router-dom";
import {
  Box,
  Button,
  useMediaQuery,
  useTheme,
  IconButton,
} from "@mui/material";
import { BsPerson } from "react-icons/bs";
import { GiHamburgerMenu } from "react-icons/gi";
import { BsCamera, BsGrid, BsNewspaper } from "react-icons/bs";

import { MyContext } from "../../../App";
import "../Navigation/style.css";

const Navigation = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));
  const [isOpenCatPanel, setIsOpenCatPanel] = useState(false);
  const context = useContext(MyContext);

  const mainMenuItems = [
    { name: "Home", path: "/" },
    { name: "Photographer's Gallery", path: "/gallery", hasSubmenu: true },
    { name: "Event", path: "/Event" },
    { name: "About", path: "/about" },
    { name: "Become a Member", path: "/become-member" },
  ];

  const mobileMenuItems = [
  
    { name: "Photos", icon: <BsCamera />, path: "/photolisting" },
    { name: "Blog", icon: <BsNewspaper />, path: "/bloglisting" },
    { name: "Account", icon: <BsPerson />, path: "/login" },
  ];

  return (
    <>
      {/* Desktop Navigation */}
      <nav className="hidden md:block py-2 bg-white shadow-sm">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between">
           

            <div className="flex-1 flex justify-center">
              <ul className="flex items-center gap-4">
                {mainMenuItems.map((item) => (
                  <li key={item.name} className="relative group">
                    <Button
                      component={Link}
                      to={item.path}
                      className="!text-gray-700 !capitalize hover:!text-red-500"
                    >
                      {item.name}
                    </Button>
                    {item.hasSubmenu && (
                      <div className="absolute hidden group-hover:block top-full left-0 w-48 bg-white shadow-lg rounded-lg py-2">
                        {/* Submenu items */}
                      </div>
                    )}
                  </li>
                ))}
              </ul>
            </div>

            <div className="flex items-center gap-2">
              <Button
                component={Link}
                to="/bloglisting"
                className="!text-gray-700 !capitalize hover:!text-red-500"
              >
                Blog
              </Button>
              <Button
                component={Link}
                to="/photolisting"
                className="!text-gray-700 !capitalize hover:!text-red-500"
              >
                Photos
              </Button>
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
                <IconButton
                  component={item.path ? Link : "button"}
                  to={item.path}
                  onClick={item.action}
                  className="!text-gray-600 hover:!text-red-500"
                >
                  {item.icon}
                </IconButton>
                <span className="text-xs">{item.name}</span>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Category Panel */}
      
    </>
  );
};

export default Navigation;