import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const Profile = () => {
  const navigate = useNavigate();

  let [userdata, setUserdata] = useState("");
  let [postdata, setPostdata] = useState([]);
  useEffect(() => {
    const token = localStorage.getItem("token");
    async function getdata() {
      const res = await axios.post("http://localhost:3002/user/userinfo", {
        token,
      });
      console.log(res.data[0]);
      setUserdata(res.data[0]);
    }
    getdata();
  }, []);

  useEffect(() => {
    const token = localStorage.getItem("token");
    async function getdata() {
      const res = await axios.post("http://localhost:3002/getposts-by-uid", {
        token,
      });
  
      setPostdata(res.data);
    }
    getdata();
  }, []);

  return (
    <div className="bg-gray-100 text-gray-800">
      <div className="h-64 md:h-64 bg-blue-500"></div>
      <div className="container mx-auto w-[70rem] -mt-32 px-4">
        <div className="bg-white rounded-lg shadow-lg p-8 flex flex-col items-center justify-center relative">
          <div className="w-40 h-40 bg-gray-300 rounded-full flex items-center justify-center border-4 border-white absolute -top-16 overflow-hidden shadow-lg ">
            <img
              src={userdata.profileimg}
              alt="Profile"
              className="w-full h-full object-cover"
            />
          </div>
          <div className="mt-16 text-center pt-6">
            <h2 className="text-xl font-bold">{userdata.name}</h2>
            <p className="text-gray-500">@{userdata.username}</p>
            <p className="text-gray-500">{userdata.bio}</p>
          </div>
          <div className="flex space-x-4 mt-4">
            {userdata.linkedin && (
              <a
                href={userdata.linkedin}
                target="_blank"
                rel="noopener noreferrer"
              >
                <img
                  src={`https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRokEYt0yyh6uNDKL8uksVLlhZ35laKNQgZ9g&s`}
                  alt="linkdin"
                  className="rounded-full w-8 h-8"
                />
              </a>
            )}
            {userdata.github && (
              <a
                href={userdata.github}
                target="_blank"
                rel="noopener noreferrer"
              >
                <img
                  src={`https://github.githubassets.com/assets/GitHub-Mark-ea2971cee799.png`}
                  alt="github"
                  className="rounded-full w-10 h-10 -mt-1.5"
                />
              </a>
            )}
            {userdata.twitter && (
              <a
                href={userdata.twitter}
                target="_blank"
                rel="noopener noreferrer"
              >
                <img
                  src={`https://cdn2.iconfinder.com/data/icons/social-media-2285/512/1_Twitter_colored_svg-1024.png`}
                  alt="X"
                  className=" w-8 h-8"
                />
              </a>
            )}
            {userdata.insta && (
              <a
                href={userdata.insta}
                target="_blank"
                rel="noopener noreferrer"
              >
                <img
                  src={`https://upload.wikimedia.org/wikipedia/commons/thumb/a/a5/Instagram_icon.png/768px-Instagram_icon.png`}
                  alt="social"
                  className="rounded-full w-8 h-8"
                />
              </a>
            )}
          </div>
          <button
            onClick={() => {
              navigate("/profile-edit");
            }}
            className="absolute top-4 right-4 bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded "
          >
            Edit Profile
          </button>
        </div>
      </div>
      <div className="container mx-auto mt-8 px-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="bg-white rounded-lg shadow-lg p-8 mb-10">
            <h3 className="text-xl font-bold mb-4">Statistics</h3>
            <div className="space-y-4">
              <div>
                <h4 className="font-bold">Total Posts</h4>
                <p>42</p>
              </div>
              <div>
                <h4 className="font-bold">Total Likes</h4>
                <p>1,234</p>
              </div>
              <div>
                <h4 className="font-bold">Total Comments</h4>
                <p>567</p>
              </div>
            </div>
          </div>
          <div className="col-span-2 bg-white rounded-lg shadow-lg p-8 overflow-y-auto max-h-screen mb-10">
            <h3 className="text-xl font-bold mb-4">Blog Posts</h3>
            <div className="space-y-4 max-h-96 overflow-y-scroll">
              {Array.isArray(postdata) &&
                postdata.map((data, index) => (
                  <div
                    key={data.id}
                    className="p-4 border rounded-lg shadow hover:shadow-md transition-shadow" >
                    <h4 className="font-bold">{data.title}</h4>
                    <p>{data.content.substring(0, 120)}</p>
                  </div>
                ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
