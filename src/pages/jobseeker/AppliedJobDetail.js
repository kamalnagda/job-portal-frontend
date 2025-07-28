import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
import BASE_URL from "../../config/api";
import { useNavigate } from "react-router-dom";

const ApplicationDetail = () => {
  const { applicationId } = useParams();
  const [application, setApplication] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const storedUser = JSON.parse(localStorage.getItem("user"));
    if (!storedUser || storedUser.role !== "JOB_SEEKER") {
      navigate("/login");
    }
  }, [navigate]);

  useEffect(() => {
    const fetchApplicationDetail = async () => {
      try {
      const userString = localStorage.getItem("user");
      const user = userString ? JSON.parse(userString) : null;
      const userId = user?.id;
      const response = await axios.get(`${BASE_URL}/api/${userId}/application/${applicationId}`);
        setApplication(response.data);
      } catch (error) {
        console.error("Failed to fetch application details:", error);
      }
    };

    fetchApplicationDetail();
  }, [applicationId]);

  if (!application) return <p>Loading...</p>;


  return (
    <div className="container mt-4">
      <h2>Application Detail</h2>

      <div className="card p-3 shadow-sm">
        <h4>{application.title}</h4>
        <p><strong>Company:</strong> {application.companyName}</p>
        <p><strong>Location:</strong> {application.location}</p>
        <p><strong>Skills:</strong> {application.skillsRequired}</p>
        <p><strong>Salary:</strong> {application.salary}</p>
        <p><strong>Description:</strong> {application.description}</p>
        <p><strong>Applied At:</strong> {new Date(application.appliedAt).toLocaleString()}</p>
        <p><strong>Status:</strong> {application.status}</p>
      </div>
    </div>
  );
};

export default ApplicationDetail;
