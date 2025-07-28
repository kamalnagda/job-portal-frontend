import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import { Alert, Spinner } from "react-bootstrap";
import BASE_URL from "../../config/api";

const UpdateJob = () => {
  const { jobId } = useParams();
  const navigate = useNavigate();
  const [jobData, setJobData] = useState({
    title: "",
    description: "",
    location: "",
    salary: "",
    skillsRequired: "",
  });

  const [loading, setLoading] = useState(true);
  const [successMessage, setSuccessMessage] = useState("");
  const [error, setError] = useState("");

  const employer = JSON.parse(localStorage.getItem("user"));

  useEffect(() => {
    const fetchJob = async () => {
      try {
        const response = await axios.get(
          `${BASE_URL}/api/employers/${employer.id}/jobs/${jobId}`
        );
        setJobData(response.data);
      } catch (err) {
        setError("Failed to load job details.");
      } finally {
        setLoading(false);
      }
    };

    fetchJob();
  }, [employer.id, jobId]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setJobData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.put(
        `${BASE_URL}/api/employers/${employer.id}/jobs/${jobId}`,
        jobData
      );
      setSuccessMessage("✅ Job updated successfully!");
      setTimeout(() => navigate(`/employer/view-jobs`), 2000); // redirect after 2s
    } catch (err) {
      console.error("Update failed:", err);
      setError("❌ Failed to update job.");
    }
  };

  if (loading) return <Spinner animation="border" variant="primary" className="m-4" />;
  if (error) return <Alert variant="danger" className="m-4">{error}</Alert>;

  return (
    <div className="container mt-4">
      <h3>✏️ Update Job</h3>
      {successMessage && <Alert variant="success">{successMessage}</Alert>}
      <form onSubmit={handleSubmit} className="p-4 bg-white shadow rounded">
        <div className="mb-3">
          <label>Job Title</label>
          <input
            type="text"
            name="title"
            className="form-control"
            value={jobData.title}
            onChange={handleChange}
            required
          />
        </div>
        <div className="mb-3">
          <label>Description</label>
          <textarea
            name="description"
            className="form-control"
            value={jobData.description}
            onChange={handleChange}
            required
          />
        </div>
        <div className="mb-3">
          <label>Location</label>
          <input
            type="text"
            name="location"
            className="form-control"
            value={jobData.location}
            onChange={handleChange}
            required
          />
        </div>
        <div className="mb-3">
          <label>Salary</label>
          <input
            type="text"
            name="salary"
            className="form-control"
            value={jobData.salary}
            onChange={handleChange}
            required
          />
        </div>
        <div className="mb-3">
          <label>Skills Required</label>
          <input
            type="text"
            name="skillsRequired"
            className="form-control"
            value={jobData.skillsRequired}
            onChange={handleChange}
          />
        </div>
        <button type="submit" className="btn btn-primary">Update Job</button>
      </form>
    </div>
  );
};

export default UpdateJob;
