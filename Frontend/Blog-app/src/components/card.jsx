import React,{useState,useEffect} from 'react';
import axios from 'axios'
import { Link } from 'react-router-dom';

export default function Card({ data }) {
    let shortContent = data.content;
    let shortTitle = data.title;

    if (shortContent.length > 90) {
        shortContent = data.content.substring(0, 90) + "..";
    }

    if (shortTitle.length > 20) {
        shortTitle = data.title.substring(0, 36) + "..";
    }

    let [userdata, setUserdata] =useState({})
    useEffect(()=>{
      async function getdata(){
        const res= await axios.post('http://localhost:3002/user/userinfo-by-uid',{"uid":data.user_id})
        setUserdata(res.data[0])
        
      }
      getdata()
    },[])

    return (
        <div className="max-w-sm bg-gray-50 border border-gray-200 rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-300 ease-in-out overflow-hidden">
            <Link to={`/single-post?id=${data.id}`}>
                <img
                    className="rounded-t-lg h-[14rem] w-[22rem] object-cover hover:scale-105 duration-300 ease-in-out"
                    src={data.image_url}
                    alt="no image"
                />
            </Link>
            <div className="p-5 flex flex-col h-[12rem]">
                <Link to={`/single-post?id=${data.id}`}>
                    <h5 className="mb-1 -mt-4 w-[19rem] text-2xl font-bold tracking-tight text-gray-900">
                        {shortTitle}
                    </h5>
                </Link>
                <p className="mb-2 font-normal w-[19rem] overflow-y-visible overflow-hidden h-[60px] text-gray-700 flex-grow">
                    {shortContent}
                </p>
                <div className="flex justify-between items-center">
                <div className='flex'>
                    <img
                        src={userdata.profileimg}
                        alt="no img"
                        className="rounded-full w-10 h-10"
                    />
                    <p className="text-gray-600 ml-2 mt-1 ">@{userdata.username}</p>
                    </div>
                    <p className="text-gray-500 pr-2">20 July 24</p>
                </div>
            </div>
        </div>
    );
}
