import React, { useEffect, useState } from "react";
import axios from "axios";
import BASE_URL from "../../config/api";
import { Container, Card, Spinner, Alert, Row, Col, Button } from "react-bootstrap";
import { useNavigate } from "react-router-dom";

const EmployerProfile = () => {
  const [profile, setProfile] = useState(null);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const storedUser = JSON.parse(localStorage.getItem("user"));
    if (!storedUser || storedUser.role !== "EMPLOYER") {
      navigate("/login");
      return;
    }

    const fetchProfile = async () => {
      try {
        const response = await axios.get(`${BASE_URL}/api/employers/profile/${storedUser.id}`);
        setProfile(response.data);
      } catch (err) {
        setError("Failed to load employer profile.");
      }
    };

    fetchProfile();
  }, [navigate]);

  const handleEditClick = () => {
    navigate("/employer/edit-profile");
  };
  const handleResetPassword = () => {
    navigate("/employer/reset-password");
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
        <Card.Header className="bg-success text-white d-flex justify-content-between align-items-center">
          <h4 className="mb-0">Employer Profile</h4>
          <Button variant="light" size="sm" onClick={handleEditClick}>
            ✏️ Edit
          </Button>
          <Button variant="danger" size="sm" onClick={handleResetPassword}>
            Reset Password
          </Button>
        </Card.Header>

        <Card.Body>
          <Row className="align-items-center">
            {/* Text Info */}
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
                <strong>Company Name:</strong>{" "}
                {profile.companyName?.trim() ? profile.companyName : <span className="text-muted">Not provided</span>}
              </div>
            </Col>

            {/* Logo */}
            <Col md={4} className="text-center">
              <strong>Company Logo:</strong>
              <div className="mt-2 d-flex justify-content-center">
                {profile.companyLogo ? (
                  <img
                    src={`${profile.companyLogo}`}
                    alt="Logo"
                    className="border shadow-sm"
                    style={{ width: "150px", height: "150px", objectFit: "cover" }}
                  />
                ) : (
                  <div
                    className="d-flex align-items-center justify-content-center border text-muted shadow-sm"
                    style={{
                      width: "150px",
                      height: "150px",
                      backgroundColor: "#232121ff",
                      fontStyle: "italic",
                      fontSize: "0.9rem",
                    }}
                  >
                    No Logo
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

export default EmployerProfile;
