import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

const Hero = ({ posts }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [fade, setFade] = useState(true);
  const [userdata, setUserdata] = useState({});

  useEffect(() => {
    const interval = setInterval(() => {
      setFade(false);
      setTimeout(() => {
        setCurrentIndex((prevIndex) => (prevIndex + 1) % posts.length);
        getdata(posts[currentIndex].user_id);
        setFade(true);
      }, 1000);
    }, 8000);

    return () => clearInterval(interval);
  }, [posts.length, currentIndex]);

  if (posts.length === 0) return null;

  const getdata = async (uid) => {
    try {
      const res = await axios.post('http://localhost:3002/user/userinfo-by-uid', { uid });
      setUserdata(res.data[0]);
    } catch (error) {
      console.error('Error fetching user data:', error);
    }
  };

  return (
    <div className="justify-center flex  ">
      <div className="relative h-[26rem] w-[70rem] mt-6 bg-black rounded-3xl bg-cover bg-center overflow-hidden ">
        <div className={`absolute inset-0 transition-opacity duration-1000 ${fade ? 'opacity-100' : 'opacity-0'}  `}>
        <img src={posts[currentIndex].image_url} alt={posts[currentIndex].title} className="w-full h-full object-cover " />
          <div className="absolute inset-0 bg-gray-700 opacity-0 "></div>
        </div>
      </div>
      <div className={`absolute mt-20 inset-0 transition-opacity duration-1000 ${fade ? 'opacity-100' : 'opacity-0'}`}>
        <div className="absolute bottom-44 left-60 z-10 bg-gray-800 bg-opacity-90 p-4 px-8 min-w-[25rem] min-h-44 rounded-2xl">
            <p className="bg-blue-200 absolute top-3 p-0.5 px-2 rounded-full">{posts[currentIndex].category}</p>
            <h1 className="text-2xl text-white pt-8 ">{posts[currentIndex].title}</h1>
            <div className="flex items-center mt-6 text-white">
              <img src={userdata.profileimg} alt="Profile" className="rounded-full h-11 w-11" />
              <p className="ml-2">{userdata.name}</p>
              <p className="ml-4">{posts[currentIndex].date}</p>
            </div>
          </div>
      </div>
    </div>
  );
};

export default Hero;
