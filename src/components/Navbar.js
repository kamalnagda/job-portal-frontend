import React from "react";
import { Link, useNavigate } from "react-router-dom";

const Navbar = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("user");
    navigate("/login");
  };

  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-dark px-4">
      <Link className="navbar-brand" to="/dashboard">Job Portal</Link>

      <div className="collapse navbar-collapse justify-content-end">
        <ul className="navbar-nav">
          <li className="nav-item mx-2">
            <Link className="nav-link" to="/jobs-list">All jobs</Link>
          </li>
          <li className="nav-item mx-2">
            <Link className="nav-link" to="/search-jobs">Search Jobs</Link>
          </li>
          <li className="nav-item mx-2">
            <Link className="nav-link" to="/profile">View Profile</Link>
          </li>
          <li className="nav-item mx-2">
            <Link className="nav-link" to="/applied-jobs">Applied Jobs</Link>
          </li>
          <li className="nav-item mx-2">
            <button className="btn btn-outline-light btn-sm" onClick={handleLogout}>Logout</button>
          </li>
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;
