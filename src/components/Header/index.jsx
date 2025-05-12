import React, { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { GiHamburgerMenu } from "react-icons/gi";
import { MdOutlineClose } from "react-icons/md";
import { MyContext } from "../../App";
import Navigation from "./Navigation";

const mainMenuItems = [
  { name: "Home", path: "/" },
  { name: "Become a Member", path: "/become-member" },
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

  { name: "Photos", path: "/photolisting" },


  { name: "About Us", path: "/about" },
];

const Header = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [openSubmenu, setOpenSubmenu] = useState(null);
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

  const handleSubmenuToggle = (menuItemName) => {
    setOpenSubmenu((current) => (current === menuItemName ? null : menuItemName));
  };


  // Handle "My Account" click
  const handleMyAccountClick = () => {
    navigate(`/my-account/${context.userData?._id}`);
    window.location.reload();
  };

  const handleLogoClick = () => {
    navigate("/");
    window.location.reload();
  };

  return (
    <header className="sticky top-0 bg-gray-50 z-10">
      <div className="flex items-center justify-between px-4 py-3">
        {/* Mobile Menu Button */}
        <div className="md:hidden">
  <button
    onClick={handleMobileMenuToggle} 
    className="text-gray-900 hover:text-gray-300 px-2 py-4"
  >
    <GiHamburgerMenu size={24} />
  </button>
</div>
        {/* Logo */}
        <Link to="/" className="flex-grow md:flex-grow-0">
          <img
            onClick={handleLogoClick}
            src="https://res.cloudinary.com/dac4gsvh0/image/upload/v1745945392/TheMomentoiLOGO_qxjbh4_2be1b8.jpg"
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
                  className="h-8 w-8 rounded-full border-white border-[2px]"
                />
              </button>

              {anchorEl && (
                <div className="absolute right-0 mt-2 w-40 bg-black shadow-md rounded-md overflow-hidden z-10">
                  <button
                    onClick={handleMyAccountClick}
                    className="block w-full px-4 py-2 text-left text-black bg-gray-50 hover:!bg-gray-100"
                  >
                    My Account
                  </button>
                  <hr className="border-gray-200" />
                  {/* <button
                    onClick={context.logout}
                    className="block w-full px-4 py-2 text-left text-black bg-gray-50 hover:!bg-gray-100"
                  >
                    Logout
                  </button> */}
                </div>
              )}
            </div>
          ) : (
            <div className="flex gap-2">
              <button className="text-gray-900 font-semi-bold">
              <Link
              
                to="/login"
                className="hidden md:inline-block px-2 py-1 font-optima hover:bg-amber-400"
              >
                Login
                
              </Link>
              </button>
              <button className="text-gray-900 font-semi-bold">
              <Link
                to="/register"
                className="hidden md:inline-block px-2 py-1 font-optima hover:bg-amber-700"
              >
                Register
              </Link>
              </button>
            </div>
          )}
        </div>
      </div>
      {isMobileMenuOpen && (
  <div className="md:hidden fixed inset-0 bg-gray-50 z-50 pt-16">
    <div className="container mx-auto px-4">
      {/* Menu Header with Close Icon */}
      <div className="flex justify-between items-center pb-4 border-b border-gray-50">
        <h2 className="text-gray-900 text-xl font-bold">Menu</h2>
        <button
          onClick={() => setIsMobileMenuOpen(false)}
          className="text-black text-2xl p-2 hover:bg-gray-800 rounded-full"
        >
          <MdOutlineClose />
        </button>
      </div>


      <ul className="space-y-4 pt-4">
  {mainMenuItems.map((item) => {

    const path = item.name === "Submit Photo"
      ? context.isLogin
        ? `/my-account/${context.userData?._id}`
        : "/login"
      : item.path;

    return (
      <li key={item.name}>
        {item.hasSubmenu ? (
          <div
            className="flex justify-between items-center text-black font-serif py-3 text-lg  px-4 rounded cursor-pointer"
            onClick={() => handleSubmenuToggle(item.name)}
          >
            <span>{item.name}</span>
            <span>{openSubmenu === item.name ? "-" : "+"}</span>
          </div>
        ) : (
          <Link
            to={path}
            className="flex justify-between items-center text-black font-serif py-3 text-lg  px-4 rounded cursor-pointer"
            onClick={() => setIsMobileMenuOpen(false)}
          >
            <span>{item.name}</span>
          </Link>
        )}

        {item.submenu && openSubmenu === item.name && (
          <ul className="ml-6">
            {item.submenu.map((subItem) => (
              <li key={subItem.name}>
                <Link
                  to={subItem.path}
                  className="text-gray-900 block py-2 text-md px-4 font-optima"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  {subItem.name}
                </Link>
              </li>
            ))}
          </ul>
        )}
      </li>


    );
  })}
  {context.isLogin && (
    <>
     <li>
<Link
to={`/my-account/${context.userData?._id}`}
className="text-black font-pt-serif block py-3 text-lg  px-4 rounded"
onClick={() => setIsMobileMenuOpen(false)}
>
My Account
</Link>
</li>
      <li>
        {/* <Link
          onClick={() => {
            context.logout();
            setIsMobileMenuOpen(false);
          }}
          className="text-black font-pt-serif block w-full py-3 text-lg px-4 rounded text-left"
        >
          Logout
        </Link> */}
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