import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Navbar from "./components/Navbar";
import Home from "./components/Home";
import Login from "./components/Login";
import Signup from "./components/SignUp";
import BlogDetail from "./components/BlogDetail"
import CreateBlog from "./components/CreateBlog";
import ManageBlog from "./components/ManageBlog";
import EditBlog from "./components/EditBlog";
import "./index.css";

function App() {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/home" element={<Home />} />
        <Route path="/" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/manage" element={<ManageBlog />} />
        <Route path="/blog/:id" element={<BlogDetail />} />
        <Route path="/create" element={<CreateBlog />} />
        <Route path="/edit/:id" element={<EditBlog />} /> 
      </Routes>
    </Router>
  );
}

export default App;
