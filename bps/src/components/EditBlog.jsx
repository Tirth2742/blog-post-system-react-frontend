import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";

const EditBlog = () => {
  const { id } = useParams(); // Get the blog ID from URL
  const navigate = useNavigate(); // For redirection
  const token = localStorage.getItem("token"); // Get token from localStorage

  const apiUrl = `https://localhost:7019/api/BlogPost/${id}`;

  // State to hold the blog details
  const [title, setTitle] = useState("");
  const [category, setCategory] = useState("");
  const [content, setContent] = useState("");

  useEffect(() => {
    // Fetch existing blog data
    axios
      .get(apiUrl, {
        headers: { Authorization: `Bearer ${token}` }, // 🔥 Add Authorization header
      })
      .then((response) => {
        setTitle(response.data.title);
        setCategory(response.data.category);
        setContent(response.data.context);
      })
      .catch((error) => console.error("Error fetching blog data:", error));
  }, [apiUrl, token]); // Ensure token is in dependencies

  const handleUpdate = async () => {
    const updatedBlog = {
      title,
      context: content,
      category,
    };

    try {
      await axios.put(apiUrl, updatedBlog, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`, // 🔥 Add Authorization header
        },
      });
      console.log("Blog updated successfully");
      navigate("/manage"); // Redirect to Manage Blog page after update
    } catch (error) {
      console.error("Error updating blog post:", error);
    }
  };

  return (
    <div className="create-blog">
      <h1>Edit Blog Post</h1>

      <div className="form-group">
        <label>Title</label>
        <input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Enter blog title..."
        />
      </div>

      <div className="form-group">
        <label>Category</label>
        <select value={category} onChange={(e) => setCategory(e.target.value)}>
          <option value="">Select Category</option>
          <option value="Tech">Tech</option>
          <option value="Lifestyle">Lifestyle</option>
          <option value="Education">Education</option>
          <option value="Programming">Programming</option>
        </select>
      </div>

      <div className="form-group">
        <label>Content</label>
        <textarea
          value={content}
          onChange={(e) => setContent(e.target.value)}
          placeholder="Write your blog post..."
        />
      </div>

      <button className="update-btn" onClick={handleUpdate}>
        Update
      </button>
    </div>
  );
};

export default EditBlog;
