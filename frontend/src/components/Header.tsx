import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import "./Header.css";
import Logout from "./Logout";
import logo from "../assets/CNICHE.png";
import { Movie } from "../types/Movie";
import { fetchMovies } from "../api/MovieAPI";
import { FaSearch } from "react-icons/fa";

interface HeaderProps {
  username: string;
  userId: number;
}

const Header = ({ username, userId }: HeaderProps) => {
  const [isDropdownOpen, setDropdownOpen] = useState(false);
  const [searchVisible, setSearchVisible] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [allMovies, setAllMovies] = useState<Movie[]>([]);
  const [filteredResults, setFilteredResults] = useState<Movie[]>([]);

  const navigate = useNavigate();

  useEffect(() => {
    fetchMovies()
      .then((data) => setAllMovies(data || []))
      .catch((err) => console.error("Error loading movie list:", err));
  }, []);

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
    setSearchTerm("");
    setSearchVisible(false);
    navigate(`/productDetail/${userId}/${movieId}`);
  };

  return (
    <header className="header">
      <div
        className="logo"
        style={{ cursor: "pointer" }}
        onClick={() => navigate(`/movies/${userId}`)}
      >
        <img src={logo} alt="App Logo" className="logo-image" />
      </div>

      <div className="header-right" style={{ position: "relative" }}>
        <div className="search-container" style={{ position: "relative" }}>
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
                  padding: "6px 10px",
                  borderRadius: "4px",
                  border: "1px solid #ccc",
                  width: "200px",
                }}
              />
              {searchTerm && filteredResults.length > 0 && (
                <ul
                  style={{
                    position: "absolute",
                    top: "36px",
                    left: 0,
                    backgroundColor: "#fff",
                    color: "#000",
                    listStyle: "none",
                    padding: "8px",
                    borderRadius: "4px",
                    boxShadow: "0 4px 8px rgba(0,0,0,0.2)",
                    width: "200px",
                    maxHeight: "200px",
                    overflowY: "auto",
                    zIndex: 1000,
                  }}
                >
                  {filteredResults.map((movie) => (
                    <li
                      key={movie.showId}
                      onMouseDown={() => handleResultClick(movie.showId)}
                      style={{
                        padding: "6px 8px",
                        cursor: "pointer",
                        borderBottom: "1px solid #eee",
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
                background: "transparent",
                border: "none",
                color: "#fff",
                fontSize: "18px",
                cursor: "pointer",
                marginRight: "0px",
                padding: "4px",
                position: "relative",
                top: "3px", // move it down slightly
              }}
              title="Search"
            >
              <FaSearch />
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
              <a href="/account-settings">Account Settings</a>
              <Logout>Logout</Logout>
            </div>
          )}
        </div>
      </div>
    </header>
  );
};

export default Header;
