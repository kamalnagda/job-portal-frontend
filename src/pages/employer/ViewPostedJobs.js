import React, { useEffect, useState } from "react";
import axios from "axios";
import { Table, Button, Container, Alert, Spinner } from "react-bootstrap";
import BASE_URL from "../../config/api";

const ViewPostedJobs = () => {
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const employer = JSON.parse(localStorage.getItem("user"));

  useEffect(() => {
    fetchJobs();
  }, []);

  const fetchJobs = async () => {
    try {
      const employer = JSON.parse(localStorage.getItem("user"));
      const response = await axios.get(`${BASE_URL}/api/employers/${employer.id}/jobs`);
      setJobs(response.data);
    } catch (err) {
      setError("Failed to fetch jobs.");
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (jobId) => {
    if (!window.confirm("Are you sure you want to delete this job?")) return;

    try {
      await axios.delete(`${BASE_URL}/api/employers/${employer.id}/jobs/${jobId}`);
      setSuccess("Job deleted successfully!");
      setJobs(jobs.filter((job) => job.id !== jobId));
      setTimeout(() => setSuccess(""), 3000);
    } catch (err) {
      console.error(err);
      setError("Failed to delete the job.");
      setTimeout(() => setError(""), 3000);
    }
  };

  const handleUpdate = (jobId) => {
    window.location.href = `/employer/update-job/${jobId}`;
  };

  const handleView = (jobId) => {
    window.location.href = `/employer/job-details/${jobId}`;
  };

  const handleApplicants = (jobId) => {
    window.location.href = `/employer/job-applicants/${jobId}`;
  };

  return (
    <Container className="mt-4">
      <h3>📋 Jobs You Have Posted</h3>

      {success && <Alert variant="success">{success}</Alert>}
      {error && <Alert variant="danger">{error}</Alert>}
      {loading ? (
        <Spinner animation="border" />
      ) : jobs.length === 0 ? (
        <Alert variant="info">No jobs posted yet.</Alert>
      ) : (
        <Table striped bordered hover responsive className="mt-3">
          <thead>
            <tr>
              <th>#</th>
              <th>Title</th>
              <th>Location</th>
              <th>Salary</th>
              <th>Skills</th>
              <th>Description</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {jobs.map((job, index) => (
              <tr key={job.id}>
                <td>{index + 1}</td>
                <td>{job.title}</td>
                <td>{job.location}</td>
                <td>₹{job.salary}</td>
                <td>{job.skillsRequired}</td>
                <td style={{ maxWidth: "200px", whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>
                  {job.description}
                </td>
                <td>
                  <Button variant="info" size="sm" className="me-2" onClick={() => handleView(job.id)}>
                    View
                  </Button>
                  <Button variant="warning" size="sm" className="me-2" onClick={() => handleUpdate(job.id)}>
                    Update
                  </Button>
                  <Button variant="danger" size="sm" className="me-2" onClick={() => handleDelete(job.id)}>
                    Delete
                  </Button>
                  <Button variant="success" size="sm" onClick={() => handleApplicants(job.id)}>
                    Applicants
                  </Button>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      )}
    </Container>
  );
};

export default ViewPostedJobs;
  