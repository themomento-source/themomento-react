import React from "react";
import { FaFacebookF, FaTwitter, FaInstagram, FaLinkedinIn } from "react-icons/fa";


function Footer() {
  return (
    <footer className="bg-black text-gray-300 py-10">
      <div className="max-w-7xl mx-auto px-6 lg:px-12 grid grid-cols-1 md:grid-cols-3 gap-8">

        {/* About Section with Logo */}
        <div>
          <img src={"https://res.cloudinary.com/db5yniogx/image/upload/t_momentologomain/v1737386751/momentologo1_hssill.jpg"} alt="PhotoStore Logo" className="w-32 mb-3" />
          <p className="text-gray-400 text-sm">
            Your ultimate destination for high-quality stock photos and creative blogs.
          </p>
        </div>

        {/* Quick Links */}
        <div>
          <h3 className="text-white text-lg font-semibold mb-3">Quick Links</h3>
          <ul className="space-y-2 text-sm">
            <li><a href="#" className="hover:text-white transition">Home</a></li>
            <li><a href="#" className="hover:text-white transition">Gallery</a></li>
            <li><a href="#" className="hover:text-white transition">Blog</a></li>
            <li><a href="#" className="hover:text-white transition">Contact</a></li>
          </ul>
        </div>

        {/* Newsletter Section */}
        <div>
          <h3 className="text-white text-lg font-semibold mb-3">Subscribe to Newsletter</h3>
          <form className="flex flex-col space-y-3">
            <input 
              type="email" 
              placeholder="Enter your email" 
              className="p-2 bg-gray-800 text-white rounded focus:outline-none focus:ring-2 focus:ring-gray-500"
            />
            <button className="bg-white text-black py-2 rounded font-medium hover:bg-gray-300 transition">
              Subscribe
            </button>
          </form>
        </div>

      </div>

      {/* Social Media & Copyright */}
      <div className="border-t border-gray-700 mt-10 pt-6 text-center text-sm">
        <div className="flex justify-center space-x-4 mb-3">
          <FaFacebookF className="cursor-pointer hover:text-white transition" />
          <FaTwitter className="cursor-pointer hover:text-white transition" />
          <FaInstagram className="cursor-pointer hover:text-white transition" />
          <FaLinkedinIn className="cursor-pointer hover:text-white transition" />
        </div>
        <p className="text-gray-500">&copy; 2025 PhotoStore. All rights reserved.</p>
      </div>
    </footer>
  );
}

export default Footer;
