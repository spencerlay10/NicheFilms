import React, { useState } from "react";
import Footer from "../components/Footer";
import Header from "../components/Header";

const ProductDetail: React.FC = () => {
  const [rating, setRating] = useState(0);       // Current selected rating
  const [hover, setHover] = useState(0);         // Star being hovered

  const mainMovie = {
    title: "The Great Adventure",
    description:
      "An epic tale of friendship and courage in a world of wonder and danger. Follow our heroes as they battle through unimaginable odds.",
    poster: "https://via.placeholder.com/220x330?text=Main+Movie",
  };

  const recommended = [
    { title: "Skyfall", poster: "https://via.placeholder.com/150x220?text=Skyfall" },
    { title: "Inception", poster: "https://via.placeholder.com/150x220?text=Inception" },
    { title: "Interstellar", poster: "https://via.placeholder.com/150x220?text=Interstellar" },
    { title: "Tenet", poster: "https://via.placeholder.com/150x220?text=Tenet" },
    { title: "The Batman", poster: "https://via.placeholder.com/150x220?text=Batman" },
  ];

  return (
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
            src={mainMovie.poster}
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
            <p style={{ fontSize: "1.1rem", lineHeight: "1.6" }}>{mainMovie.description}</p>

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
                    onClick={() => setRating(star)}
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
        <h2 style={{ marginBottom: "20px" }}>Recommended for You</h2>
        <div style={{ display: "flex", gap: "20px", overflowX: "auto" }}>
          {recommended.map((movie, index) => (
            <div key={index} style={{ textAlign: "center" }}>
              <img
                src={movie.poster}
                alt={`${movie.title} Poster`}
                style={{
                  width: "150px",
                  height: "220px",
                  borderRadius: "4px",
                  marginBottom: "10px",
                }}
              />
              <div style={{ fontSize: "0.9rem", color: "#ccc" }}>{movie.title}</div>
            </div>
          ))}
        </div>

        <Footer />
      </div>
    </>
  );
};

export default ProductDetail;
