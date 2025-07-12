import React from "react";
import { NavLink } from "react-router-dom";

const Navbar = () => {
  const activeStyle = {
    fontWeight: "bold",
    color: "blue",
  };

  return (
    <nav style={{ padding: "1rem", borderBottom: "1px solid #ccc" }}>
      <NavLink to="/" style={({ isActive }) => (isActive ? activeStyle : undefined)} end>
        Landing
      </NavLink>{" "}
      |{" "}
      <NavLink to="/home" style={({ isActive }) => (isActive ? activeStyle : undefined)}>
        Home
      </NavLink>{" "}
      |{" "}
      <NavLink to="/browse-skills" style={({ isActive }) => (isActive ? activeStyle : undefined)}>
        Browse Skills
      </NavLink>{" "}
      |{" "}
      <NavLink to="/browse" style={({ isActive }) => (isActive ? activeStyle : undefined)}>
        Browse
      </NavLink>{" "}
      |{" "}
      <NavLink to="/profile" style={({ isActive }) => (isActive ? activeStyle : undefined)}>
        Profile
      </NavLink>{" "}
      |{" "}
      <NavLink to="/my-swaps" style={({ isActive }) => (isActive ? activeStyle : undefined)}>
        My Swaps
      </NavLink>
    </nav>
  );
};

export default Navbar;
