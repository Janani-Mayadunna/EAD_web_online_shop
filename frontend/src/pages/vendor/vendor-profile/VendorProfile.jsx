import React, { useState, useEffect } from "react";
import Layout from "../layout";
import VendorImg from "../../../images/vendor.png";
import axios from "axios"; // Import Axios for API requests

const VendorProfile = () => {
  const [username, setUsername] = useState(""); // Username state
  const [email, setEmail] = useState(""); // Email state
  const [role, setRole] = useState(""); // Role state
  const [status, setStatus] = useState("Active"); // Status (default to "Active")
  const [isEditing, setIsEditing] = useState(false); // Edit mode control
  const [error, setError] = useState(""); // Error state

  // Fetch user data on component mount
  useEffect(() => {
    const fetchUserData = async () => {
      const userId = localStorage.getItem("user_id"); // Retrieve user_id from local storage
      const token = localStorage.getItem("vendor_token"); // Retrieve token from local storage

      try {
        const response = await axios.get(
          `https://localhost:7282/api/user/${userId}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        if (response.status === 200) {
          const { username, email, role } = response.data;
          setUsername(username);
          setEmail(email);
          setRole(role);
        }
      } catch (error) {
        console.error("Failed to fetch user data:", error);
        setError("Failed to load user data. Please try again.");
      }
    };

    fetchUserData();
  }, []); // Run this effect only once when the component mounts

  const handleUsernameChange = (e) => {
    setUsername(e.target.value);
  };

  const handleEditClick = () => {
    setIsEditing(true);
  };

  const handleSaveClick = async () => {
    const userId = localStorage.getItem("user_id"); // Get user ID from local storage
    const token = localStorage.getItem("vendor_token"); // Get token from local storage

    const updatedUser = { username }; // Prepare the updated username

    try {
      // Make the API request to update the username
      const response = await axios.put(
        `https://localhost:7282/api/user`,
        updatedUser,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );

      if (response.status === 200) {
        console.log("Username updated successfully");
        setIsEditing(false); // Exit edit mode after saving
      }
    } catch (error) {
      console.error("Failed to update username:", error);
      setError("Failed to update username. Please try again.");
    }
  };

  return (
    <Layout
      pageTitle="Vendor Dashboard"
      icon="bi bi-person-circle"
      breadcrumb="Vendor Profile"
    >
      <div
        className="col-md-12 d-flex flex-column align-items-center"
        style={{ backgroundColor: "#f0f0f0" }}
      >
        <br />
        {/* Vendor Image */}
        <div className="text-center">
          <img
            src={VendorImg}
            alt="Vendor Profile"
            className="rounded-circle mb-4"
            style={{
              width: "150px",
              height: "150px",
              objectFit: "cover",
              border: "4px solid #007bff",
            }}
          />
        </div>

        {/* Vendor Details */}
        <div className="col-md-8">
          <form>
            {error && <p className="text-danger">{error}</p>}
            {/* Username Field with Pencil Icon */}
            <div className="form-group mb-4">
              <label htmlFor="username" className="form-label fw-bold">
                Username
              </label>
              <div className="d-flex align-items-center">
                {isEditing ? (
                  <input
                    type="text"
                    className="form-control border-primary"
                    id="username"
                    value={username}
                    onChange={handleUsernameChange}
                    style={{ fontSize: "15px" }} // Setting font size to 15px
                  />
                ) : (
                  <input
                    type="text"
                    className="form-control"
                    id="username"
                    value={username}
                    readOnly
                    style={{ fontSize: "15px" }} // Setting font size to 15px
                  />
                )}
                {!isEditing && (
                  <i
                    className="bi bi-pencil-square ms-2 text-primary"
                    style={{ cursor: "pointer", fontSize: "1.2rem" }}
                    onClick={handleEditClick}
                  ></i>
                )}
              </div>
            </div>

            {/* Other Details */}
            <div className="form-group mb-4">
              <label htmlFor="email" className="form-label fw-bold">
                Email
              </label>
              <input
                type="text"
                className="form-control"
                id="email"
                value={email}
                readOnly
                style={{ fontSize: "15px" }} // Setting font size to 15px
              />
            </div>

            <div className="form-group mb-4">
              <label htmlFor="role" className="form-label fw-bold">
                Role
              </label>
              <input
                type="text"
                className="form-control"
                id="role"
                value={role}
                readOnly
                style={{ fontSize: "15px" }} // Setting font size to 15px
              />
            </div>

            <div className="form-group mb-4">
              <label htmlFor="status" className="form-label fw-bold">
                Status
              </label>
              <input
                type="text"
                className="form-control"
                id="status"
                value={status}
                readOnly
                style={{ fontSize: "15px" }} // Setting font size to 15px
              />
            </div>

            {/* Save Button */}
            {isEditing && (
              <button
                type="button"
                className="btn btn-success w-100"
                onClick={handleSaveClick}
              >
                Save
              </button>
            )}
            <br />
            <br />
          </form>
        </div>
      </div>
    </Layout>
  );
};

export default VendorProfile;
