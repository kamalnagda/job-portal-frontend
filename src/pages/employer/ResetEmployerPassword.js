import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import BASE_URL from "../../config/api";

function ResetEmployerPassword() {
  const navigate = useNavigate();

  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [message, setMessage] = useState("");

  // ✅ Get employer from localStorage
  const employer = JSON.parse(localStorage.getItem("user"));
  const id = employer?.id;

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (newPassword !== confirmPassword) {
      setMessage("❌ New passwords do not match.");
      return;
    }

    try {
      const response = await axios.put(
        `${BASE_URL}/api/employers/${id}/reset-password`,
        {
          oldPassword,
          newPassword,
        }
      );
      setMessage("✅ " + response.data);
      setTimeout(() => navigate("/employer/profile"), 2000);
    } catch (error) {
      const data = error.response?.data;
      if (typeof data === "string") {
        setMessage("❌ " + data);
      } else if (typeof data === "object") {
        const msg = Object.values(data).join("\n");
        setMessage("❌ " + msg);
      } else {
        setMessage("❌ Something went wrong.");
      }
    }
  };

  return (
    <div className="container mt-5" style={{ maxWidth: "500px" }}>
      <h3 className="text-center mb-4">Reset Password</h3>
      {message && <div className="alert alert-info">{message}</div>}
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label>Old Password</label>
          <input
            type="password"
            className="form-control"
            value={oldPassword}
            onChange={(e) => setOldPassword(e.target.value)}
            required
          />
        </div>
        <div className="mb-3">
          <label>New Password</label>
          <input
            type="password"
            className="form-control"
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
            required
          />
        </div>
        <div className="mb-3">
          <label>Confirm New Password</label>
          <input
            type="password"
            className="form-control"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            required
          />
        </div>
        <button type="submit" className="btn btn-primary w-100">
          Update Password
        </button>
      </form>
    </div>
  );
}

export default ResetEmployerPassword;
