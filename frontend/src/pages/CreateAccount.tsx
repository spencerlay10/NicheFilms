import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Footer from "../components/Footer";
import { API_BASE_URL } from "../api/config";

const CreateAccount: React.FC = () => {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [loading, setLoading] = useState(false);
  const [passwordStrength, setPasswordStrength] = useState("");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    if (name === "email") setEmail(value);
    if (name === "password") {
      setPassword(value);
      updatePasswordStrength(value);
    }
    if (name === "confirmPassword") setConfirmPassword(value);
  };

  const updatePasswordStrength = (pwd: string) => {
    const hasUpper = /[A-Z]/.test(pwd);
    const hasLower = /[a-z]/.test(pwd);
    const hasNumber = /\d/.test(pwd);
    const hasSpecial = /[!@#$%^&*]/.test(pwd);
    const isLong = pwd.length >= 8;

    const score = [hasUpper, hasLower, hasNumber, hasSpecial, isLong].filter(
      Boolean
    ).length;

    if (score <= 2) setPasswordStrength("Weak");
    else if (score === 3 || score === 4) setPasswordStrength("Moderate");
    else if (score === 5) setPasswordStrength("Strong");
    else setPasswordStrength("");
  };

  const isPasswordStrong = (pwd: string) => {
    return (
      pwd.length >= 8 &&
      /[A-Z]/.test(pwd) &&
      /[a-z]/.test(pwd) &&
      /\d/.test(pwd) &&
      /[!@#$%^&*]/.test(pwd)
    );
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (loading) return;

    if (!email || !password || !confirmPassword) {
      setError("Please fill in all fields.");
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      setError("Please enter a valid email address.");
    } else if (password !== confirmPassword) {
      setError("Passwords do not match.");
    } else if (!isPasswordStrong(password)) {
      setError(
        "Password must be at least 8 characters and include uppercase, lowercase, number, and special character."
      );
    } else {
      setError("");
      setSuccess("");
      setLoading(true);
      try {
        const response = await fetch(`${API_BASE_URL}/register`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ email, password }),
        });

        if (response.ok) {
          setSuccess("Account created successfully! Redirecting to login...");
          setEmail("");
          setPassword("");
          setConfirmPassword("");
          setPasswordStrength("");
          setTimeout(() => navigate("/login"), 2000);
        } else {
          setError("Error registering. Try a different email.");
        }
      } catch (err) {
        console.error(err);
        setError("Error registering. Please try again later.");
      } finally {
        setLoading(false);
      }
    }
  };

  return (
    <div
      style={{
        backgroundColor: "#141414",
        minHeight: "100vh",
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
        fontFamily: "Arial, sans-serif",
      }}
    >
      <main
        style={{
          flexGrow: 1,
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          padding: "60px 20px",
        }}
      >
        <div
          style={{
            backgroundColor: "#1f1f1f",
            padding: "2rem",
            borderRadius: "10px",
            width: "100%",
            maxWidth: "400px",
            boxShadow: "0 0 12px rgba(0,0,0,0.6)",
            color: "#fff",
          }}
        >
          <h2
            style={{
              textAlign: "center",
              fontSize: "1.8rem",
              marginBottom: "1.5rem",
            }}
          >
            Create Your Account
          </h2>

          <form
            onSubmit={handleSubmit}
            style={{ display: "flex", flexDirection: "column", gap: "1rem" }}
          >
            <input
              type="email"
              name="email"
              value={email}
              onChange={handleChange}
              placeholder="Email"
              required
              style={inputStyle}
            />
            <input
              type="password"
              name="password"
              value={password}
              onChange={handleChange}
              placeholder="Password"
              required
              style={inputStyle}
            />
            <input
              type="password"
              name="confirmPassword"
              value={confirmPassword}
              onChange={handleChange}
              placeholder="Confirm Password"
              required
              style={inputStyle}
            />

            {password && (
              <p style={{ fontSize: "0.9rem", color: "#bbb" }}>
                Password strength: <strong>{passwordStrength}</strong>
              </p>
            )}

            {error && <p style={{ color: "#ff6b6b" }}>{error}</p>}
            {success && <p style={{ color: "#4caf50" }}>{success}</p>}

            <button type="submit" disabled={loading} style={buttonStyle}>
              {loading ? "Creating..." : "Create Account"}
            </button>
          </form>
        </div>
      </main>

      <Footer />
    </div>
  );
};

const inputStyle: React.CSSProperties = {
  padding: "10px",
  borderRadius: "4px",
  border: "1px solid #444",
  backgroundColor: "#2c2c2c",
  color: "#fff",
  fontSize: "1rem",
};

const buttonStyle: React.CSSProperties = {
  padding: "10px",
  backgroundColor: " #8e3bfc",
  color: "#fff",
  border: "none",
  borderRadius: "4px",
  fontSize: "1rem",
  cursor: "pointer",
};

export default CreateAccount;
