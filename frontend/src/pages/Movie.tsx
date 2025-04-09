import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Header from "../components/Header";
import Footer from "../components/Footer";
import { Movie as MovieType } from "../types/Movie";
import { fetchMovies, fetchRecommenderRows } from "../api/MovieAPI";
import GenreFilter from "../components/GenreFilter";
import RecommenderRows from "../components/RecommenderRows";
import { RecommenderRow } from "../types/RecommenderRows";

import AuthorizeView, { AuthorizedUser } from "../components/AuthorizeView";

// Dummy data: 40 movies
const dummyMovies = Array.from({ length: 40 }, (_, i) => ({
  id: i + 1,
  title: `Movie ${i + 1}`,
  img: "https://nichefilmposters.blob.core.windows.net/posters/default.jpg",
}));

const MovieRow = ({
  title,
  movies,
  cardSize,
}: {
  title: string;
  movies: typeof dummyMovies;
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
        {movies.map((movie) => (
          <div
            key={movie.id}
            onClick={() => navigate("/productDetail")}
            style={{
              flex: "0 0 auto",
              width: widthMap[cardSize],
              height: heightMap[cardSize],
              backgroundImage: `url(${movie.img})`,
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
  const { userId } = useParams();
  const numericUserId = parseInt(userId || "1");

  const [movies, setMovies] = useState<MovieType[]>([]);
  const [recs, setRecs] = useState<RecommenderRow | null>(null);
  const [selectedGenres, setSelectedGenres] = useState<string[]>([]);
  const [rowsVisible, setRowsVisible] = useState(1);
  const [animatedRows, setAnimatedRows] = useState<number[]>([]);
  const navigate = useNavigate();
  const moviesPerRow = 5;

  useEffect(() => {
    fetchMovies()
      .then((data) => setMovies(data || []))
      .catch((err) => console.error("Failed to load movies:", err));

    fetchRecommenderRows(numericUserId)
      .then(setRecs)
      .catch((err) => console.error("Failed to load recommendations:", err));
  }, [numericUserId]);

  const extractIds = (...keys: (keyof RecommenderRow)[]): string[] => {
    if (!recs) return [];
    return keys.map((key) => recs[key]).filter(Boolean) as string[];
  };

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
  }, [animatedRows, filteredMovies]);

  return (
    <AuthorizeView>
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

        <Header username={<AuthorizedUser value="email" />} />

      {/* ✅ Recommender Rows */}
      {recs && (
        <>
          <RecommenderRows
            title="For You"
            showIds={extractIds(
              "rec1", "rec2", "rec3", "rec4", "rec5",
              "rec6", "rec7", "rec8", "rec9", "rec10"
            )}
            movies={movies}
            cardSize="large"
          />
          <RecommenderRows
            title="Movies We Think You'll Like"
            showIds={extractIds(
              "movieRec1", "movieRec2", "movieRec3", "movieRec4", "movieRec5",
              "movieRec6", "movieRec7", "movieRec8", "movieRec9", "movieRec10"
            )}
            movies={movies}
            cardSize="small"
          />
          <RecommenderRows
            title="Shows We Think You'll Like"
            showIds={extractIds(
              "tvRec1", "tvRec2", "tvRec3", "tvRec4", "tvRec5",
              "tvRec6", "tvRec7", "tvRec8", "tvRec9", "tvRec10"
            )}
            movies={movies}
            cardSize="small"
          />
          <RecommenderRows
            title="Niche Movies You'll Love"
            showIds={extractIds(
              "nicheRec1", "nicheRec2", "nicheRec3", "nicheRec4", "nicheRec5",
              "nicheRec6", "nicheRec7", "nicheRec8", "nicheRec9", "nicheRec10"
            )}
            movies={movies}
            cardSize="small"
          />
        </>
      )}

      {/* ✅ Genre Filter + All Movies */}
      <div style={{ padding: "20px" }}>
        <h2>Filter by Genre</h2>

        <GenreFilter
          selectedGenres={selectedGenres}
          onChange={setSelectedGenres}
        />

        <div style={{ marginTop: "30px" }}>
          {filteredMovies.length === 0 && (
            <p
              style={{ color: "#ccc", textAlign: "center", marginTop: "30px" }}
            >
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
                    onClick={() => navigate(`/productDetail/${movie.showId}`)}
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
    </AuthorizeView>
  );
};

export default Movie;
