import React from 'react';
import AdminSidebar from '../../components/AdminSidebar/AdminSidebar';
import './layout.css';
import SystemNav from '../../components/AdminNav/AdminNav';

const Layout = ({ children }) => {
  return (
    <div className='mainContainer'>
      <div className='sidebar'>
        <AdminSidebar />
      </div>
      <div className='contentContainer'>
        <div className='systemNavBar'>
          <SystemNav />
        </div>
        <div className='content'>
          {children}
        </div>
      </div>
    </div>
  );
};

export default Layout;
