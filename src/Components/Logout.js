import React, { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { UserContext } from "../contexts/UserContext";

export default function Logout() {
  const { user, setUser } = useContext(UserContext);
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("user");
  };

  return (
    <div className="logout">
      <div
        className="log-out"
        onClick={() => {
          handleLogout();
          setUser(null);
          navigate("/");
        }}
      >
        <p>Log Out</p>
        <i className="fa-solid fa-arrow-right-from-bracket"></i>
      </div>
    </div>
  );
}
