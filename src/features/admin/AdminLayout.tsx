import { Fragment } from 'react';
import { Outlet } from 'react-router-dom';

import Footer from '../../components/Footer/Footer';
import NavBar from '../../components/NavBar/NavBar';

const AdminLayout = () => {
  return (
    <div className='min-h-screen m-0 flex flex-col'>
      <NavBar />

      <div className='flex-1 bg-lightColor'>
        <Outlet />
      </div>

      <Footer />
    </div>
  );
};

export default AdminLayout;
