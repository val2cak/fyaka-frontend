import { Outlet } from 'react-router-dom';

import NavBar from '../../components/NavBar/NavBar';
import Footer from '../../components/Footer/Footer';
import { useEffect, useState } from 'react';

const GuestLayout = () => {
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

export default GuestLayout;
