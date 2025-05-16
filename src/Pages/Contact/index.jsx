import React from 'react';

function Contact() {
  return (
    <div className="min-h-screen bg-gray-50 py-16 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto text-center">
        {/* Title Section */}
        <h1 className="text-4xl font-bold text-gray-900 mb-4 font-marcellus">
          Contact Us
        </h1>
        <h2 className="text-3xl font-semibold text-gray-900 mb-6 font-marcellus">
          We’d Love to Hear From You
        </h2>
        <p className="text-lg text-gray-900 mb-8 font-pt-serif text-left">
          At The Momento, we’re building more than just a platform we’re growing a global photography community. 
          Whether you're a photographer looking to get involved, a supporter with ideas, or an organization interested 
          in partnership or advertising, we're here and ready to connect.
        </p>

        {/* Contact Card */}
        <div className="bg-white shadow-md p-8 inline-block text-left space-y-6">
          {/* Location Section */}
          <div>
            <h3 className="text-2xl font-semibold text-gray-900 mb-2 font-marcellus">
               Our Location
            </h3>
            <p className="text-gray-900 font-pt-serif">
              The Momento<br />
              Southsea, Portsmouth, PO5, UK
            </p>
          </div>

          {/* Email Section */}
          <div>
            <h3 className="text-2xl font-semibold text-gray-900 mb-2 font-marcellus">
               Email
            </h3>
            <p className="text-gray-900 font-pt-serif space-y-2">
              <a
                
                className="block text-blue-500 hover:text-blue-700 underline transition duration-300"
              >
                info@themomento.co.uk
              </a>
              <a
              
                className="block text-blue-500 hover:text-blue-700 underline transition duration-300"
              >
                support@themomento.co.uk
              </a>
              <a
               
                className="block text-blue-500 hover:text-blue-700 underline transition duration-300"
              >
                submission@themomento.co.uk
              </a>
            </p>
          </div>

          {/* Additional Info */}
          <p className="text-gray-900 font-pt-serif">
            We typically respond within 48 hours. If you're contacting us about submissions, support, advertising, 
            or collaboration please include as much detail as possible so we can direct your query to the right person.
          </p>

          <p className="text-gray-900 font-pt-serif">
           We may be small now, but our vision is big. Let’s build 
           something powerful together.
          </p>
        </div>
      </div>
    </div>
  );
}

export default Contact;