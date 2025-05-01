import React, { useEffect, useState, useContext, createContext } from "react";
import { useMemo } from 'react';
import { BrowserRouter, Routes, Route, Navigate, useLocation } from "react-router-dom";
import toast, { Toaster } from "react-hot-toast";
import Alert from '@mui/material/Alert';
import "./App.css";
import CookieConsent from "react-cookie-consent";
import { Link } from "react-router-dom";
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
import PublicProfile from "./Pages/MyAccount/publicProfile.jsx";
import Settings from "./Pages/MyAccount/settings.jsx";
import Drawer from "@mui/material/Drawer";
import { IoCloseSharp } from "react-icons/io5";
import { fetchDataFromApi } from "./utils/api.js";
import AboutMomento from "./Pages/About/index.jsx";
import MembershipPromo from "./Pages/BecomeAMember/index.jsx";
import Learning from "./Pages/BlogListing/Learning.jsx";
import Interview from "./Pages/BlogListing/Interview.jsx";
import GeneralBlog from "./Pages/BlogListing/GeneralBlog.jsx";
import ChangePassword from "./Pages/Login/changePassword/index.jsx";
import PrivacyPolicy from "./Pages/PrivacyPolicies/index.jsx";
import { useGoogleAnalytics } from "./hooks/useGoogleAnalytics.js";

export const MyContext = createContext();

const ProtectedRoute = ({ children }) => {
  const { isLogin, isLoading } = useContext(MyContext);

  if (isLoading) return <div className="text-center py-4">Loading...</div>;
  return isLogin ? children : <Navigate to="/login" replace />;
};

const RouterContent = () => {
  useGoogleAnalytics(); 
  const { alert } = useContext(MyContext);






  return (
    <>
      {alert.open && (
        <Alert severity={alert.severity} sx={{ 
          position: 'fixed', 
          top: 20, 
          right: 20, 
          zIndex: 9999 
        }}>
          {alert.message}
        </Alert>
      )}
      
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/bloglisting" element={<BlogListing />} />
        <Route path="/learning" element={<Learning />} />
        <Route path="/interview" element={<Interview />} />
        <Route path="/general-blog" element={<GeneralBlog />} />
        <Route path="/photolisting" element={<PhotoListing />} />
        <Route path="/photodetails/:id" element={<PhotoDetails />} />
        <Route path="/blog/:id" element={<BlogDetails />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/verify" element={<Verify />} />
        <Route path="/user/:userId" element={<PublicProfile />} />
        <Route path="/about" element={<AboutMomento />} />
        <Route path="/become-member" element={<MembershipPromo />} />
        <Route path="/change-password" element={<ChangePassword />} />
        <Route path="/privacy-policy" element={<PrivacyPolicy />} />

        {/* Protected Routes */}
        <Route path="/my-account/:userId/settings" element={
          <ProtectedRoute><Settings /></ProtectedRoute>
        }/>
        <Route path="/my-account/:userId" element={
          <ProtectedRoute><MyAccount /></ProtectedRoute>
        }/>
        <Route path="/checkout" element={
          <ProtectedRoute><Checkout /></ProtectedRoute>
        }/>
      </Routes>
      <Footer />

      <CookieConsent
        onAccept={() => {
          localStorage.setItem('gdprConsent', 'true');
          window.location.reload();
        }}
        location="bottom"
        buttonText="Accept"
        declineButtonText="Decline"
        enableDeclineButton
        flipButtons
        style={{ background: "#2d3748", padding: "1rem", alignItems: "center" }}
        buttonStyle={{
          background: "#48bb78",
          color: "white",
          borderRadius: "4px",
          padding: "8px 16px",
          fontSize: "14px"
        }}
        declineButtonStyle={{
          background: "#f56565",
          marginRight: "1rem",
          borderRadius: "4px",
          padding: "8px 16px",
          fontSize: "14px"
        }}
        cookieName="gdprConsent"
        expires={365}
      >
        <span style={{ color: "white", fontSize: "14px" }}>
          We use cookies to ensure you get the best experience.{" "}
          <Link to="/privacy-policy" style={{ color: "#63b3ed", textDecoration: "underline" }}>
            Learn more
          </Link>
        </span>
      </CookieConsent>
    </>
  );
};

function App() {
  const [isLogin, setIsLogin] = useState(false);
  const [userData, setUserData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [openCartPanel, setOpenCartPanel] = useState(false);
  const [alert, setAlert] = useState({ open: false, message: '', severity: 'info' });

  useEffect(() => {
    const token = localStorage.getItem("accessToken");
    if (token) {
      fetchDataFromApi(`/api/user/user-details`)
        .then((response) => {
          setUserData(response.data);
          setIsLogin(true);
        })
        .catch((error) => {
          console.error("Error fetching user:", error);
          localStorage.removeItem("accessToken");
          setIsLogin(false);
        })
        .finally(() => setIsLoading(false));
    } else {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    if (localStorage.getItem('gdprConsent') === 'true') {
      const script = document.createElement('script');
      script.src = `https://www.googletagmanager.com/gtag/js?id=${import.meta.env.VITE_GA_MEASUREMENT_ID}`;
      script.async = true;
      document.head.appendChild(script);
  
      window.dataLayer = window.dataLayer || [];
      function gtag() { window.dataLayer.push(arguments); }
      gtag('js', new Date());
      gtag('config', import.meta.env.VITE_GA_MEASUREMENT_ID, {
        anonymize_ip: true,
        allow_google_signals: false
      });
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

  const openAlertBox = (severity, message) => {
    setAlert({ open: true, message, severity });
    setTimeout(() => setAlert({ ...alert, open: false }), 4000);
  };

  const contextValue = useMemo(() => ({
    isLogin,
    setIsLogin,
    userData,
    setUserData,
    isLoading,
    logout,
    openAlertBox,
    alert
  }), [isLogin, userData, isLoading, alert.open, alert.message, alert.severity]);

  return (
    <BrowserRouter>
     <MyContext.Provider value={contextValue}>
        <RouterContent />
        <Toaster />
        <Drawer open={openCartPanel} onClose={() => setOpenCartPanel(false)} anchor="right">
          <div className="flex items-center justify-between py-3 px-4">
            <h3>Shopping Cart</h3>
            <IoCloseSharp className="text-[20px] cursor-pointer" onClick={() => setOpenCartPanel(false)} />
          </div>
        </Drawer>
      </MyContext.Provider>
    </BrowserRouter>
  );
}

export default App;