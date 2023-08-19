import React from "react";
import { useNavigate } from "react-router-dom";

export default function Logout() {
  const navigate = useNavigate();

  const handleLogout = () => {
    navigate("/");
  };

  return (
    <div className="logout">
      <div className="log-out" onClick={handleLogout}>
        <p>Log Out</p>
        <i className="fa-solid fa-arrow-right-from-bracket"></i>
      </div>
    </div>
  );
}
