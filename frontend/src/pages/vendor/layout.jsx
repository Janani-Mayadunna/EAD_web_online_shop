import React from "react";
import VendorSidebar from "../../components/VendorSidebar/Sidebar";
import "./vendor-layout.css";
import VendorNav from "../../components/VendorNav/VendorNav";

const Layout = ({ children, pageTitle, icon, breadcrumb }) => {
  return (
    <div className="mainContainer">
      <div className="sidebar">
        <VendorSidebar />
      </div>
      <div className="contentContainer">
        <div className="systemNavBar" style={{ backgroundColor: "#f0f0f0" }}>
          <div className="row">
            {/* Top Header */}
            <div className="col-md-8 d-flex align-items-center">
              <p
                style={{
                  fontSize: "20px",
                  marginRight: "10px",
                  marginLeft: "10px",
                  paddingTop: "25px",
                }}
              >
                {pageTitle} {/* Dynamic title */}
              </p>
              <span
                style={{
                  borderLeft: "1px solid #ccc",
                  height: "24px",
                  marginLeft: "10px",
                  marginRight: "10px",
                }}
              ></span>
              <i
                className={icon}
                style={{ fontSize: "20px", marginRight: "10px" }}
              ></i>{" "}
              {/* Dynamic icon */}
              <i
                className="bi bi-chevron-right"
                style={{ fontSize: "16px", marginRight: "10px" }}
              ></i>
              <span style={{ fontSize: "16px", color: "#6c757d" }}>
                {breadcrumb} {/* Dynamic breadcrumb */}
              </span>
            </div>
            {/* Navbar */}
            <div className="col-md-4">
              <VendorNav />
            </div>
          </div>
        </div>
        <div
          className="content"
          style={{
            paddingLeft: "2rem",
            paddingRight: "2rem",
            paddingTop: "2rem",
          }}
        >
          {children}
        </div>
      </div>
    </div>
  );
};

export default Layout;
