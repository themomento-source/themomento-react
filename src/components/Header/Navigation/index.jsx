import React, { useState, useContext } from "react";
import { Link, useNavigate } from "react-router-dom"; // Import useNavigate
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
  const navigate = useNavigate(); 

  const mainMenuItems = [
    { name: "Home", path: "/" },
    
    { name: "Become a Member", path: "/become-member" },
    { name: "Submit Photo", path: "/my-account" },
    { name: "Community", path: "/bloglisting" },
    { name: "About Us", path: "/about" },
  ];

  const mobileMenuItems = [
    { name: "Photos", icon: <BsCamera />, path: "/photolisting" },
    { name: "Community", icon: <BsNewspaper />, path: "/bloglisting" },
    { name: "Account", icon: <BsPerson />, path: "/login" },
  ];

  // Function to handle Home button click
  const handleHomeClick = () => {
    navigate("/"); // Navigate to the home page
    window.location.reload(); // Reload the page
  };

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
                    {item.name === "Home" ? (
                      // Use a Button with onClick for Home
                      <Button
                        onClick={handleHomeClick}
                        className="!text-gray-700 !capitalize hover:!text-red-500"
                      >
                        {item.name}
                      </Button>
                    ) : (
                      // Use Link for other buttons
                      <Button
                        component={Link}
                        to={item.path}
                        className="!text-gray-700 !capitalize hover:!text-red-500"
                      >
                        {item.name}
                      </Button>
                    )}
                    {item.hasSubmenu && (
                      <div className="absolute hidden group-hover:block top-full left-0 w-48 bg-white shadow-lg rounded-lg py-2">
                        {/* Submenu items */}
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
    </>
  );
};

export default Navigation;