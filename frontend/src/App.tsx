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
import { AuthProvider } from "./context/AuthContext";
import AdminRoute from "./routes/AdminRoute";

function App() {
  return (
    <AuthProvider>
      <div>
        <Routes>
          {/* Public Routes */}
          <Route path="/" element={<Home />} />
          <Route path="/createAccount" element={<CreateAccount />} />
          <Route path="/login" element={<Login />} />
          <Route path="/privacypolicy" element={<Privacy_home_page />} />

          {/* User Protected Routes */}
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

          {/* Admin-Only Routes */}
          <Route
            path="/admin"
            element={
              <AdminRoute>
                <Admin />
              </AdminRoute>
            }
          />
          <Route
            path="/admin/add"
            element={
              <AdminRoute>
                <MovieForm />
              </AdminRoute>
            }
          />
          <Route
            path="/admin/edit/:id"
            element={
              <AdminRoute>
                <MovieForm />
              </AdminRoute>
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
    </AuthProvider>
  );
}

export default App;
