import { Routes, Route } from "react-router-dom";
import CreateAccount from "./pages/CreateAccount";
import Login from "./pages/Login";
import Movie from "./pages/Movie";
import Privacy from "./pages/Privacy";
import ProductDetail from "./pages/ProductDetail";
import Home from "./pages/Home";
import Admin from "./pages/Admin";
import CookieConsent from "react-cookie-consent";

function App() {
  return (
    <div>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/createAccount" element={<CreateAccount />} />
        <Route path="/login" element={<Login />} />
        <Route path="/movies/:userId" element={<Movie />} />
        <Route path="/privacy" element={<Privacy />} />
        <Route path="/productDetail/:userId/:showId" element={<ProductDetail />} />
        <Route path="/admin" element={<Admin />} />
      </Routes>

      {/* GDPR Cookie Consent Banner */}
      <CookieConsent
        location="bottom"
        buttonText="I accept"
        declineButtonText="Decline"
        cookieName="gdprConsent"
        style={{ background: "#2B373B" }}
        buttonStyle={{
          backgroundColor: "#8E3BFC",
          color: "white",
          fontSize: "13px",
          borderRadius: "5px",
          padding: "10px 20px",
        }}
        declineButtonStyle={{
          backgroundColor: "white",
          color: "black",
          fontSize: "13px",
          borderRadius: "5px",
          padding: "10px 20px",
        }}
        enableDeclineButton
        onAccept={() => {
          console.log("User accepted cookies");
          // You could initialize analytics or other tracking here
        }}
        onDecline={() => {
          console.log("User declined cookies");
          // Skip initializing tracking scripts
        }}
      >
        We use cookies to enhance your experience. You can read more in our{" "}
        <a
          href="/privacy"
          style={{
            textDecoration: "underline",
            color: "white",
            fontWeight: "bold",
          }}
        >
          Privacy Policy
        </a>
        .
      </CookieConsent>
    </div>
  );
}

export default App;
