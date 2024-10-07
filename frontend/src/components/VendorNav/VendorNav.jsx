import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import NavDropdown from "react-bootstrap/NavDropdown";
import { Link } from "react-router-dom";
import VendorImg from "../../images/vendor.png";
import "./VendorNav.css";
import { useState } from "react";
import { Badge, Dropdown } from "react-bootstrap";
import products from "../../pages/data/products.json";

const VendorNav = () => {
  const [showLowStock, setShowLowStock] = useState(false);

  function logout() {
    localStorage.removeItem("vendor_token");
  }

  // Filter low stock items
  const lowStockProducts = products.filter(
    (product) => product.inventoryCount <= product.lowStockAlert
  );

  return (
    <div className="mainNavContainer d-flex justify-content-end">
      <Navbar className="subNavContainer" expand="lg">
        <Container>
          <Navbar.Brand href="#home">
            <img
              src={VendorImg}
              alt="Vendor-Avatar"
              style={{ height: "50px", width: "50px" }}
            ></img>
          </Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="me-auto">
              {/* System Admin Dropdown */}
              <NavDropdown active title="System Vendor" id="basic-nav-dropdown">
                <NavDropdown.Item href="#action/3.1">
                  <Link
                    to="/vendor/profile"
                    className="nav-link"
                    aria-current="page"
                  >
                    <i
                      style={{
                        color: "#359733",
                      }}
                      className="bi bi-person-circle bi-2x"
                    ></i>{" "}
                    <span style={{ fontSize: "12x", color: "black" }}>
                      Profile
                    </span>
                  </Link>
                </NavDropdown.Item>
                <NavDropdown.Item href="#action/3.2">
                  <Link
                    to="/vendor-login"
                    style={{ color: "#359733" }}
                    className="nav-link"
                    onClick={logout}
                  >
                    <i className="bi bi-box-arrow-right"></i>{" "}
                    <span style={{ fontSize: "12px", color: "black" }}>
                      Log Out
                    </span>
                  </Link>
                </NavDropdown.Item>
              </NavDropdown>
              {/* Notification Bell */}
              <Dropdown
                show={showLowStock}
                onToggle={() => setShowLowStock(!showLowStock)}
                align="end"
              >
                <Dropdown.Toggle
                  variant="light"
                  id="low-stock-dropdown"
                  className="nav-link"
                  style={{ cursor: "pointer" }}
                >
                  <i className="bi bi-bell" style={{ fontSize: "1.5rem" }}></i>
                  {lowStockProducts.length > 0 && (
                    <Badge bg="danger" className="ms-1">
                      {lowStockProducts.length}
                    </Badge>
                  )}
                </Dropdown.Toggle>

                <Dropdown.Menu>
                  <Dropdown.Header>Low Stock Products</Dropdown.Header>
                  {lowStockProducts.length > 0 ? (
                    lowStockProducts.map((product) => (
                      <Dropdown.Item key={product.id}>
                        {product.name} - Stock: {product.inventoryCount}
                      </Dropdown.Item>
                    ))
                  ) : (
                    <Dropdown.Item disabled>No Low Stock Items</Dropdown.Item>
                  )}
                </Dropdown.Menu>
              </Dropdown>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </div>
  );
};

export default VendorNav;
