
import { Card, Row, Col } from "react-bootstrap";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const JobSeekerDashboard = () => {
  
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const storedUser = JSON.parse(localStorage.getItem("user"));
    if (!storedUser || storedUser.role !== "JOB_SEEKER") {
      navigate("/login");
    } else {
      setUser(storedUser);
    }
  }, [navigate]);

  if (!user) return null;



  return (
    <div className="container mt-4">
      <h2 className="mb-4">Welcome to Your Dashboard</h2>

      <Row className="g-4">
        <Col md={4}>
          <Card className="shadow-sm h-100">
            <Card.Body>
              <Card.Title>Search Jobs</Card.Title>
              <Card.Text>
                Browse and search for jobs that match your skills and interest.
              </Card.Text>
            </Card.Body>
          </Card>
        </Col>

        <Col md={4}>
          <Card className="shadow-sm h-100">
            <Card.Body>
              <Card.Title>Applied Jobs</Card.Title>
              <Card.Text>
                View all the jobs you have applied to so far and track progress.
              </Card.Text>
            </Card.Body>
          </Card>
        </Col>

        <Col md={4}>
          <Card className="shadow-sm h-100">
            <Card.Body>
              <Card.Title>My Profile</Card.Title>
              <Card.Text>
                Manage your personal information, resume, and profile photo.
              </Card.Text>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </div>
  );
};

export default JobSeekerDashboard;





