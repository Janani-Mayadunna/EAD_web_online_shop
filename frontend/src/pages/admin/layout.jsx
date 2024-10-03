import React from 'react';
import Sidebar from '../../components/Sidebar/Sidebar';
import './layout.css';

const Layout = ({ children }) => {
  return (
    <div className='mainContainer'>
      <div className='sidebar'>
      <Sidebar />
      </div>
      <div className='contentContainer'>{children}</div>
    </div>
  );
};

export default Layout;
