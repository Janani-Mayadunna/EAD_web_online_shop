import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import NavDropdown from "react-bootstrap/NavDropdown";
import {Link } from "react-router-dom";
import AdminImg from "../../../img/Admin/admin2.png";
import "./SystemNav.css";

const SystemNav = () => {


  function logout(){

    localStorage.removeItem("systemInfo");
   

  }
  return (
    <div className="mainNavContainer d-flex justify-content-end">
      <Navbar className="subNavContainer" expand="lg">
        <Container>
          <Navbar.Brand href="#home">
            <img
              src={AdminImg}
              alt="Admin-Avatar"
              style={{ height: "40px", width: "40px" }}
            ></img>
          </Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="me-auto">
              {/* <Nav.Link href="#home">Home</Nav.Link> */}

              <NavDropdown active title="System Admin" id="basic-nav-dropdown">
                <NavDropdown.Item href="#action/3.1">
                  {" "}
                  <Link
                    to="/system/admin-profile"
                    class="nav-link"
                    aria-current="page"
                  >
                    <i
                      style={{
                        color: "#359733",
                      }}
                      class="bi bi-person-circle bi-2x"
                    ></i>{" "}
                    <span style={{ fontSize: "12x", color: "black" }}>
                      Profile
                    </span>
                  </Link>
                </NavDropdown.Item>
                <NavDropdown.Item href="#action/3.2">
                  <Link to="/system/auth" style={{ color: "#359733" }} class="nav-link" onClick={logout}>
                    <i class="bi bi-box-arrow-right"></i>{" "}
                    <span style={{ fontSize: "12px", color: "black" }} >
                      Log Out
                    </span>
                  </Link>
                </NavDropdown.Item>
              </NavDropdown>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </div>
  );
};

export default SystemNav;
