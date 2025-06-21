import React, { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { GiHamburgerMenu } from "react-icons/gi";
import { MdOutlineClose } from "react-icons/md";
import { MyContext } from "../../App";
import Navigation from "./Navigation";
import SearchBar from "../SearchBar";

const mainMenuItems = [
  { name: "Home", path: "/" },
  { name: "Photos", path: "/photolisting" },
  { name: "Submit Photos", path: "/my-account/:userId" },
  
  { 
    name: "Community", 
    path: "/bloglisting",
    hasSubmenu: true,
    submenu: [
      { name: "Learn", path: "/learning" },
      { name: "Interview", path: "/interview" },
      { name: "Blog", path: "/general-blog" }
    ]
  },

  // { name: "Photos", path: "/photolisting" },


  { name: "About Us", path: "/about" },
];

const Header = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [openSubmenu, setOpenSubmenu] = useState(null);
  const [anchorEl, setAnchorEl] = useState(false);
  const context = useContext(MyContext);
  const navigate = useNavigate();

  const handleMobileMenuToggle = () => setIsMobileMenuOpen(!isMobileMenuOpen);
  const handleSubmenuToggle = (menuItemName) => setOpenSubmenu(current => (current === menuItemName ? null : menuItemName));
  const handleMyAccountClick = () => navigate(`/my-account/${context.userData?._id}`);

  return (
    <header className="sticky top-0 bg-white z-20 shadow-sm">
      <div className="container mx-auto flex items-center justify-between px-4 py-3">
        {/* Left Section: Logo */}
        <div className="flex-shrink-0">
          <Link to="/" className="flex items-center">
            <img
              src="https://res.cloudinary.com/dac4gsvh0/image/upload/v1745945392/TheMomentoiLOGO_qxjbh4_2be1b8.jpg"
              className="h-7 lg:h-8 w-auto"
              alt="Logo"
            />
          </Link>
        </div>

        {/* Center Section: Desktop Navigation & Search */}
        <div className="hidden md:flex flex-1 justify-center items-center space-x-8 font-marcellus">
          <Navigation menuItems={mainMenuItems} />
          <div className="w-full max-w-xs lg:max-w-sm">
             <SearchBar />
          </div>
        </div>

        {/* Right Section: User Profile & Mobile Menu Button */}
        <div className="flex-shrink-0 flex items-center gap-4">
          {/* User Profile */}
          <div className="hidden md:flex items-center gap-2">
              {context.isLogin ? (
                  <div className="relative">
                  <button onClick={() => setAnchorEl(!anchorEl)} className="focus:outline-none">
                      <img src={context.userData?.avatar} alt="User Avatar" className="h-9 w-9 rounded-full border-2 border-gray-200 object-cover"/>
                  </button>
                  {anchorEl && (
                      <div className="absolute right-0 mt-2 w-48 bg-white shadow-lg rounded-lg overflow-hidden z-30">
                      <button onClick={handleMyAccountClick} className="block w-full px-4 py-3 text-left text-sm text-gray-700 hover:bg-gray-100">My Account</button>
                      {/* <hr className="border-gray-200" />
                      <button onClick={context.logout} className="block w-full px-4 py-3 text-left text-sm text-gray-700 hover:bg-gray-100">Logout</button> */}
                      </div>
                  )}
                  </div>
              ) : (
                  <>
                  <Link to="/login" className="px-4 py-2 text-sm font-semibold text-gray-700 hover:text-amber-500 transition-colors">Login</Link>
                  <Link to="/register" className="px-5 py-2 text-sm font-semibold text-white bg-amber-500 rounded-md hover:bg-amber-600 transition-colors">Register</Link>
                  </>
              )}
          </div>
          {/* Mobile Menu Button */}
          <div className="md:hidden">
            <button onClick={handleMobileMenuToggle} className="text-gray-800 hover:text-amber-500 p-2">
              <GiHamburgerMenu size={24} />
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu Panel */}
      {isMobileMenuOpen && (
        <div className="md:hidden fixed inset-0 bg-white z-50 p-4">
          <div className="flex justify-between items-center pb-4 border-b">
              <h2 className="text-gray-900 text-xl font-bold">Menu</h2>
              <button onClick={handleMobileMenuToggle} className="text-gray-800 p-2"><MdOutlineClose size={28} /></button>
          </div>
          <div className="mt-6">
              <SearchBar />
          </div>
          <ul className="mt-6 space-y-2">
              {mainMenuItems.map(item => (
                  <li key={item.name}>
                  {item.hasSubmenu ? (
                      <div>
                          <button onClick={() => handleSubmenuToggle(item.name)} className="w-full flex justify-between items-center text-gray-800 font-semibold py-3 px-3 rounded-md hover:bg-gray-100">
                              <span>{item.name}</span>
                              <span>{openSubmenu === item.name ? "-" : "+"}</span>
                          </button>
                          {openSubmenu === item.name && (
                              <ul className="ml-4 mt-1 space-y-1">
                                  {item.submenu.map(subItem => (
                                      <li key={subItem.name}><Link to={subItem.path} className="block text-gray-600 py-2 px-3 rounded-md hover:bg-gray-100" onClick={handleMobileMenuToggle}>{subItem.name}</Link></li>
                                  ))}
                              </ul>
                          )}
                      </div>
                  ) : (
                      <Link to={item.name === "Submit Photos" ? (context.isLogin ? `/my-account/${context.userData?._id}` : "/login") : item.path} className="block text-gray-800 font-semibold py-3 px-3 rounded-md hover:bg-gray-100" onClick={handleMobileMenuToggle}>
                          {item.name}
                      </Link>
                  )}
                  </li>
              ))}
              <li className="border-t pt-4 mt-4 space-y-2">
              {context.isLogin ? (
                  <button onClick={() => { handleMyAccountClick(); handleMobileMenuToggle(); }} className="w-full text-left text-gray-800 font-semibold py-3 px-3 rounded-md hover:bg-gray-100">My Account</button>
              ) : (
                  <>
                      <Link to="/login" className="block text-gray-800 font-semibold py-3 px-3 rounded-md hover:bg-gray-100" onClick={handleMobileMenuToggle}>Login</Link>
                      <Link to="/register" className="block text-gray-800 font-semibold py-3 px-3 rounded-md hover:bg-gray-100" onClick={handleMobileMenuToggle}>Register</Link>
                  </>
              )}
              </li>
          </ul>
        </div>
      )}
    </header>
  );
};

export default Header;