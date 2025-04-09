import React, { useState } from "react";
// import { useNavigate } from "react-router-dom";
import Header from "../components/Header";
import Footer from "../components/Footer";
import AuthorizeView from "../components/AuthorizeView";

const Admin: React.FC = () => {
  // const navigate = useNavigate();

  const [searchTerm, setSearchTerm] = useState("");
  const [categoryFilter, setCategoryFilter] = useState("All");

  const dummyMovies = [
    { id: 1, title: "The Matrix", director: "The Wachowskis", year: 1999, type: "Sci-Fi", rating: "R", category: "Action", avgRating: 4.7, numRatings: 2000 },
    { id: 2, title: "Inception", director: "Christopher Nolan", year: 2010, type: "Sci-Fi", rating: "PG-13", category: "Thriller", avgRating: 4.8, numRatings: 3000 },
    { id: 3, title: "Parasite", director: "Bong Joon-ho", year: 2019, type: "Drama", rating: "R", category: "Thriller", avgRating: 4.6, numRatings: 2500 },
    { id: 4, title: "The Godfather", director: "Francis Ford Coppola", year: 1972, type: "Crime", rating: "R", category: "Classic", avgRating: 4.9, numRatings: 5000 },
    // ... Add more as needed ...
  ];

  const filteredMovies = dummyMovies.filter((movie) => {
    const matchesSearch = movie.title.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = categoryFilter === "All" || movie.category === categoryFilter;
    return matchesSearch && matchesCategory;
  });

  const uniqueCategories = ["All", ...new Set(dummyMovies.map((m) => m.category))];

  return (
    <AuthorizeView>
      <div style={{ backgroundColor: "#f4f4f4", minHeight: "100vh", fontFamily: "Arial, sans-serif" }}>
        <Header username="Spencer" />

        <main style={{ padding: "40px", paddingTop: "100px", color: "#000" }}>
          <h2 style={{ fontSize: "2rem", marginBottom: "20px", color: "#444" }}>Add/Edit Movies</h2>

          {/* Controls */}
          <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "20px" }}>
            <input
              type="text"
              placeholder="Search"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              style={{ padding: "10px", width: "200px", borderRadius: "4px", border: "1px solid #ccc" }}
            />
            <select
              value={categoryFilter}
              onChange={(e) => setCategoryFilter(e.target.value)}
              style={{ padding: "10px", borderRadius: "4px", border: "1px solid #ccc" }}
            >
              {uniqueCategories.map((cat) => (
                <option key={cat} value={cat}>
                  {cat}
                </option>
              ))}
            </select>
            <button
              onClick={() => alert("Add new movie")}
              style={{
                padding: "10px 20px",
                backgroundColor: "#007BFF",
                color: "#fff",
                border: "none",
                borderRadius: "4px",
                cursor: "pointer",
              }}
            >
              Add Movie
            </button>
          </div>

          {/* Table */}
          <div style={{ overflowX: "auto" }}>
            <table style={{ width: "100%", borderCollapse: "collapse", backgroundColor: "#fff" }}>
              <thead>
                <tr>
                  {["ID", "Title", "Year", "Director", "Type", "Rating", "Category(s)", "Avg Rating", "# of Ratings", "Actions"].map(
                    (header) => (
                      <th
                        key={header}
                        style={{ borderBottom: "2px solid #ccc", padding: "12px", textAlign: "left", backgroundColor: "#eee" }}
                      >
                        {header}
                      </th>
                    )
                  )}
                </tr>
              </thead>
              <tbody>
                {filteredMovies.map((movie) => (
                  <tr key={movie.id}>
                    <td style={tdStyle}>{movie.id}</td>
                    <td style={tdStyle}>{movie.title}</td>
                    <td style={tdStyle}>{movie.year}</td>
                    <td style={tdStyle}>{movie.director}</td>
                    <td style={tdStyle}>{movie.type}</td>
                    <td style={tdStyle}>{movie.rating}</td>
                    <td style={tdStyle}>{movie.category}</td>
                    <td style={tdStyle}>{movie.avgRating}</td>
                    <td style={tdStyle}>{movie.numRatings}</td>
                    <td style={tdStyle}>
                      <button style={editBtnStyle} onClick={() => alert(`Edit movie with ID ${movie.id}`)}>
                        Edit
                      </button>
                      <button style={deleteBtnStyle} onClick={() => alert(`Delete movie with ID ${movie.id}`)}>
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
    </AuthorizeView>
  );
};

const tdStyle = {
  padding: "10px",
  borderBottom: "1px solid #ddd",
};

const editBtnStyle = {
  marginRight: "10px",
  padding: "6px 12px",
  backgroundColor: "#333",
  color: "#fff",
  border: "1px solid #555",
  borderRadius: "4px",
  cursor: "pointer",
};

const deleteBtnStyle = {
  padding: "6px 12px",
  backgroundColor: "#aa0000",
  color: "#fff",
  border: "1px solid #800000",
  borderRadius: "4px",
  cursor: "pointer",
};

export default Admin;
