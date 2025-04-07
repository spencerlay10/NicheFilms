import React from "react";
import Footer from "../components/Footer";

const CreateAccount: React.FC = () => {
  return (
    <div className="background">
      <div className="overlay" />
      <div className="create-container">
        <h1>Create Account</h1>
        <form>
          <input type="email" placeholder="Email" required />
          <input type="password" placeholder="Password" required />
          <input type="password" placeholder="Confirm Password" required />

          <button type="submit" className="create-btn">Sign Up</button>

          <div className="signin-link">
            Already have an account? <a href="/login">Sign in now</a>.
          </div>

        </form>
      </div>
      <Footer />
    </div>
  );
};

export default CreateAccount;
