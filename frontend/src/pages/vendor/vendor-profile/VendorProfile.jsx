import React, { useState } from "react";
import Layout from "../layout";
import VendorImg from "../../../images/vendor.png"; // Importing vendor image

const VendorProfile = () => {
  const [username, setUsername] = useState("Sahan Perera"); // Initial username from response
  const [isEditing, setIsEditing] = useState(false); // State to control edit mode

  const handleUsernameChange = (e) => {
    setUsername(e.target.value);
  };

  const handleEditClick = () => {
    setIsEditing(true);
  };

  const handleSaveClick = () => {
    // Make API call to update username
    const updatedUser = { username }; // Send updated username in the request
    console.log("Updating username to:", updatedUser);
    setIsEditing(false); // Exit edit mode after saving
  };

  return (
    <Layout
      pageTitle="Vendor Dashboard"
      icon="bi bi-person-circle"
      breadcrumb="Vendor Profile"
    >
      <div
        className="col-md-12 d-flex flex-column align-items-center "
        style={{
          backgroundColor: "#f0f0f0",
        }}
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
                value="customer@gmail.com"
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
                value="Customer"
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
                value="Active"
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
