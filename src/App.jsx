import React, { useEffect, useState, useContext, createContext } from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { HelmetProvider } from "react-helmet-async"; // Import HelmetProvider
import toast, { Toaster } from "react-hot-toast";
import "./App.css";

import Header from "./components/Header";
import Footer from "./components/Footer";
import Home from "./Pages/Home";
import BlogListing from "./Pages/BlogListing";
import PhotoListing from "./Pages/PhotoListing";
import PhotoDetails from "./Pages/PhotoDetails";
import BlogDetails from "./Pages/BlogDetails";
import Login from "./Pages/Login";
import Register from "./Pages/Register";
import Verify from "./Pages/Verify";
import Checkout from "./Pages/Checkout";
import MyAccount from "./Pages/MyAccount";
import ChangePassword from "./Pages/ChangePassword/index.jsx";
import PublicProfile from "./Pages/MyAccount/publicProfile.jsx";
import Settings from "./Pages/MyAccount/settings.jsx";

import Drawer from "@mui/material/Drawer";
import Dialog from "@mui/material/Dialog";
import DialogContent from "@mui/material/DialogContent";
import { IoCloseSharp } from "react-icons/io5";

import { fetchDataFromApi } from "./utils/api.js";
import AboutMomento from "./Pages/About/index.jsx";
import MembershipPromo from "./Pages/BecomeAMember/index.jsx";

export const MyContext = createContext();

const ProtectedRoute = ({ children }) => {
  const { isLogin, isLoading } = useContext(MyContext);

  if (isLoading) {
    return <div className="text-center py-4">Loading...</div>; 
  }

  if (!isLogin) {
    return <Navigate to="/login" replace />;
  }

  return children;
};

function App() {
  const [isLogin, setIsLogin] = useState(false);
  const [userData, setUserData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [openPhotoDetailsModal, setOpenPhotoDetailsModal] = useState(false);
  const [openCartPanel, setOpenCartPanel] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem("accessToken");

    if (token) {
      fetchDataFromApi(`/api/user/user-details`)
        .then((response) => {
          setUserData(response.data);
          setIsLogin(true);
        })
        .catch((error) => {
          console.error("Error fetching user details:", error);
          localStorage.removeItem("accessToken");
          setIsLogin(false);
        })
        .finally(() => {
          setIsLoading(false);
        });
    } else {
      setIsLoading(false);
    }
  }, []);

  const logout = async () => {
    try {
      await fetchDataFromApi(`/api/user/logout`);
      localStorage.removeItem("accessToken");
      setIsLogin(false);
      setUserData(null);
      toast.success("Logged out successfully");
    } catch (error) {
      toast.error("Logout failed");
    }
  };

  const values = {
    isLogin,
    setIsLogin,
    userData,
    setUserData,
    isLoading,
    logout,
  };

  return (
    <>
      <HelmetProvider>
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
              <Route path="/about" element={<AboutMomento />} />
              <Route path="/become-member" element={<MembershipPromo/>} />

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
      </HelmetProvider>

      <Toaster />

      {/* Photo Details Modal */}
      <Dialog open={openPhotoDetailsModal} onClose={() => setOpenPhotoDetailsModal(false)}>
        <DialogContent>
          <div className="flex items-center w-full">
            <PhotoDetails />
          </div>
        </DialogContent>
      </Dialog>

      {/* Shopping Cart Drawer */}
      <Drawer open={openCartPanel} onClose={() => setOpenCartPanel(false)} anchor="right">
        <div className="flex items-center justify-between py-3 px-4">
          <h3>Shopping Cart</h3>
          <IoCloseSharp className="text-[20px] cursor-pointer" onClick={() => setOpenCartPanel(false)} />
        </div>
      </Drawer>
    </>
  );
}

export default App;
