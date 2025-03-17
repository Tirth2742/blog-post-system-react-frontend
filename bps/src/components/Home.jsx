import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "../index.css";

const Home = () => {
  const [posts, setPosts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [authors, setAuthors] = useState([]);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState(""); // Search input
  const navigate = useNavigate();
  const [showFilters, setShowFilters] = useState(false);
  const [isSearching, setIsSearching] = useState(false); // Track if search is active

  const [filters, setFilters] = useState({
    category: "",
    author: "",
    daterange: "",
    fromdate: "",
    todate: "",
  });

  const [sortOrder, setSortOrder] = useState("newest"); // Sorting state

  // useEffect(() => {
  //   fetchCategoriesAndAuthors();
  // }, []);

  useEffect(() => {
    if (!isSearching) {
      fetchFilteredPosts(); // Only fetch filters if not searching
    }
  }, [filters]);

  useEffect(() => {
    sortPosts(); // Apply sorting whenever sortOrder changes
  }, [sortOrder]);

  // const fetchCategoriesAndAuthors = async () => {
  //   try {
  //     const categoryRes = await axios.get("https://localhost:7019/api/BlogPost/categories");
  //     const authorRes = await axios.get("https://localhost:7019/api/BlogPost/authors");
  //     setCategories(categoryRes.data);
  //     setAuthors(authorRes.data);
  //   } catch (err) {
  //     console.error("Error fetching categories/authors:", err);
  //   }
  // };

  const fetchFilteredPosts = async () => {
    try {
      let params = new URLSearchParams();

      if (filters.category) params.append("category", filters.category);
      if (filters.author) params.append("author", filters.author);
      if (filters.daterange) params.append("daterange", filters.daterange);
      if (filters.fromdate) params.append("fromdate", filters.fromdate);
      if (filters.todate) params.append("todate", filters.todate);

      const response = await axios.get(`https://localhost:7019/api/BlogPost/filter?${params.toString()}`);
      setPosts(response.data);
    } catch (err) {
      setError("Failed to fetch posts. Please try again later.");
    }
  };

  const fetchSearchResults = async () => {
    try {
      if (searchTerm.trim() === "") {
        setIsSearching(false);
        fetchFilteredPosts(); // Restore filtered posts if search is cleared
        return;
      }

      setIsSearching(true);
      const response = await axios.get(`https://localhost:7019/api/BlogPost/search?st=${searchTerm}`);
      setPosts(response.data);
    } catch (err) {
      setError("Search failed. Please try again.");
    }
  };

  const sortPosts = () => {
    let sortedPosts = [...posts];

    if (sortOrder === "newest") {
      sortedPosts.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
    } else {
      sortedPosts.sort((a, b) => new Date(a.createdAt) - new Date(b.createdAt));
    }

    setPosts(sortedPosts);
  };

  const handleFilterChange = (e) => {
    setFilters({ ...filters, [e.target.name]: e.target.value });
    setIsSearching(false); // Reset search when filters are applied
  };

  const handleSortChange = (e) => {
    setSortOrder(e.target.value);
  };

  const handleSearch = () => {
    fetchSearchResults();
    setShowFilters(false);
  };

  return (
    <div className="home-container">
      <h2>Home Page</h2>

      {/* Search & Filter Section */}
      <div className="search-filter">
        <input
          type="text"
          placeholder="Search posts..."
          className="search-box"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <button onClick={handleSearch} className="search-button">
          Search
        </button>

        {/* Filter Dropdown */}
        <div className="dropdown">
          <button className="filter-button" onClick={() => setShowFilters(!showFilters)}>
            Filter ▼
          </button>

          {showFilters && (
            <div className="dropdown-menu">
              <label>Category:</label>
              <select name="category" onChange={handleFilterChange} value={filters.category}>
                <option value="">All Categories</option>
                <option value="Programming">Programming</option>
                <option value="Technology">Technology</option>
                <option value="Frontend">Frontend</option>
                <option value="Database">Database</option>
                <option value="Security">Security</option>
                <option value="DevOps">DevOps</option>
                {categories.map((cat) => (
                  <option key={cat} value={cat}>
                    {cat}
                  </option>
                ))}
              </select>

              <label>Author:</label>
              <select name="author" onChange={handleFilterChange} value={filters.author}>
                <option value="">All Authors</option>
                {authors.map((auth) => (
                  <option key={auth} value={auth}>
                    {auth}
                  </option>
                ))}
              </select>

              <label>Date Range:</label>
              <select name="daterange" onChange={handleFilterChange} value={filters.daterange}>
                <option value="">Custom</option>
                <option value="lastmonth">Last Month</option>
                <option value="lastyear">Last Year</option>
              </select>

              <label>From Date:</label>
              <input type="date" name="fromdate" value={filters.fromdate} onChange={handleFilterChange} />

              <label>To Date:</label>
              <input type="date" name="todate" value={filters.todate} onChange={handleFilterChange} />

              <button className="apply-filter-button" onClick={handleSearch}>
                Apply Filters
              </button>
            </div>
          )}
        </div>

        {/* Sorting Dropdown */}
        <select className="sort-dropdown" name="sort" onChange={handleSortChange} value={sortOrder}>
          <option value="newest">Sort By: Newest</option>
          <option value="oldest">Sort By: Oldest</option>
        </select>
      </div>

      {/* Blog Posts Section */}
      <div className="blog-posts">
        {error && <p className="error-message">{error}</p>}
        {posts.length > 0 ? (
          posts.map((post) => (
            <div key={post.id} className="post">
              <h3>{post.title}</h3>
              <p>
                By {post.authorName} • {new Date(post.createdAt).toDateString()} • {post.category}
              </p>
              <p>{post.context.substring(0, 100)}...</p>
              <button onClick={() => navigate(`/blog/${post.id}`)}>Read More</button>
            </div>
          ))
        ) : (
          !error && <p>No posts found.</p>
        )}
      </div>
    </div>
  );
};

export default Home;
