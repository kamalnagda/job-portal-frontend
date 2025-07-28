import React, { useEffect, useState } from "react";
import axios from "axios";
import BASE_URL from "../../config/api";
import { Container, Card, Spinner, Alert, Row, Col, Button } from "react-bootstrap";
import { useNavigate } from "react-router-dom";

const JobSeekerProfile = () => {
  const [profile, setProfile] = useState(null);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const storedUser = JSON.parse(localStorage.getItem("user"));
    if (!storedUser || storedUser.role !== "JOB_SEEKER") {
      navigate("/login");
    }
  }, [navigate]);

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const user = JSON.parse(localStorage.getItem("user"));
        const userId = user?.id;

        const response = await axios.get(`${BASE_URL}/api/jobseekers/${userId}`);
        setProfile(response.data);
      } catch (err) {
        setError("Failed to load profile.");
      }
    };

    fetchProfile();
  }, []);

  const handleEditClick = () => {
    navigate("/jobseeker/edit-profile");
  };
  const handleResetPasswordClick = () => {
    navigate("/jobseeker/reset-password");
  };

  if (error) {
    return <Alert variant="danger">{error}</Alert>;
  }

  if (!profile) {
    return (
      <div className="text-center mt-5">
        <Spinner animation="border" />
      </div>
    );
  }

  return (
    <Container className="mt-5">
      <Card className="shadow border-0">
        <Card.Header className="bg-primary text-white d-flex justify-content-between align-items-center">
          <h4 className="mb-0">My Profile</h4>
          <Button variant="light" size="sm" onClick={handleEditClick}>
            ✏️ Edit
          </Button>
          <Button variant="danger" size="sm" onClick={handleResetPasswordClick}>
            Reset Password
          </Button>
        </Card.Header>

        <Card.Body>
          <Row className="align-items-center">
            {/* Left Column: Profile Info */}
            <Col md={8}>
              <div className="mb-3">
                <strong>Name:</strong>{" "}
                {profile.name?.trim() ? profile.name : <span className="text-muted">Not provided</span>}
              </div>
              <div className="mb-3">
                <strong>Email:</strong>{" "}
                {profile.email?.trim() ? profile.email : <span className="text-muted">Not provided</span>}
              </div>
              <div className="mb-3">
                <strong>Resume:</strong>{" "}
                {profile.resume ? (
                  <a
                    href={`${profile.resume}`}
                    target="_blank"
                    rel="noreferrer"
                    className="btn btn-sm btn-outline-primary"
                  >
                    View Resume
                  </a>
                ) : (
                  <span className="text-muted">Not uploaded</span>
                )}
              </div>
            </Col>

            {/* Right Column: Profile Photo */}
            <Col md={4} className="text-center">
              <strong>Profile Photo:</strong>
              <div className="mt-2 d-flex justify-content-center">
                {profile.profilePhoto ? (
                  <img
                    src={`${profile.profilePhoto}`}
                    alt="Profile"
                    className="border shadow-sm"
                    style={{ width: "150px", height: "150px", objectFit: "cover" }}
                  />
                ) : (
                  <div
                    className="d-flex align-items-center justify-content-center border text-muted shadow-sm"
                    style={{
                      width: "150px",
                      height: "150px",
                      backgroundColor: "#181819ff",
                      fontStyle: "italic",
                      fontSize: "0.9rem",
                    }}
                  >
                    No Profile
                  </div>
                )}
              </div>
            </Col>
          </Row>
        </Card.Body>
      </Card>
    </Container>
  );
};

export default JobSeekerProfile;
