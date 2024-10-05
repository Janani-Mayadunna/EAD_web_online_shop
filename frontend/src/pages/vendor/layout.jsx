import React from "react";
import VendorSidebar from "../../components/VendorSidebar/Sidebar";
import "./layout.css";

const Layout = ({ children }) => {
  return (
    <div className="mainContainer">
      <div className="sidebar">
        <VendorSidebar />
      </div>
      <div className="contentContainer">{children}</div>
    </div>
  );
};

export default Layout;
