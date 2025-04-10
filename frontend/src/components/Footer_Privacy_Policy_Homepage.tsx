import { Link } from 'react-router-dom';
import './Footer.css';

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-grid">
        <Link to="/privacypolicy">Privacy</Link>
        <a href="#">Terms of Use</a>
        <a href="#">Cookie Preferences</a>
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
