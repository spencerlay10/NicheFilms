import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Footer from "../components/Footer";
import { API_BASE_URL } from "../api/config";

const Login = () => {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [rememberMe, setRememberMe] = useState<boolean>(true);
  const [error, setError] = useState<string>("");

  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    if (!email || !password) {
      setError("Please fill in all fields.");
      return;
    }

    const loginUrl = rememberMe
      ? `${API_BASE_URL}/login?useCookies=true`
      : `${API_BASE_URL}/login?useSessionCookies=true`;

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
          padding: "60px 68px 40px",
          borderRadius: "6px",
          width: "320px",
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
            value={password}
            onChange={(e) => setPassword(e.target.value)}
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
              backgroundColor: "#8E3BFC",
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

          <label
            style={{
              fontSize: "0.85rem",
              display: "flex",
              alignItems: "center",
            }}
          >
            <input
              type="checkbox"
              checked={rememberMe}
              onChange={(e) => setRememberMe(e.target.checked)}
              style={{ marginRight: "8px" }}
            />
            Remember me
          </label>

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

      <div style={{ position: "relative", zIndex: 1, width: "100%" }}>
        <Footer />
      </div>
    </div>
  );
};

export default Login;
