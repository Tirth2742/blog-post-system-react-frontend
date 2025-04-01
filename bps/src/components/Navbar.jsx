import { Link } from "react-router-dom";
import { FaUserCircle } from "react-icons/fa";
import "../index.css";

const Navbar = () => {
  return (
    <nav className="navbar">
      <div className="navbar-logo">Blog Name</div>

      <div className="navbar-links">
        <Link to="/home" className="nav-link">Home</Link>
        <Link to="/manage" className="nav-link">Manage Blog</Link>
        <Link to="/create" className="nav-link">Create Blog</Link>
      </div>

      <div className="navbar-user">
        <FaUserCircle className="user-icon" />
      </div>
    </nav>
  );
};

export default Navbar;
