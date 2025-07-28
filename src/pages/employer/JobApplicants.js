import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import axios from "axios";
import { Container, Table, Alert, Spinner, Button } from "react-bootstrap";
import BASE_URL from "../../config/api";

const JobApplicants = () => {
  const { jobId } = useParams();
  const [applicants, setApplicants] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const employer = JSON.parse(localStorage.getItem("user"));

  useEffect(() => {
    fetchApplicants();
  }, []);

  const fetchApplicants = async () => {
    try {
      const response = await axios.get(`${BASE_URL}/api/employers/${employer.id}/jobs/${jobId}/applicants`);
      setApplicants(response.data);
    } catch (err) {
      console.error(err);
      setError("Failed to load applicants.");
    } finally {
      setLoading(false);
    }
  };

  const handleStatusChange = async (applicationId, newStatus) => {
      try {
        await axios.put(
          `${BASE_URL}/api/${employer.id}/status/${applicationId}`,
          null,
          { params: { status: newStatus } }
        );

        // Update local state
        setApplicants((prev) =>
          prev.map((app) =>
            app.applicationId === applicationId ? { ...app, status: newStatus } : app
          )
        );
      } catch (err) {
        console.error("Failed to update status", err);
        alert(" Error updating status");
      }
    };

  return (
    <Container className="mt-4">
      <h3>👨‍💼 Applicants for Job ID: {jobId}</h3>

      <Link to="/employer/view-jobs">
        <Button variant="secondary" className="mb-3">← Back to Jobs</Button>
      </Link>

      {error && <Alert variant="danger">{error}</Alert>}
      {loading ? (
        <Spinner animation="border" />
      ) : applicants.length === 0 ? (
        <Alert variant="info">No one has applied for this job yet.</Alert>
      ) : (
        <Table striped bordered hover responsive>
          <thead>
            <tr>
              <th>#</th>
              <th>Applicant Name</th>
              <th>Email</th>
              <th>Resume</th>
              <th>Application Date</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            {applicants.map((applicant, index) => (
              <tr key={applicant.id}>
                <td>{index + 1}</td>
                <td>{applicant.name}</td>
                <td>{applicant.email}</td>
                <td>
                  {applicant.resume ? (
                    <a href={`${applicant.resume}`} target="_blank" rel="noopener noreferrer">
                      Download Resume
                    </a>
                  ) : (
                    "No resume uploaded"
                  )}
                </td>
                <td>{new Date(applicant.appliedDate).toLocaleDateString()}</td>
                
                <td>
                <select
                  value={(applicant.status ).toUpperCase()}
                  onChange={(e) => handleStatusChange(applicant.applicationId, e.target.value)}
                  className="form-select"
                >
                  <option value="APPLIED" disabled>APPLIED</option>
                  <option value="REJECTED">Rejected</option>
                  <option value="SHORTLISTED">SHORTLISTED</option>
                </select>
              </td>
              </tr>
              
            ))}
          </tbody>
        </Table>
      )}
    </Container>
  );
};

export default JobApplicants;
