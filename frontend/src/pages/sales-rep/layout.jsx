import React from 'react';
import '../admin/layout.css';
import CSRNavBar from '../../components/CSRNavBar/CSRNavBar';
import CSRSidebar from '../../components/CSRSidebar/CSRSidebar';

const Layout = ({ children }) => {
  return (
    <div className='mainContainer'>
      <div className='sidebar'>
        <CSRSidebar />
      </div>
      <div className='contentContainer'>
        <div className='systemNavBar'>
          <CSRNavBar />
        </div>
        <div className='content'>{children}</div>
      </div>
    </div>
  );
};

export default Layout;
