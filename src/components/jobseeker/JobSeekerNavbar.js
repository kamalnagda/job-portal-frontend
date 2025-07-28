// src/components/jobseeker/JobSeekerNavbar.js
import React from "react";
import { Link , useNavigate } from "react-router-dom";

const JobSeekerNavbar = () => {
    const navigate = useNavigate();

    const handleLogout = () => {
    localStorage.removeItem("user");
    navigate("/login");
  };
  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-primary px-4">
      <Link className="navbar-brand" to="/jobseeker">Job Portal</Link>
      <div className="collapse navbar-collapse">
        <ul className="navbar-nav ms-auto">
          <li className="nav-item mx-2">
            <Link className="nav-link" to="/jobseeker/search-jobs">Search Jobs</Link>
          </li>
          <li className="nav-item mx-2">
            <Link className="nav-link" to="/jobseeker/applied-jobs">Applied Jobs</Link>
          </li>
          <li className="nav-item mx-2">
            <Link className="nav-link" to="/jobseeker/profile">Profile</Link>
          </li>
          <li className="nav-item mx-2">
            <button className="btn btn-outline-light btn-sm" onClick={handleLogout}>Logout</button>
          </li>
        </ul>
      </div>
    </nav>
  );
};

export default JobSeekerNavbar;
