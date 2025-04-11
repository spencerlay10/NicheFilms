import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { API_BASE_URL } from '../api/config';

// This is a Movie List with relevant information 
//pulls data for each movie 

interface Movie {
  showId: string;
  title: string;
  posterUrl: string;
  releaseYear: number;
  rating: string;
  duration: string;
  description: string;
}

const MovieList = () => {
  const [movies, setMovies] = useState<Movie[]>([]);
  const [pageSize, setPageSize] = useState(5);
  const [page, setPage] = useState(1);
  const [search, setSearch] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("");
  const [selectedMovie, setSelectedMovie] = useState<Movie | null>(null);

  const fetchMovies = async () => {
    const queryParams = new URLSearchParams({
      page: page.toString(),
      pageSize: pageSize.toString(),
      search,
      category: selectedCategory
    });

    const res = await fetch(`${API_BASE_URL}/movie?${queryParams}`);
    const data = await res.json();
    setMovies(data);
  };

  useEffect(() => {
    fetchMovies();
  }, [page, pageSize, search, selectedCategory]);

  const handleDelete = async (id: string) => {
    await fetch(`${API_BASE_URL}/movie/${id}`, { method: 'DELETE' });
    fetchMovies();
  };

  return (
    <div className="movie-admin">
      <h1>Manage Movies</h1>
      <Link to="/admin/movies/add" className="btn btn-primary">Add Movie</Link>

      <div className="controls">
        <label>Page Size:</label>
        <select value={pageSize} onChange={(e) => setPageSize(Number(e.target.value))}>
          <option>5</option>
          <option>10</option>
          <option>20</option>
        </select>

        <input
          type="text"
          placeholder="Search by title"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />

        <select
          value={selectedCategory}
          onChange={(e) => setSelectedCategory(e.target.value)}
        >
          <option value="">All Categories</option>
          <option value="Action">Action</option>
          <option value="Comedy">Comedy</option>
          <option value="Drama">Drama</option>
          <option value="Documentary">Documentary</option>
        </select>
      </div>

      <table>
        <thead>
          <tr>
            <th>Title</th>
            <th>Year</th>
            <th>Rating</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {movies.map(movie => (
            <tr key={movie.showId}>
              <td>{movie.title}</td>
              <td>{movie.releaseYear}</td>
              <td>{movie.rating}</td>
              <td>
                <Link to={`/admin/movies/edit/${movie.showId}`} className="btn">Edit</Link>
                <button onClick={() => handleDelete(movie.showId)} className="btn btn-danger">Delete</button>
                <button onClick={() => setSelectedMovie(movie)} className="btn btn-info">See More</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      <div className="pagination-buttons">
        <button onClick={() => setPage(page => Math.max(1, page - 1))}>Previous</button>
        <span>Page {page}</span>
        <button onClick={() => setPage(page => page + 1)}>Next</button>
      </div>

      {selectedMovie && (
        <div className="modal-overlay">
          <div className="modal-content">
            <h3>{selectedMovie.title}</h3>
            <p>{selectedMovie.description}</p>
            <p><strong>Duration:</strong> {selectedMovie.duration}</p>
            <p><strong>Year:</strong> {selectedMovie.releaseYear}</p>
            {selectedMovie.posterUrl && (
              <img
                src={selectedMovie.posterUrl}
                alt="poster"
                style={{ width: '100%', maxHeight: '300px', objectFit: 'cover' }}
              />
            )}
            <button onClick={() => setSelectedMovie(null)}>Close</button>
          </div>
        </div>
      )}
    </div>
  );
};

export default MovieList;