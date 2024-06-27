import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import ReactMarkdown from 'react-markdown';

const PostDetail = () => {
  const { id } = useParams();
  const [post, setPost] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchPost = async () => {
      try {
        const response = await axios.get(`${process.env.REACT_APP_API_BASE_URL}/api/posts/${id}`);
        setPost(response.data);
      } catch (error) {
        setError(error.response?.data?.error || error.message);
      }
    };

    fetchPost();
  }, [id]);

  if (error) {
    return <div>Error: {error}</div>;
  }

  if (!post) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <h1 className="text-3xl font-bold">{post.title}</h1>
      <p className="text-sm text-gray-500">By: {post.author.name}</p>
      <ReactMarkdown>{post.content}</ReactMarkdown>
      <p className="text-xs text-gray-400">Created at: {new Date(post.createdAt).toLocaleString()}</p>
    </div>
  );
};

export default PostDetail;
