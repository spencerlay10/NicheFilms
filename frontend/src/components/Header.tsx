import { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './Header.css';
import Logout from './Logout';
import logo from '../assets/CNICHE.png';
import { Movie } from '../types/Movie';
import { fetchMovies } from '../api/MovieAPI';

interface HeaderProps {
  username: string;
}

const Header = ({ username }: HeaderProps) => {
  const [isDropdownOpen, setDropdownOpen] = useState(false);
  const [searchVisible, setSearchVisible] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [allMovies, setAllMovies] = useState<Movie[]>([]);
  const [filteredResults, setFilteredResults] = useState<Movie[]>([]);
  const [skip] = useState(0);
  const [take] = useState(100);

  const navigate = useNavigate();

  useEffect(() => {
    fetchMovies(skip, take)
      .then((data) => setAllMovies(data || []))
      .catch((err) => console.error('Error loading movie list:', err));
  }, [skip, take]);

  useEffect(() => {
    const filtered = allMovies.filter((movie) =>
      movie.title.toLowerCase().startsWith(searchTerm.toLowerCase())
    );
    setFilteredResults(filtered);
  }, [searchTerm, allMovies]);

  const handleSearchClick = () => {
    setSearchVisible(true);
  };

  const handleResultClick = (movieId: string) => {
    setSearchTerm('');
    setSearchVisible(false);
    navigate(`/productDetail/${movieId}`);
  };

  return (
    <header className="header">
      <Link to="/movies" className="logo">
        <img src={logo} alt="App Logo" className="logo-image" />
      </Link>

      <div className="header-right" style={{ position: 'relative' }}>
        <div className="search-container" style={{ position: 'relative' }}>
          {searchVisible ? (
            <div>
              <input
                type="text"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                placeholder="Search..."
                autoFocus
                onBlur={() => setTimeout(() => setSearchVisible(false), 200)}
                style={{
                  padding: '6px 10px',
                  borderRadius: '4px',
                  border: '1px solid #ccc',
                  width: '200px',
                }}
              />
              {searchTerm && filteredResults.length > 0 && (
                <ul
                  style={{
                    position: 'absolute',
                    top: '36px',
                    left: 0,
                    backgroundColor: '#fff',
                    color: '#000',
                    listStyle: 'none',
                    padding: '8px',
                    borderRadius: '4px',
                    boxShadow: '0 4px 8px rgba(0,0,0,0.2)',
                    width: '200px',
                    maxHeight: '200px',
                    overflowY: 'auto',
                    zIndex: 1000,
                  }}
                >
                  {filteredResults.map((movie) => (
                    <li
                      key={movie.showId}
                      onMouseDown={() => handleResultClick(movie.showId)}
                      style={{
                        padding: '6px 8px',
                        cursor: 'pointer',
                        borderBottom: '1px solid #eee',
                      }}
                    >
                      {movie.title}
                    </li>
                  ))}
                </ul>
              )}
            </div>
          ) : (
            <button
              onClick={handleSearchClick}
              style={{
                background: 'transparent',
                border: 'none',
                color: '#fff',
                fontSize: '18px',
                cursor: 'pointer',
                marginRight: '16px',
              }}
              title="Search"
            >
              🔍
            </button>
          )}
        </div>

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
      </div>
    </header>
  );
};

export default Header;
