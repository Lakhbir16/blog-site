import { React, useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const YourPost = () => {
  const navigate = useNavigate();
  const token = localStorage.getItem('token');
 

  const [post, setPost] = useState([]);
  let [userdata, setUserdata] =useState('')

  useEffect(() => {
    async function fetchData() {
      try {
        const response = await axios.post('http://localhost:3002/getposts-by-uid',{token});
        setPost(response.data);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    }

   
      async function getdata(){
        const res= await axios.post('http://localhost:3002/user/userinfo',{token})
        setUserdata(res.data[0])
      }

    fetchData()
    getdata()
  
  }, [token]);

  return (
    <div className="max-w-4xl mx-auto p-6">
      <div className="bg-gray-100 rounded-lg p-6 mb-6 flex flex-col items-center">
        <img src={userdata.profileimg} alt="Profile" className="rounded-full w-24 h-24 mb-4" />
        <h2 className="text-xl font-bold">{userdata.name}</h2>
        <p className="text-gray-700">@{userdata.username}</p>
        <p className="text-gray-600 text-center mt-2">{userdata.bio}</p>
        <div className="flex space-x-4 mt-4">
         { userdata.linkedin &&
            <a  href={userdata.linkedin} target="_blank" rel="noopener noreferrer">
              <img 
                src={`https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRokEYt0yyh6uNDKL8uksVLlhZ35laKNQgZ9g&s`} 
                alt="linkdin" 
                className="rounded-full w-8 h-8" 
              />
            </a>}
            { userdata.github &&
              <a  href={userdata.github} target="_blank" rel="noopener noreferrer">
              <img 
                src={`https://github.githubassets.com/assets/GitHub-Mark-ea2971cee799.png`} 
                alt="github" 
                className="rounded-full w-10 h-10 -mt-1.5" 
              />
            </a>}
          {  userdata.twitter &&
            <a  href={ userdata.twitter} target="_blank" rel="noopener noreferrer">
              <img 
                src={`https://img.freepik.com/free-vector/new-2023-twitter-logo-x-icon-design_1017-45418.jpg?size=338&ext=jpg&ga=GA1.1.2008272138.1722384000&semt=ais_hybrid`} 
                alt="X" 
                className="rounded-full w-8 h-8" 
              />
            </a>}
           { userdata.insta &&
            <a  href={userdata.insta} target="_blank" rel="noopener noreferrer">
              <img 
                src={`https://2235233.fs1.hubspotusercontent-na1.net/hubfs/2235233/blog-import/2022/07-22-Jul/every-social-media-logo-and-icon-in-one-handy-place-instagram.png`} 
                alt="social" 
                className="rounded-full w-8 h-8" 
              />
            </a>}
        
        </div>
      </div>

      <h2 className="text-2xl font-bold mb-4">Your Posts</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {post.map((post, index) => (
          <div key={index} className="bg-white rounded-lg shadow-md overflow-hidden relative group flex flex-col">
            <img 
              src={post.image_url} 
              alt="No image" 
              className="cursor-pointer w-full h-48 object-cover transition-all duration-200 ease-in-out group-hover:blur-[1px] group-hover:scale-105" 
              onClick={() => navigate(`/single-post?id=${post.id}`)}
            />
            <div className="p-4 pt-1 flex-grow">
              <h3 className="text-lg font-semibold mb-2">{post.title.length > 40 ? post.title.substring(0, 40) + '...' : post.title}</h3>
            </div>
            <div className="cursor-pointer absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-200">
            <div className='text-transparent justify-center flex align-middle p-52 -mt-16 -z-0 absolute  ml-40 h-[40px]' onClick={()=>{navigate(`/single-post?id=${post.id}`)}}>.</div>
              <button className="bg-blue-500 ml-40 -mt-[240px] hover:bg-blue-700 relative text-white font-bold py-2 px-4 rounded-full shadow-md transition-colors duration-200"
                onClick={() => navigate('/edit' + `?id=${post.id}&uid=${post.user_id}`)}>
                <i className="fas fa-edit"></i> Edit
              </button>
            </div>
            <div className="p-4 border-t mt-auto">
              <p className="text-gray-500 text-sm text-right">{post.created_at.substring(0, 10)}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default YourPost;
