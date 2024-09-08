import React, { useState } from 'react';
import axios from 'axios';
import {useNavigate} from 'react-router-dom'

const LoginPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [tokenValue,setTokenValue]=useState('')
  const nevigate=useNavigate()
  const data = {
    email,
    password,
  };

  async function handleSubmit(event) {
    event.preventDefault();
    setErrorMessage('');

    try {
      const res = await axios.post('http://localhost:3002/user/login', data);
     if( res.data.token){
      setTokenValue(res.data.token)
      localStorage.setItem('token',  res.data.token);
      setTimeout(() => {
      nevigate('/')
         
      }, 500);
     }

     
    } catch (error) {
      if (error.response) {
        console.error('Error:', error.response.data.message);
        setErrorMessage(error.response.data.message);
      } else if (error.request) {
        console.error('Error: No response received', error.request);
        setErrorMessage('No response from server. Please try again later.');
      } else {
        console.error('Error:', error.message);
        setErrorMessage('An unexpected error occurred. Please try again later.');
      }
    }
  }

  return (
    <div className="flex justify-center items-center h-screen bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500">
      <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-md">
        <h2 className="text-2xl font-bold mb-4 text-center">Login</h2>

        {errorMessage && (
          <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded-md mb-4">
            <strong className="font-bold">Error:</strong> {errorMessage}
          </div>
        )}

        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label htmlFor="email" className="block font-medium mb-2">
              Email
            </label>
            <input
              type="email"
              onChange={(e) => setEmail(e.target.value)}
              value={email}
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
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              id="password"
              name="password"
              className="border border-gray-300 rounded-md px-4 py-2 w-full focus:outline-none focus:ring-2 focus:ring-indigo-500"
              placeholder="Enter your password"
              required
            />
          </div>
          <button
            type="submit"
            className="bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 text-white font-medium py-2 px-4 rounded-md hover:from-indigo-600 hover:via-purple-600 hover:to-pink-600 w-full"
          >
            Login
          </button>
        </form>

        <div className="mt-4 text-center">
          <a href="#" className="text-indigo-500 hover:text-indigo-600">
            Forgot password?
          </a>
        </div>
        <div className="mt-2 text-center">
          <p className="text-gray-600">
            Don't have an account?{' '}
            <a href="/sign-up" className="text-indigo-500 hover:text-indigo-600">
              Sign up
            </a>
          </p>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
