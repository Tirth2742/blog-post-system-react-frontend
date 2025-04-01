import React, { useState } from "react";

const CreateBlog = () => {
  const [title, setTitle] = useState("");
  const [category, setCategory] = useState("");
  const [content, setContent] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    const authorId = localStorage.getItem("userId");
    if (!authorId) {
      setError("User not authenticated");
      setLoading(false);
      return;
    }

    const blogPost = {
      title,
      context: content,
      authorId,
      author: {
        authorId,
        username: "string",
        email: "user@example.com",
        password: "string",
        role: "string"
      },
      category,
    };

    try {
      const token = localStorage.getItem("token");
      const response = await fetch("https://localhost:7019/api/BlogPost", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`
        },
        body: JSON.stringify(blogPost),
      });

      if (!response.ok) {
        throw new Error("Failed to publish blog post");
      }

      alert("Blog post published successfully!");
      setTitle("");
      setCategory("");
      setContent("");
    } catch (error) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="create-blog-container">
      <h1>Create New Blog Post</h1>
      {error && <p style={{ color: "red" }}>{error}</p>}
      <form onSubmit={handleSubmit}>
        <label>Title</label>
        <input
          type="text"
          placeholder="Enter blog title..."
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
        />

        <label>Category</label>
        <select value={category} onChange={(e) => setCategory(e.target.value)} required>
          <option value="">Select category</option>
          <option value="Technology">Technology</option>
          <option value="Lifestyle">Lifestyle</option>
          <option value="Health">Health</option>
        </select>

        <label>Content</label>
        <textarea
          placeholder="Start writing your blog post here..."
          value={content}
          onChange={(e) => setContent(e.target.value)}
          rows="10"
          required
        ></textarea>

        <button type="submit" disabled={loading}>
          {loading ? "Publishing..." : "Publish"}
        </button>
      </form>
    </div>
  );
};

export default CreateBlog;
