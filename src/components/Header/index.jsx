import React, { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { GiHamburgerMenu } from "react-icons/gi";
import { MyContext } from "../../App";
import Navigation from "./Navigation";

const Header = () => {
  const [anchorEl, setAnchorEl] = useState(false);
  const context = useContext(MyContext);
  const navigate = useNavigate();

  // Handle "My Account" click
  const handleMyAccountClick = () => {
    navigate("/my-account");
    window.location.reload();
  };

  const handleLogoClick = () => {
    navigate("/");
    window.location.reload();
  };

  return (
    <header className="sticky top-0 bg-gradient-to-r from-gray-900 to-black shadow-md z-50">
      <div className="flex items-center justify-between px-4 py-3">
        {/* Mobile Menu Button */}
        <div className="md:hidden">
          <button
            onClick={() => setAnchorEl(!anchorEl)}
            className="text-gray-700 hover:text-black"
          >
            <GiHamburgerMenu size={24} />
          </button>
        </div>

        {/* Logo */}
        <Link to="/" className="flex-grow md:flex-grow-0">
          <img
            onClick={handleLogoClick}
            src="https://res.cloudinary.com/dgob9antb/image/upload/v1742666727/momentoresizeblackbglogo_ucawai.jpg"
            className="h-6 lg:h-8 w-auto cursor-pointer"
            alt="Logo"
          />
        </Link>

        {/* User Profile */}
        <div className="flex items-center gap-4 ml-auto">
          {context.isLogin ? (
            <div className="relative">
              <button
                onClick={() => setAnchorEl(!anchorEl)}
                className="focus:outline-none"
              >
                <img
                  src={context.userData?.avatar}
                  alt="User Avatar"
                  className="h-8 w-8 rounded-full"
                />
              </button>

              {anchorEl && (
                <div className="absolute right-0 mt-2 w-40 bg-white shadow-md rounded-md overflow-hidden z-10">
                  <button
                    onClick={handleMyAccountClick}
                    className="block w-full px-4 py-2 text-left hover:bg-gray-100"
                  >
                    My Account
                  </button>
                  <hr className="border-gray-200" />
                  <button
                    onClick={context.logout}
                    className="block w-full px-4 py-2 text-left hover:bg-gray-100"
                  >
                    Logout
                  </button>
                </div>
              )}
            </div>
          ) : (
            <div className="flex gap-2">
              <Link
                to="/login"
                className="hidden md:inline-block px-4 py-2 border border-gray-300 rounded-md hover:bg-gray-100"
              >
                Login
              </Link>
              <Link
                to="/register"
                className="hidden md:inline-block px-4 py-2 border border-gray-300 rounded-md hover:bg-gray-100"
              >
                Register
              </Link>
            </div>
          )}
        </div>
      </div>

      {/* Navigation Component */}
      <Navigation />
    </header>
  );
};

export default Header;
