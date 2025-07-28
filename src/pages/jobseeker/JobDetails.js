import { useParams, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
import BASE_URL from "../../config/api";

const JobDetails = () => {
  const { id } = useParams();
  const [job, setJob] = useState(null);
  const [msg, setMsg] = useState(""); // Message for success or error
  const navigate = useNavigate();

  useEffect(() => {
    const storedUser = JSON.parse(localStorage.getItem("user"));
    if (!storedUser || storedUser.role !== "JOB_SEEKER") {
      navigate("/login");
    }
  }, [navigate]);

  useEffect(() => {
    const fetchJob = async () => {
      try {
        const response = await axios.get(`${BASE_URL}/api/job/${id}`);
        setJob(response.data);
      } catch (error) {
        console.error("Error fetching job:", error);
      }
    };
    fetchJob();
  }, [id]);

  const applyForJob = async () => {
    const user = JSON.parse(localStorage.getItem("user"));
    if (!user) {
      setMsg("❌ Please login to apply.");
      return;
    }

    try {
      const response = await axios.post(`${BASE_URL}/api/${user.id}/apply/${id}`);
      const successMessage = response.data.message || "✅ Applied successfully!";
      setMsg(successMessage);

      // Navigate after short delay
      setTimeout(() => {
        navigate("/jobseeker/applied-jobs", {
          state: { successMsg: successMessage }
        });
      }, 1500);
    }catch (error) {
      const errorMessage =
        typeof error.response?.data === "string"
          ? error.response.data
          : "❌ Failed to apply. Try again.";
      setMsg(errorMessage);
      setTimeout(() => {
        setMsg("");
      }, 3000);
    }
  };

  if (!job) return <div className="text-center mt-4">Loading job details...</div>;

  return (
    <div className="container mt-5">
      {msg && (
        <div className="alert alert-info text-center mt-3" role="alert">
          {msg}
        </div>
      )}
      <div className="card shadow p-4">
        <div className="d-flex justify-content-between align-items-center mb-3">
          <h2 className="mb-0">{job.title}</h2>
          {job.companyLogo && (
            <img
              src={`${job.companyLogo}`}
              alt="Company Logo"
              className="rounded"
              style={{
                width: "60px",
                height: "60px",
                objectFit: "cover",
                border: "1px solid #ccc",
                padding: "2px"
              }}
            />
          )}
        </div>

        <hr />

        <div className="row">
          <div className="col-md-6 mb-3">
            <p><strong>📍 Location:</strong> {job.location}</p>
            <p><strong>💰 Salary:</strong> {job.salary}</p>
            <p><strong>🗓️ Posted At:</strong> {new Date(job.postedAt).toLocaleDateString()}</p>
          </div>
          <div className="col-md-6 mb-3">
            <p><strong>🛠 Skills Required:</strong></p>
            <ul className="mb-0">
              {job.skillsRequired?.split(",").map((skill, index) => (
                <li key={index}>{skill.trim()}</li>
              ))}
            </ul>
          </div>
        </div>

        <div className="mt-3">
          <p><strong>📝 Description:</strong></p>
          <p className="text-muted">{job.description}</p>
        </div>

        <div className="text-end">
          <button className="btn btn-primary mt-3" onClick={applyForJob}>
            Apply Now
          </button>
        </div>
      </div>
    </div>
  );
};

export default JobDetails;
