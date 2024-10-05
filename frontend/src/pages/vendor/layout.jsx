import React from "react";
import VendorSidebar from "../../components/VendorSidebar/Sidebar";
import "./vendor-layout.css";
import VendorNav from "../../components/VendorNav/VendorNav";

const Layout = ({ children }) => {
  return (
    <div className="mainContainer">
      <div className="sidebar">
        <VendorSidebar />
      </div>
      <div className="contentContainer">
        <div className="systemNavBar" style={{ backgroundColor: "#f0f0f0" }}>
          <div className="row">
            <div className="col-md-8">
              <h5>Dashboard</h5>
            </div>
            <div className="col-md-4">
              <VendorNav />
            </div>
          </div>
        </div>
        <div className="content">{children}</div>
      </div>
    </div>
  );
};

export default Layout;
