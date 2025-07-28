import { Link, useNavigate } from "react-router-dom";
import { Navbar, Nav, Container, Button } from "react-bootstrap";

const EmployerNavbar = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("user"); // or whatever you stored
    navigate("/login"); // redirect to login
  };

  return (
    <Navbar bg="dark" variant="dark" expand="lg" sticky="top">
      <Container>
        <Navbar.Brand as={Link} to="/employer">
           Job Portal
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="employer-navbar" />
        <Navbar.Collapse id="employer-navbar">
          <Nav className="me-auto">
            <Nav.Link as={Link} to="/employer/post-job">Post Job</Nav.Link>
            <Nav.Link as={Link} to="/employer/view-jobs">View Jobs</Nav.Link>
            <Nav.Link as={Link} to="/employer/Profile">Profile</Nav.Link>
          </Nav>
          <Button variant="outline-light" onClick={handleLogout}>Logout</Button>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default EmployerNavbar;
