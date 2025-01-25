import React, { useContext, useState } from "react";
import { Link } from "react-router-dom";
import Search from "../Search";
import Badge from "@mui/material/Badge";
import { styled } from "@mui/material/styles";
import IconButton from "@mui/material/IconButton";
import { BsCartFill } from "react-icons/bs";
import { FaRegHeart, FaRegUser } from "react-icons/fa";
import Tooltip from "@mui/material/Tooltip";
import Navigation from "./Navigation";
import { MyContext } from "../../App";
import { Button, Menu, MenuItem, Divider, Avatar } from "@mui/material";

const StyledBadge = styled(Badge)(({ theme }) => ({
  "& .MuiBadge-badge": {
    right: -3,
    top: 13,
    border: `2px solid ${theme.palette.background.paper}`,
    padding: "0 4px",
  },
}));

const Header = () => {
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  // Use the context to get the login status
  const { isLogin } = useContext(MyContext);

  return (
    <header className="bg-white">
      <div className="header py-4 border-b-[1px] border-gray-250">
        <div className="container flex items-center justify-between">
          <div className="col1 w-[25%]">
            <Link to={"/"}>
              <img
                src="https://res.cloudinary.com/db5yniogx/image/upload/t_momentologomain/v1737386751/momentologo1_hssill.jpg"
                className="w-[200px]"
                alt="Logo"
              />
            </Link>
          </div>
          <div className="col2 w-[40%]">
            <Search />
          </div>
          <div className="col3 w-[35%] flex items-center pl-10">
            {isLogin === false ? (
              <ul className="flex items-center justify-end gap-3 w-full">
                <li className="list-none">
                  <Link
                    to="/login"
                    className="link transition text-[16px] font-[500]"
                  >
                    Login
                  </Link>{" "}
                  | &nbsp;
                  <Link
                    to="/register"
                    className="link transition text-[16px] font-[500]"
                  >
                    Register
                  </Link>
                </li>
                <li>
                  <Tooltip title="Cart">
                    <IconButton aria-label="cart">
                      <StyledBadge badgeContent={1} color="secondary">
                        <BsCartFill />
                      </StyledBadge>
                    </IconButton>
                  </Tooltip>
                </li>
                <li>
                  <Tooltip title="Wishlist">
                    <IconButton aria-label="wishlist">
                      <StyledBadge badgeContent={1} color="secondary">
                        <FaRegHeart />
                      </StyledBadge>
                    </IconButton>
                  </Tooltip>
                </li>
              </ul>
            ) : (
              <>
                {/* Account Menu */}
                <Button
                  className="myAccountwrap flex items-center gap-3 cursor-pointer"
                  onClick={handleClick}
                >
                  <Button className="!w-[40px] !h-[40px] !min-w-[40px] !rounded-full !bg-white">
                    <FaRegUser className="text-[32px] text-black" />
                  </Button>
                  <div className="info flex-col">
                    <h4 className="leading-3 text-[18px] font-[600] text-left text-black">
                      Arin
                    </h4>
                    <span className="text-[16px] font-[500] text-left text-black">
                      arinfyuawrfguar0gu@gmail.com
                    </span>
                  </div>
                </Button>
                <Menu
                  anchorEl={anchorEl}
                  id="account-menu"
                  open={open}
                  onClose={handleClose}
                  onClick={handleClose}
                  slotProps={{
                    paper: {
                      elevation: 0,
                      sx: {
                        overflow: "visible",
                        filter: "drop-shadow(0px 2px 8px rgba(0,0,0,0.32))",
                        mt: 1.5,
                        "& .MuiAvatar-root": {
                          width: 32,
                          height: 32,
                          ml: -0.5,
                          mr: 1,
                        },
                        "&::before": {
                          content: '""',
                          display: "block",
                          position: "absolute",
                          top: 0,
                          right: 14,
                          width: 10,
                          height: 10,
                          bgcolor: "background.paper",
                          transform: "translateY(-50%) rotate(45deg)",
                          zIndex: 0,
                        },
                      },
                    },
                  }}
                  transformOrigin={{ horizontal: "right", vertical: "top" }}
                  anchorOrigin={{ horizontal: "right", vertical: "bottom" }}
                >
                  
                  <Link to="/my-account" className="w-full block">
                  <MenuItem onClick={handleClose}>
                    <Avatar /> My account
                  </MenuItem>
                  </Link> 
                  <MenuItem onClick={handleClose}>
                    <Avatar /> Orders
                  </MenuItem>
                  <MenuItem onClick={handleClose}>
                    <Avatar /> Logout
                  </MenuItem>
                  <Divider />
                </Menu>

                {/* Cart & Wishlist */}
                <li>
                  <Tooltip title="Cart">
                    <IconButton aria-label="cart">
                      <StyledBadge badgeContent={1} color="secondary">
                        <BsCartFill />
                      </StyledBadge>
                    </IconButton>
                  </Tooltip>
                </li>
                <li>
                  <Tooltip title="Wishlist">
                    <IconButton aria-label="wishlist">
                      <StyledBadge badgeContent={1} color="secondary">
                        <FaRegHeart />
                      </StyledBadge>
                    </IconButton>
                  </Tooltip>
                </li>
              </>
            )}
          </div>
        </div>
      </div>
      <Navigation />
    </header>
  );
};

export default Header;
