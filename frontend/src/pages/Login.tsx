import React from "react";
import Footer from "../components/Footer";


const Login: React.FC = () => {
  return (
    <div className="background">
      <div className="overlay" />
      <div className="signin-container">
        <h1>Sign In</h1>
        <form>
          <input type="text" placeholder="Email or mobile number" required />
          <span className="error-msg">⚠️ Please enter a valid email.</span>
          <input type="password" placeholder="Password" required />
          <button type="submit" className="signin-btn">Sign In</button>


          <label className="remember">
            <input type="checkbox" defaultChecked /> Remember me
          </label>

        </form>
      </div>

    <Footer />
    </div>
  );
};

export default Login;
