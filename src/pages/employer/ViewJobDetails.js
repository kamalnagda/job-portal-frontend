import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { Alert, Spinner, Card, Button } from "react-bootstrap";
import BASE_URL from "../../config/api";

const ViewJobDetails = () => {
  const { jobId } = useParams();
  const [job, setJob] = useState(null);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(true);

  const employer = JSON.parse(localStorage.getItem("user"));

  useEffect(() => {
    const fetchJob = async () => {
      try {
        const response = await axios.get(
          `${BASE_URL}/api/employers/${employer.id}/jobs/${jobId}`
        );
        setJob(response.data);
      } catch (err) {
        console.error("Failed to fetch job", err);
        setError(err.response?.data || "Failed to load job details");
      } finally {
        setLoading(false);
      }
    };

    fetchJob();
  }, [jobId, employer.id]);

  if (loading) return <Spinner animation="border" variant="primary" className="m-4" />;
  if (error) return <Alert variant="danger" className="m-4">{error}</Alert>;

  return (
    <div className="container mt-4">
      <Card className="shadow-sm p-4">
        <Card.Title className="mb-3">📝 Job Details</Card.Title>
        <p><strong>Title:</strong> {job.title}</p>
        <p><strong>Description:</strong> {job.description}</p>
        <p><strong>Location:</strong> {job.location}</p>
        <p><strong>Salary:</strong> ₹{job.salary}</p>
        <p><strong>Skills Required:</strong> {job.skillsRequired}</p>
        <Button variant="secondary" onClick={() => window.history.back()}>⬅ Back</Button>
      </Card>
    </div>
  );
};

export default ViewJobDetails;
