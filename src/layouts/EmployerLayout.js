import { Outlet } from "react-router-dom";
import EmployerNavbar from "../components/employer/EmployerNavbar";
import Footer from '../components/common/Footer';

const EmployerLayout = () => {
  return (
    <div className="d-flex flex-column vh-100">
      <EmployerNavbar />

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

export default EmployerLayout;