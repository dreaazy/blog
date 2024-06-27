import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import ReactMarkdown from 'react-markdown';

const PostsList = () => {
  const [posts, setPosts] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const response = await axios.get(`${process.env.REACT_APP_API_BASE_URL}/api/posts`);
        setPosts(response.data);
      } catch (error) {
        setError(error.response?.data?.error || error.message);
      }
    };

    fetchPosts();
  }, []);

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <div className='px-36'>
      <h1 className="text-3xl">Posts</h1>
      <ul >
        {posts.map((post) => (
          <li key={post._id} className="post-item border-b-2 py-4">
            <Link to={`/posts/${post._id}`} className="text-xl font-bold text-blue-500">
              {post.title}
            </Link>
            <p className="text-sm text-gray-500">By: {post.author.name}</p>
            <ReactMarkdown>{post.content}</ReactMarkdown>
            <p className="text-xs text-gray-400">Created at: {new Date(post.createdAt).toLocaleString()}</p>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default PostsList;
