import React from "react";
import Footer from "../components/Footer";

const ProductDetail: React.FC = () => {
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
    <div style={{ padding: "40px", fontFamily: "Arial, sans-serif", color: "#fff", backgroundColor: "#000", minHeight: "100vh" }}>
      {/* Main Movie Section */}
      <div style={{ display: "flex", marginBottom: "50px" }}>
        <img
          src={mainMovie.poster}
          alt="Main Movie Poster"
          style={{ width: "220px", height: "330px", borderRadius: "6px", marginRight: "30px" }}
        />
        <div>
          <h1 style={{ marginBottom: "20px" }}>{mainMovie.title}</h1>
          <p style={{ fontSize: "1.1rem", lineHeight: "1.6" }}>{mainMovie.description}</p>
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
              style={{ width: "150px", height: "220px", borderRadius: "4px", marginBottom: "10px" }}
            />
            <div style={{ fontSize: "0.9rem", color: "#ccc" }}>{movie.title}</div>
          </div>
        ))}
      </div>
      <Footer />
    </div>
  );
};

export default ProductDetail;
