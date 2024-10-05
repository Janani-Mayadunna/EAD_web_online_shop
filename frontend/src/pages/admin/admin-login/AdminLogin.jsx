import React from "react";
import Layout from "../layout";
import "./AdminLogin.css";
import Logo from "../../../images/logo.png";
import BackGroundImage from "../../../images/back5.jpg";

const AdminLogin = () => {
  return (
    <div
      className="vendor-login-container"
      style={{
        backgroundImage: `url(${BackGroundImage})`, // Corrected the usage
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
      }}
    >
      <div className="login-card">
        <img src={Logo} alt="Smart Store Logo" className="logo" />
        <h2>Admin Login</h2>
        <p>Admin access for Smart Store</p>
        <form className="login-form">
          <div className="form-group">
            <label htmlFor="email">Email Address</label>
            <input
              type="email"
              id="email"
              name="email"
              className="form-control"
              placeholder="Enter your email"
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="password">Password</label>
            <input
              type="password"
              id="password"
              name="password"
              className="form-control"
              placeholder="Enter your password"
              required
            />
          </div>
          <button type="submit" className="btn-login">
            Login
          </button>
        </form>
      </div>
    </div>
  );
};

export default AdminLogin;
