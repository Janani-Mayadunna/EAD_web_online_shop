import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios"; // Import Axios
import Layout from "../layout";
import "./VendorLogin.css";
import Logo from "../../../images/logo.png";
import BackGroundImage from "../../../images/back7.jpg";

const VendorLogin = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setError(""); // Reset any previous errors

    const requestBody = {
      email: email,
      password: password,
    };

    try {
      const response = await axios.post(
        "https://localhost:7282/api/auth/login",
        requestBody,
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      if (response.status === 200) {
        // Store token in local storage
        localStorage.setItem("vendor_token", response.data.token);
        // Redirect to vendor dashboard
        navigate("/vendor");
      }
    } catch (error) {
      // Set error message based on response or network error
      console.log("Login error:", error); 
      
      if (error.response) {
        setError(
          error.response.data.message || "Failed to login. Please try again."
        );
      } else {
        setError("An error occurred. Please try again later.");
      }
    }
  };

  return (
    <div
      className="vendor-login-container"
      style={{
        backgroundImage: `url(${BackGroundImage})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
      }}
    >
      <div className="login-card">
        <img src={Logo} alt="Smaart Store Logo" className="logo" />
        <h2>Vendor Login</h2>
        <p>Manage your Products & Orders..</p>
        <form className="login-form" onSubmit={handleLogin}>
          {error && <p className="error-message">{error}</p>}
          <div className="form-group">
            <label htmlFor="email">Email Address</label>
            <input
              type="email"
              id="email"
              name="email"
              className="form-control"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
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
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          <button type="submit" className="btn-login">
            Login
          </button>
        </form>
        <p className="forgot-password">
          <a href="#">Sign Up Here</a>
        </p>
      </div>
    </div>
  );
};

export default VendorLogin;
