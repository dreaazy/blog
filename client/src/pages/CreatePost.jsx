import React, { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import MdEditor from "react-markdown-editor-lite";
import MarkdownIt from "markdown-it";
import axios from "axios";
import { AuthContext } from "../contexts/AuthContext";
import "react-markdown-editor-lite/lib/index.css";

const mdParser = new MarkdownIt();

export default function CreatePost() {
  const [message, setMessage] = useState("");
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [categoryIds, setCategoryIds] = useState([]); // Example for categories
  const { userRole } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleEditorChange = ({ html, text }) => {
    setContent(text);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    const postData = {
      title,
      content,
      categoryIds, // Include this if you have categories
    };

    try {
      const token = localStorage.getItem("token");
      const response = await axios.post(
        `${process.env.REACT_APP_API_BASE_URL}/api/posts`,
        postData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      setMessage(response.data.message);
      /* navigate("/"); */
    } catch (error) {
      setMessage(error.response?.data?.error || error.message);
      console.error("Error creating post:", error.response || error.message);
    }
  };

  if (userRole !== "admin" && userRole !== "editor") {
    return <h2>You do not have permission to create a post</h2>;
  }

  return (
    <div>
      <h1 className="text-3xl">Create a New Post</h1>
      <form onSubmit={handleSubmit}>
        <div>
          <label className="" htmlFor="title">
            Title
          </label>
          <input
            className="input-text"
            type="text"
            id="title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
          />
        </div>
        <div>
          <label htmlFor="content">Content</label>
          <MdEditor
            style={{ height: "500px" }}
            renderHTML={(text) => mdParser.render(text)}
            onChange={handleEditorChange}
          />
        </div>
        <button className="button-submit" type="submit">
          Create Post
        </button>
        {message && (
          <div className="result-message">
            {message}
          </div>
        )}
      </form>
    </div>
  );
}
