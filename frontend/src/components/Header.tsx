import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom'; // ✅ added useNavigate
import './Header.css';
import Logout from './Logout';
import logo from '../assets/CNICHE.png'; // ✅ added logo import

interface HeaderProps {
  username: string;
}

const Header = ({ username }: HeaderProps) => {
  const [isDropdownOpen, setDropdownOpen] = useState(false);
  const navigate = useNavigate(); // ✅ used for logout routing

  const handleLogout = () => {
    // Optionally clear auth/token/etc. here
    navigate('/'); // ✅ route to home page
  };

  return (
    <header className="header">
      <Link to="/movies" className="logo"><img src={logo} alt="App Logo" className="logo-image" /></Link>

      <div
        className="account-section"
        onMouseEnter={() => setDropdownOpen(true)}
        onMouseLeave={() => setDropdownOpen(false)}
      >
        <span className="username">{username}</span>
        <div className="user-icon">👤</div>

        {isDropdownOpen && (
          <div className="dropdown-menu">
            <Link to="/account-settings">Account Settings</Link>
            <Logout>Logout</Logout>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;
