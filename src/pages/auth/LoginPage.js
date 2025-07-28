import React, { useState } from "react";
import axios from "axios";
import BASE_URL from "../../config/api";
import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';

function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("jobseeker"); // default
  const [error, setError] = useState("");
  const navigate = useNavigate();


  const handleLogin = async (e) => {
    e.preventDefault();
    let endpoint = "";

    // Choose API endpoint based on selected role
        if (role === "jobseeker") endpoint = `${BASE_URL}/api/jobseekers/login`;
        else if (role === "employer") endpoint = `${BASE_URL}/api/employers/login`;
        else if (role === "admin") endpoint = `${BASE_URL}/api/admin/login`;

    try {
      const response = await axios.post(endpoint, { email, password });
      const user = response.data;

      // Store user info (you can later use localStorage or context)
      localStorage.setItem("user", JSON.stringify(user));

      // Redirect based on role
      if (user.role === "JOB_SEEKER") {
        navigate("/jobseeker");
      } else if (user.role === "EMPLOYER") {
        navigate("/employer");
      } else if (user.role === "ADMIN") {
        navigate("/admin");
      } else {
        alert("Unknown role");
      }
    } catch (err) {
      setError("Login failed: " + (error.response?.data?.message || error.message));
      setTimeout(() => {
        setError("");
      }, 3000);
      
    }
  };

  return (
    <div className="container mt-5">
      {error && <div className="alert alert-danger">{error}</div>}
      <h2>Login</h2>
      <form onSubmit={handleLogin}>
        <div className="mb-3">
          <label className="form-label">Role</label>
          <select className="form-select" value={role} onChange={(e) => setRole(e.target.value)}>
            <option value="jobseeker">Job Seeker</option>
            <option value="employer">Employer</option>
            <option value="admin">Admin</option>
          </select>
        </div>

        <div className="mb-3">
          <label className="form-label">Email address</label>
          <input type="email" className="form-control" required
            value={email} onChange={(e) => setEmail(e.target.value)} />
        </div>

        <div className="mb-3">
          <label className="form-label">Password</label>
          <input type="password" className="form-control" required
            value={password} onChange={(e) => setPassword(e.target.value)} />
        </div>

        

        <button type="submit" className="btn btn-primary">Login</button>
        <div className="mt-3">
            <p>Don't have an account?</p>
            <div className="d-flex gap-3">
                <Link to="/register/jobseeker" className="btn btn-outline-primary">Register as Job Seeker</Link>
                <Link to="/register/employer" className="btn btn-outline-success">Register as Employer</Link>
            </div>
        </div>
      </form>
    </div>
  );
}

export default LoginPage;
