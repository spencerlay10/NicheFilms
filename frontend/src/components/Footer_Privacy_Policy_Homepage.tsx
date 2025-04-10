
import './Footer.css';

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-grid">
        <a href= "/privacypolicy">Privacy</a>
        <a href="/privacypolicy">Terms of Use</a>
        <a href="/privacypolicy">Cookie Preferences</a>
        <a href="/login">Login</a>
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
