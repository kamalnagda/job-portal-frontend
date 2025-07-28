import React, { useEffect, useState } from "react";
import axios from "axios";
import BASE_URL from "../../config/api";
import { useLocation, Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";

const AppliedJobs = () => {
  const [applications, setApplications] = useState([]);
  const [error, setError] = useState("");
  const location = useLocation();
  const [successMsg, setSuccessMsg] = useState(location.state?.successMsg); 
  const navigate = useNavigate();
  //const successMsg = location.state?.successMsg;

    useEffect(() => {
    const storedUser = JSON.parse(localStorage.getItem("user"));
    if (!storedUser || storedUser.role !== "JOB_SEEKER") {
      navigate("/login");
    }
  }, [navigate]);

  useEffect(() => {
    fetchAppliedJobs();
  }, []);

  const fetchAppliedJobs = async () => {
    try {
      const userString = localStorage.getItem("user");
      const user = userString ? JSON.parse(userString) : null;
      const userId = user?.id;
      const response = await axios.get(`${BASE_URL}/api/${userId}/applications`);
      setApplications(response.data);
    } catch (err) {
      setError("Failed to fetch applied jobs");
    }
  };

    setTimeout(() => {
    setSuccessMsg("");
  }, 3000);
  
  return (
    <div className="container mt-4" >
      {successMsg && (
        <div className="alert alert-success">
          {successMsg}
        </div>
      )}
      <h2 className="mb-4">Applied Jobs</h2>

      {error && <div className="alert alert-danger">{error}</div>}

      {applications.length === 0 ? (
        <p>You have not applied for any jobs yet.</p>
      ) : (
        <div className="row">
          {applications.map((application) => (
            <div className="col-md-6 mb-4" key={application.applicationId}>
              <div className="card shadow-sm">
                <div className="card-body">
                  <h5 className="card-title">{application.title}</h5>
                  <p>Status: <strong>{application.status}</strong></p>
                  <p> {application.description}</p>
                  <Link to={`/jobseeker/application/${application.applicationId}`} className="btn btn-outline-primary">
                    View Details
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default AppliedJobs;
