// src/components/jobseeker/JobCard.js
import React from "react";

const JobCard = ({ job }) => {
  return (
    <div className="card mb-3">
      <div className="card-body">
        <h5 className="card-title">{job.title}</h5>
        <h6 className="card-subtitle mb-2 text-muted">{job.company}</h6>
        <p className="card-text">{job.description}</p>
        <p className="card-text"><strong>Location:</strong> {job.location}</p>
        <button className="btn btn-primary">Apply Now</button>
      </div>
    </div>
  );
};

export default JobCard;
