import { Link, useLocation } from 'react-router-dom';
import './Footer.css';

const Footer = () => {
  const location = useLocation(); // Get the current location (page URL)

  // Extract userId from the URL path, safely
  const pathSegments = location.pathname.split('/');
  const userId = pathSegments[2]; // Assuming userId is passed as part of the URL like /movies/:userId

  return (
    <footer className="footer">
      <div className="footer-grid">
        {/* Dynamically add userId to the Privacy link */}
        {userId && (
          <Link to={`/privacy/${userId}`}>Privacy</Link>
        )}
        <a href="/privacy">Terms of Use</a>
        <a href="/privacy">Cookie Preferences</a>
        <Link to="/login">Login</Link>
      </div>
      <div className="mt-6 text-center">
        <p>
          Questions? Call{' '}
          <a href="tel:1-800-123-4567" className="underline">
            1-800-123-4567
          </a>
        </p>
      </div>
    </footer>
  );
};

export default Footer;
