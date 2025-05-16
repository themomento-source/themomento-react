import React from "react";
import { FaFacebookF, FaInstagram } from "react-icons/fa";

function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-gray-900 text-gray-300 py-12 md:py-16">
       <div className="max-w-7xl mx-auto px-6 lg:px-12 grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12 items-start">

        {/* About The Momento */}
        <div className="md:col-span-1 space-y-4 md:text-justify">
          <h3 className="text-white font-semibold text-lg font-marcellus">About The Momento</h3>
          <p className="text-gray-400 text-sm leading-relaxed">
            The Momento is a UK-based non-profit platform dedicated to empowering photographers across the globe—
            especially those from underrepresented and rural communities. While we are in the process of becoming a 
            registered charity, our mission is already in motion: helping photographers build their careers through 
            free, professional portfolio galleries, expert guidance, and global exposure.
          </p>
          <p className="text-gray-400 text-sm leading-relaxed">
            Whether you're taking your first steps in photography or seeking to grow your presence, The Momento offers 
            a space to learn, share, and showcase your story. We believe every photographer deserves a platform, not just a profile.
          </p>

          <h4 className="text-white font-medium pt-4 font-marcellus">Opportunities We Offer</h4>
          <ul className="text-sm text-gray-400 space-y-2 list-disc list-inside">
            <li>
              Daily photo submissions & expert reviews —{" "}
              <a href="/register" className="text-blue-400 hover:underline">Sign up</a>
            </li>
            <li>
              Free portfolio galleries for client sharing —{" "}
              <a href="/photolisting" className="text-blue-400 hover:underline">Photos</a>
            </li>
            <li>
              Access to workshops, interviews & mentorship —{" "}
              <a href="/bloglisting" className="text-blue-400 hover:underline">Communities</a>
            </li>
            <li>
              A growing global creative community —{" "}
              <a href="/register" className="text-blue-400 hover:underline">Join here</a>
            </li>
          </ul>
        </div>

        {/* Explore Section */}
        <div className="md:col-span-1 md:text-right">

       
              <ul className="space-y-3 text-sm md:inline-block md:text-left font-marcellus text-white">

<li className="hover:text-white transition text-gray-300 text-lg font-semibold">
             
                Explore
             
            </li>

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
            <li>
              <a href="/contact" className="hover:text-white transition text-gray-300">
                Contact 
              </a>
            </li>
            <li>
              <a href="/privacy-policy" className="hover:text-white transition text-gray-300">
                Privacy and Security Policy
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
