import React, { useState } from "react";
import { Navbar, Nav, Container, Offcanvas, Button } from "react-bootstrap";
import { Bell, Person, BoxArrowRight, List } from "react-bootstrap-icons";
import icubesLogo from "../images/icubeslogo.png";
import { NavLink } from "react-router-dom";

const CustomNavbar = () => {
  const [show, setShow] = useState(false);

  const toggleOffcanvas = () => setShow(!show);
  const closeOffcanvas = () => setShow(false);

  return (
    <Navbar expand="lg" className="bg-nav p-2" variant="dark">
      <Container
        fluid
        className="d-flex justify-content-between align-items-center"
      >
        {/* Logo */}
        <Navbar.Brand href="/">
          <img src={icubesLogo} alt="Logo" style={{ height: "40px" }} />
        </Navbar.Brand>

        {/* Toggle Button for Small Screens */}
        <Button
          variant="outline-light"
          className="d-lg-none"
          onClick={toggleOffcanvas}
        >
          <List size={30} />
        </Button>

        {/* Navbar Links for Large Screens */}
        <Nav className="d-none d-lg-flex mx-auto">
          <NavLink
            to="/dashboard"
            className={({ isActive }) =>
              `text-white mx-3 fw-bold nav-link ${
                isActive ? "nav-link-active" : ""
              }`
            }
          >
            Dashboard
          </NavLink>
          <NavLink
            to="/products"
            className={({ isActive }) =>
              `text-white mx-3 fw-bold nav-link ${
                isActive ? "nav-link-active" : ""
              }`
            }
          >
            Add Products
          </NavLink>
          <NavLink
            to="/about"
            className={({ isActive }) =>
              `text-white mx-3 fw-bold nav-link ${
                isActive ? "nav-link-active" : ""
              }`
            }
          >
            About
          </NavLink>
          <NavLink
            to="/customers"
            className={({ isActive }) =>
              `text-white mx-3 fw-bold nav-link ${
                isActive ? "nav-link-active" : ""
              }`
            }
          >
            Customers
          </NavLink>
          <NavLink
            to="/settings"
            className={({ isActive }) =>
              `text-white mx-3 fw-bold nav-link ${
                isActive ? "nav-link-active" : ""
              }`
            }
          >
            Settings
          </NavLink>
        </Nav>

        {/* Icons */}
        <div className="d-flex align-items-center">
          <Nav.Link href="#" className="text-white me-3">
            <Person size={24} />
          </Nav.Link>
          <Nav.Link href="#" className="text-white me-3">
            <Bell size={24} />
          </Nav.Link>
          <Nav.Link href="#" className="text-white">
            <BoxArrowRight size={24} />
          </Nav.Link>
        </div>
      </Container>

      {/* Offcanvas Menu for Small Screens */}
      <Offcanvas
        show={show}
        onHide={closeOffcanvas}
        placement="end"
        className="bg-dark text-white"
      >
        <Offcanvas.Header closeButton closeVariant="white">
          <Offcanvas.Title>Menu</Offcanvas.Title>
        </Offcanvas.Header>
        <Offcanvas.Body>
          <Nav className="flex-column">
            <NavLink
              to="/dashboard"
              className={({ isActive }) =>
                `text-white my-2 fw-bold nav-link ${
                  isActive ? "nav-link-active" : ""
                }`
              }
              onClick={closeOffcanvas}
            >
              Dashboard
            </NavLink>
            <NavLink
              to="/products"
              className={({ isActive }) =>
                `text-white my-2 fw-bold nav-link ${
                  isActive ? "nav-link-active" : ""
                }`
              }
              onClick={closeOffcanvas}
            >
              Add Products
            </NavLink>
            <NavLink
              to="/about"
              className={({ isActive }) =>
                `text-white my-2 fw-bold nav-link ${
                  isActive ? "nav-link-active" : ""
                }`
              }
              onClick={closeOffcanvas}
            >
              About
            </NavLink>
            <NavLink
              to="/customers"
              className={({ isActive }) =>
                `text-white my-2 fw-bold nav-link ${
                  isActive ? "nav-link-active" : ""
                }`
              }
              onClick={closeOffcanvas}
            >
              Customers
            </NavLink>
            <NavLink
              to="/settings"
              className={({ isActive }) =>
                `text-white my-2 fw-bold nav-link ${
                  isActive ? "nav-link-active" : ""
                }`
              }
              onClick={closeOffcanvas}
            >
              Settings
            </NavLink>
            <Nav.Link
              href="#"
              className="text-white mt-4"
              onClick={closeOffcanvas}
            >
              <BoxArrowRight size={24} className="me-2" /> Logout
            </Nav.Link>
          </Nav>
        </Offcanvas.Body>
      </Offcanvas>
    </Navbar>
  );
};

export default CustomNavbar;
