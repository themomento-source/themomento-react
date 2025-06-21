import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { MyContext } from "../../../App";

const Navigation = ({ menuItems }) => {
  const context = useContext(MyContext);
  const [openSubmenu, setOpenSubmenu] = React.useState(null);

  const handleSubmenuToggle = (menuItemName) => {
    setOpenSubmenu((current) => (current === menuItemName ? null : menuItemName));
  };
  
  return (
    <nav className="hidden md:flex items-center space-x-6">
      {menuItems.map((item) => {
        const path =
          item.name === "Submit Photos"
            ? context.isLogin
              ? `/my-account/${context.userData?._id}`
              : "/login"
            : item.path;

        return (
          <div key={item.name} className="relative group">
            <Link
              to={path}
              className="text-gray-700 font-semibold hover:text-amber-500 transition-colors px-3 py-2"
              onMouseEnter={() => item.hasSubmenu && handleSubmenuToggle(item.name)}
              onMouseLeave={() => item.hasSubmenu && handleSubmenuToggle(null)}
            >
              {item.name}
            </Link>
            {item.hasSubmenu && openSubmenu === item.name && (
              <div className="absolute top-full left-0 mt-1 bg-white shadow-lg rounded-md w-48 z-20">
                {item.submenu.map((subItem) => (
                  <Link
                    key={subItem.name}
                    to={subItem.path}
                    className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                  >
                    {subItem.name}
                  </Link>
                ))}
              </div>
            )}
          </div>
        );
      })}
    </nav>
  );
};

export default Navigation;