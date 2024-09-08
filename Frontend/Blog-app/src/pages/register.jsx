import { React, useState } from 'react';
import axios from 'axios';
import { useNavigate} from 'react-router-dom'
import SuccessMessage from '../components/success-msg';

const SignUpPage = () => {
  const navigate=useNavigate();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [username, setUsername] = useState('');
  const [password, setPass] = useState('');
  const [msg,setMsg]=useState()
  const data = {
    name,
    email,
    username,
    password,
  };

  const handleSubmit = async () => {
    try {
     let res= await axios.post('http://localhost:3002/user/register', data);
     setMsg(res.data)
     setTimeout(() => {
      navigate('/login');
    }, 1000);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="flex justify-center items-center h-screen bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500">
      <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-md">
        <h2 className="text-2xl font-bold mb-6 text-center">Sign Up</h2>
        {  msg ? <SuccessMessage message={msg} /> : '' }
          <div className="mb-4">
            <label htmlFor="name" className="block font-medium mb-2">
              Name
            </label>
            <input
              onChange={(e) => setName(e.target.value)}
              value={name}
              type="text"
              id="name"
              name="name"
              className="border border-gray-300 rounded-md px-4 py-2 w-full focus:outline-none focus:ring-2 focus:ring-indigo-500"
              placeholder="Enter your name"
              required
            />
          </div>
          <div className="mb-4">
            <label htmlFor="username" className="block font-medium mb-2">
              Username
            </label>
            <input
              onChange={(e) => setUsername(e.target.value)}
              value={username}
              type="text"
              id="username"
              name="username"
              className="border border-gray-300 rounded-md px-4 py-2 w-full focus:outline-none focus:ring-2 focus:ring-indigo-500"
              placeholder="Choose a username"
              required
            />
          </div>
          <div className="mb-4">
            <label htmlFor="email" className="block font-medium mb-2">
              Email
            </label>
            <input
              onChange={(e) => setEmail(e.target.value)}
              value={email}
              type="email"
              id="email"
              name="email"
              className="border border-gray-300 rounded-md px-4 py-2 w-full focus:outline-none focus:ring-2 focus:ring-indigo-500"
              placeholder="Enter your email"
              required
            />
          </div>
          <div className="mb-4">
            <label htmlFor="password" className="block font-medium mb-2">
              Password
            </label>
            <input
              onChange={(e) => setPass(e.target.value)}
              value={password}
              type="password"
              id="password"
              name="password"
              className="border border-gray-300 rounded-md px-4 py-2 w-full focus:outline-none focus:ring-2 focus:ring-indigo-500"
              placeholder="Create a password"
              required
            />
          </div>
          <button
            onClick={handleSubmit}
            className="bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 text-white font-medium py-2 px-4 rounded-md hover:from-indigo-600 hover:via-purple-600 hover:to-pink-600 w-full"
          >
            Sign Up
          </button>
        <div className="mt-4 text-center">
          <p className="text-gray-600">
            Already have an account?{' '}
            <a href="/login" className="text-indigo-500 hover:text-indigo-600">
              Login
            </a>
          </p>
        </div>
      </div>
    </div>
  );
};

export default SignUpPage;
