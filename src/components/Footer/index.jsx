import React from "react";
import {
  FaFacebookF,
  FaTwitter,
  FaInstagram,
  FaLinkedinIn,
} from "react-icons/fa";

function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-gray-900 text-gray-300 py-12 md:py-16">
      <div className="max-w-7xl mx-auto px-6 lg:px-12 grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12">
        {/* About Section (No Logo) */}
        <div className="md:col-span-1">
          <p className="text-gray-400 text-sm leading-relaxed">
            Capturing moments, crafting stories. Your ultimate destination for
            exceptional photography and inspiration.
          </p>
        </div>

        {/* Quick Links */}
        <div className="md:col-span-1">
          <h3 className="text-white font-semibold mb-4">Explore</h3>
          <ul className="space-y-3 text-sm">
            <li>
              <a href="/" className="hover:text-white transition text-gray-300">
                Home
              </a>
            </li>
            <li>
              <a href="/photolisting" className="hover:text-white transition text-gray-300">
                Gallery
              </a>
            </li>
            <li>
              <a href="/bloglisting" className="hover:text-white transition text-gray-300">
                Community
              </a>
            </li>
            
          </ul>
        </div>

     

       
        
      </div>

      {/* Social Media & Copyright */}
      <div className="border-t border-gray-700 mt-12 pt-6 text-center text-sm">
        <div className="flex justify-center space-x-6 mb-4">
          <a href="https://www.facebook.com/momentomagazine1" className="text-gray-400 hover:text-white transition">
            <FaFacebookF className="text-xl" />
          </a>
          
          <a href="https://www.instagram.com/the___momento/?igsh=ZzN5NmNiYnJkMXl3&utm_source=qr#" className="text-gray-400 hover:text-white transition">
            <FaInstagram className="text-xl" />
          </a>
          
        </div>
        <p className="text-gray-500">
          &copy; {currentYear} The Momento. All rights reserved.
        </p>
      </div>
    </footer>
  );
}

export default Footer;
