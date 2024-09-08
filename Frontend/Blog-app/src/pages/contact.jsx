import React from 'react';

const Contact = () => {
  
  const contactImageUrl = 'https://images.unsplash.com/photo-1534488972407-5a4aa1e47d83?q=80&w=2023&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D';

  return (
    <div className="bg-gray-100 text-gray-800 py-20">
      <div className="container mx-auto px-4">
        <h1 className="text-4xl font-bold mb-8 text-center">Get in Touch</h1>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="relative rounded-lg overflow-hidden shadow-lg">
            <img
              src={contactImageUrl}
              alt="Contact"
              className="w-full h-full object-cover"
            />
            <div className="absolute top-0 left-0 w-full h-full bg-gray-900 bg-opacity-50 flex items-center justify-center">
              <h2 className="text-white text-2xl font-bold">
                Let's Connect
              </h2>
            </div>
          </div>
          <div className="bg-white rounded-lg shadow-lg p-8">
            <h2 className="text-2xl font-bold mb-4">Contact Information</h2>
            <ul className="space-y-4">
              <li>
                <i className="fas fa-envelope mr-4"></i>
                <a href="mailto:contact@codingblog.com">contact@codingblog.com</a>
              </li>
              <li>
                <i className="fas fa-phone mr-4"></i>
                <span>+1 (555) 123-4567</span>
              </li>
              <li>
                <i className="fas fa-map-marker-alt mr-4"></i>
                <span>123 Coding Street, Coder City, CA 12345</span>
              </li>
            </ul>
            <form className="space-y-4 mt-8">
              <input
                type="text"
                placeholder="Name"
                className="bg-gray-100 px-4 py-2 rounded-md w-full"
              />
              <input
                type="email"
                placeholder="Email"
                className="bg-gray-100 px-4 py-2 rounded-md w-full"
              />
              <textarea
                placeholder="Message"
                rows="4"
                className="bg-gray-100 px-4 py-2 rounded-md w-full"
              ></textarea>
              <button
                type="submit"
                className="bg-blue-500 hover:bg-blue-600 px-4 py-2 rounded-md text-white font-bold"
              >
                Send Message
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Contact;
