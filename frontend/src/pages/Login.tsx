import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { API_BASE_URL } from "../api/config";
import Footer_Privacy_Policy_Homepage from "../components/Footer_Privacy_Policy_Homepage";

const Login = () => {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [error, setError] = useState<string>("");
  const [hoveredSignIn, setHoveredSignIn] = useState<boolean>(false);  // State for Sign In button hover
  const [hoveredBack, setHoveredBack] = useState<boolean>(false);  // State for Back button hover

  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    if (!email || !password) {
      setError("Please fill in all fields.");
      return;
    }

    const loginUrl = `${API_BASE_URL}/login`;

    try {
      const response = await fetch(loginUrl, {
        method: "POST",
        credentials: "include",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      let data = null;
      const contentLength = response.headers.get("content-length");
      if (contentLength && parseInt(contentLength, 10) > 0) {
        data = await response.json();
      }

      if (!response.ok) {
        throw new Error(data?.message || "Invalid email or password.");
      }

      // ✅ Fetch current user info
      const meResponse = await fetch(`${API_BASE_URL}/me`, {
        method: "GET",
        credentials: "include",
      });

      if (meResponse.ok) {
        const user = await meResponse.json();
        console.log("User info:", user);

        const userId = user.id;
        navigate(`/movies/${userId}`);
      } else {
        throw new Error("Could not fetch user info.");
      }
    } catch (error: any) {
      setError(error.message || "Error logging in.");
    }
  };

  // Sign In button hover style
  const signInButtonStyle = {
    width: "100%",
    padding: "12px",
    backgroundColor: hoveredSignIn ? "#ffffff" : "#8E3BFC",  // White background when hovered, purple when not
    color: hoveredSignIn ? "#8E3BFC" : "#fff", // Purple text when hovered, white when not
    fontWeight: "bold",
    border: "1px solid #8E3BFC",  // Border to match the color
    borderRadius: "4px",
    marginBottom: "20px",
    cursor: "pointer",
    transition: "background-color 0.3s ease-in-out, color 0.3s ease-in-out",  // Smooth transition for background and text color
  };

  // Back button hover style
  const backButtonStyle = {
    marginTop: "20px",
    width: "100%",
    padding: "12px",
    backgroundColor: hoveredBack ? "#ffffff" : "#444",  // White background when hovered, dark when not
    color: hoveredBack ? "#444" : "#fff",  // Dark text when hovered, white when not
    border: "1px solid #444",  // Border to match the color
    borderRadius: "4px",
    cursor: "pointer",
    transition: "background-color 0.3s ease-in-out, color 0.3s ease-in-out",  // Smooth transition for background and text color
  };

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

      <div
        style={{
          position: "relative",
          backgroundColor: "rgba(0,0,0,0.75)",
          padding: "80px 88px 50px",  // Increased padding for a larger box
          borderRadius: "6px",
          width: "400px",  // Increased width
          zIndex: 1,
          boxShadow: "0 0 15px rgba(0,0,0,0.4)",
          marginBottom: "60px",
        }}
      >
        <h1 style={{ marginBottom: "25px" }}>Sign In</h1>
        <form onSubmit={handleSubmit}>
          <input
            type="email"
            placeholder="Email or mobile number"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            style={{
              width: "100%",
              padding: "12px",  // Increased padding
              marginBottom: "12px",  // Increased space between inputs
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
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            style={{
              width: "100%",
              padding: "12px",  // Increased padding
              marginBottom: "20px",  // Increased space between inputs
              backgroundColor: "#333",
              border: "none",
              borderRadius: "4px",
              color: "#fff",
            }}
          />
          <button
            type="submit"
            style={signInButtonStyle}  // Apply the hover effect for Sign In button
            onMouseEnter={() => setHoveredSignIn(true)}  // Set hover state to true for Sign In button
            onMouseLeave={() => setHoveredSignIn(false)}  // Set hover state to false for Sign In button
          >
            Sign In
          </button>

          {error && (
            <p
              style={{
                color: "#e87c03",
                fontSize: "0.9rem",
                marginTop: "10px",
              }}
            >
              {error}
            </p>
          )}
        </form>

        <button
          onClick={() => navigate("/")}
          style={backButtonStyle}  // Apply the hover effect for Back button
          onMouseEnter={() => setHoveredBack(true)}  // Set hover state to true for Back button
          onMouseLeave={() => setHoveredBack(false)}  // Set hover state to false for Back button
        >
          ← Back
        </button>
      </div>

      <div style={{ position: "relative", zIndex: 1, width: "100%" }}>
        <Footer_Privacy_Policy_Homepage />
      </div>
    </div>
  );
};

export default Login;
