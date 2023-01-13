import { Outlet } from 'react-router-dom';
import { Box } from '@mui/material';
import NavBar from '../../components/NavBar/NavBar';

const DashboardLayout = () => {
  return (
    <Box>
      <NavBar />
      <Outlet />
    </Box>
  );
};

export default DashboardLayout;
