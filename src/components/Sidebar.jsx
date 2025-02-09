import React from "react";
import { Nav } from "react-bootstrap";
import { NavLink } from "react-router-dom"; // Import NavLink from react-router-dom

const Sidebar = () => {
  return (
    <div
      className="d-flex flex-column flex-shrink-0 p-3 bg-light"
      style={{ width: "200px", height: "100vh" }}
    >
      <h4 className="mb-4">All Pages</h4>
      <Nav className="flex-column">
        <NavLink
          to="/"
          className={({ isActive }) =>
            `mb-2 nav-link ${isActive ? "active-link" : ""}`
          }
        >
          Dashboard
        </NavLink>

        <NavLink
          to="/products"
          className={({ isActive }) =>
            `mb-2 nav-link ${isActive ? "active-link" : ""}`
          }
        >
          Add Products
        </NavLink>

        <NavLink
          to="/about"
          className={({ isActive }) =>
            `mb-2 nav-link ${isActive ? "active-link" : ""}`
          }
        >
          About Us
        </NavLink>

        <NavLink
          to="/customers"
          className={({ isActive }) =>
            `mb-2 nav-link ${isActive ? "active-link" : ""}`
          }
        >
          Customers
        </NavLink>

        <NavLink
          to="/notifications"
          className={({ isActive }) =>
            `mb-2 nav-link ${isActive ? "active-link" : ""}`
          }
        >
          Notifications
        </NavLink>

        <NavLink
          to="/settings"
          className={({ isActive }) =>
            `mb-2 nav-link ${isActive ? "active-link" : ""}`
          }
        >
          Settings
        </NavLink>
      </Nav>

      <div className="mt-auto">
        <NavLink
          to="/logout"
          className={({ isActive }) =>
            `nav-link ${isActive ? "active-link" : ""}`
          }
        >
          Log out
        </NavLink>
      </div>
    </div>
  );
};

export default Sidebar;
