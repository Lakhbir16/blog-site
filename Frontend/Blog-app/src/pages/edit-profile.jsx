import axios from 'axios';
import React, { useState, useEffect } from 'react';

const EditProfile = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [bio, setBio] = useState(''); 
  const [profilePicUrl, setProfilePicUrl] = useState(''); 
  const [linkedin, setLinkedin] = useState('');
  const [twitter, setTwitter] = useState('');
  const [github, setGithub] = useState('');
  const [instagram, setInstagram] = useState('');
  const [message,setMessage]=useState('')

  async function handleSubmit(e) {
    e.preventDefault();
    const res = await axios.post('http://localhost:3002/user/new-userdata', { email, password, name, bio, profilePicUrl, linkedin, twitter, github, instagram });
    console.log(res.data.message)
    setMessage(res.data.message);
  
  };

  const token = localStorage.getItem('token');

  useEffect(() => {
    async function userdata() {
      const res = await axios.post('http://localhost:3002/user/userinfo', { token });
      console.log(res.data[0]);
      setEmail(res.data[0].email);
      setName(res.data[0].name);
      setBio(res.data[0].bio);
      setProfilePicUrl(res.data[0].profileimg);
      setLinkedin(res.data[0].linkedin);
      setGithub(res.data[0].github);
      setInstagram(res.data[0].insta);
      setTwitter(res.data[0].twitter);
      setProfilePicUrl(res.data[0].profileimg)
    }
    userdata();
  }, [token]);

  return (
    <div className="container mx-auto mt-0 my-8 p-6 bg-gray-200">
      <h1 className="text-3xl font-bold mb-6 text-center">Edit Profile</h1>
      
      <div className="bg-white rounded-lg shadow-lg p-6 mb-6 max-w-2xl mx-auto">
       
       <div className='flex'>
       <h2 className="text-2xl font-semibold mb-4">User Details</h2>

       { message &&
         <div id="toast-simple" class="ml-32 flex items-center w-full max-w-xs p-4 space-x-4  rtl:space-x-reverse text-gray-700 bg-green-200 rounded-lg shadow " role="alert">
    
         <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m9 17 8 2L9 1 1 19l8-2Zm0 0V9"/>
   
         <div class="ps-4 text-[18px] font-normal">{message}</div>
 </div>
       }


       </div>
       
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label htmlFor="name" className="block text-lg font-semibold mb-1">
              Name
            </label>
            <input
              type="text"
              id="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="border border-gray-300 rounded-lg px-4 py-2 w-full focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Enter your name"
            />
          </div>
          <div>
            <label htmlFor="email" className="block text-lg font-semibold mb-1">
              Email
            </label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="border border-gray-300 rounded-lg px-4 py-2 w-full focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Enter your email"
            />
          </div>
          <div>
            <label htmlFor="password" className="block text-lg font-semibold mb-1">
              Password
            </label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="border border-gray-300 rounded-lg px-4 py-2 w-full focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Enter your password"
            />
          </div>
          <div>
            <label htmlFor="bio" className="block text-lg font-semibold mb-1">
              Bio
            </label>
            <textarea
              id="bio"
              value={bio}
              onChange={(e) => setBio(e.target.value)}
              className="border border-gray-300 rounded-lg px-4 py-2 w-full focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Tell us about yourself"
              rows="3"
            />
          </div>
          <div className="flex items-center space-x-4">
            <div className="w-20 h-20 rounded-full overflow-hidden">
              {profilePicUrl ? (
                <img
                  src={profilePicUrl}
                  alt="Profile"
                  className="w-full h-full object-cover"
                />
              ) : (
                <img
                  src="https://via.placeholder.com/150"
                  alt="Default Profile"
                  className="w-full h-full object-cover"
                />
              )}
            </div>
            <div className="flex-1">
              <label htmlFor="profilePicUrl" className="block text-lg font-semibold mb-1">
                Profile Picture URL
              </label>
              <input
                type="text"
                id="profilePicUrl"
                value={profilePicUrl}
                onChange={(e) => setProfilePicUrl(e.target.value)}
                className="border border-gray-300 rounded-lg px-4 py-2 w-full focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Enter profile picture URL"
              />
            </div>
          </div>
        </form>
      </div>

      <div className="bg-white rounded-lg shadow-lg p-6 mb-6 max-w-2xl mx-auto">
        <h2 className="text-2xl font-semibold mb-4">Social Media Links</h2>
        <div className="space-y-4">
          {[
            { name: 'LinkedIn', value: linkedin, setValue: setLinkedin, logo: 'https://cdn2.iconfinder.com/data/icons/social-media-2285/512/1_Linkedin_unofficial_colored_svg-1024.png' },
            { name: 'Twitter', value: twitter, setValue: setTwitter, logo: 'https://cdn2.iconfinder.com/data/icons/social-media-2285/512/1_Twitter_colored_svg-1024.png' },
            { name: 'GitHub', value: github, setValue: setGithub, logo: 'https://github.githubassets.com/assets/GitHub-Mark-ea2971cee799.png' },
            { name: 'Instagram', value: instagram, setValue: setInstagram, logo: 'https://upload.wikimedia.org/wikipedia/commons/thumb/a/a5/Instagram_icon.png/768px-Instagram_icon.png' },
          ].map((social, index) => (
            <div key={index} className="flex items-center space-x-3">
              <img src={social.logo} alt={`${social.name} logo`} className="h-8 w-8 mt-6" />
              <div className="flex-1">
                <label htmlFor={social.name.toLowerCase()} className="block text-lg font-semibold mb-1">
                  {social.name}
                </label>
                <input
                  type="text"
                  id={social.name.toLowerCase()}
                  value={social.value}
                  onChange={(e) => social.setValue(e.target.value)}
                  className="border border-gray-300 rounded-lg px-4 py-2 w-full focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder={`${social.name} Profile URL`}
                />
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="flex justify-center mt-6">
        <button
          type="submit"
          onClick={handleSubmit}
          className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-6 rounded-lg transition duration-200 w-full max-w-2xl"
        >
          Save Changes
        </button>
      </div>
    </div>
  );
};

export default EditProfile;
