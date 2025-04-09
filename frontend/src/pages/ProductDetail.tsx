import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Footer from "../components/Footer";
import Header from "../components/Header";
// import AuthorizeView from "../components/AuthorizeView";
import {
  fetchMainMovie,
  fetchRecommendedMovies,
  fetchMovieRating,
  updateMovieRating,
} from "../api/MovieAPI";
import { Movie as MovieType } from "../types/Movie";
import AuthorizeView from "../components/AuthorizeView";

const ProductDetail: React.FC = () => {
  const [rating, setRating] = useState(0);
  const [hover, setHover] = useState(0);
  const [mainMovie, setMainMovie] = useState<MovieType | null>(null);
  const [recommended, setRecommended] = useState<MovieType[]>([]);

  const { userId, showId } = useParams<{ userId: string; showId: string }>();
  const numericUserId = parseInt(userId || "0", 10);

  useEffect(() => {
    if (!showId || isNaN(numericUserId)) return;

    const loadMovieData = async () => {
      const main = await fetchMainMovie(showId);
      const recs = await fetchRecommendedMovies(showId);
      const userRating = await fetchMovieRating(numericUserId, showId);

      setMainMovie(main);
      setRecommended(recs);
      setRating(userRating);
    };

    loadMovieData();
  }, [showId, numericUserId]);

  const handleStarClick = (star: number) => {
    setRating(star);
    if (showId) {
      updateMovieRating(numericUserId, showId, star);
    }
  };

  if (!mainMovie)
    return <div style={{ color: "white", padding: "40px" }}>Loading...</div>;

  return (
   // <AuthorizeView>
    <>
      <Header username="Rex" />
      <div
        style={{
          padding: "40px",
          marginTop: "80px",
          fontFamily: "Arial, sans-serif",
          color: "#fff",
          backgroundColor: "#000",
          minHeight: "100vh",
        }}
      >
        {/* Main Movie Section */}
        <div style={{ display: "flex", marginBottom: "50px" }}>
          <img
            src={mainMovie.posterUrl}
            alt="Main Movie Poster"
            style={{
              width: "220px",
              height: "330px",
              borderRadius: "6px",
              marginRight: "30px",
            }}
          />
          <div>
            <h1 style={{ marginBottom: "20px" }}>{mainMovie.title}</h1>
            <p style={{ fontSize: "1.1rem", lineHeight: "1.6" }}>
              {mainMovie.description}
            </p>

            {/* ⭐ Star Rating Section */}
            <div style={{ marginTop: "20px" }}>
              <strong>Rate this movie:</strong>
              <div style={{ fontSize: "1.5rem", marginTop: "10px" }}>
                {[1, 2, 3, 4, 5].map((star) => (
                  <span
                    key={star}
                    style={{
                      cursor: "pointer",
                      color: (hover || rating) >= star ? "#f5c518" : "#555",
                      transition: "color 0.2s",
                      marginRight: "5px",
                    }}
                    onClick={() => handleStarClick(star)}
                    onMouseEnter={() => setHover(star)}
                    onMouseLeave={() => setHover(0)}
                  >
                    ★
                  </span>
                ))}
                <span style={{ fontSize: "1rem", marginLeft: "10px" }}>
                  {rating > 0 ? `You rated this ${rating}/5` : ""}
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Recommended Section */}
        <h2 style={{ marginBottom: "20px" }}>Recommended Movies</h2>
        <div style={{ display: "flex", gap: "20px", overflowX: "auto" }}>
          {recommended.map((movie, index) => (
            <div key={index} style={{ textAlign: "center" }}>
              <img
                src={movie.posterUrl}
                alt={`${movie.title} Poster`}
                style={{
                  width: "150px",
                  height: "220px",
                  borderRadius: "4px",
                  marginBottom: "10px",
                }}
              />
              <div style={{ fontSize: "0.9rem", color: "#ccc" }}>
                {movie.title}
              </div>
            </div>
          ))}
        </div>

        <Footer />
      </div>
    </>
   // </AuthorizeView>
  );
};

export default ProductDetail;
