import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Header from "../components/Header";
import Footer from "../components/Footer";
import AuthorizeView from "../components/AuthorizeView";
import { API_BASE_URL } from "../api/config";

interface Movie {
  showId: string;
  title: string;
  director: string;
  releaseYear: number;
  type: string;
  rating: string;
  genres: string;
  averageRating?: number;
  ratingCount: number;
}

const Admin: React.FC = () => {
  const navigate = useNavigate();

  const [movies, setMovies] = useState<Movie[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [categoryFilter, setCategoryFilter] = useState("All");
  const [page, setPage] = useState(1);
  const [pageSize] = useState(5);

  useEffect(() => {
    const fetchMovies = async () => {
      const params = new URLSearchParams({
        page: page.toString(),
        pageSize: pageSize.toString(),
        search: searchTerm,
        category: categoryFilter === "All" ? "" : categoryFilter
      });

      const res = await fetch(`${API_BASE_URL}/movie/admin?${params}`);
      const data = await res.json();
      setMovies(data);
    };

    fetchMovies();
  }, [searchTerm, categoryFilter, page, pageSize]);

  const handleDelete = async (showId: string, title: string) => {
    if (!window.confirm(`Are you sure you want to delete "${title}"?`)) return;

    const res = await fetch(`${API_BASE_URL}/movie/${showId}`, {
      method: "DELETE",
    });

    if (res.ok) {
      setMovies((prev) => prev.filter((m) => m.showId !== showId));
    } else {
      alert("Failed to delete the movie.");
    }
  };

  const uniqueCategories = [
    "All",
    ...new Set(movies.flatMap((m) => (m.genres ? m.genres.split(", ") : [])))
  ].filter(Boolean);

  return (
    // <AuthorizeView>
      <div style={{ backgroundColor: "#f4f4f4", minHeight: "100vh", fontFamily: "Arial, sans-serif" }}>
        <Header username="Spencer" />

        <main style={{ padding: "40px", paddingTop: "100px", color: "#000" }}>
          <h2 style={{ fontSize: "2rem", marginBottom: "20px", color: "#444" }}>Add/Edit Movies</h2>

          <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "20px", gap: "1rem" }}>
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
                <option key={cat} value={cat}>{cat}</option>
              ))}
            </select>
            <button
              onClick={() => navigate("/admin/add")}
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

          <div style={{ overflowX: "auto" }}>
            <table style={{ width: "100%", borderCollapse: "collapse", backgroundColor: "#fff" }}>
              <thead>
                <tr>
                  {[
                    "Title", "Year", "Director", "Type", "Rating", "Genres", "Avg Rating", "# of Ratings", "Actions"
                  ].map((header) => (
                    <th
                      key={header}
                      style={{ borderBottom: "2px solid #ccc", padding: "12px", textAlign: "left", backgroundColor: "#eee" }}
                    >
                      {header}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {movies.map((movie) => (
                  <tr key={movie.showId}>
                    <td style={tdStyle}>{movie.title}</td>
                    <td style={tdStyle}>{movie.releaseYear}</td>
                    <td style={tdStyle}>{movie.director}</td>
                    <td style={tdStyle}>{movie.type}</td>
                    <td style={tdStyle}>{movie.rating}</td>
                    <td style={tdStyle}>{movie.genres}</td>
                    <td style={tdStyle}>{typeof movie.averageRating === 'number' ? movie.averageRating.toFixed(1) : 'N/A'}</td>
                    <td style={tdStyle}>{movie.ratingCount}</td>
                    <td style={tdStyle}>
                      <button style={editBtnStyle} onClick={() => navigate(`/admin/edit/${movie.showId}`)}>
                        Edit
                      </button>
                      <button style={deleteBtnStyle} onClick={() => handleDelete(movie.showId, movie.title)}>
                        Delete
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div style={{ marginTop: "20px", display: "flex", justifyContent: "center", gap: "10px" }}>
            <button onClick={() => setPage((p) => Math.max(1, p - 1))}>Previous</button>
            <span>Page {page}</span>
            <button onClick={() => setPage((p) => p + 1)}>Next</button>
          </div>
        </main>

        <Footer />
      </div>
    // </AuthorizeView>
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
