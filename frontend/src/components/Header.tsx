import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Header.css";
import Logout from "./Logout";
import logo from "../assets/CNICHE.png";
import { Movie } from "../types/Movie";
import { fetchMovies } from "../api/MovieAPI";
import { FaSearch, FaUser } from "react-icons/fa";

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

  const toggleDropdown = () => {
    setDropdownOpen((prev) => !prev);
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
        {/* Search Box */}
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
                top: "3px",
              }}
              title="Search"
            >
              <FaSearch />
            </button>
          )}
        </div>

        {/* User Info & Click-to-Toggle Dropdown */}
        <div
          className="account-section"
          style={{ display: "flex", alignItems: "center", gap: "8px" }}
        >
          <span
            className="username"
            style={{
              marginTop: "5px", // Adjust this value as needed
              display: "inline-block",
            }}
          >
            {username}
          </span>
          <div style={{ position: "relative" }}>
            <div
              className="user-icon"
              onClick={toggleDropdown}
              style={{
                color: "#8e3bfd",
                fontSize: "20px",
                marginTop: "7px",
                cursor: "pointer",
              }}
            >
              <FaUser />
            </div>

            {isDropdownOpen && (
              <div
                className="dropdown-menu"
                style={{
                  position: "absolute",
                  top: "40px",
                  right: "5px",
                  backgroundColor: "#1a1a1a", // dark background
                  color: "#f0f0f0", // light text
                  padding: "8px 12px",
                  borderRadius: "4px",
                  boxShadow: "0 4px 10px rgba(0, 0, 0, 0.6)",
                  zIndex: 1000,
                }}
              >
                <Logout>Logout</Logout>
              </div>
            )}
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
