import React from "react";
import Footer from "../components/Footer";

const CreateAccount: React.FC = () => {
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
        paddingBottom: "80px",
      }}
    >
      {/* Overlay */}
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

      {/* Create Account Box */}
      <div
        style={{
          position: "relative",
          backgroundColor: "rgba(0,0,0,0.75)",
          padding: "60px 68px 40px",
          borderRadius: "6px",
          width: "320px",
          zIndex: 1,
          boxShadow: "0 0 15px rgba(0,0,0,0.4)",
          marginBottom: "60px",
        }}
      >
        <h1 style={{ marginBottom: "25px" }}>Create Account</h1>
        <form>
          <input
            type="email"
            placeholder="Email"
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
          <input
            type="password"
            placeholder="Password"
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
          <input
            type="password"
            placeholder="Confirm Password"
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
            Sign Up
          </button>

          <div style={{ fontSize: "0.9rem" }}>
            Already have an account?{" "}
            <a href="/login" style={{ color: "#fff", fontWeight: "bold", textDecoration: "none" }}>
              Sign in now
            </a>
            .
          </div>
        </form>
      </div>

      {/* Footer */}
      <div style={{ position: "relative", zIndex: 1, width: "100%" }}>
        <Footer />
      </div>
    </div>
  );
};

export default CreateAccount;

