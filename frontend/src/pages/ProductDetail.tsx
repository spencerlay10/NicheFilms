import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import Footer from "../components/Footer";
import Header from "../components/Header";
import {
  fetchMainMovie,
  fetchRecommendedMovies,
  fetchMovieRating,
  updateMovieRating,
} from "../api/MovieAPI";
import { Movie as MovieType } from "../types/Movie";

// Error Boundary to catch runtime errors
class ErrorBoundary extends React.Component<{ children: React.ReactNode }> {
  state = { hasError: false, errorInfo: null };

  static getDerivedStateFromError() {
    return { hasError: true };
  }

  componentDidCatch(error: any, errorInfo: any) {
    this.setState({ errorInfo });
    console.error(error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return <h1>Something went wrong. Please try again later.</h1>;
    }
    return this.props.children;
  }
}

const ProductDetail: React.FC = () => {
  const [rating, setRating] = useState(0);
  const [hover, setHover] = useState(0);
  const [mainMovie, setMainMovie] = useState<MovieType | null>(null);
  const [recommended, setRecommended] = useState<MovieType[]>([]);

  const { userId, showId } = useParams<{ userId: string; showId: string }>();
  const numericUserId = parseInt(userId || "0", 10);
  const navigate = useNavigate();

  useEffect(() => {
    if (!showId || isNaN(numericUserId)) return;

    const loadMovieData = async () => {
      try {
        const main = await fetchMainMovie(showId);
        const recs = await fetchRecommendedMovies(showId);
        const userRating = await fetchMovieRating(numericUserId, showId);

        setMainMovie(main);
        setRecommended(recs);
        setRating(userRating);
      } catch (error) {
        console.error("Error fetching movie data:", error);
      }
    };

    loadMovieData();
  }, [showId, numericUserId]);

  const handleStarClick = (star: number) => {
    setRating(star);
    if (showId) {
      updateMovieRating(numericUserId, showId, star);
    }
  };

  const handlePlayClick = () => {
    // Placeholder for play functionality
    console.log("Play movie button clicked");
  };

  const handleMovieClick = (showId: string) => {
    // Navigate to the movie/show details page
    navigate(`/productDetail/${numericUserId}/${showId}`);
  };

  if (!mainMovie)
    return <div style={{ color: "white", padding: "40px" }}>Loading...</div>;

  return (
    <ErrorBoundary>
      <Header username="" userId={numericUserId} />
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
            <h1 style={{ marginBottom: "10px" }}>{mainMovie.title}</h1>

            {/* MPAA Rating, Duration, and Year */}
            <div style={{ fontSize: "1rem", color: "#ccc", marginBottom: "10px" }}>
              <span>{mainMovie.rating} | </span>
              <span>{mainMovie.duration} | </span>
              <span>{mainMovie.releaseYear}</span>
            </div>

            <p style={{ fontSize: "1.1rem", lineHeight: "1.6" }}>
              {mainMovie.description}
            </p>

            {/* ⭐ Star Rating Section */}
            <div style={{ marginTop: "20px" }}>
              <strong>Rate this {mainMovie.type === "movie" ? "movie" : "show"}:</strong>
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

            {/* Play Movie Button */}
            <button
              onClick={handlePlayClick}
              style={{
                marginTop: "20px",
                padding: "10px 20px",
                backgroundColor: "#007BFF",
                color: "white",
                borderRadius: "6px",
                border: "none",
                cursor: "pointer",
                fontSize: "1.1rem",
                transition: "background-color 0.3s",
              }}
              onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = "#0056b3")}
              onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = "#007BFF")}
            >
              Play Movie
            </button>

            {/* Categories (Genres) */}
            <div
              style={{
                marginTop: "20px",
                fontSize: "1rem",
                color: "#ccc",
                display: "flex",
                gap: "10px",
                flexWrap: "wrap",
              }}
            >
              {mainMovie.genres && mainMovie.genres.split(", ").map((genre, index) => (
                <span
                  key={index}
                  style={{
                    padding: "5px 10px",
                    backgroundColor: "#444",
                    borderRadius: "4px",
                    fontWeight: "500",
                    fontSize: "0.9rem",
                  }}
                >
                  {genre}
                </span>
              ))}
            </div>
          </div>
        </div>

        {/* Movie Details */}
        <div style={{ marginTop: "30px" }}>
          <h2>Details</h2>
          <p><strong>Director:</strong> {mainMovie.director}</p>
          <p><strong>Cast:</strong> {mainMovie.cast}</p>
          <p><strong>Country:</strong> {mainMovie.country}</p>

          {/* Average Rating and Number of Ratings */}
          <div style={{ marginTop: "20px" }}>
            <p><strong>Average Rating:</strong> {mainMovie.averageRating ? mainMovie.averageRating.toFixed(1) : "N/A"}</p>
            <p><strong>Number of Ratings:</strong> {mainMovie.ratingCount || "N/A"}</p>
          </div>
        </div>

        {/* Add space between details and recommended section */}
        <div style={{ marginTop: "50px" }}></div>

        {/* Recommended Section */}
        <h2 style={{ marginBottom: "20px" }}>You May Also Like</h2>
        <div
          className="hide-scrollbar"
          style={{
            display: "flex",
            gap: "20px",
            overflowX: "auto",
            paddingBottom: "10px",
          }}
        >
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
                  cursor: "pointer",
                }}
                onClick={() => handleMovieClick(movie.showId)}
              />
              <div style={{ fontSize: "0.9rem", color: "#ccc" }}>
                {movie.title}
              </div>
            </div>
          ))}
        </div>

        <Footer />
      </div>

      {/* Scrollbar Hider Styles */}
      <style>{`
        .hide-scrollbar {
          scrollbar-width: none;         /* Firefox */
          -ms-overflow-style: none;      /* IE 10+ */
        }
        .hide-scrollbar::-webkit-scrollbar {
          display: none;                 /* Chrome, Safari, Opera */
        }
      `}</style>
    </ErrorBoundary>
  );
};

export default ProductDetail;
