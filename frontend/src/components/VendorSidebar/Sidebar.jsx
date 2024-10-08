import React, { useEffect, useState } from "react";
import "./Sidebar.css";
import $ from "jquery";
import Logo from "../../images/logo.png";
import { Link, useLocation } from "react-router-dom";

const VendorSidebar = () => {
  const location = useLocation();
  const [activeItem, setActiveItem] = useState("");

  useEffect(() => {
    // set the active item based on the current URL path
    const path = location.pathname;
    setActiveItem(path);

    // add click event handler to sidebar items
    $(".sidebar ul li").on("click", function () {
      setActiveItem($(this).find("a").attr("href"));
    });
  }, [location]);

  return (
    <div className="main-container">
      <div className="sidebar" id="side-nav">
        <div
          className="header-box px-3 pb-4 d-flex"
          style={{
            paddingTop: "60px",
          }}
        >
          <h1 className="fs-3 px-4 items-center">
            <span className="text-black">Smart Store</span>
          </h1>
          <button className="btn d-md-none d-block close-btn px-2 py-0 text-white">
            <i class="bi bi-list"></i>
          </button>
        </div>

        <div className="logoSideBar">
          <img className="imgLogoSideBar" src={Logo} alt="" />
        </div>

        <div>
          <ul className="list-untyled px-2">
            <li className={activeItem === "/vendor" ? "active" : ""}>
              <Link
                to="/vendor"
                className="text-decoration-none px-3 py-2 d-block"
              >
                <i class="bi bi-house-door"></i>
                <span style={{ paddingLeft: "0.7rem" }}>Dashboard</span>
              </Link>
            </li>
            <li className={activeItem === "/vendor/category" ? "active" : ""}>
              <Link
                to="/vendor/category"
                className="text-decoration-none px-3 py-2 d-block"
              >
                <i class="bi bi-tags"></i>
                <span style={{ paddingLeft: "0.7rem" }}>
                  Category Management
                </span>
              </Link>
            </li>
            <li className={activeItem === "/vendor/products" ? "active" : ""}>
              <Link
                to="/vendor/products"
                className="text-decoration-none px-3 py-2 d-block"
              >
                <i class="bi bi-box-seam"></i>
                <span style={{ paddingLeft: "0.7rem" }}>
                  Product Management
                </span>
              </Link>
            </li>
            <li className={activeItem === "/vendor/orders" ? "active" : ""}>
              <Link
                to="/vendor/orders"
                className="text-decoration-none px-3 py-2 d-block"
              >
                <i class="bi bi-card-checklist"></i>
                <span style={{ paddingLeft: "0.7rem" }}>Order Management</span>
              </Link>
            </li>
            <li className={activeItem === "/vendor/rates" ? "active" : ""}>
              <Link
                to="/vendor/rates"
                className="text-decoration-none px-3 py-2 d-block"
              >
                <i class="bi bi-star-half"></i>
                <span style={{ paddingLeft: "0.7rem" }}>Rate and Reviews</span>
              </Link>
            </li>
            <li className={activeItem === "/vendor/profile" ? "active" : ""}>
              <Link
                to="/vendor/profile"
                className="text-decoration-none px-3 py-2 d-block"
              >
                <i class="bi bi-person-circle"></i>
                <span style={{ paddingLeft: "0.7rem" }}>Vendor Profile</span>
              </Link>
            </li>
          </ul>
        </div>
        <hr className="h-color mx-2" />
      </div>
    </div>
  );
};

export default VendorSidebar;
