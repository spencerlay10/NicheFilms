import { Link, useLocation } from 'react-router-dom';
import './Footer.css';

const Footer = () => {
  const location = useLocation();  // Get the current location (page URL)

  // Check if the current page is the login page
  const isLoginPage = location.pathname === '/login';

  return (
    <footer className={`footer ${isLoginPage ? 'fixed-footer' : ''}`}>
      <div className="footer-grid">
        <Link to="/privacy">Privacy</Link>
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
