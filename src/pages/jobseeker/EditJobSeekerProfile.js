import React, { useState, useEffect } from "react";
import axios from "axios";
import BASE_URL from "../../config/api";
import { useNavigate } from "react-router-dom";

const EditJobSeekerProfilePage = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: "",
    profilePhoto: null,
    resume: null,
  });

  const [message, setMessage] = useState("");
  const [messageClass, setMessageClass] = useState("");

  // Load profile data
  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("user"));
    if (user && user.id) {
      axios.get(`${BASE_URL}/api/jobseekers/${user.id}`)
        .then((res) => {
          const { name, email } = res.data;
          setFormData((prev) => ({ ...prev, name, email }));
        })
        .catch((err) => {
          setMessage("Failed to load profile data.");
          setMessageClass("alert alert-danger");
        });
    }
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleProfilePhotoChange = (e) => {
    const file = e.target.files[0];
    if (file && !["image/jpeg", "image/png", "image/jpg"].includes(file.type)) {
      setMessage("Only JPG and PNG files are allowed for profile photo.");
      setMessageClass("alert alert-danger");
      e.target.value = "";
      setTimeout(() => setMessage(""), 3000);
      return;
    }
    setFormData((prev) => ({ ...prev, profilePhoto: file }));
  };

  const handleResumeChange = (e) => {
    const file = e.target.files[0];
    const allowedTypes = [
      "application/pdf",
      "application/msword",
      "application/vnd.openxmlformats-officedocument.wordprocessingml.document"
    ];
    if (file && !allowedTypes.includes(file.type)) {
      setMessage("Only PDF and DOC/DOCX files are allowed for resume.");
      setMessageClass("alert alert-danger");
      e.target.value = "";
      setTimeout(() => setMessage(""), 3000);
      return;
    }
    setFormData((prev) => ({ ...prev, resume: file }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const user = JSON.parse(localStorage.getItem("user"));
    if (!user?.id) {
      setMessage("User not logged in.");
      setMessageClass("alert alert-danger");
      return;
    }

    try {
      const form = new FormData();
      form.append("name", formData.name);
      if (formData.profilePhoto) form.append("profilePhoto", formData.profilePhoto);
      if (formData.resume) form.append("resume", formData.resume);

      await axios.put(`${BASE_URL}/api/jobseekers/${user.id}`, form, {
        headers: { "Content-Type": "multipart/form-data" }
      });

      setMessage("✅ Profile updated successfully.");
      setMessageClass("alert alert-success");
      setTimeout(() => {
        setMessage("");
        navigate("/jobseeker/profile");
      }, 3000);
    } catch (error) {
      setMessage(error.response?.data?.message || "Failed to update profile.");
      setMessageClass("alert alert-danger");
      setTimeout(() => setMessage(""), 3000);
    }
  };

  return (
    <div className="container mt-5">
      <h2>Edit Job Seeker Profile</h2>
      {message && <div className={messageClass}>{message}</div>}
      <form onSubmit={handleSubmit} encType="multipart/form-data">
        <div className="mb-3">
          <label className="form-label">Full Name</label>
          <input type="text" className="form-control" name="name" value={formData.name} onChange={handleChange} required />
        </div>

        <div className="mb-3">
          <label className="form-label">Email address</label>
          <input type="email" className="form-control" name="email" value={formData.email} readOnly  />
        </div>

        <div className="mb-3">
          <label className="form-label">Profile Photo</label>
          <input type="file" className="form-control" name="profilePhoto" onChange={handleProfilePhotoChange} />
        </div>

        <div className="mb-3">
          <label className="form-label">Resume</label>
          <input type="file" className="form-control" name="resume" onChange={handleResumeChange} />
        </div>

        <button type="submit" className="btn btn-primary">Update Profile</button>
      </form>
    </div>
  );
};

export default EditJobSeekerProfilePage;
