import { Link } from "react-router-dom";
import "../index.css";

const Navbar = () => {
  return (
    <nav className="navbar">
      <div className="navbar-logo"></div>
      <div className="navbar-title">Blog Name</div>
      <div className="navbar-links">
        <Link to="/home" className="active">Home</Link>
        <Link to="/manage">Manage Blog</Link>
        <Link to="/create">Create Blog</Link>
      </div>
      <div className="navbar-user"></div>
    </nav>
  );
};

export default Navbar;
