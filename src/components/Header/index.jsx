import React, { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom"; // Import useNavigate
import {
  AppBar,
  Toolbar,
  IconButton,
  Avatar,
  Menu,
  MenuItem,
  Divider,
  useMediaQuery,
  useTheme,
  Button,
} from "@mui/material";
import { GiHamburgerMenu } from "react-icons/gi";
import { MyContext } from "../../App";
import Navigation from "./Navigation";

const Header = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));
  const [anchorEl, setAnchorEl] = useState(null);
  const context = useContext(MyContext);
  const navigate = useNavigate(); // Use the useNavigate hook

  // Function to handle My Account click
  const handleMyAccountClick = () => {
    navigate("/my-account"); // Navigate to the My Account page
    window.location.reload(); // Reload the page
  };

  const handleLogoClick = () => {
    navigate("/"); // Navigate to the home page
    window.location.reload(); // Reload the page
  };


  return (
    <AppBar position="sticky" color="inherit" elevation={1}>
      <Toolbar className="!px-4 !py-3">
        {/* Mobile Menu Button */}
        {isMobile && (
          <IconButton
            edge="start"
            color="inherit"
            onClick={() => setIsOpenCatPanel(true)} // Open category panel instead
            className="!mr-2"
          >
            <GiHamburgerMenu />
          </IconButton>
        )}

        {/* Logo */}
        <Link to="/" className="flex-grow md:flex-grow-0">
          <img onClick={handleLogoClick}
            src="https://res.cloudinary.com/dgob9antb/image/upload/v1740274717/momentomainlogo_eyqct2.jpg"
            className="h-14 lg:h-18 w-auto"
            alt="Logo" 
          />
          </Link>

        {/* User Profile */}
        <div className="flex items-center gap-2 ml-auto">
          {context.isLogin ? (
            <>
              <IconButton onClick={(e) => setAnchorEl(e.currentTarget)}>
                <Avatar className="!h-8 !w-8" src={context.userData?.avatar} />
              </IconButton>
              <Menu
                anchorEl={anchorEl}
                open={Boolean(anchorEl)}
                onClose={() => setAnchorEl(null)}
              >
                <MenuItem onClick={handleMyAccountClick}> {/* Use onClick instead of component */}
                  My Account
                </MenuItem>
                <Divider />
                <MenuItem onClick={context.logout}>Logout</MenuItem>
              </Menu>
            </>
          ) : (
            <div className="flex gap-2">
              <Button
                component={Link}
                to="/login"
                color="inherit"
                className="!hidden md:!inline-flex !capitalize"
              >
                Login
              </Button>
              <Button
                component={Link}
                to="/register"
                color="inherit"
                className="!hidden md:!inline-flex !capitalize"
              >
                Register
              </Button>
            </div>
          )}
        </div>
      </Toolbar>

      <Navigation />
    </AppBar>
  );
};

export default Header;