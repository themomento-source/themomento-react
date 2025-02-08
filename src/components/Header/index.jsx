import React, { useContext, useState } from "react";
import { Link } from "react-router-dom";
import { 
  AppBar,
  Toolbar,
  IconButton,
  Badge,
  Avatar,
  Menu,
  MenuItem,
  Divider,
  useMediaQuery,
  useTheme,
  Button
  
} from "@mui/material";
import { GiHamburgerMenu } from "react-icons/gi";
import { BsCart, BsHeart, BsSearch } from "react-icons/bs";
import { FiChevronDown } from "react-icons/fi";
import Search from "../Search";
import { MyContext } from "../../App";
import Navigation from "./Navigation";

const Header = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));
  const [anchorEl, setAnchorEl] = useState(null);
  const context = useContext(MyContext);

  return (
    <AppBar position="sticky" color="inherit" elevation={1}>
      <Toolbar className="!px-4 !py-3">
        {/* Mobile Menu Button */}
        {isMobile && (
          <IconButton
            edge="start"
            color="inherit"
            onClick={context?.toggleMobileMenu}
            className="!mr-2"
          >
            <GiHamburgerMenu />
          </IconButton>
        )}

        {/* Logo */}
        <Link to="/" className="flex-grow md:flex-grow-0">
          <img
            src="https://res.cloudinary.com/db5yniogx/image/upload/t_momentologomain/v1737386751/momentologo1_hssill.jpg"
            className="h-8 lg:h-10 w-auto"
            alt="Logo"
          />
        </Link>

        {/* Desktop Search */}
        {!isMobile && (
          <div className="flex-grow max-w-2xl mx-8">
            <Search />
          </div>
        )}

        {/* Action Icons */}
        <div className="flex items-center gap-2 ml-auto">
          {!isMobile && <BsSearch className="text-xl text-gray-600" />}
          
          <IconButton color="inherit">
            <Badge badgeContent={2} color="error">
              <BsCart className="text-xl text-gray-600" />
            </Badge>
          </IconButton>
          
          <IconButton color="inherit">
            <Badge badgeContent={1} color="error">
              <BsHeart className="text-xl text-gray-600" />
            </Badge>
          </IconButton>

          {/* User Profile */}
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
                <MenuItem component={Link} to="/my-account">
                  My Account
                </MenuItem>
                <Divider />
                <MenuItem onClick={context.logout}>Logout</MenuItem>
              </Menu>
            </>
          ) : (
            <div className="hidden md:flex gap-2">
              <Button component={Link} to="/login" color="inherit">
                Login
              </Button>
              <Button component={Link} to="/register" color="inherit">
                Register
              </Button>
            </div>
          )}
        </div>
      </Toolbar>

      {/* Mobile Search */}
      {isMobile && (
        <div className="px-4 pb-3">
          <Search />
        </div>
      )}

      <Navigation />
    </AppBar>
  );
};

export default Header;