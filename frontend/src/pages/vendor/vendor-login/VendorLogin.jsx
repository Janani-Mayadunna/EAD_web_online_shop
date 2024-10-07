import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import Layout from "../layout";
import "./VendorLogin.css";
import Logo from "../../../images/logo.png";
import BackGroundImage from "../../../images/back17.jpg";

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
      // First, make the login request
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
        const token = response.data.token;
        localStorage.setItem("vendor_token", token);

        // Now fetch the vendor data using the token
        const vendorResponse = await axios.get(
          "https://localhost:7282/api/vendor/currentUser",
          {
            headers: {
              Authorization: `Bearer ${token}`, // Pass token in headers
            },
          }
        );

        if (vendorResponse.status === 200) {
          // Extract vendor data
          const { id: vendorId, owner: userId } = vendorResponse.data;

          // Store vendor_id and user_id in local storage
          localStorage.setItem("vendor_id", vendorId);
          localStorage.setItem("user_id", userId);

          // Redirect to vendor dashboard
          navigate("/vendor");
        }
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
          <button
            type="submit"
            className="btn-login"
            style={{
              backgroundColor: "#5ccee3", // Set the background color to light blue
              color: "#fff", // Text color white
              border: "none", // Remove border
              borderRadius: "5px", // Add border radius
              padding: "10px 20px", // Padding for the button
              cursor: "pointer", // Pointer on hover
              transition: "background-color 0.3s ease", // Smooth transition effect on hover
            }}
            onMouseEnter={(e) => {
              e.target.style.backgroundColor = "#3da1b3"; // Darker blue on hover
            }}
            onMouseLeave={(e) => {
              e.target.style.backgroundColor = "#5ccee3"; // Back to light blue when hover ends
            }}
          >
            Login
          </button>
        </form>
      </div>
    </div>
  );
};

export default VendorLogin;
