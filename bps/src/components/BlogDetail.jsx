import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";

const BlogDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [post, setPost] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchPost = async () => {
      try {
        const response = await axios.get(`https://localhost:7019/api/BlogPost/${id}`);
        setPost(response.data);
      } catch (err) {
        setError("Failed to fetch blog post. Please try again later.");
      }
    };
    fetchPost();
  }, [id]);

  if (error) {
    return <p className="error-message">{error}</p>;
  }

  if (!post) {
    return <p>Loading...</p>;
  }

  return (
    <div className="blog-detail-container">
      <div className="back-button">
        <button onClick={() => navigate(-1)}>◄ Back</button>
      </div>
      <h1>{post.title}</h1>
      <p className="blog-meta">By {post.authorName} • {new Date(post.createdAt).toDateString()} • {post.category}</p>
      <div className="blog-content">
        <p>{post.context}</p>
      </div>
    </div>
  );
};

export default BlogDetail;
