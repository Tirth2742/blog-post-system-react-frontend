import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";

const ManageBlog = () => {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchPosts = async () => {
      const userId = localStorage.getItem("userId"); // Get user ID from local storage
      if (!userId) {
        setError("User ID not found. Please log in.");
        setLoading(false);
        return;
      }

      try {
        const response = await axios.get(`https://localhost:7019/api/BlogPost/mypost/${userId}`);
        setPosts(response.data);
      } catch (err) {
        setError("Failed to fetch blog posts.");
      } finally {
        setLoading(false);
      }
    };

    fetchPosts();
  }, []);

  const handleDelete = async (id) => {
    try {
      await axios.delete(`https://localhost:7019/api/BlogPost/${id}`);
      setPosts(posts.filter((post) => post.id !== id));
    } catch (err) {
      setError("Failed to delete post.");
    }
  };

  if (loading) return <p>Loading posts...</p>;
  if (error) return <p className="error-message">{error}</p>;

  return (
    <div className="manage-blog">
      <h1>Manage Blog</h1>

      <div className="post-list">
        {posts.length === 0 ? (
          <p>No blog posts found.</p>
        ) : (
          posts.map((post) => (
            <div key={post.id} className="post-item">
              <div>
                <h3>{post.title}</h3>
                <p>Author: {post.authorName} • {new Date(post.createdAt).toLocaleDateString()}</p>
              </div>
              <div className="actions">
                <Link to={`/edit/${post.id}`} className="edit">Edit</Link>
                <button className="delete" onClick={() => handleDelete(post.id)}>Delete</button>
              </div>
            </div>
          ))
        )}
      </div>

      {/* Pagination */}
      <div className="pagination">
        <button>◄ Previous</button>
        <button>Next ►</button>
      </div>
    </div>
  );
};

export default ManageBlog;
