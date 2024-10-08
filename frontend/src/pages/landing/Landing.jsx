import React from "react";
import { FaUserShield, FaUsers, FaStore } from "react-icons/fa";
import Logo from "../../images/logo.png";
import BackGroundImage from "../../images/back161.jpg";

const Landing = () => {
  const containerStyle = {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    minHeight: "100vh",
    backgroundColor: "#f4f4f9",
    textAlign: "center",
    padding: "20px",
    backgroundImage: `url(${BackGroundImage})`,
    backgroundSize: "cover",
    backgroundPosition: "center",
  };

  const logoStyle = {
    width: "250px",
    marginBottom: "20px",
  };

  const headingStyle = {
    fontSize: "32px",
    fontWeight: "bold",
    color: "#333",
    marginBottom: "20px",
  };

  const instructionsStyle = {
    fontSize: "14px",
    color: "#555",
    marginBottom: "30px",
  };

  const gridContainerStyle = {
    display: "flex",
    justifyContent: "space-around",
    gap: "15px",
    width: "100%",
    maxWidth: "1000px",
  };

  const columnStyle = {
    backgroundColor: "#fff",
    padding: "20px",
    borderRadius: "5px",
    boxShadow: "0 2px 8px rgba(0, 0, 0, 0.1)",
    flex: "1",
    textAlign: "center",
    transition: "all 0.3s ease-in-out",
    maxWidth: "300px", // Ensure the width stays reasonable
  };

  const iconStyle = {
    fontSize: "25px",
    color: "#ffac01",
    marginBottom: "10px",
  };

  const buttonStyle = {
    padding: "8px 16px",
    fontSize: "14px",
    color: "#fff",
    backgroundColor: "#ffac01",
    border: "none",
    borderRadius: "2px",
    cursor: "pointer",
    textDecoration: "none",
    marginTop: "10px",
  };

  const columnHoverStyle = {
    transform: "scale(1.02)", // Smaller hover effect to reduce shaking
    boxShadow: "0 4px 12px rgba(0, 0, 0, 0.15)",
  };

  const handleMouseEnter = (e) => {
    e.currentTarget.style.transform = columnHoverStyle.transform;
    e.currentTarget.style.boxShadow = columnHoverStyle.boxShadow;
  };

  const handleMouseLeave = (e) => {
    e.currentTarget.style.transform = "scale(1)";
    e.currentTarget.style.boxShadow = "0 2px 8px rgba(0, 0, 0, 0.1)";
  };

  return (
    <div style={containerStyle}>
      <img src={Logo} alt="Smart Store Logo" style={logoStyle} />
      <h1 style={headingStyle}>Welcome to Smart Store</h1>
      <p style={instructionsStyle}>
        Choose your login option and manage the store as per your role.
      </p>
      <div style={gridContainerStyle}>
        {/* Admin Section */}
        <div
          style={columnStyle}
          onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeave}
        >
          {/* <FaUserShield style={iconStyle} /> */}
          <h2>Admin</h2>
          <p>
            Admins can manage the store, users, and configurations. Log in to
            access administrative features.
          </p>
          <a href="/admin-login" style={buttonStyle}>
            Admin Login
          </a>
        </div>

        {/* CSR Section */}
        <div
          style={columnStyle}
          onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeave}
        >
          {/* <FaUsers style={iconStyle} /> */}
          <h2>Sales Rep (CSR)</h2>
          <p>
            CSRs can assist customers and handle inquiries. Log in to handle
            customer requests.
          </p>
          <a href="/csr-login" style={buttonStyle}>
            CSR Login
          </a>
        </div>

        {/* Vendor Section */}
        <div
          style={columnStyle}
          onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeave}
        >
          {/* <FaStore style={iconStyle} /> */}
          <h2>Vendors</h2>
          <p>
            Vendors can manage products, track sales, and handle inventory. Log
            in to access your store data.
          </p>
          <a href="/vendor-login" style={buttonStyle}>
            Vendor Login
          </a>
        </div>
      </div>
    </div>
  );
};

export default Landing;
