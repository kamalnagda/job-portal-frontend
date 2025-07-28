// src/components/jobseeker/AppliedJobCard.js
import React from "react";

const AppliedJobCard = ({ job }) => {
  return (
    <div className="card mb-3">
      <div className="card-body">
        <h5 className="card-title">{job.title}</h5>
        <h6 className="card-subtitle mb-2 text-muted">{job.company}</h6>
        <p className="card-text"><strong>Status:</strong> {job.status}</p>
        <p className="card-text"><strong>Applied on:</strong> {job.appliedDate}</p>
      </div>
    </div>
  );
};

export default AppliedJobCard;
