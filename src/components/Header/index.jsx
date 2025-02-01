import React, { useContext, useState } from "react";
import { Link } from "react-router-dom";
import Search from "../Search";
import Badge from "@mui/material/Badge";
import { styled } from "@mui/material/styles";
import IconButton from "@mui/material/IconButton";
import { BsCartFill } from "react-icons/bs";
import { FaRegHeart, FaRegUser, FaChevronDown } from "react-icons/fa";
import Tooltip from "@mui/material/Tooltip";
import Navigation from "./Navigation";
import { MyContext } from "../../App";
import { useNavigate } from "react-router-dom";
import { Button, Menu, MenuItem, Divider, Avatar } from "@mui/material";
import { fetchDataFromApi } from "../../utils/api";

const StyledBadge = styled(Badge)(({ theme }) => ({
  "& .MuiBadge-badge": {
    right: -3,
    top: 13,
    border: `2px solid ${theme.palette.background.paper}`,
    padding: "0 4px",
    backgroundColor: theme.palette.secondary.main,
  },
}));

const Header = () => {
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);
  const context = useContext(MyContext);
  const { isLogin } = useContext(MyContext);
  const navigate = useNavigate();

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const logout = () => {
    setAnchorEl(null);
    fetchDataFromApi(
      `/api/user/logout?token=${localStorage.getItem("accessToken")}`,
      { withCredentials: true }
    ).then((response) => {
      console.log(response);
      if (response?.error === false) {
        context.setIsLogin(false);
        localStorage.removeItem("accessToken");
        localStorage.removeItem("refreshToken");
        navigate("/login");
      }
    });
  };

  return (
    <header className="bg-white shadow-sm sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link to="/" className="flex-shrink-0">
            <img
              src="https://res.cloudinary.com/db5yniogx/image/upload/t_momentologomain/v1737386751/momentologo1_hssill.jpg"
              className="h-8 lg:h-10 w-auto hover:opacity-90 transition-opacity"
              alt="Logo"
            />
          </Link>

          {/* Search Bar - Hidden on mobile */}
          <div className="hidden md:flex flex-1 max-w-2xl mx-8">
            <Search />
          </div>

          {/* Action Icons */}
          <div className="flex items-center space-x-3 sm:space-x-4">
            {!isLogin ? (
              <>
                <div className="hidden sm:flex items-center space-x-2">
                  <Link
                    to="/login"
                    className="px-3 py-1.5 text-sm font-medium text-gray-700 hover:text-indigo-600 transition-colors"
                  >
                    Sign in
                  </Link>
                  <span className="text-gray-300">|</span>
                  <Link
                    to="/register"
                    className="px-3 py-1.5 text-sm font-medium text-gray-700 hover:text-indigo-600 transition-colors"
                  >
                    Register
                  </Link>
                </div>

                <Tooltip title="Cart">
                  <IconButton className="text-gray-600 hover:text-indigo-600">
                    <StyledBadge badgeContent={1} color="secondary">
                      <BsCartFill className="text-xl" />
                    </StyledBadge>
                  </IconButton>
                </Tooltip>

                <Tooltip title="Wishlist">
                  <IconButton className="text-gray-600 hover:text-indigo-600">
                    <StyledBadge badgeContent={1} color="secondary">
                      <FaRegHeart className="text-xl" />
                    </StyledBadge>
                  </IconButton>
                </Tooltip>
              </>
            ) : (
              <>
                <Tooltip title="Cart">
                  <IconButton className="text-gray-600 hover:text-indigo-600">
                    <StyledBadge badgeContent={1} color="secondary">
                      <BsCartFill className="text-xl" />
                    </StyledBadge>
                  </IconButton>
                </Tooltip>

                <Tooltip title="Wishlist">
                  <IconButton className="text-gray-600 hover:text-indigo-600">
                    <StyledBadge badgeContent={1} color="secondary">
                      <FaRegHeart className="text-xl" />
                    </StyledBadge>
                  </IconButton>
                </Tooltip>

                <Button
                  onClick={handleClick}
                  className="flex items-center space-x-2 pl-2 pr-3 rounded-full hover:bg-gray-50 transition-colors"
                >
                  <Avatar
                    className="h-8 w-8 bg-indigo-100 text-indigo-600"
                    src={context?.userData?.avatar}
                  >
                    {context?.userData?.name?.[0]}
                  </Avatar>
                  <div className="hidden lg:block text-left">
                    <p className="text-sm font-medium text-gray-700">
                      {context?.userData?.name}
                    </p>
                    <p className="text-xs text-gray-500 !capitalize">
                      {context?.userData?.email}
                    </p>
                  </div>
                  <FaChevronDown className="ml-1 text-gray-400 text-sm" />
                </Button>

                <Menu
                  anchorEl={anchorEl}
                  open={open}
                  onClose={handleClose}
                  PaperProps={{
                    className: "mt-2 py-1 w-48 rounded-lg shadow-xl",
                  }}
                >
                  <MenuItem
                    onClick={handleClose}
                    component={Link}
                    to="/my-account"
                    className="flex items-center space-x-2 px-4 py-2.5"
                  >
                    <FaRegUser className="text-gray-500 mr-2" />
                    <span>My Account</span>
                  </MenuItem>
                  <MenuItem
                    onClick={handleClose}
                    className="flex items-center space-x-2 px-4 py-2.5"
                  >
                    <BsCartFill className="text-gray-500 mr-2" />
                    <span>Orders</span>
                  </MenuItem>
                  <Divider className="my-1" />
                  <MenuItem
                    onClick={logout}
                    className="text-red-600 px-4 py-2.5 hover:bg-red-50"
                  >
                    Logout
                  </MenuItem>
                </Menu>
              </>
            )}
          </div>
        </div>

        {/* Mobile Search Bar */}
        <div className="md:hidden pb-3 px-4">
          <Search />
        </div>
      </div>

      <Navigation />
    </header>
  );
};

export default Header;
