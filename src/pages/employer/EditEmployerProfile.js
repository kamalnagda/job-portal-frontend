import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import BASE_URL from "../../config/api";

const EditEmployerProfile = () => {
  const [formData, setFormData] = useState({
    name: "",
    companyName: "",
    companyLogo: null,
  });

  const [message, setMessage] = useState("");
  const [messageClass, setMessageClass] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const user = JSON.parse(localStorage.getItem("user"));
        const response = await axios.get(`${BASE_URL}/api/employers/profile/${user.id}`);
        setFormData({
          name: response.data.name,
          email: response.data.email,
          companyName: response.data.companyName,
          companyLogo: null, // Keep null, update only if new file is uploaded
        });
      } catch (error) {
        setMessage("❌ Failed to load profile.");
        setMessageClass("alert alert-danger");
      }
    };

    fetchProfile();
  }, []);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    const allowedTypes = ["image/jpeg", "image/png", "image/jpg"];

    if (file && !allowedTypes.includes(file.type)) {
      setMessage("❌ Only JPG, JPEG, or PNG files are allowed for the company logo.");
      setMessageClass("alert alert-danger");
      setFormData({ ...formData, companyLogo: null });
      e.target.value = ""; // ✅ Reset input

      setTimeout(() => {
        setMessage("");
        setMessageClass("");
      }, 3000);
      return;
    }

    setFormData({ ...formData, companyLogo: file });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage("");
    setMessageClass("");

    try {
      const user = JSON.parse(localStorage.getItem("user"));
      const form = new FormData();
      form.append("name", formData.name);
      form.append("companyName", formData.companyName);
      if (formData.companyLogo) {
        form.append("companyLogo", formData.companyLogo);
      }

      await axios.put(`${BASE_URL}/api/employers/${user.id}`, form, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      setMessage("✅ Profile updated successfully.");
      setMessageClass("alert alert-success");
      setTimeout(() => navigate("/employer/profile"), 2000);
    } catch (error) {
      setMessage(error.response?.data?.message || "❌ Failed to update profile.");
      setMessageClass("alert alert-danger");
    }
  };

  return (
    <div className="container mt-4">
      <h2>Edit Employer Profile</h2>

      {message && <div className={messageClass}>{message}</div>}

      <form onSubmit={handleSubmit} encType="multipart/form-data">
        <div className="mb-2">
          <label htmlFor="name" className="form-label">Full Name</label>
          <input
            type="text"
            id="name"
            name="name"
            className="form-control"
            value={formData.name}
            onChange={handleChange}
            required
          />
        </div>

        <div className="mb-2">
          <label htmlFor="email" className="form-label">Email (read-only)</label>
          <input
            type="email"
            id="email"
            name="email"
            className="form-control"
            value={formData.email}
            readOnly
          />
        </div>

        <div className="mb-2">
          <label htmlFor="companyName" className="form-label">Company Name</label>
          <input
            type="text"
            id="companyName"
            name="companyName"
            className="form-control"
            value={formData.companyName}
            onChange={handleChange}
            required
          />
        </div>

        <div className="mb-3">
          <label htmlFor="companyLogo" className="form-label">Update Company Logo</label>
          <input
            type="file"
            id="companyLogo"
            name="companyLogo"
            className="form-control"
            accept="image/*"
            onChange={handleFileChange}
          />
        </div>

        <button type="submit" className="btn btn-success w-100">Update Profile</button>
      </form>
    </div>
  );
};

export default EditEmployerProfile;
