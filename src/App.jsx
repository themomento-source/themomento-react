import React, { useEffect, useState } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./App.css";
import { createContext } from "react";
import Header from "./components/Header";
import Home from "./Pages/Home";
import Footer from "./components/Footer";
import BlogListing from "./Pages/BlogListing";
import PhotoListing from "./Pages/PhotoListing";
import PhotoDetails from "./Pages/PhotoDetails";
import BlogDetails from "./Pages/BlogDetails";
import Login from "./Pages/Login";
import Register from "./Pages/Register";
import Drawer from "@mui/material/Drawer";
import Button from "@mui/material/Button";
import { IoCloseSharp } from "react-icons/io5";

import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import Verify from "./Pages/Verify";
import toast, { Toaster } from "react-hot-toast";
import Checkout from "./Pages/Checkout";
import MyAccount from "./Pages/MyAccount";
import { fetchDataFromApi } from "./utils/api.js";
import ChangePassword from "./Pages/ChangePassword/index.jsx";

export const MyContext = createContext();

function App() {
  const [isLogin, setIsLogin] = useState(false);
  const [userData, setUserData] = useState(null);

  const openAlertBox = (status, msg) => {
    switch (status) {
      case "success":
        toast.success(msg);
        break;
      case "error":
        toast.error(msg);
        break;
      default:
        toast(msg); // Fallback for other statuses
    }
  };

  const [openPhotoDetailsModal, setOpenPhotoDetailsModal] = useState(false);

  const handleClickOpenPhotoDetailsModal = () => {
    setOpenPhotoDetailsModal(true);
  };

  const handleClosePhotoDetailsModal = () => {
    setOpenPhotoDetailsModal(false);
  };

  const values = {
    openAlertBox,
    isLogin,
    setIsLogin,
    userData,
    setUserData,
  };
  const [openCartPanel, setOpenCartPanel] = useState(false); // Initially false to keep the cart panel closed

  const toggleCartPanel = (newOpen) => {
    setOpenCartPanel(newOpen);
  };

  useEffect(() => {
    const token = localStorage.getItem("accessToken");
    if (token !== undefined && token !== null && token !== "") {
      setIsLogin(true);

      fetchDataFromApi(`/api/user/user-details`).then((response) => {
        console.log(response);
        setUserData(response.data);
      });
    } else {
      setIsLogin(false);
    }
  }, [isLogin]);

  return (
    <>
      <BrowserRouter>
        <MyContext.Provider value={values}>
          <Header />
          <Routes>
            <Route path={"/"} element={<Home />} />
            <Route path={"/bloglisting"} element={<BlogListing />} />
            <Route path={"/photolisting"} element={<PhotoListing />} />
            <Route path={"/photodetails/:id"} element={<PhotoDetails />} />
            <Route path={"/blog/:id"} element={<BlogDetails />} />
            <Route path={"/login"} element={<Login />} />
            <Route path={"/register"} element={<Register />} />
            <Route path={"/verify"} element={<Verify />} />

            <Route path={"/checkout"} element={<Checkout />} />
            <Route path={"/my-account"} element={<MyAccount />} />
            <Route path="/change-password" element={<ChangePassword />} />
          </Routes>
          <Footer />
        </MyContext.Provider>
      </BrowserRouter>

      <Toaster />

      <Dialog
        open={openPhotoDetailsModal}
        onClose={handleClosePhotoDetailsModal}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
        className="PhotoDetailsModal"
      >
        <DialogContent>
          <div className="flex items-center w-full PhotoDetailsModalContainer">
            <div className="col1">
              <PhotoDetails />
            </div>
          </div>
        </DialogContent>
      </Dialog>

      {/* Cart */}
      <Button onClick={() => toggleCartPanel(true)}>Open drawer</Button>
      <Drawer
        open={openCartPanel}
        onClose={() => toggleCartPanel(false)}
        anchor={"right"}
      >
        <div className="flex items-center justify-between py-3 px-4 gap-3">
          <h3>Shopping Cart (1) </h3>
          <IoCloseSharp className="text-[20px] cursor-pointer" />
        </div>
      </Drawer>
    </>
  );
}

export default App;
