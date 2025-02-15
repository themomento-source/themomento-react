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
      <div className="max-w-7xl mx-auto px-6 lg:px-12 grid grid-cols-1 md:grid-cols-4 gap-8 md:gap-12">
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
              <a href="#" className="hover:text-white transition text-gray-300">
                Home
              </a>
            </li>
            <li>
              <a href="#" className="hover:text-white transition text-gray-300">
                Gallery
              </a>
            </li>
            <li>
              <a href="#" className="hover:text-white transition text-gray-300">
                Blog
              </a>
            </li>
            <li>
              <a href="#" className="hover:text-white transition text-gray-300">
                Contact
              </a>
            </li>
          </ul>
        </div>

        {/* Services / Categories */}
        <div className="md:col-span-1">
          <h3 className="text-white font-semibold mb-4">Services</h3>
          <ul className="space-y-3 text-sm">
            <li>
              <a href="#" className="hover:text-white transition text-gray-300">
                Portrait Photography
              </a>
            </li>
            <li>
              <a href="#" className="hover:text-white transition text-gray-300">
                Wedding Photography
              </a>
            </li>
            <li>
              <a href="#" className="hover:text-white transition text-gray-300">
                Commercial Photography
              </a>
            </li>
          </ul>
        </div>

        {/* Contact/Newsletter Section */}
        <div className="md:col-span-1">
          <h3 className="text-white font-semibold mb-4">Stay Connected</h3>
          <p className="text-gray-400 text-sm mb-4">
            Get updates on new photos, blog posts, and special offers.
          </p>
          <div className="flex">
            <input
              type="email"
              placeholder="Enter your email"
              className="w-full p-2 bg-gray-800 text-white rounded-l focus:outline-none focus:ring-2 focus:ring-gray-500"
            />
            <button className="bg-white text-black py-2 px-4 rounded-r font-medium hover:bg-gray-300 transition">
              Subscribe
            </button>
          </div>
        </div>
      </div>

      {/* Social Media & Copyright */}
      <div className="border-t border-gray-700 mt-12 pt-6 text-center text-sm">
        <div className="flex justify-center space-x-6 mb-4">
          <a href="#" className="text-gray-400 hover:text-white transition">
            <FaFacebookF className="text-xl" />
          </a>
          <a href="#" className="text-gray-400 hover:text-white transition">
            <FaTwitter className="text-xl" />
          </a>
          <a href="#" className="text-gray-400 hover:text-white transition">
            <FaInstagram className="text-xl" />
          </a>
          <a href="#" className="text-gray-400 hover:text-white transition">
            <FaLinkedinIn className="text-xl" />
          </a>
        </div>
        <p className="text-gray-500">
          &copy; {currentYear} PhotoStore. All rights reserved.
        </p>
      </div>
    </footer>
  );
}

export default Footer;
