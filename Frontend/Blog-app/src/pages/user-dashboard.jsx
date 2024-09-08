import React, { useState } from 'react';

const UserDashboard = () => {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [posts, setPosts] = useState([
    { id: 1, title: 'First Post', content: 'This is the content of the first post.', likes: 0 },
    { id: 2, title: 'Second Post', content: 'This is the content of the second post.', likes: 0 },
  ]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!title || !content) return;

    const newPost = {
      id: posts.length + 1,
      title,
      content,
      likes: 0,
    };

    setPosts([...posts, newPost]);
    setTitle('');
    setContent('');
  };

  const handleLike = (id) => {
    setPosts(posts.map(post => 
      post.id === id ? { ...post, likes: post.likes + 1 } : post
    ));
  };

  return (
    <div className="flex">
      {/* Sidebar */}
      <div className="w-64 bg-white shadow-md h-screen p-5">
        <h2 className="text-xl font-semibold mb-5">Dashboard</h2>
        <ul>
          <li className="mb-3"><a href="/my-post" className="text-blue-500">My Posts</a></li>
          <li className="mb-3"><a href="/profile" className="text-blue-500">Profile</a></li>
          <li className="mb-3"><a href="#" className="text-blue-500">Settings</a></li>
          <li className="mb-3"><a href="#" className="text-blue-500">Logout</a></li>
        </ul>
      </div>

      {/* Main Content */}
      <div className="flex-1 p-6 bg-gray-100">
        <h1 className="text-2xl font-bold mb-4">User Dashboard</h1>

        {/* Create Post Form */}
        <div className="bg-white p-5 rounded shadow-md mb-6">
          <h2 className="text-xl font-semibold mb-4">Create New Post</h2>
          <form onSubmit={handleSubmit}>
            <input
              type="text"
              placeholder="Post Title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="w-full p-2 mb-4 border rounded"
              required
            />
            <textarea
              placeholder="Post Content"
              value={content}
              onChange={(e) => setContent(e.target.value)}
              className="w-full p-2 mb-4 border rounded"
              required
            />
            <button
              type="submit"
              className="w-full bg-blue-500 text-white p-2 rounded"
            >
              Create Post
            </button>
          </form>
        </div>

        {/* Total Posts Count */}
        <div className="bg-white p-5 rounded shadow-md mb-6">
          <h2 className="text-xl font-semibold mb-4">Total Posts</h2>
          <p className="text-lg">{posts.length} Posts</p>
        </div>

        {/* Post List */}
        <div className="bg-white p-5 rounded shadow-md">
          <h2 className="text-xl font-semibold mb-4">My Posts</h2>
          <ul>
            {posts.map((post) => (
              <li key={post.id} className="border-b py-2 flex justify-between items-center">
                <div>
                  <h3 className="font-bold">{post.title}</h3>
                  <p>{post.content}</p>
                </div>
                <div className="flex items-center">
                  <button
                    onClick={() => handleLike(post.id)}
                    className="bg-blue-500 text-white px-2 py-1 rounded mr-2"
                  >
                    Like
                  </button>
                  <span>{post.likes} Likes</span>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default UserDashboard;
