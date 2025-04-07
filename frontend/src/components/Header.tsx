import { useState } from 'react';
import { Link } from 'react-router-dom';
import './Header.css';

interface HeaderProps {
  username: string;
}

const Header = ({ username }: HeaderProps) => {
  const [isDropdownOpen, setDropdownOpen] = useState(false);

  return (
    <header className="header">
      <Link to="/movies" className="logo">CINENICHE</Link>

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
            <button onClick={() => alert('Logging out...')}>Logout</button>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;


