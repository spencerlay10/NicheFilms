import React from "react";
import Header from "../components/Header";
import Footer from "../components/Footer";

const Privacy: React.FC = () => {
  return (
    <>
      <Header username="Rex" />

      <div
        style={{
          padding: "60px 20px",
          marginTop: "80px",
          backgroundColor: "#000",
          color: "#fff",
          fontFamily: "Arial, sans-serif",
          minHeight: "100vh",
        }}
      >
        <div
          style={{
            maxWidth: "800px",
            margin: "0 auto",
            padding: "40px",
            backgroundColor: "#1c1c1c",
            borderRadius: "8px",
            boxShadow: "0 0 10px rgba(0,0,0,0.5)",
          }}
        >
          <h1 style={{ fontSize: "2rem", marginBottom: "20px" }}>Privacy Policy</h1>

          <p style={{ lineHeight: "1.8", fontSize: "1rem", color: "#ccc" }}>
            At <strong>CineNiche</strong>, your privacy matters deeply to us. We believe in creating a platform that respects your personal space while delivering the entertainment experience you deserve.
          </p>

          <p style={{ lineHeight: "1.8", fontSize: "1rem", color: "#ccc" }}>
            We do collect certain information — such as your viewing history, preferences, and usage patterns — solely to improve our services, tailor recommendations, and provide a smooth and personalized experience.
          </p>

          <p style={{ lineHeight: "1.8", fontSize: "1rem", color: "#ccc" }}>
            That said, your data is never for sale. We do not — and will not — sell your personal information to third parties. Ever.
          </p>

          <p style={{ lineHeight: "1.8", fontSize: "1rem", color: "#ccc" }}>
            Your data is handled with care. Access is limited to authorized personnel, and we use strong security practices to protect all information stored on our platform.
          </p>

          <p style={{ lineHeight: "1.8", fontSize: "1rem", color: "#ccc" }}>
            As a developer or analyst working with CineNiche, you may have access to a limited subset of data for educational or operational purposes. This access is logged and monitored, and is strictly limited to what is necessary.
          </p>

          <p style={{ lineHeight: "1.8", fontSize: "1rem", color: "#ccc" }}>
            By using CineNiche, you agree to this Privacy Policy. If you have any questions, concerns, or feedback about how your information is handled, we encourage you to reach out. We're here to help.
          </p>
        </div>
      </div>

      <Footer />
    </>
  );
};

export default Privacy;

