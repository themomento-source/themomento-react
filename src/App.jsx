import React, { useEffect, useState, useContext } from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
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
import PublicProfile from "./Pages/MyAccount/publicProfile.jsx";
import Settings from "./Pages/MyAccount/settings.jsx";

export const MyContext = createContext();

const ProtectedRoute = ({ children }) => {
  const { isLogin } = useContext(MyContext);

  if (!isLogin) {
    return <Navigate to="/login" replace />;
  }

  return children;
};

function App() {
  const [isLogin, setIsLogin] = useState(false);
  const [userData, setUserData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  const openAlertBox = (status, msg) => {
    switch (status) {
      case "success":
        toast.success(msg);
        break;
      case "error":
        toast.error(msg);
        break;
      default:
        toast(msg);
    }
  };

  const [openPhotoDetailsModal, setOpenPhotoDetailsModal] = useState(false);

  const handleClickOpenPhotoDetailsModal = () => {
    setOpenPhotoDetailsModal(true);
  };

  const handleClosePhotoDetailsModal = () => {
    setOpenPhotoDetailsModal(false);
  };

  const [openCartPanel, setOpenCartPanel] = useState(false);

  const toggleCartPanel = (newOpen) => {
    setOpenCartPanel(newOpen);
  };

  useEffect(() => {
    const token = localStorage.getItem("accessToken");

    if (token) {
      fetchDataFromApi(`/api/user/user-details`)
        .then((response) => {
          setUserData(response.data);
          setIsLogin(true);
        })
        .catch(() => {
          localStorage.removeItem("accessToken");
          setIsLogin(false);
        })
        .finally(() => {
          setIsLoading(false); // Mark auth check as complete
        });
    } else {
      setIsLogin(false);
      setIsLoading(false); // Mark auth check as complete
    }
  }, []);

  const values = {
    openAlertBox,
    isLogin,
    setIsLogin,
    userData,
    setUserData,
    isLoading, // Include isLoading in context
  };
  const ProtectedRoute = ({ children }) => {
    const { isLogin, isLoading } = useContext(MyContext);

    if (isLoading) {
      return <div>Loading...</div>; // Show loading state
    }

    if (!isLogin) {
      return <Navigate to="/login" replace />;
    }

    return children;
  };

  return (
    <>
      <BrowserRouter>
        <MyContext.Provider value={values}>
          <Header />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/bloglisting" element={<BlogListing />} />
            <Route path="/photolisting" element={<PhotoListing />} />
            <Route path="/photodetails/:id" element={<PhotoDetails />} />
            <Route path="/blog/:id" element={<BlogDetails />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/verify" element={<Verify />} />
            <Route path="/user/:userId" element={<PublicProfile />} />

            {/* Protected Routes */}
            <Route
              path="/my-account/settings"
              element={
                <ProtectedRoute>
                  <Settings />
                </ProtectedRoute>
              }
            />
            <Route
              path="/change-password"
              element={
                <ProtectedRoute>
                  <ChangePassword />
                </ProtectedRoute>
              }
            />
            <Route
              path="/my-account"
              element={
                <ProtectedRoute>
                  <MyAccount />
                </ProtectedRoute>
              }
            />
            <Route
              path="/checkout"
              element={
                <ProtectedRoute>
                  <Checkout />
                </ProtectedRoute>
              }
            />
          </Routes>
          <Footer />
        </MyContext.Provider>
      </BrowserRouter>

      <Toaster />

      <Dialog
        open={openPhotoDetailsModal}
        onClose={handleClosePhotoDetailsModal}
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
