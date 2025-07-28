import { useState, useEffect } from "react";
import axios from "axios";
import BASE_URL from "../../config/api";
import { useNavigate } from "react-router-dom";

const SearchJobs = () => {
  const [title, setTitle] = useState("");
  const [location, setLocation] = useState("");
  const [skills, setSkills] = useState("");
  const [jobs, setJobs] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const storedUser = JSON.parse(localStorage.getItem("user"));
    if (!storedUser || storedUser.role !== "JOB_SEEKER") {
      navigate("/login");
    }
  }, [navigate]);

  const searchJobs = async () => {
    try {
      const response = await axios.get(`${BASE_URL}/api/jobs/search`, {
        params: {
          title,
          location,
          skills,
        },
      });
      setJobs(response.data);
    } catch (error) {
      console.error("Search error:", error);
    }
  };



  const resetSearch = () => {
    setTitle("");
    setLocation("");
    setSkills("");
  };

useEffect(() => {
  if (title === "" && location === "" && skills === "") {
    searchJobs();
  }
}, [title, location, skills]);

  return (
    <div className="container mt-4">
      <h2 className="mb-4">Search Jobs</h2>

      <div className="row mb-4">
        <div className="col">
          <input
            type="text"
            placeholder="Job Title"
            className="form-control"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
        </div>
        <div className="col">
          <input
            type="text"
            placeholder="Location"
            className="form-control"
            value={location}
            onChange={(e) => setLocation(e.target.value)}
          />
        </div>
        <div className="col">
          <input
            type="text"
            placeholder="Skills"
            className="form-control"
            value={skills}
            onChange={(e) => setSkills(e.target.value)}
          />
        </div>
        <div className="col d-flex gap-2">
          <button className="btn btn-primary w-50" onClick={searchJobs}>
            Search
          </button>
          <button className="btn btn-secondary w-50" onClick={resetSearch}>
            Reset
          </button>
        </div>
      </div>

      <div className="row">
        {jobs.length === 0 ? (
          <p className="text-center">No jobs found.</p>
        ) : (
          jobs.map((job) => (
          <div key={job.id} className="col-md-4 mb-4">
            <div className="card h-100 shadow-sm">
              <div className="card-body d-flex flex-column">
                
                {/* Title and Logo Row */}
                <div className="d-flex justify-content-between align-items-center mb-3">
                  <h5 className="card-title mb-0">{job.title}</h5>
                  {job.companyLogo && (
                    <img
                      src={`${job.companyLogo}`}
                      alt="Company Logo"
                      className="rounded"
                      style={{
                        height: "50px",
                        width: "50px",
                        objectFit: "cover",
                        border: "1px solid #ccc",
                        padding: "2px"
                      }}
                    />
                  )}
                </div>

                {/* Job Info */}
                <p className="card-text mb-1">
                  <strong>📍 Location:</strong> {job.location}
                </p>
                <p className="card-text mb-1">
                  <strong>🛠 Skills:</strong> {job.skillsRequired}
                </p>
                <p className="card-text mb-1">
                  <strong>💰 Salary:</strong> {job.salary}
                </p>
                <p className="card-text mb-3">
                  <strong>📝 Description:</strong> {job.description}
                </p>

                {/* View Button */}
                <button
                  className="btn btn-primary mt-auto align-self-end"
                  onClick={() => navigate(`/jobseeker/job/${job.id}`)}
                >
                  View Details
                </button>
              </div>
            </div>
          </div>
          ))
        )}
      </div>
    </div>
  );
};

export default SearchJobs;


