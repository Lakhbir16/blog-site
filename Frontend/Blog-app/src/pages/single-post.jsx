import React, { useState ,useEffect } from 'react'
import { useSearchParams} from 'react-router-dom';
import axios from 'axios'

export default function Spost() {

  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [category, setCategory] = useState('Technology');
  const [imageUrl, setImageUrl] = useState('');
  let [userdata, setUserdata] =useState({})
  let uid='1'

    const blog = {
        title: "The Future of Technology",
        author: {
          name: "John Doe",
          profilePic: "https://pics.craiyon.com/2023-10-25/b65f72d6d11a48c1bc560059cc36e31f.webp", // Placeholder for user profile picture
        },
        publishDate: "July 19, 2024",
        image: "https://www.srishticampus.com/packageImages/MERN-Stack-considered-the-Best-for-Developing-Web-Apps.png", // Placeholder for blog image
        content: `
          Technology is evolving at an unprecedented pace. From artificial intelligence to blockchain, the innovations we see today are shaping the future. In this blog, we will explore the latest trends in technology and how they impact our daily lives. 
          
          As we dive deeper into the digital age, understanding these technologies becomes essential for everyone. Whether you are a tech enthusiast or someone who just wants to stay informed, this blog aims to provide valuable insights.
        `,
      };
    let [searchParams,setSearchParams]=useSearchParams()
  


    let id=searchParams.get('id');
    
    useEffect(()=>{
      async function fetchdata(){
             let response = await axios.post('http://localhost:3002/getpost-by-id',{id})
             setTitle(response.data.result[0].title)
             setContent(response.data.result[0].content)
             setImageUrl(response.data.result[0].image_url)
             setCategory(response.data.result[0].category)
             console.log(response.data.result[0].user_id)

             uid=response.data.result[0].user_id
            async function getdata(){
              const res= await axios.post('http://localhost:3002/user/userinfo-by-uid',{"uid":uid})
              setUserdata(res.data[0])
              
            }
            getdata()
             
       }
   
       fetchdata()
   },[])


  return (
<div>
    <div className="max-w-2xl mx-auto p-6">
      <div className="inline-block bg-blue-500 text-white rounded-full px-4 py-2 font-bold">
        {category}
      </div>
      <h1 className="text-3xl font-bold mt-4 mb-2">{title}</h1>
      <div className="flex items-center mt-2 mb-4">
        <img src={userdata.profileimg} alt="Profile" className="rounded-full w-12 h-12 mr-3" />
        <div className="flex flex-col">
          <span className="font-semibold">{userdata.name}</span>
          <span className="text-gray-500 text-sm">{blog.publishDate}</span>
        </div>
      </div>
      <img src={imageUrl} alt="Blog" className="w-full rounded-lg mb-4" />
      <div className="text-lg leading-relaxed">
        {content}
      </div>
    </div>
  );



</div>
  )
}
