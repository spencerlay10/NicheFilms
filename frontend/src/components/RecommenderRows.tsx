import React from "react";
import { Movie } from "../types/Movie";
import { useNavigate } from "react-router-dom";

// Returns the recommendations from the database and gives clickable

type Props = {
  title: string;
  showIds: string[];
  movies: Movie[];
  cardSize: "large" | "small";
  userId: number;
};

const RecommenderRows: React.FC<Props> = ({
  title,
  showIds,
  movies,
  cardSize,
  userId,
}) => {
  const navigate = useNavigate();

  const matchedMovies = movies.filter((movie) =>
    showIds.includes(movie.showId)
  );

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
          scrollbarWidth: "none", // Firefox
          msOverflowStyle: "none", // IE/Edge
        }}
        className="hide-scrollbar"
      >
        {matchedMovies.map((movie) => (
          <div
            key={movie.showId}
            onClick={() => navigate(`/productDetail/${userId}/${movie.showId}`)}
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
            onMouseLeave={(e) => (e.currentTarget.style.transform = "scale(1)")}
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

      {/* Inline style block or move to a CSS file */}
      <style>{`
        .hide-scrollbar::-webkit-scrollbar {
          display: none;
        }
      `}</style>
    </div>
  );
};

export default RecommenderRows;
