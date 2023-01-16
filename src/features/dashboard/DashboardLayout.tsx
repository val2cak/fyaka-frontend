import { Outlet } from 'react-router-dom';
import NavBar from '../../components/NavBar/NavBar';

const DashboardLayout = () => {
  return (
    <div>
      <NavBar />
      <Outlet />
    </div>
  );
};

export default DashboardLayout;
