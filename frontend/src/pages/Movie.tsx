import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Header from "../components/Header";
import Footer from "../components/Footer";
import { Movie as MovieType } from "../types/Movie";
import { fetchMovies, fetchRecommenderRows } from "../api/MovieAPI";
import GenreFilter from "../components/GenreFilter";
import RecommenderRows from "../components/RecommenderRows";
import { RecommenderRow } from "../types/RecommenderRows";

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
          const next = prev + 1;
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

        .hover-expand {
          transition: transform 0.2s ease-in-out;
        }

        .hover-expand:hover {
          transform: scale(1.05);
        }
      `}</style>

      <Header username="Rex" />

      {recs && (
        <>
          <RecommenderRows
            title="For You"
            showIds={extractIds(
              "rec1",
              "rec2",
              "rec3",
              "rec4",
              "rec5",
              "rec6",
              "rec7",
              "rec8",
              "rec9",
              "rec10",
              "rec11",
              "rec12",
              "rec13",
              "rec14",
              "rec15",
              "rec16",
              "rec17",
              "rec18",
              "rec19",
              "rec20"
            )}
            movies={movies}
            cardSize="large"
            userId={numericUserId} // ✅ passed
          />
          <RecommenderRows
            title="Movies We Think You'll Like"
            showIds={extractIds(
              ...(Array.from(
                { length: 20 },
                (_, i) => `movieRec${i + 1}`
              ) as (keyof RecommenderRow)[])
            )}
            movies={movies}
            cardSize="small"
            userId={numericUserId}
          />
          <RecommenderRows
            title="Shows We Think You'll Like"
            showIds={extractIds(
              ...(Array.from(
                { length: 20 },
                (_, i) => `tvRec${i + 1}`
              ) as (keyof RecommenderRow)[])
            )}
            movies={movies}
            cardSize="small"
            userId={numericUserId}
          />
          <RecommenderRows
            title="Niche Content You'll Love"
            showIds={extractIds(
              ...(Array.from(
                { length: 20 },
                (_, i) => `nicheRec${i + 1}`
              ) as (keyof RecommenderRow)[])
            )}
            movies={movies}
            cardSize="small"
            userId={numericUserId}
          />
        </>
      )}

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
                    className="hover-expand"
                    onClick={() =>
                      navigate(
                        `/productDetail/${numericUserId}/${movie.showId}`
                      )
                    }
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
