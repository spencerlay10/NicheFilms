import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Header.css";
import Logout from "./Logout";
import logo from "../assets/CNICHE.png";

// A different Header for the admin page. This one includes a button that routes back to the main Movie view.
interface HeaderProps {
  username: string;
  userId: number;
}


const Header = ({ username, userId }: HeaderProps) => {
  const [isDropdownOpen, setDropdownOpen] = useState(false);
  const navigate = useNavigate();

  return (
    <header
      className="header"
      style={{
        backgroundColor: "#2a2a2a",
        color: "#fff",
        padding: "0.75rem 2rem",
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        position: "fixed",
        top: 0,
        left: 0,
        width: "100%",
        zIndex: 1000,
        boxShadow: "0 2px 5px rgba(0, 0, 0, 0.5)",
      }}
    >
      {/* Left: Logo only */}
      <div style={{ display: "flex", alignItems: "center" }}>
        <div className="logo">
          <img src={logo} alt="App Logo" className="logo-image" />
        </div>
      </div>

      {/* Center: Admin Portal Title */}
      <div
        style={{
          position: "absolute",
          left: "50%",
          transform: "translateX(-50%)",
          fontSize: "2rem",
          fontWeight: 700,
          color: "#ffffff",
        }}
      >
        Admin Portal
      </div>

      {/* Right: Customer View + User Info + Logout */}
      <div
        className="account-section"
        style={{ display: "flex", alignItems: "center", gap: "0.75rem" }}
      >
        <button
          onClick={() => navigate(`/movies/${userId}`)}
          style={{
            backgroundColor: "#8e3bfd",
            color: "#fff",
            border: "none",
            borderRadius: "6px",
            padding: "8px 14px",
            fontWeight: "bold",
            cursor: "pointer",
            transition: "background-color 0.2s ease-in-out",
          }}
        >
          Customer View
        </button>

        <span className="username">{username}</span>

        <div
          onMouseEnter={() => setDropdownOpen(true)}
          onMouseLeave={() => setDropdownOpen(false)}
          style={{ position: "relative" }}
        >
          <div
            className="user-icon"
            style={{ color: "#8e3bfd", fontSize: "20px", marginTop: "7px" }}
          >
            👤
          </div>

          {isDropdownOpen && (
            <div className="dropdown-menu">
              <Logout>Logout</Logout>
            </div>
          )}
        </div>
      </div>
    </header>
  );
};

export default Header;
