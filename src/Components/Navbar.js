import { NavLink } from "react-router-dom";
import Logout from "./Logout";

function Navbar() {
  return (
    <div>
      <div className="navbar">
        <nav className="navbar-left">
          <NavLink to="/" activeClassName="active">
            Home
          </NavLink>
          <NavLink to="/profile" activeClassName="active">
            Profile
          </NavLink>
          {/* <NavLink to="/about" activeClassName="active">
            About
          </NavLink>
          <NavLink to="/contact" activeClassName="active">
            Contact
          </NavLink> */}
        </nav>

        <div className="navbar-right">
          <Logout />
        </div>
      </div>
    </div>
  );
}

export default Navbar;
