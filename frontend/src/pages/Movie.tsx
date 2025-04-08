import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Header from "../components/Header";
import Footer from "../components/Footer";
import { Movie as MovieType } from "../types/Movie";
import { fetchMovies } from "../api/MovieAPI";
import GenreFilter from "../components/GenreFilter";

const MovieRow = ({
  title,
  movies,
  cardSize,
}: {
  title: string;
  movies: MovieType[];
  cardSize: "large" | "small";
}) => {
  const navigate = useNavigate();
  const heightMap = { large: "300px", small: "160px" };
  const widthMap = { large: "200px", small: "110px" };

  return (
    <div style={{ marginBottom: "40px" }}>
      <h2 style={{ color: "#fff", marginLeft: "20px" }}>{title}</h2>
      <div
        style={{
          display: "flex",
          overflowX: "auto",
          padding: "20px",
          gap: "16px",
        }}
      >
        {movies.map((movie, index) => (
          <div
            key={index}
            onClick={() => navigate("/productDetail")}
            style={{
              flex: "0 0 auto",
              width: widthMap[cardSize],
              height: heightMap[cardSize],
              backgroundImage: `url(${movie.posterUrl})`,
              backgroundSize: "cover",
              backgroundPosition: "center",
              borderRadius: "8px",
              boxShadow: "0 4px 10px rgba(0,0,0,0.4)",
              position: "relative",
              cursor: "pointer",
              transition: "transform 0.2s ease-in-out",
            }}
            onMouseEnter={(e) =>
              (e.currentTarget.style.transform = "scale(1.05)")
            }
            onMouseLeave={(e) =>
              (e.currentTarget.style.transform = "scale(1)")
            }
          >
            <div
              style={{
                position: "absolute",
                bottom: 0,
                width: "100%",
                background: "rgba(0,0,0,0.6)",
                color: "#fff",
                fontSize: "0.75rem",
                padding: "4px",
                borderBottomLeftRadius: "8px",
                borderBottomRightRadius: "8px",
                textAlign: "center",
              }}
            >
              {movie.title}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

const Movie: React.FC = () => {
  const [movies, setMovies] = useState<MovieType[]>([]);
  const [selectedGenres, setSelectedGenres] = useState<string[]>([]);
  const [rowsVisible, setRowsVisible] = useState(1);
  const [animatedRows, setAnimatedRows] = useState<number[]>([]);
  const navigate = useNavigate();
  const moviesPerRow = 5;

  useEffect(() => {
    fetchMovies()
      .then((data) => {
        setMovies(data || []);
      })
      .catch((err) => {
        console.error("Failed to load movies:", err);
      });
  }, []);

  // 👇 Show one sample movie's genres for debugging
  useEffect(() => {
    if (movies.length > 0) {
      console.log("Sample genres string:", movies[0].genres);
    }
  }, [movies]);

  // 👇 Log selected genres when they change
  useEffect(() => {
    console.log("Selected genres:", selectedGenres);
  }, [selectedGenres]);

  // ✅ Safe filtering
  const filteredMovies = selectedGenres.length
    ? movies.filter((movie) =>
        selectedGenres.some((genre) =>
          (movie.genres ?? "").toLowerCase().includes(genre.toLowerCase())
        )
      )
    : movies;

  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY;
      const windowHeight = window.innerHeight;
      const docHeight = document.documentElement.scrollHeight;

      if (scrollY + windowHeight >= docHeight - 50) {
        setRowsVisible((prev) => {
          const totalRows = Math.ceil(filteredMovies.length / moviesPerRow);
          const next = prev < totalRows ? prev + 1 : prev;
          if (!animatedRows.includes(next - 1)) {
            setAnimatedRows((prevAnimated) => [...prevAnimated, next - 1]);
          }
          return next;
        });
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [animatedRows, selectedGenres, movies]);

  return (
    <div
      style={{
        backgroundColor: "#141414",
        minHeight: "100vh",
        fontFamily: "Arial, sans-serif",
        paddingTop: "80px",
        color: "#fff",
      }}
    >
      <style>{`
        .fade-in {
          animation: fadeInUp 0.5s ease-out;
        }
        @keyframes fadeInUp {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
      `}</style>

      <Header username="Rex" />

      {/* Recommender rows (static) */}
      <MovieRow title="For You" movies={movies.slice(0, 5)} cardSize="large" />
      <MovieRow title="Movies We Think You'll Like" movies={movies.slice(5, 11)} cardSize="small" />
      <MovieRow title="Shows We Think You'll Like" movies={movies.slice(11, 17)} cardSize="small" />
      <MovieRow title="Niche Movies You'll Love" movies={movies.slice(17, 23)} cardSize="small" />

      {/* Genre Filter + Filtered Movies */}
      <div style={{ padding: "20px" }}>
        <h2>Filter by Genre</h2>

        <GenreFilter
          selectedGenres={selectedGenres}
          onChange={setSelectedGenres}
        />

        <div style={{ marginTop: "30px" }}>
          {filteredMovies.length === 0 && (
            <p style={{ color: "#ccc", textAlign: "center", marginTop: "30px" }}>
              No movies match your selected genres.
            </p>
          )}

          {Array.from({ length: rowsVisible }).map((_, rowIndex) => {
            const rowMovies = filteredMovies.slice(
              rowIndex * moviesPerRow,
              (rowIndex + 1) * moviesPerRow
            );

            return (
              <div
                key={rowIndex}
                className={animatedRows.includes(rowIndex) ? "fade-in" : ""}
                style={{
                  display: "flex",
                  gap: "20px",
                  flexWrap: "wrap",
                  justifyContent: "flex-start",
                  marginBottom: "20px",
                }}
              >
                {rowMovies.map((movie, index) => (
                  <div
                    key={index}
                    onClick={() => navigate("/productDetail")}
                    style={{
                      width: "200px",
                      height: "300px",
                      backgroundImage: `url(${movie.posterUrl})`,
                      backgroundSize: "cover",
                      backgroundPosition: "center",
                      borderRadius: "8px",
                      position: "relative",
                      cursor: "pointer",
                      boxShadow: "0 4px 10px rgba(0,0,0,0.4)",
                    }}
                  >
                    <div
                      style={{
                        position: "absolute",
                        bottom: 0,
                        width: "100%",
                        background: "rgba(0,0,0,0.6)",
                        color: "#fff",
                        fontSize: "0.8rem",
                        padding: "6px",
                        borderBottomLeftRadius: "8px",
                        borderBottomRightRadius: "8px",
                        textAlign: "center",
                      }}
                    >
                      {movie.title}
                    </div>
                  </div>
                ))}
              </div>
            );
          })}
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default Movie;
