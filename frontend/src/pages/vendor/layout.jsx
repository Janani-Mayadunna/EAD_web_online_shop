import React from "react";
import Sidebar from "../../components/VendorSidebar/Sidebar";
import "./layout.css";
import SystemNav from "../../components/VendorNav/VendorNav";

const Layout = ({ children }) => {
  return (
    <div className="mainContainer">
      <div className="sidebar">
        <Sidebar />
      </div>
      <div className="contentContainer">
        <div className="systemNavBar">
          <SystemNav />
        </div>
        <div className="content">{children}</div>
      </div>
    </div>
  );
};

export default Layout;
