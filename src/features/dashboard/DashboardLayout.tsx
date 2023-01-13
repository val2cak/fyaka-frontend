import { Outlet } from 'react-router-dom';
import Links from '../../components/NavBar/Links';
import Logo from '../../components/NavBar/Logo';

const DashboardLayout = () => {
  return (
    <div>
      <div>
        <Links />
        <Logo />
        <Links />
      </div>

      <Outlet />
    </div>
  );
};

export default DashboardLayout;
