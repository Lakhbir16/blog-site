import { React, useEffect, useState } from 'react';
import axios from 'axios';
import Card from '../components/card.jsx';
import Hero from '../components/hero.jsx'; // Import the Hero component

export default function Home() {
  const [postdata, setPostdata] = useState([]);

  useEffect(() => {
    async function fetchdata() {
      try {
        let response = await axios.get('http://localhost:3002/getposts');
        setPostdata(response.data);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    }

    fetchdata();
  }, []);

  return (
    <div className="bg-gray-200 h-auto pb-[15rem] w-full">
      <Hero posts={postdata} /> 
      <div className="flex justify-center pt-20 text-3xl font-sans">
        <p>Latest Post</p>
      </div>
      <div className="pt-10 ml-32 flex flex-wrap justify-start gap-4 h-auto pb-10 pl-10 w-[80rem]">
        {postdata.map(post => (
          <Card key={post.id} data={post} />
        ))}
      </div>
    </div>
  );
}
