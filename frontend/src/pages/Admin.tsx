import React from "react";
import { useNavigate } from "react-router-dom";
import Header from "../components/Header";
import Footer from "../components/Footer";

const Admin: React.FC = () => {
  const navigate = useNavigate();

  const dummyMovies = [
    { id: 1, title: "The Matrix", director: "The Wachowskis", year: 1999 },
    { id: 2, title: "Inception", director: "Christopher Nolan", year: 2010 },
    { id: 3, title: "Parasite", director: "Bong Joon-ho", year: 2019 },
    { id: 4, title: "The Godfather", director: "Francis Ford Coppola", year: 1972 },
    { id: 5, title: "Pulp Fiction", director: "Quentin Tarantino", year: 1994 },
  ];

  return (
    <div style={{ backgroundColor: "#000", minHeight: "100vh", color: "#fff", fontFamily: "Arial, sans-serif" }}>
      <Header username="Rex" />

      <main style={{ padding: "40px", paddingTop: "100px" }}>
        <button
          onClick={() => navigate("/movies")}
          style={{
            padding: "10px 20px",
            marginBottom: "30px",
            backgroundColor: "#222",
            color: "#fff",
            border: "1px solid #555",
            borderRadius: "4px",
            cursor: "pointer",
          }}
        >
          ← Back to Movies
        </button>

        <h1 style={{ fontSize: "2rem", marginBottom: "30px" }}>Admin Movie Dashboard</h1>

        <div style={{ overflowX: "auto" }}>
          <table style={{ width: "100%", borderCollapse: "collapse", backgroundColor: "#111" }}>
            <thead>
              <tr>
                <th style={{ borderBottom: "2px solid #444", padding: "12px", textAlign: "left" }}>ID</th>
                <th style={{ borderBottom: "2px solid #444", padding: "12px", textAlign: "left" }}>Title</th>
                <th style={{ borderBottom: "2px solid #444", padding: "12px", textAlign: "left" }}>Director</th>
                <th style={{ borderBottom: "2px solid #444", padding: "12px", textAlign: "left" }}>Year</th>
                <th style={{ borderBottom: "2px solid #444", padding: "12px", textAlign: "left" }}>Actions</th>
              </tr>
            </thead>
            <tbody>
              {dummyMovies.map((movie) => (
                <tr key={movie.id}>
                  <td style={{ padding: "10px", borderBottom: "1px solid #333" }}>{movie.id}</td>
                  <td style={{ padding: "10px", borderBottom: "1px solid #333" }}>{movie.title}</td>
                  <td style={{ padding: "10px", borderBottom: "1px solid #333" }}>{movie.director}</td>
                  <td style={{ padding: "10px", borderBottom: "1px solid #333" }}>{movie.year}</td>
                  <td style={{ padding: "10px", borderBottom: "1px solid #333" }}>
                    <button
                      style={{
                        marginRight: "10px",
                        padding: "6px 12px",
                        backgroundColor: "#333",
                        color: "#fff",
                        border: "1px solid #555",
                        borderRadius: "4px",
                        cursor: "pointer",
                      }}
                      onClick={() => alert(`Edit movie with ID ${movie.id}`)}
                    >
                      Edit
                    </button>
                    <button
                      style={{
                        padding: "6px 12px",
                        backgroundColor: "#aa0000",
                        color: "#fff",
                        border: "1px solid #800000",
                        borderRadius: "4px",
                        cursor: "pointer",
                      }}
                      onClick={() => alert(`Delete movie with ID ${movie.id}`)}
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default Admin;

