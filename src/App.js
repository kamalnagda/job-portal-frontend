import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import LoginPage from './pages/auth/LoginPage';
import JobSeekerDashboard from './pages/jobseeker/JobSeekerDashboard';
import JobSeekerRegisterPage from './pages/auth/JobSeekerRegisterPage';
import JobSeekerLayout from './layouts/JobSeekerLayout';
import SearchJobs from './pages/jobseeker/SearchJobs';
import AppliedJobs from './pages/jobseeker/AppliedJobs';
import JobSeekerProfile from './pages/jobseeker/JobSeekerProfile';
import JobDetails from './pages/jobseeker/JobDetails';
import AppliedJobDetail from './pages/jobseeker/AppliedJobDetail';
import EmployerLayout from './layouts/EmployerLayout';
import PostJob from './pages/employer/PostJob';
import ViewPostedJobs from './pages/employer/ViewPostedJobs';
import ViewJobDetails from './pages/employer/ViewJobDetails';
import UpdateJob from './pages/employer/UpdateJob';
import JobApplicants from './pages/employer/JobApplicants';
import EmployerRegister from './pages/auth/EmployerRegister';
import EmployerProfile from './pages/employer/EmployerProfile';
import EditJobSeekerProfile from './pages/jobseeker/EditJobSeekerProfile';
import EditEmployerProfile from './pages/employer/EditEmployerProfile';
import ResetJobSeekerPassword from './pages/jobseeker/ResetJobSeekerPassword';
import ResetEmployerPassword from './pages/employer/ResetEmployerPassword';


function App() {
  return (
    <Router>
      <Routes>

          {/*for login and registration ./pages/auth/--  */}
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register/jobseeker" element={<JobSeekerRegisterPage />} />
        <Route path="/register/employer" element={<EmployerRegister/>} />

        {/* after login   jobseeker */}
        <Route path="/jobseeker" element={<JobSeekerLayout />}>
          <Route index  element={<JobSeekerDashboard />} />
          <Route path="search-jobs" element={<SearchJobs />} />
          <Route path="applied-jobs" element={<AppliedJobs />} />
          <Route path="application/:applicationId" element={<AppliedJobDetail />} />
          <Route path="job/:id" element={<JobDetails />} />
          <Route path="profile" element={<JobSeekerProfile/>} />
          <Route path="edit-profile" element={<EditJobSeekerProfile />} />
          <Route path="reset-password" element={<ResetJobSeekerPassword />} />
        </Route>

        {/* Employer Routes */}
        <Route path="/employer" element={<EmployerLayout />}>
          {/* <Route index element={<EmployerDashboard />} /> */}
          <Route path="post-job" element={<PostJob />} />
          <Route path="view-jobs" element={<ViewPostedJobs/>} />
          <Route path="job-details/:jobId" element={<ViewJobDetails/>} />
          <Route path="update-job/:jobId" element={<UpdateJob/>} />
          <Route path="job-applicants/:jobId" element={<JobApplicants />} />
          <Route path="profile" element={<EmployerProfile />} />
          <Route path="edit-profile" element={<EditEmployerProfile />} />
          <Route path="reset-password" element={<ResetEmployerPassword />} />
    
        </Route>

      </Routes>
    </Router>
  );
}

export default App;