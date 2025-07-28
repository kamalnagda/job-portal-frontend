import React, { useState } from "react";
import axios from "axios";
import BASE_URL from "../../config/api";
import { useNavigate ,Link} from "react-router-dom";

const JobSeekerRegisterPage = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    profilePhoto: null,
    resume: null,
  });

  const [message, setMessage] = useState("");
  const [messageClass, setMessageClass] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const form = new FormData();
      form.append("name", formData.name);
      form.append("email", formData.email);
      form.append("password", formData.password);
      if (formData.profilePhoto) {
      form.append("profilePhoto", formData.profilePhoto);
      }
       if (formData.resume) {
      form.append("resume", formData.resume);
      }

        const response = await axios.post(`${BASE_URL}/api/jobseekers/register`, form, {
        headers: {
            "Content-Type": "multipart/form-data"
        }
        });

      setMessage("Registration successful! Redirecting to login page");
      setMessageClass("alert alert-success");
      setFormData({ name: "", email: "", password: "", profilePhoto: "",resume:""});
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


  // Inside JobSeekerRegisterPage component

  const handleProfilePhotoChange = (e) => {
    const file = e.target.files[0];
    if (file && !["image/jpeg", "image/png", "image/jpg"].includes(file.type)) {
      setMessage("Only JPG and PNG files are allowed for profile photo.");
      setMessageClass("alert alert-danger");
      setTimeout(() => {
        setMessage("");
        setMessageClass("");
      }, 3000);
      e.target.value = "";
      return;
    }
    setFormData((prev) => ({ ...prev, profilePhoto: file }));
  };

  const handleResumeChange = (e) => {
    const file = e.target.files[0];
    if (file && !["application/pdf", "application/msword", "application/vnd.openxmlformats-officedocument.wordprocessingml.document"].includes(file.type)) {
      setMessage("Only PDF and DOC/DOCX files are allowed for resume.");
      setMessageClass("alert alert-danger");
      setTimeout(() => {
        setMessage("");
        setMessageClass("");
      }, 3000);
      e.target.value = "";
      return;
    }
    setFormData((prev) => ({ ...prev, resume: file }));
  };


  return (
    <div className="container mt-5">
      <h2>Job Seeker Registration</h2>
      {message && <div className={messageClass}>{message}</div>}
      <form onSubmit={handleSubmit} encType="multipart/form-data">
        <div className="mb-3">
          <label className="form-label">Full Name</label>
          <input type="text" className="form-control" name="name" value={formData.name} onChange={handleChange} required />
        </div>

        <div className="mb-3">
          <label className="form-label">Email address</label>
          <input type="email" className="form-control" name="email" value={formData.email} onChange={handleChange} required />
        </div>

        <div className="mb-3">
          <label className="form-label">Password</label>
          <input type="password" className="form-control" name="password" value={formData.password} onChange={handleChange} required />
        </div>

        <div className="mb-3">
          <label className="form-label">Profile Photo</label>
          <input type="file" className="form-control" name="profilePhoto" onChange={handleProfilePhotoChange} />
        </div>

        <div className="mb-3">
          <label className="form-label">resume</label>
          <input type="file" className="form-control" name="resume" onChange={handleResumeChange} />
        </div>

        <button type="submit" className="btn btn-primary">Register</button>
        <div className="mt-3">
            <p>already have an account?</p>
            <div className="d-flex gap-3">
                <Link to="/login" className="btn btn-outline-primary">Login as Job Seeker</Link>
            </div>
        </div>
      </form>
    </div>
  );
};

export default JobSeekerRegisterPage;
