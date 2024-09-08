import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useSearchParams } from 'react-router-dom';

const EditPost = () => {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [category, setCategory] = useState('Technology');
  const [imageUrl, setImageUrl] = useState('');
  const [message, setMessage] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();

    const newData = {
      title,
      content,
      category,
      imageUrl,
      id
    };
   
     await axios.post('http://localhost:3002/editpostdata',newData)


  };

//   ---------------------------------------fetch data=------------------------------------
const [searchParams, setSearchParams] = useSearchParams();

  const id = searchParams.get('id')
  const uid = searchParams.get('uid')
  

useEffect(()=>{
   async function fetchdata(){
          let response = await axios.post('http://localhost:3002/getpost-by-id',{id,uid})
          setTitle(response.data.result[0].title)
          setContent(response.data.result[0].content)
          setImageUrl(response.data.result[0].image_url)
          setCategory(response.data.result[0].category)
          console.log(response.data.result[0].title)
    }

    fetchdata()
},[])

  

  return (
    <div className="max-w-2xl mx-auto p-6 bg-white rounded-lg shadow-lg mt-16 mb-20 ">
      <h2 className="text-3xl font-bold mb-4 text-center ">Edit Your Post</h2>
      {message && <p className="text-green-500 mb-4 text-center">{message}</p>}
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2 " htmlFor="title">
            Title
          </label>
          <input
            type="text"
            id="title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
            className="shadow-md appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:ring focus:ring-blue-300"
            placeholder="Enter post title"
          />
        </div>

        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="content">
            Content
          </label>
          <textarea
            id="content"
            value={content}
            onChange={(e) => setContent(e.target.value)}
            required
            rows="6"
            className="shadow-md appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:ring focus:ring-blue-300"
            placeholder="Write your post content here"
          />
        </div>

        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="category">
            Category
          </label>
          <select
            id="category"
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            className="shadow-md appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:ring focus:ring-blue-300"
          >
            <option value="Technology">Technology</option>
            <option value="Coding">Coding</option>
            <option value="Lifestyle">Lifestyle</option>
            <option value="Travel">Travel</option>
            <option value="Food">Food</option>
          </select>
        </div>

        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="imageUrl">
            Cover Image URL
          </label>
          <input
            type="url"
            id="imageUrl"
            value={imageUrl}
            onChange={(e) => setImageUrl(e.target.value)}
            className="shadow-md appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:ring focus:ring-blue-300"
            placeholder="Enter image URL"
          />
        </div>

        <button
          type="submit"
          className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline w-full"
        >
          Publish
        </button>
      </form>
    </div>
  );
};

export default EditPost;
