import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "../index.css";

const Signup = () => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("Author"); // Default role
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const handleSignup = async (e) => {
    e.preventDefault();
    try {
      await axios.post("https://localhost:7019/api/BlogPost/adduser", {
        username,
        email,
        password,
        role,
      });
      navigate("/login");
    } catch (err) {
      setError("Signup failed. Please try again.");
    }
  };

  return (
    <div className="auth-container">
      <h2>Sign Up</h2>
      {error && <p className="error-message">{error}</p>}
      <form onSubmit={handleSignup}>
        <input
          type="text"
          placeholder="Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          required
        />
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <select className = 'role-select'  value={role} onChange={(e) => setRole(e.target.value)} required>
          <option value="Author">Author</option>
          <option value="Admin">Admin</option>
        </select>
        <button type="submit">Sign Up</button>
      </form>
      <p>Already have an account? <a href="/">Login</a></p>
    </div>
  );
};

export default Signup;
