import React from 'react';
import Footer from './Footer';
import { Outlet } from 'react-router-dom';

function Layout() {
  return (
    <div className='container'>
      <Outlet />
      <Footer />
    </div>
  )
}

export default Layout