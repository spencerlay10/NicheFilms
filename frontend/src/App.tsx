import { Routes, Route } from "react-router-dom";
import CreateAccount from "./pages/CreateAccount";
import Login from "./pages/Login";
import Movie from "./pages/Movie";
import Privacy from "./pages/Privacy";
import ProductDetail from "./pages/ProductDetail";
import Home from "./pages/Home";
import Admin from "./pages/Admin";
import CookieConsent from "react-cookie-consent";
import MovieForm from "./pages/MovieForm";
import Privacy_home_page from "./pages/Privacy_home_page";
import AuthorizeView from "./components/AuthorizeView";

function App() {
  return (
    <div>
      <Routes>
        {/* Public Routes */}
        <Route path="/" element={<Home />} />
        <Route path="/createAccount" element={<CreateAccount />} />
        <Route path="/login" element={<Login />} />
        <Route path="/privacypolicy" element={<Privacy_home_page />} />

        {/* Protected Routes */}
        <Route
          path="/movies/:userId"
          element={
            <AuthorizeView>
              <Movie />
            </AuthorizeView>
          }
        />
        <Route
          path="/privacy/:userId"
          element={
            <AuthorizeView>
              <Privacy />
            </AuthorizeView>
          }
        />
        <Route
          path="/productDetail/:userId/:showId"
          element={
            <AuthorizeView>
              <ProductDetail />
            </AuthorizeView>
          }
        />
        <Route
          path="/admin"
          element={
            <AuthorizeView>
              <Admin />
            </AuthorizeView>
          }
        />
        <Route
          path="/admin/add"
          element={
            <AuthorizeView>
              <MovieForm />
            </AuthorizeView>
          }
        />
        <Route
          path="/admin/edit/:id"
          element={
            <AuthorizeView>
              <MovieForm />
            </AuthorizeView>
          }
        />
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
        }}
        onDecline={() => {
          console.log("User declined cookies");
        }}
      >
        We use cookies to enhance your experience. You can read more in our{" "}
        <a
          href="/privacypolicy"
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
