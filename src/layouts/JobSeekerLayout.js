import React from 'react';
import { Outlet } from 'react-router-dom';
import JobSeekerNavbar from '../components/jobseeker/JobSeekerNavbar';
import Footer from '../components/common/Footer';

const JobSeekerLayout = () => {
  return (
    <div className="d-flex flex-column vh-100">
      <JobSeekerNavbar />

      <div className="d-flex flex-grow-1">
        {/* Main Content */}
        <main className="flex-grow-1 p-3 bg-light">
          <Outlet />
        </main>
      </div>

      <Footer />
    </div>
  );
};

export default JobSeekerLayout;
