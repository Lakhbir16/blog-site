import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Link ,useNavigate} from 'react-router-dom';

const BlogPage = () => {
  const navigate=useNavigate();
    const [blog,setBlog]=useState([])
    useEffect(()=>{   
       async function fetchdata(){
       try { const response = await axios.get('http://localhost:3002/getposts')
        setBlog(response.data);
    }catch(err){
        console.log(err)
    }    }

          
          fetchdata()
    },[])

    useEffect(() => {
      window.scrollTo(0, 0);
    }, []);
    
  return (
    <div className="bg-gray-100 min-h-screen">
      <div className="max-w-4xl mx-auto py-8">
        <h1 className="text-4xl font-bold mb-4">Latest Blogs</h1>
     {
        blog.map(data =>(
            
            <div className="space-y-4 py-5" id={data.id} >
            <div className="bg-white rounded-lg shadow-md overflow-hidden">
              <img src={data.image_url} onClick={()=>navigate(`/single-post?id=${data.id}`)} alt="Blog 1" className="w-full h-80 object-cover hover:scale-105 cursor-pointer duration-300" />
              <div className="p-4">
                <h2 className="text-xl font-bold mb-2">{
                     data.title.length>80 ? data.title.substring(0,80) +".." :data.title
                    }</h2>
                <p className="text-gray-600 mb-4">{
                    data.content.length>180 ? data.content.substring(0,180) + "..." :data.content
                    }</p>
                 <Link to={`/single-post?id=${data.id}`} className="text-blue-500 hover:underline">Read More  </Link>
             
              </div>
            </div>
            </div>
        ))
     }
        
    
      </div>
    </div>
  );
};

export default BlogPage;
