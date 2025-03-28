import React from "react";
import { Link } from "react-router-dom";
import { FaImages, FaHandshake, FaTicketAlt, FaComments, FaBullhorn, FaShieldAlt } from "react-icons/fa";

const MembershipPromo = () => {
  return (
    <div className="bg-gradient-to-r from-gray-900 to-black py-16 px-4 md:px-8">
      <link
        href="https://fonts.googleapis.com/css2?family=Marcellus&family=PT+Serif&display=swap"
        rel="stylesheet"
      />

      <div className="max-w-7xl mx-auto">
        <div className="text-left md:text-center">
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-4 font-marcellus">
            Become a Member
          </h2>
          <h3 className="text-2xl md:text-3xl font-bold text-white mb-6 font-marcellus">
            Elevate Your Photography Journey: Join Momento Now!
          </h3>

          <p className="text-white text-lg md:text-xl mb-12 leading-relaxed font-pt-serif">
            At Momento, we’re dedicated to empowering photographers around the world by offering opportunities that help you grow, connect, and succeed. Whether you’re just starting out or already an experienced photographer, becoming a member opens doors to exclusive benefits that help you sharpen your craft, gain exposure, and build a successful photography career.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
            {[{
              icon: <FaImages className="text-4xl text-[#FFCB00]" />, 
              title: "Free Portfolio Gallery", 
              text: "As a member, you’ll receive a free, professional portfolio gallery on our website. This gallery will serve as your personal portfolio to showcase your best work to potential clients, collaborators, and the Momento community."
            }, {
              icon: <FaHandshake className="text-4xl text-[#FFCB00]" />, 
              title: "Photography Assignments and Clients", 
              text: "Gain access to exclusive photography assignments and connect with global clients for commercial and creative projects."
            }, {
              icon: <FaTicketAlt className="text-4xl text-[#FFCB00]" />, 
              title: "Exclusive Discounts", 
              text: "Enjoy discounts on exhibition submissions, tickets, and workshops to enhance your skills and exposure."
            }, {
              icon: <FaComments className="text-4xl text-[#FFCB00]" />, 
              title: "Expert Reviews and Feedback", 
              text: "Receive personalized feedback and professional advice to improve your craft and grow as a photographer."
            }, {
              icon: <FaBullhorn className="text-4xl text-[#FFCB00]" />, 
              title: "Networking and Exposure", 
              text: "Connect with a global community of photographers, share feedback, collaborate, and have your work showcased on Momento's platforms."
            }, {
              icon: <FaShieldAlt className="text-4xl text-[#FFCB00]" />, 
              title: "Privacy and Security", 
              text: "Your personal information and photos are safe with us. We respect your privacy and ownership."
            }].map((item, index) => (
              <div key={index} className="text-left md:text-center bg-gray-900 p-6 hover:shadow-lg transition-shadow duration-300">
                <div className="flex justify-center mb-4">
                  {item.icon}
                </div>
                <h3 className="text-xl font-semibold text-white mb-2 font-marcellus">
                  {item.title}
                </h3>
                <p className="text-white text-base font-pt-serif">
                  {item.text}
                </p>
              </div>
            ))}
          </div>

          <div className="mb-12">
            <p className="text-white text-base md:text-lg font-pt-serif">
              Membership is open to photographers of all levels. No membership fee is required to join and access all benefits.
            </p>
          </div>

          <Link
            to="/register"
            className="inline-block px-8 py-3 text-lg font-semibold text-gray-900 bg-[#FFCB00] hover:bg-[#e6b800] transition-colors duration-300"
          >
            Join Now
          </Link>
        </div>
      </div>
    </div>
  );
};

export default MembershipPromo;
