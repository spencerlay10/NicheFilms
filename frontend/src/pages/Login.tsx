import React from "react";
import { useNavigate } from "react-router-dom";
import Footer from "../components/Footer";

const Login: React.FC = () => {
  const navigate = useNavigate();

  return (
    <div
      style={{
        backgroundImage: `url('https://assets.nflxext.com/ffe/siteui/vlv3/52b3d4d0-5eb6-42e6-9427-5025a5fa98d8/00dfecba-3ff3-4d1e-a9e8-fb281bb33f4b/US-en-20240401-popsignuptwoweeks-perspective_alpha_website_medium.jpg')`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        minHeight: "100vh",
        position: "relative",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        color: "#fff",
        fontFamily: "Arial, sans-serif",
        paddingTop: "60px",
        paddingBottom: "80px", // Space for footer
      }}
    >
      {/* Dark overlay */}
      <div
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          height: "100%",
          width: "100%",
          backgroundColor: "rgba(0,0,0,0.6)",
          zIndex: 0,
        }}
      />

      {/* Sign-in Box */}
      <div
        style={{
          position: "relative",
          backgroundColor: "rgba(0,0,0,0.75)",
          padding: "60px 68px 40px",
          borderRadius: "6px",
          width: "320px",
          zIndex: 1,
          boxShadow: "0 0 15px rgba(0,0,0,0.4)",
          marginBottom: "60px", // Space between box and footer
        }}
      >
        <h1 style={{ marginBottom: "25px" }}>Sign In</h1>
        <form>
          <input
            type="text"
            placeholder="Email or mobile number"
            required
            style={{
              width: "100%",
              padding: "10px",
              marginBottom: "10px",
              backgroundColor: "#333",
              border: "none",
              borderRadius: "4px",
              color: "#fff",
            }}
          />
          <span style={{ color: "#e87c03", fontSize: "0.85rem", marginBottom: "10px", display: "block" }}></span>
          <input
            type="password"
            placeholder="Password"
            required
            style={{
              width: "100%",
              padding: "10px",
              marginBottom: "15px",
              backgroundColor: "#333",
              border: "none",
              borderRadius: "4px",
              color: "#fff",
            }}
          />
          <button
            type="submit"
            style={{
              width: "100%",
              padding: "10px",
              backgroundColor: "#e50914",
              color: "#fff",
              fontWeight: "bold",
              border: "none",
              borderRadius: "4px",
              marginBottom: "15px",
              cursor: "pointer",
            }}
          >
            Sign In
          </button>

          <label style={{ fontSize: "0.85rem", display: "flex", alignItems: "center" }}>
            <input type="checkbox" defaultChecked style={{ marginRight: "8px" }} />
            Remember me
          </label>
        </form>

        {/* Back Button */}
        <button
          onClick={() => navigate('/')}
          style={{
            marginTop: "20px",
            width: "100%",
            padding: "10px",
            backgroundColor: "#444",
            color: "#fff",
            border: "none",
            borderRadius: "4px",
            cursor: "pointer",
          }}
        >
          ← Back
        </button>
      </div>

      {/* Footer positioned after spacing */}
      <div style={{ position: "relative", zIndex: 1, width: "100%" }}>
        <Footer />
      </div>
    </div>
  );
};

export default Login;


