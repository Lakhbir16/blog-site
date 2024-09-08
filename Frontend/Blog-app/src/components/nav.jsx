import axios from 'axios';
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

export default function Nav() {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [userdata, setUserdata] = useState(null); // Initialize as null
  const navigate = useNavigate();

  const toggleDropdown = () => {
    setIsDropdownOpen((prev) => !prev);
  };

  const handleClickOutside = (event) => {
    const dropdown = document.getElementById('user-dropdown');
    if (dropdown && !dropdown.contains(event.target)) {
      setIsDropdownOpen(false);
    }
  };

  useEffect(() => {
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const token = localStorage.getItem('token');
  
  useEffect(() => {
    async function getdata() {
      if (token) {
        const res = await axios.post('http://localhost:3002/user/userinfo', { token });
        setUserdata(res.data[0]);
      }
    }
    getdata();
  }, [token]);

  function signout() {
    localStorage.removeItem('token');
    setTimeout(() => {
      navigate("/");
    }, 100);
  }

  const loggedin = !!token;

  return (
    <div >
      <nav className="bg-gray-50 ">
        <div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4">
          <a href="#" className="flex items-center space-x-3 rtl:space-x-reverse">
            <span className="text-white font-semibold bg-black w-[70px] h-10 justify-center flex -ml-[4.5rem] absolute rounded-lg">
              <p className="text-white mt-1 text-3xl font-mono ">DEV</p>
            </span>
          </a>
          <div className="flex items-center md:order-2 space-x-3 md:space-x-0 rtl:space-x-reverse">
            {loggedin ? 
              <button
                type="button"
                className="border-blue-600 border-[1.5px] text-blue-600 hover:bg-blue-600 font- hover:text-white py-2 -ml-20 mr-10 px-6 rounded-lg relative hover:underline"
                onClick={() => navigate('/new')}
              >
                Create Post
              </button>
              :
              <button
                type="button"
                className="border-blue-600 border-[1.5px] text-blue-600 hover:bg-blue-600 font- hover:text-white py-2 -ml-20 mr-10 px-6 rounded-lg relative hover:underline"
                onClick={() => navigate('/login')}
              >
                Login / Sign Up
              </button>
            }

            {loggedin && userdata && (
              <button
                type="button"
                className="flex text-sm bg-gray-800 rounded-full md:me-0 focus:ring-4 focus:ring-gray-300"
                onClick={toggleDropdown}
              >
                <span className="sr-only">Open user menu</span>
                <img
                  className="w-8 h-8 rounded-full"
                  src={userdata.profileimg}
                  alt="user photo"
                />
              </button>
            )}

            {isDropdownOpen && (
              <div className="z-50 w-[13rem] pb-5 my-4 absolute mt-[23rem] right-[4%] text-base list-none bg-white divide-y divide-gray-100 rounded-lg shadow" id="user-dropdown">
                {userdata && (
                  <div className="px-4 py-4 ml-2 mt-2 mb-3 hover:bg-blue-50 hover:text-blue-600 hover:underline hover:cursor-pointer hover:rounded-lg hover:w-[12rem] h-[4rem]">
                    <span className="block text-lg text-gray-900 -mt-3">{userdata.name}</span>
                    <span className="block text-base text-gray-500 truncate">{userdata.email}</span>
                  </div>
                )}
                <ul className="py-2 cursor-pointer" aria-labelledby="user-menu-button">
                  <li>
                    <a href="/profile" className="block ml-2 px-4 py-2 text-[16px] text-gray-700 hover:bg-blue-50 hover:text-blue-600 hover:underline hover:rounded-lg hover:w-[12rem]">Profile</a>
                  </li>
                  <li>
                    <a href="/dashboard" className="block ml-2 px-4 py-2 text-[16px] text-gray-700 hover:bg-blue-50 hover:text-blue-600 hover:underline hover:rounded-lg hover:w-[12rem]">Dashboard</a>
                  </li>
                  <li>
                    <a href="#" className="block ml-2 px-4 py-2 text-[16px] text-gray-700 hover:bg-blue-50 hover:text-blue-600 hover:underline hover:rounded-lg hover:w-[12rem]">Earnings</a>
                  </li>
                  <li>
                    <a className="block ml-2 px-4 py-2 text-[16px] text-gray-700 hover:bg-blue-50 hover:text-blue-600 hover:underline hover:rounded-lg hover:w-[12rem]" onClick={signout}>Sign out</a>
                  </li>
                </ul>
              </div>
            )}
            <button
              data-collapse-toggle="navbar-user"
              type="button"
              className="inline-flex items-center p-2 w-10 h-10 justify-center text-sm text-gray-500 rounded-lg md:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200"
              aria-controls="navbar-user"
              aria-expanded="false"
            >
              <span className="sr-only">Open main menu</span>
              <svg className="w-5 h-5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 17 14">
                <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M1 1h15M1 7h15M1 13h15" />
              </svg>
            </button>
          </div>
          <div className="items-center justify-between hidden w-full md:flex md:w-auto md:order-1" id="navbar-user">
            <ul className="flex cursor-pointer flex-col font-medium p-4 md:p-0 mt-4 border border-gray-100 rounded-lg bg-gray-50 md:space-x-8 rtl:space-x-reverse md:flex-row md:mt-0 md:border-0 md:bg-white">
              <li>
                <a href="/" className="block py-2 px-3 text-white bg-blue-700 rounded md:bg-transparent md:text-blue-700 md:p-0" aria-current="page">Home</a>
              </li>
              <li>
                <a href="/blog" className="block py-2 px-3 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:hover:text-blue-700 md:p-0">Blog</a>
              </li>
              {loggedin && (
                <>
                  <li>
                    <a href="my-post" className="block py-2 px-3 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:hover:text-blue-700 md:p-0">My posts</a>
                  </li>
                  <li>
                    <a href="/dashboard" className="block py-2 px-3 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:hover:text-blue-700 md:p-0">Dashboard</a>
                  </li>
                </>
              )}
              <li>
                <a href="/contact" className="block py-2 px-3 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:hover:text-blue-700 md:p-0">Contact</a>
              </li>
            </ul>
          </div>
        </div>
      </nav>
    </div>
  );
}
