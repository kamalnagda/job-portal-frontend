import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import BASE_URL from "../../config/api";

const EmployerRegister = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    companyName: "",
    companyLogo: null,
  });

  const [message, setMessage] = useState("");
  const [messageClass, setMessageClass] = useState("");
  const navigate = useNavigate();

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
      e.target.value = ""; // ✅ Reset the file input directly

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
    try {
      const form = new FormData();
      form.append("name", formData.name);
      form.append("email", formData.email);
      form.append("password", formData.password);
      form.append("companyName", formData.companyName);
      if (formData.companyLogo) {
        form.append("companyLogo", formData.companyLogo);
      }

      const response = await axios.post(`${BASE_URL}/api/employers/register`, form, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      setMessage("Registration successful! Redirecting to login page...");
      setMessageClass("alert alert-success");
      setFormData({ name: "", email: "", password: "", companyName: "", companyLogo: null });

      setTimeout(() => {
        setMessage("");
        setMessageClass("");
        navigate("/login");
      }, 3000);
    } catch (error) {
      setMessage(error.response?.data?.message || error.response?.data || error.message);
      setMessageClass("alert alert-danger");

      setTimeout(() => {
        setMessage("");
        setMessageClass("");
      }, 3000);
    }
  };

  return (
    <div className="container mt-4">
      <h2>Employer Registration</h2>

      {message && <div className={messageClass}>{message}</div>}

      <form onSubmit={handleSubmit} encType="multipart/form-data">
        <div className="mb-2">
          <label htmlFor="name" className="form-label">Full Name</label>
          <input
            type="text"
            id="name"
            name="name"
            className="form-control"
            placeholder="Enter your full name"
            value={formData.name}
            onChange={handleChange}
            required
          />
        </div>

        <div className="mb-2">
          <label htmlFor="email" className="form-label">Email</label>
          <input
            type="email"
            id="email"
            name="email"
            className="form-control"
            placeholder="Enter your email"
            value={formData.email}
            onChange={handleChange}
            required
          />
        </div>

        <div className="mb-2">
          <label htmlFor="password" className="form-label">Password</label>
          <input
            type="password"
            id="password"
            name="password"
            className="form-control"
            placeholder="Enter password"
            value={formData.password}
            onChange={handleChange}
            required
          />
        </div>

        <div className="mb-2">
          <label htmlFor="companyName" className="form-label">Company Name</label>
          <input
            type="text"
            id="companyName"
            name="companyName"
            className="form-control"
            placeholder="Enter company name"
            value={formData.companyName}
            onChange={handleChange}
            required
          />
        </div>

        <div className="mb-3">
          <label htmlFor="companyLogo" className="form-label">Company Logo (optional)</label>
          <input
            type="file"
            id="companyLogo"
            name="companyLogo"
            className="form-control"
            accept="image/*"
            onChange={handleFileChange}
          />
        </div>

        <button type="submit" className="btn btn-primary w-100">Register</button>
      </form>
    </div>
  );
};

export default EmployerRegister;
