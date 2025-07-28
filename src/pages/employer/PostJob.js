import React, { useState } from "react";
import axios from "axios";
import { Alert } from "react-bootstrap";
import BASE_URL from "../../config/api";

const PostJob = () => {
  const [jobData, setJobData] = useState({
    title: "",
    description: "",
    location: "",
    salary: "",
    skillsRequired: "", // ✅ new field
  });

  const [successMessage, setSuccessMessage] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setJobData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const employer = JSON.parse(localStorage.getItem("user"));
      const response = await axios.post(
        `${BASE_URL}/api/employers/${employer.id}/jobs`,
        jobData
      );

      setSuccessMessage(`Job posted successfully! ${response.data.title}`);
      setJobData({
        title: "",
        description: "",
        location: "",
        salary: "",
        skillsRequired: "", // ✅ reset as well
      });

      setTimeout(() => setSuccessMessage(""), 3000);
    } catch (error) {
      console.error(" Failed to post job", error);
      alert("Something went wrong while posting the job.");
    }
  };

  return (
    <div className="container mt-4">
      <h3>📝 Post a New Job</h3>
      {successMessage && <Alert variant="success">{successMessage}</Alert>}
      <form onSubmit={handleSubmit} className="p-4 bg-white shadow rounded">
        <div className="mb-3">
          <label>Job Title</label>
          <input type="text" name="title" className="form-control" value={jobData.title} onChange={handleChange} required />
        </div>
        <div className="mb-3">
          <label>Description</label>
          <textarea name="description" className="form-control" value={jobData.description} onChange={handleChange} required />
        </div>
        <div className="mb-3">
          <label>Location</label>
          <input type="text" name="location" className="form-control" value={jobData.location} onChange={handleChange} required />
        </div>
        <div className="mb-3">
          <label>Salary</label>
          <input type="number" name="salary" className="form-control" value={jobData.salary} onChange={handleChange} required />
        </div>
        <div className="mb-3">
          <label>Required Skills</label>
          <input type="text" name="skillsRequired" className="form-control" value={jobData.skillsRequired} onChange={handleChange} required />
        </div>
        <button type="submit" className="btn btn-primary">Post Job</button>
      </form>
    </div>
  );
};

export default PostJob;
