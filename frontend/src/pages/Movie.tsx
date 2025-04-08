import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Header from "../components/Header";
import Footer from "../components/Footer";

// Dummy data: 40 movies
const dummyMovies = Array.from({ length: 40 }, (_, i) => ({
  id: i + 1,
  title: `Movie ${i + 1}`,
  img: `https://via.placeholder.com/300x450?text=Movie+${i + 1}`,
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
            onMouseEnter={(e) => (e.currentTarget.style.transform = "scale(1.05)")}
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
    </div>
  );
};

const Movie: React.FC = () => {
  const [rowsVisible, setRowsVisible] = useState(1);
  const [animatedRows, setAnimatedRows] = useState<number[]>([]);
  const navigate = useNavigate();
  const moviesPerRow = 5;

  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY;
      const windowHeight = window.innerHeight;
      const docHeight = document.documentElement.scrollHeight;

      if (scrollY + windowHeight >= docHeight - 50) {
        setRowsVisible((prev) => {
          const totalRows = Math.ceil(dummyMovies.length / moviesPerRow);
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
  }, [animatedRows]);

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
      {/* Inline CSS animation definition */}
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

      <MovieRow title="For You" movies={dummyMovies.slice(0, 5)} cardSize="large" />
      <MovieRow title="Previously Watched" movies={dummyMovies.slice(5, 12)} cardSize="small" />
      {Array.from({ length: 5 }).map((_, i) => (
        <MovieRow
          key={i}
          title={`Recommended Row ${i + 1}`}
          movies={dummyMovies.slice(i * 5 + 12, i * 5 + 17)}
          cardSize="small"
        />
      ))}

      {/* Filter + All Movies */}
      <div style={{ padding: "20px" }}>
        <h2>Filter All Movies</h2>
        <div style={{ marginBottom: "20px", display: "flex", gap: "10px" }}>
          <select style={{ padding: "8px", borderRadius: "4px" }}>
            <option>Type</option>
          </select>
          <select style={{ padding: "8px", borderRadius: "4px" }}>
            <option>Category</option>
          </select>
        </div>

        {/* Infinite rows with fade-in class */}
        {Array.from({ length: rowsVisible }).map((_, rowIndex) => {
          const rowMovies = dummyMovies.slice(
            rowIndex * moviesPerRow,
            (rowIndex + 1) * moviesPerRow
          );

          return (
            <div
              key={rowIndex}
              className={animatedRows.includes(rowIndex) ? "fade-in" : ""}
              style={{
                display: "flex",
                gap: "16px",
                marginBottom: "20px",
              }}
            >
              {rowMovies.map((movie) => (
                <div
                  key={movie.id}
                  onClick={() => navigate("/productDetail")}
                  style={{
                    width: "150px",
                    height: "220px",
                    backgroundImage: `url(${movie.img})`,
                    backgroundSize: "cover",
                    backgroundPosition: "center",
                    borderRadius: "6px",
                    position: "relative",
                    cursor: "pointer",
                  }}
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
                      borderBottomLeftRadius: "6px",
                      borderBottomRightRadius: "6px",
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

      <Footer />
    </div>
  );
};

export default Movie;
