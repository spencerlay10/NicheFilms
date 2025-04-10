import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Movie } from "../types/Movie";
import { fetchMovies } from "../api/MovieAPI";
import { Search } from "lucide-react";

const MovieSearch: React.FC = () => {
  const [searchOpen, setSearchOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [movies, setMovies] = useState<Movie[]>([]);
  const [filtered, setFiltered] = useState<Movie[]>([]);
  const navigate = useNavigate();
  const [skip] = useState(0);
  const [take] = useState(100);

  useEffect(() => {
    fetchMovies(skip, take).then(setMovies).catch(console.error);
  }, []);

  useEffect(() => {
    if (searchTerm.trim()) {
      const lower = searchTerm.toLowerCase();
      setFiltered(
        movies.filter((m) => m.title.toLowerCase().startsWith(lower))
      );
    } else {
      setFiltered([]);
    }
  }, [searchTerm, movies]);

  return (
    <div style={{ position: "relative" }}>
      {!searchOpen ? (
        <button
          onClick={() => setSearchOpen(true)}
          style={{
            background: "transparent",
            border: "none",
            cursor: "pointer",
            padding: "4px",
          }}
          title="Search"
        >
          <Search color="white" size={22} />
        </button>
      ) : (
        <input
          type="text"
          autoFocus
          placeholder="Search movies..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          onBlur={() => {
            setTimeout(() => {
              setSearchOpen(false);
              setSearchTerm("");
              setFiltered([]);
            }, 200);
          }}
          style={{
            padding: "6px 10px",
            borderRadius: "4px",
            border: "1px solid #ccc",
            width: "180px",
          }}
        />
      )}

      {filtered.length > 0 && (
        <div
          style={{
            position: "absolute",
            top: "38px",
            left: 0,
            background: "#fff",
            color: "#000",
            borderRadius: "6px",
            padding: "10px",
            zIndex: 10,
            width: "250px",
            maxHeight: "200px",
            overflowY: "auto",
            boxShadow: "0 4px 10px rgba(0,0,0,0.2)",
          }}
        >
          {filtered.map((movie) => (
            <div
              key={movie.showId}
              onMouseDown={() => navigate(`/productDetail/${movie.showId}`)}
              style={{
                padding: "6px",
                borderBottom: "1px solid #eee",
                cursor: "pointer",
              }}
            >
              {movie.title}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default MovieSearch;
