import React from 'react';

function Contact() {
  return (
    <div className="min-h-screen bg-gray-50 py-16 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto text-center">
        {/* Title Section */}
        <h1 className="text-5xl font-extrabold text-gray-900 mb-6 font-marcellus">
          Get in Touch with The Momento
        </h1>
        <p className="text-xl text-gray-900 mb-10 leading-relaxed font-pt-serif">
          Whether you're a photographer, an organization, or a visual storyteller, we’re here to connect, collaborate, and support. Let’s create something amazing together.
        </p>

        {/* Contact Card */}
        <div className="bg-white shadow-lg p-8 inline-block">
          <h2 className="text-3xl font-semibold text-gray-800 mb-4 font-marcellus">
            Reach Out to Us
          </h2>
          <p className="text-lg text-gray-700 mb-4 font-pt-serif">
            We’d love to hear from you! Feel free to contact us via email.
          </p>
          <p className="text-lg text-gray-900">
            <span className="font-semibold font-pt-serif">Email:</span>{' '}
            <a
              href="mailto:support@themomento.co.uk"
              className="text-blue-500 hover:text-blue-700 underline transition duration-300 font-pt-serif"
            >
              support@themomento.co.uk
            </a>
          </p>
        </div>

      
        <div className="mt-12">
          <p className="text-gray-600 text-sm font-medium">
            We usually respond within 24-48 hours.
          </p>
          <svg
            className="mx-auto mt-4 w-12 h-12 text-blue-400 animate-bounce"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M8 16l-4-4m0 0l4-4m-4 4h16"
            ></path>
          </svg>
        </div>
      </div>
    </div>
  );
}

export default Contact;