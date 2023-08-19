import React, { useState } from "react";
import { NavLink } from "react-router-dom";
import Logout from "./Logout";

// Import NavLink
// import Home from "./Home";
// import Profile from "./Profile";

function Navbar() {
  const [activeLink, setActiveLink] = useState("home");

  const handleLinkClick = (link) => {
    setActiveLink(link);
  };

  return (
    <div>
      <div className="navbar">
        <div className="navbar-left">
          <NavLink
            to="/Home"
            onClick={() => handleLinkClick("Home")}
            className={activeLink === "Home" ? "active" : "inactive"}
            end
          >
            Home
          </NavLink>
          <NavLink
            to="/profile"
            onClick={() => handleLinkClick("Profile")}
            className={activeLink === "Profile" ? "active" : "inactive"}
            end
          >
            Profile
          </NavLink>
          <NavLink
            to="/about"
            onClick={() => handleLinkClick("About")}
            className={activeLink === "About" ? "active" : ""}
          >
            About
          </NavLink>
          <NavLink
            to="/contact"
            onClick={() => handleLinkClick("Contact")}
            className={activeLink === "Contact" ? "active" : ""}
          >
            Contact
          </NavLink>
        </div>

        <div className="navbar-right">
          <Logout />
        </div>
      </div>
    </div>
  );
}

export default Navbar;
