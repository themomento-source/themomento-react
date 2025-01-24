import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./App.css";
import Header from "./components/Header";
import Home from "./Pages/Home";
import Footer from "./components/Footer";
import BlogListing from "./Pages/BlogListing";
import PhotoListing from "./Pages/PhotoListing";
import PhotoDetails from "./Pages/PhotoDetails";
import BlogDetails from "./Pages/BlogDetails";
import Login from "./Pages/Login";
import Register from "./Pages/Register";
import Drawer from '@mui/material/Drawer';
import Button from '@mui/material/Button';
import { IoCloseSharp } from "react-icons/io5";

function App() {

  const [openCartPanel, setOpenCartPanel] = React.useState(false); // Initially false to keep the cart panel closed

  const toggleCartPanel = (newOpen) => {
    setOpenCartPanel(newOpen);
  };

  return (
    <>
      <BrowserRouter>
        <Header />
        <Routes>
          <Route path={"/"} element={<Home />} />
          <Route path={"/bloglisting"} element={<BlogListing />} />
          <Route path={"/photolisting"} element={<PhotoListing />} />
          <Route path={"/photodetails/:id"} element={<PhotoDetails />} />
          <Route path={"/blogdetails/:id"} element={<BlogDetails />} />
          <Route path={"/login"} element={<Login />} />
          <Route path={"/register"} element={<Register />} />
        </Routes>
        <Footer />
      </BrowserRouter>

      {/* Cart */}
      <Button onClick={() => toggleCartPanel(true)}>Open drawer</Button> 
      <Drawer open={openCartPanel} onClose={() => toggleCartPanel(false)} anchor={"right"}> 
     <div className="flex items-center justify-between py-3 px-4 gap-3">
     <h3>Shopping Cart (1) </h3>
     <IoCloseSharp className= "text-[20px] cursor-pointer"/>
     </div>
      </Drawer>
    </>
  );
}

export default App;
