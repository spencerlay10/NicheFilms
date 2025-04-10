import React from "react";
import Header from "../components/Header";
import Footer from "../components/Footer";
import { useParams } from "react-router-dom";

const Privacy: React.FC = () => {
  // Pass userId dynamically from context, cookies, or another source
   // Set this dynamically if needed

  const { userId } = useParams();
  const numericUserId = parseInt(userId || "1");

  return (
    <>
      {/* Passing userId dynamically to Header */}
      <Header username="" userId={numericUserId} />

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
          <h1 style={{ fontSize: "2rem", marginBottom: "20px" }}>
            Privacy Policy
          </h1>

          <p style={{ lineHeight: "1.8", fontSize: "1rem", color: "#ccc" }}>
            CineNiche is committed to protecting your personal data. This
            privacy policy will explain how our organization uses the personal
            data we collect from you when you use our website.
          </p>

          <h2 style={{ color: "#fff", marginTop: "30px" }}>Topics:</h2>
          <ul style={{ color: "#ccc", paddingLeft: "20px", lineHeight: "1.8" }}>
            <li>What data do we collect?</li>
            <li>How do we collect your data?</li>
            <li>How will we use your data?</li>
            <li>How do we store your data?</li>
            <li>Marketing</li>
            <li>What are your data protection rights?</li>
            <li>What are cookies?</li>
            <li>How do we use cookies?</li>
            <li>What types of cookies do we use?</li>
            <li>How to manage your cookies</li>
            <li>Privacy policies of other websites</li>
            <li>Changes to our privacy policy</li>
            <li>How to contact us</li>
            <li>How to contact the appropriate authorities</li>
          </ul>

          <h2 style={{ color: "#fff", marginTop: "30px" }}>
            What data do we collect?
          </h2>
          <p style={{ color: "#ccc", lineHeight: "1.8" }}>
            CineNiche collects the following data:
            <br />
            - Name, Email address, Phone number
            <br />
            - Age, Gender
            <br />
            - City, State, Zip code
            <br />
            - Streaming service subscriptions
            <br />- Movie ratings and preferences
          </p>

          <h2 style={{ color: "#fff", marginTop: "30px" }}>
            How do we collect your data?
          </h2>
          <p style={{ color: "#ccc", lineHeight: "1.8" }}>
            You directly provide CineNiche with most of the data we collect. We
            collect data and process data when you:
            <br />
            - Register or log in to CineNiche
            <br />
            - Submit movie ratings
            <br />- Use our website via cookies
          </p>

          <h2 style={{ color: "#fff", marginTop: "30px" }}>
            How will we use your data?
          </h2>
          <p style={{ color: "#ccc", lineHeight: "1.8" }}>
            CineNiche uses your data to:
            <br />
            - Log you in securely
            <br />
            - Personalize your recommendations
            <br />
            - Improve our recommendation engine
            <br />
            We do not share your data with any third parties.
          </p>

          <h2 style={{ color: "#fff", marginTop: "30px" }}>
            How do we store your data?
          </h2>
          <p style={{ color: "#ccc", lineHeight: "1.8" }}>
            CineNiche stores your data securely using encryption and strict
            access controls. We retain your data as long as your account is
            active. If you delete your account, your data will be erased within
            30 days.
          </p>

          <h2 style={{ color: "#fff", marginTop: "30px" }}>Marketing</h2>
          <p style={{ color: "#ccc", lineHeight: "1.8" }}>
            CineNiche does not currently send marketing emails or share data
            with partner companies for promotional purposes.
          </p>

          <h2 style={{ color: "#fff", marginTop: "30px" }}>
            What are your data protection rights?
          </h2>
          <p style={{ color: "#ccc", lineHeight: "1.8" }}>
            You are entitled to:
            <br />
            - Access, correct, or delete your data
            <br />
            - Restrict or object to our use of your data
            <br />
            - Request we transfer your data to another provider
            <br />
            To make a request, contact us using the info below. We will respond
            within one month.
          </p>

          <h2 style={{ color: "#fff", marginTop: "30px" }}>Cookies</h2>
          <p style={{ color: "#ccc", lineHeight: "1.8" }}>
            Cookies are small files used to track and enhance your experience.
            For more info, visit{" "}
            <a href="https://allaboutcookies.org" style={{ color: "#fff" }}>
              allaboutcookies.org
            </a>
            .
          </p>

          <h2 style={{ color: "#fff", marginTop: "30px" }}>
            How do we use cookies?
          </h2>
          <p style={{ color: "#ccc", lineHeight: "1.8" }}>
            CineNiche uses cookies to:
            <br />
            - Keep you securely signed in
            <br />- Understand how you interact with our platform
          </p>

          <h2 style={{ color: "#fff", marginTop: "30px" }}>
            What types of cookies do we use?
          </h2>
          <p style={{ color: "#ccc", lineHeight: "1.8" }}>
            - Functional cookies: Remember login state and preferences
          </p>

          <h2 style={{ color: "#fff", marginTop: "30px" }}>
            How to manage your cookies
          </h2>
          <p style={{ color: "#ccc", lineHeight: "1.8" }}>
            You can set your browser to refuse cookies. However, some features
            of our site may not function properly as a result.
          </p>

          <h2 style={{ color: "#fff", marginTop: "30px" }}>
            Privacy policies of other websites
          </h2>
          <p style={{ color: "#ccc", lineHeight: "1.8" }}>
            CineNiche may contain links to other websites. Our privacy policy
            applies only to our site, so we encourage you to read the privacy
            policies of any external sites you visit.
          </p>

          <h2 style={{ color: "#fff", marginTop: "30px" }}>
            Changes to our privacy policy
          </h2>
          <p style={{ color: "#ccc", lineHeight: "1.8" }}>
            CineNiche keeps this policy under regular review and updates it
            here. Last updated: April 9, 2025.
          </p>

          <h2 style={{ color: "#fff", marginTop: "30px" }}>
            How to contact us
          </h2>
          <p style={{ color: "#ccc", lineHeight: "1.8" }}>
            Email:{" "}
            <a href="mailto:support@cineniche.app" style={{ color: "#fff" }}>
              support@cineniche.app
            </a>
          </p>

          <h2 style={{ color: "#fff", marginTop: "30px" }}>
            How to contact the appropriate authorities
          </h2>
          <p style={{ color: "#ccc", lineHeight: "1.8" }}>
            If you feel CineNiche has not addressed your concern properly, you
            may contact your local data protection authority.
          </p>
        </div>
      </div>

      <Footer />
    </>
  );
};

export default Privacy;
