import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import Layout from "../layout";
import "./CSRLogin.css";
import Logo from "../../../images/logo.png";
import BackGroundImage from "../../../images/back19.jpg";

const CSRLogin = () => {
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
        localStorage.setItem("csr_token", token);

        // Redirect to CSR dashboard
        navigate("/csr/orders");
      }
    } catch (error) {
      console.log(error.response); // Log the error response for debugging
      if (error.response) {
        setError(
          error.response.data.message || "Failed to login. Please try again."
        );
      } else {
        setError("An error occurred. Please try again.");
      }
    }
  };

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
        <img src={Logo} alt="Smaart Store Logo" className="logo" />
        <h2>CSR Login</h2>
        <p>Serve Customers with Confidence</p>
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
              backgroundColor: "#72BF78", // Set the background color to light blue
              color: "#fff", // Text color white
              border: "none", // Remove border
              borderRadius: "5px", // Add border radius
              padding: "10px 20px", // Padding for the button
              cursor: "pointer", // Pointer on hover
              transition: "background-color 0.3s ease", // Smooth transition effect on hover
            }}
            onMouseEnter={(e) => {
              e.target.style.backgroundColor = "#A0D683"; // Darker blue on hover
            }}
            onMouseLeave={(e) => {
              e.target.style.backgroundColor = "#72BF78"; // Back to light blue when hover ends
            }}
          >
            Login
          </button>
        </form>
      </div>
    </div>
  );
};

export default CSRLogin;
