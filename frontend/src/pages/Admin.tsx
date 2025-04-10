import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
// import Header from "../components/Header";
import Footer from "../components/Footer";
import { API_BASE_URL } from "../api/config";
import Header_admin from "../components/Header_admin";

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
  const { userId } = useParams();
  const numericUserId = parseInt(userId || "1");
  const navigate = useNavigate();

  const [movies, setMovies] = useState<Movie[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [debouncedSearchTerm, setDebouncedSearchTerm] = useState(searchTerm);
  const [categoryFilter, setCategoryFilter] = useState("All");
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(5);
  const [totalMovies, setTotalMovies] = useState(8000);
  const [goToPage, setGoToPage] = useState(1);

  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [movieToDelete, setMovieToDelete] = useState<Movie | null>(null);

  const totalPages = Math.ceil(totalMovies / pageSize);

  useEffect(() => {
    const timeout = setTimeout(() => {
      setDebouncedSearchTerm(searchTerm);
    }, 300);
    return () => clearTimeout(timeout);
  }, [searchTerm]);

  useEffect(() => {
    const fetchMovies = async () => {
      const params = new URLSearchParams({
        page: page.toString(),
        pageSize: pageSize.toString(),
        search: debouncedSearchTerm,
        category: categoryFilter === "All" ? "" : categoryFilter,
      });

      try {
        const res = await fetch(`${API_BASE_URL}/movie/admin?${params}`);
        if (!res.ok) {
          const errorText = await res.text();
          console.error("Server responded with error:", res.status, errorText);
          return;
        }
        const data = await res.json();
        setMovies(data.movies);
        setTotalMovies(data.total);
      } catch (error) {
        console.error("Fetch error:", error);
      }
    };

    fetchMovies();
  }, [debouncedSearchTerm, categoryFilter, page, pageSize]);

  const confirmDelete = async () => {
    if (!movieToDelete) return;

    try {
      const res = await fetch(`${API_BASE_URL}/movie/${movieToDelete.showId}`, {
        method: "DELETE",
      });

      if (res.ok) {
        setMovies((prev) =>
          prev.filter((m) => m.showId !== movieToDelete.showId)
        );
      } else {
        const errorText = await res.text();
        console.error("Failed to delete movie:", res.status, errorText);
        alert("Failed to delete the movie.");
      }
    } catch (error) {
      console.error("Error deleting movie:", error);
    } finally {
      setShowDeleteModal(false);
      setMovieToDelete(null);
    }
  };

  const openDeleteModal = (movie: Movie) => {
    console.log("Deleting:", movie);
    setMovieToDelete(movie);
    setShowDeleteModal(true);
  };

  const uniqueCategories = [
    "All",
    ...new Set(movies.flatMap((m) => (m.genres ? m.genres.split(", ") : []))),
  ].filter(Boolean);

  return (
    <div
      style={{
        backgroundColor: "#f4f4f4",
        minHeight: "100vh",
        fontFamily: "Arial, sans-serif",
      }}
    >
      <Header_admin userId={numericUserId} username={""} />

      <main style={{ padding: "40px", paddingTop: "100px", color: "#000" }}>
        <h2 style={{ fontSize: "2rem", marginBottom: "20px", color: "#444" }}>
          Add/Edit Movies
        </h2>

        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            marginBottom: "20px",
            gap: "1rem",
            flexWrap: "wrap",
          }}
        >
          <input
            type="text"
            placeholder="Search"
            value={searchTerm}
            onChange={(e) => {
              setSearchTerm(e.target.value);
              setPage(1);
            }}
            style={{
              padding: "10px",
              width: "200px",
              borderRadius: "4px",
              border: "1px solid #ccc",
            }}
          />
          <select
            value={categoryFilter}
            onChange={(e) => {
              setCategoryFilter(e.target.value);
              setPage(1);
            }}
            style={{
              padding: "10px",
              borderRadius: "4px",
              border: "1px solid #ccc",
            }}
          >
            {uniqueCategories.map((cat) => (
              <option key={cat} value={cat}>
                {cat}
              </option>
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
          <table
            style={{
              width: "100%",
              borderCollapse: "collapse",
              backgroundColor: "#fff",
            }}
          >
            <thead>
              <tr>
                {[
                  "Title",
                  "Year",
                  "Director",
                  "Type",
                  "Rating",
                  "Genres",
                  "Avg Rating",
                  "# of Ratings",
                  "Actions",
                ].map((header) => (
                  <th
                    key={header}
                    style={{
                      borderBottom: "2px solid #ccc",
                      padding: "12px",
                      textAlign: "left",
                      backgroundColor: "#eee",
                    }}
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
                  <td style={tdStyle}>
                    {typeof movie.averageRating === "number"
                      ? movie.averageRating.toFixed(1)
                      : "N/A"}
                  </td>
                  <td style={tdStyle}>{movie.ratingCount}</td>
                  <td style={{ ...tdStyle, textAlign: "center" }}>
                    <div
                      style={{
                        display: "flex",
                        flexDirection: "column",
                        alignItems: "center",
                        gap: "8px",
                      }}
                    >
                      <button
                        style={editBtnStyle}
                        onClick={() => navigate(`/admin/edit/${movie.showId}`)}
                      >
                        Edit
                      </button>
                      <button
                        style={deleteBtnStyle}
                        onClick={() => openDeleteModal(movie)}
                      >
                        Delete
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div
          style={{
            marginTop: "20px",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            gap: "16px",
            flexWrap: "wrap",
          }}
        >
          <button
            disabled={page === 1}
            onClick={() => setPage((p) => Math.max(1, p - 1))}
            style={{
              ...navBtnStyle,
              opacity: page === 1 ? 0.5 : 1,
              cursor: page === 1 ? "not-allowed" : "pointer",
            }}
          >
            Previous
          </button>
          <span>
            Page {page} of {totalPages}
          </span>
          <button
            disabled={page === totalPages}
            onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
            style={{
              ...navBtnStyle,
              opacity: page === totalPages ? 0.5 : 1,
              cursor: page === totalPages ? "not-allowed" : "pointer",
            }}
          >
            Next
          </button>

          <label style={{ display: "flex", alignItems: "center", gap: "8px" }}>
            Show:
            <select
              value={pageSize}
              onChange={(e) => {
                setPageSize(Number(e.target.value));
                setPage(1);
              }}
              style={{
                padding: "6px",
                borderRadius: "4px",
                border: "1px solid #ccc",
              }}
            >
              {[5, 10, 25, 50].map((size) => (
                <option key={size} value={size}>
                  {size}
                </option>
              ))}
            </select>
            per page
          </label>

          <label style={{ display: "flex", alignItems: "center", gap: "8px" }}>
            Go to:
            <input
              type="number"
              min={1}
              max={totalPages}
              value={goToPage}
              onChange={(e) => setGoToPage(Number(e.target.value))}
              style={{
                width: "60px",
                padding: "6px",
                borderRadius: "4px",
                border: "1px solid #ccc",
              }}
            />
            <button
              onClick={() => {
                if (goToPage >= 1 && goToPage <= totalPages) {
                  setPage(goToPage);
                }
              }}
              style={{
                padding: "6px 12px",
                borderRadius: "4px",
                border: "1px solid #ccc",
                backgroundColor: "#eee",
                cursor: "pointer",
              }}
            >
              Go
            </button>
          </label>
        </div>
      </main>

      {/* Delete Confirmation Modal */}
      {showDeleteModal && (
        <div
          style={{
            position: "fixed",
            top: 0,
            left: 0,
            width: "100vw",
            height: "100vh",
            backgroundColor: "rgba(0,0,0,0.6)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            zIndex: 1000,
          }}
        >
          <div
            style={{
              backgroundColor: "#fff",
              color: "#000",
              padding: "20px",
              borderRadius: "8px",
              width: "90%",
              maxWidth: "400px",
              minHeight: "160px",
              textAlign: "center",
              boxShadow: "0 2px 8px rgba(0,0,0,0.3)",
              display: "flex",
              flexDirection: "column",
              justifyContent: "space-between",
            }}
          >
            <div>
              <h3 style={{ marginBottom: "16px" }}>Confirm Delete</h3>
              <p>
                Are you sure you want to delete{" "}
                <strong>"{movieToDelete?.title ?? "this movie"}"</strong>?
              </p>
            </div>

            <div
              style={{
                marginTop: "20px",
                display: "flex",
                justifyContent: "space-around",
              }}
            >
              <button
                onClick={() => setShowDeleteModal(false)}
                style={{
                  padding: "8px 16px",
                  backgroundColor: "#ccc",
                  border: "none",
                  borderRadius: "4px",
                  cursor: "pointer",
                }}
              >
                Cancel
              </button>
              <button
                onClick={confirmDelete}
                style={{
                  padding: "8px 16px",
                  backgroundColor: "#aa0000",
                  color: "#fff",
                  border: "none",
                  borderRadius: "4px",
                  cursor: "pointer",
                }}
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      )}

      <Footer />
    </div>
  );
};

const tdStyle = {
  padding: "10px",
  borderBottom: "1px solid #ddd",
};

const editBtnStyle = {
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

const navBtnStyle = {
  padding: "10px 20px",
  backgroundColor: "#007BFF",
  color: "#fff",
  border: "none",
  borderRadius: "4px",
  cursor: "pointer",
  minWidth: "90px",
  opacity: 1,
  transition: "opacity 0.3s ease",
};

export default Admin;
