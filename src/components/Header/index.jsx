import React, { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { GiHamburgerMenu } from "react-icons/gi";
import { MdOutlineClose } from "react-icons/md";
import { MyContext } from "../../App";
import Navigation from "./Navigation";

const mainMenuItems = [
  { name: "Home", path: "/" },
  { name: "Become a Member", path: "/become-member" },
  { name: "Submit Photo", path: "/my-account/:userId" },
  { name: "Community", path: "/bloglisting" },
  { name: "About Us", path: "/about" },
];

const Header = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [anchorEl, setAnchorEl] = useState(false);
  const context = useContext(MyContext);
  const navigate = useNavigate();

  const handleMobileMenuToggle = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  const handleMobileLinkClick = () => {
    setIsMobileMenuOpen(false);
    window.location.reload();
  };



  // Handle "My Account" click
  const handleMyAccountClick = () => {
    navigate("/my-account/${userData?._id}");
    window.location.reload();
  };

  const handleLogoClick = () => {
    navigate("/");
    window.location.reload();
  };

  return (
    <header className="sticky top-0 bg-gray-900 z-10">
      <div className="flex items-center justify-between px-4 py-3">
        {/* Mobile Menu Button */}
        <div className="md:hidden">
  <button
    onClick={handleMobileMenuToggle} // Changed from setAnchorEl
    className="text-white hover:text-gray-300 px-2 py-4"
  >
    <GiHamburgerMenu size={24} />
  </button>
</div>
        {/* Logo */}
        <Link to="/" className="flex-grow md:flex-grow-0">
          <img
            onClick={handleLogoClick}
            src="https://res.cloudinary.com/dac4gsvh0/image/upload/v1743168381/momentogray-900_vabn1x.jpg"
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
              <button className="text-white font-semi-bold">
              <Link
              
                to="/login"
                className="hidden md:inline-block px-4 py-2"
              >
                Login
                
              </Link>
              </button>
              <button className="text-white font-semi-bold">
              <Link
                to="/register"
                className="hidden md:inline-block px-4 py-2"
              >
                Register
              </Link>
              </button>
            </div>
          )}
        </div>
      </div>
      {isMobileMenuOpen && (
  <div className="md:hidden fixed inset-0 bg-gray-900 z-50 pt-16">
    <div className="container mx-auto px-4">
      {/* Menu Header with Close Icon */}
      <div className="flex justify-between items-center pb-4 border-b border-gray-700">
        <h2 className="text-white text-xl font-bold">Menu</h2>
        <button
          onClick={() => setIsMobileMenuOpen(false)}
          className="text-white text-2xl p-2 hover:bg-gray-800 rounded-full"
        >
          <MdOutlineClose />
        </button>
      </div>

      {/* Menu Items */}
      <ul className="space-y-4 pt-4">
        {mainMenuItems.map((item) => (
          <li key={item.name}>
            <Link
              to={item.path}
              className="text-white font-serif block py-3 text-lg hover:bg-gray-800 px-4 rounded"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              {item.name}
            </Link>
          </li>
        ))}
        {context.isLogin && (
          <>
            <li>
              <Link
                to="/my-account"
                className="text-white block py-3 text-lg hover:bg-gray-800 px-4 rounded"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                My Account
              </Link>
            </li>
            <li>
              <button
                onClick={() => {
                  context.logout();
                  setIsMobileMenuOpen(false);
                }}
                className="text-white block w-full py-3 text-lg hover:bg-gray-800 px-4 rounded text-left"
              >
                Logout
              </button>
            </li>
          </>
        )}
      </ul>
    </div>
  </div>
)}



      {/* Navigation Component */}
      <Navigation mainMenuItems={mainMenuItems} />
    </header>
  );
};

export default Header;