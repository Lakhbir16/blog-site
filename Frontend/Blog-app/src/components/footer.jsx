import React, { useState } from 'react';

const Footer = () => {
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');

  const handleSubscribe = (e) => {
    e.preventDefault();
    if (!email) {
      setMessage('Please enter a valid email address.');
      return;
    }
    // Here you can handle the subscription logic (e.g., API call)
    setMessage(`Thank you for subscribing with ${email}!`);
    setEmail('');
  };

  return (
    <footer className="bg-gray-800 text-white p-6 pt-14">
      <div className="container mx-auto grid grid-cols-1 md:grid-cols-4 gap-6">
        {/* About Section */}
        <div className=" rounded-lg p-5">
        <h2 className="text-lg font-semibold mb-4">About Us</h2>
          <p className="mb-2">
            🚀 Welcome to our blog! We are your go-to source for the latest insights and trends in the world of cryptocurrency. 
            Whether you're a seasoned investor or just starting out, our posts aim to provide valuable information and resources 
            for all things related to coins and blockchain technology.
          </p>
          <p className="mb-6">
            🌐 Join our community of crypto enthusiasts and stay ahead of the curve!
          </p>
          <p className="mb-1">
            📧 Email: <a href="mailto:info@yourblog.com" className="hover:underline">info@yourblog.com</a>
          </p>
          <p>
            📞 Phone: <span className="hover:underline">(123) 456-7890</span>
          </p>
        </div>

        {/* Quick Links Section */}
        <div className=" rounded-lg p-5 pl-20">
          <h2 className="text-lg font-semibold mb-4">Quick Links</h2>
          <ul>
            <li className="mb-2"><a href="#" className="hover:underline">Home</a></li>
            <li className="mb-2"><a href="#" className="hover:underline">About</a></li>
            <li className="mb-2"><a href="#" className="hover:underline">Blog</a></li>
            <li className="mb-2"><a href="#" className="hover:underline">Author</a></li>
            <li className="mb-2"><a href="#" className="hover:underline">Contact</a></li>
          </ul>
        </div>

        {/* Categories Section */}
        <div className=" rounded-lg p-5">
          <h2 className="text-lg font-semibold mb-4">Categories</h2>
          <ul>
            <li className="mb-2"><a href="#" className="hover:underline">Technology</a></li>
            <li className="mb-2"><a href="#" className="hover:underline">Coding</a></li>
            <li className="mb-2"><a href="#" className="hover:underline">Lifestyle</a></li>
            <li className="mb-2"><a href="#" className="hover:underline">Travel</a></li>
            <li className="mb-2"><a href="#" className="hover:underline">Food</a></li>
          </ul>
        </div>

        {/* Subscribe Section */}
        <div className="bg-gray-700 rounded-lg p-5 h-48">
          <h2 className="text-lg font-semibold ">Subscribe to Our Newsletter</h2>
          <p className='pb-4'>Get blogs via email</p>
          <form onSubmit={handleSubscribe}>
            <input
              type="email"
              placeholder="Your Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="p-2 rounded-lg border outline-none text-gray-700 border-gray-300 mb-2 w-full"
              required
            />
            <button
              type="submit"
              className="bg-blue-500 text-white p-2 rounded-md w-full"
            >
              Subscribe
            </button>
          </form>
          {message && <p className="mt-2 text-sm">{message}</p>}
        </div>
      </div>

      <div className="text-center mt-6">
        <p className="text-sm">&copy; {new Date().getFullYear()} Your Blog Name. All rights reserved.</p>
      </div>
    </footer>
  );
};

export default Footer;
