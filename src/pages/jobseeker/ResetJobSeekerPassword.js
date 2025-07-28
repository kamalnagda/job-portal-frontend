import React, { useState } from "react";
import axios from "axios";
import BASE_URL from "../../config/api";
import { useNavigate } from "react-router-dom";

const ResetJobSeekerPassword = () => {
  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [message, setMessage] = useState("");
  const navigate = useNavigate();

  const jobSeeker = JSON.parse(localStorage.getItem("user")); // Make sure user has ID
  const jobSeekerId = jobSeeker?.id;

  const handleReset = async (e) => {
    e.preventDefault();

    if (newPassword !== confirmPassword) {
      setMessage("❌ New passwords do not match");
      setTimeout(() => setMessage(""), 1500);
      return;
    }

    try {
      const response = await axios.put(
        `${BASE_URL}/api/jobseekers/${jobSeekerId}/reset-password`,
        {
          oldPassword,
          newPassword,
        }
      );
      setMessage( response.data);
        setTimeout(() => navigate("/jobseeker/profile"), 1500);
    } catch (error) {
      
        const data = error.response.data;

        if (typeof data === "string") {
            setMessage("❌ " + data);
        } else if (typeof data === "object") {
            const messages = Object.values(data).join("\n"); 
            setMessage("❌ " + messages);
        } else {
            setMessage("❌ Something went wrong");
        }


      setTimeout(() => setMessage(""), 1500);
    }
  };

  return (
    <div className="container mt-5" style={{ maxWidth: "500px" }}>
      <h3 className="mb-4">Reset Password</h3>
      {message && <div className="alert alert-info mt-3">{message}</div>}
      <form onSubmit={handleReset}>
        <div className="mb-3">
          <label className="form-label">Old Password</label>
          <input
            type="password"
            className="form-control"
            value={oldPassword}
            onChange={(e) => setOldPassword(e.target.value)}
            required
          />
        </div>
        <div className="mb-3">
          <label className="form-label">New Password</label>
          <input
            type="password"
            className="form-control"
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
            required
          />
        </div>
        <div className="mb-3">
          <label className="form-label">Confirm New Password</label>
          <input
            type="password"
            className="form-control"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            required
          />
        </div>
        <button type="submit" className="btn btn-primary">Reset Password</button>
      </form>
    </div>
  );
};

export default ResetJobSeekerPassword;
