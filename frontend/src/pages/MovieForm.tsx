import { useParams, useNavigate } from 'react-router-dom';
import { useEffect, useState, useRef } from 'react';
import { GENRES } from '../constants/Genres';  // Import the GENRES array
import { API_BASE_URL } from '../api/config';
import './MovieForm.css'; // Import your CSS file

const MovieForm = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const isEdit = !!id;

  const [movie, setMovie] = useState({
    title: '',
    releaseYear: 2024,
    rating: '',
    description: '',
    duration: '',
    posterUrl: '',
    genres: [] as string[], // Store genres as an array
    type: '', // Type is a single value, not an array
    director: '',
    cast: '',
    country: '',
  });

  const dropdownRef = useRef<HTMLDivElement>(null); // Ref for the dropdown container

  useEffect(() => {
    if (isEdit) {
      // Fetch the movie data if editing
      fetch(`${API_BASE_URL}/movie/${id}`)
        .then((res) => res.json())
        .then((data) => {
          // Split the genre string into an array and set it in the state
          const selectedGenres = data.genres ? data.genres.split(', ') : [];
          setMovie({ ...data, genres: selectedGenres });
        });
    }
  }, [id]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target;

    if (type === 'checkbox' && e.target instanceof HTMLInputElement) {
      // If it's a checkbox, update with checked (true/false)
      setMovie((prevState) => ({
        ...prevState,
        [name]: (e.target as HTMLInputElement).checked,
      }));
    } else if (type === 'select-multiple' && e.target instanceof HTMLSelectElement) {
      // If it's a multi-select dropdown, update with selected values as an array
      const selectedOptions = Array.from(e.target.selectedOptions, (option) => option.value); // Ensure the selected option is of type string
      setMovie((prevState) => ({
        ...prevState,
        genres: selectedOptions,
      }));
    } else {
      // For other input types, simply update the value
      setMovie((prevState) => ({
        ...prevState,
        [name]: value,
      }));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const method = isEdit ? 'PUT' : 'POST';
    const url = isEdit ? `${API_BASE_URL}/movie/${id}` : `${API_BASE_URL}/movie`;

    // Concatenate the genres array into a comma-separated string for the backend
    const movieData = {
      ...movie,
      genres: movie.genres.join(', '), // Concatenate selected genres
      showId: isEdit ? id : undefined, // showId only sent for editing
    };

    await fetch(url, {
      method,
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(movieData),
    });

    navigate('/admin');
  };

  const handleGenreClick = (genre: string) => {
    const updatedGenres = movie.genres.includes(genre)
      ? movie.genres.filter((g) => g !== genre)
      : [...movie.genres, genre];

    setMovie({ ...movie, genres: updatedGenres });
  };

  const handleDropdownToggle = () => {
    document.getElementById('genre-dropdown')?.classList.toggle('show');
  };

  const handleClickOutside = (event: MouseEvent) => {
    if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
      document.getElementById('genre-dropdown')?.classList.remove('show');
    }
  };

  // Add the event listener for clicks outside
  useEffect(() => {
    document.addEventListener('click', handleClickOutside);

    return () => {
      document.removeEventListener('click', handleClickOutside);
    };
  }, []);

  return (
    <div className="form-container">
      <h2>{isEdit ? 'Edit Movie' : 'Add Movie'}</h2>

      <form onSubmit={handleSubmit} className="movie-form">
        <div className="form-group">
          <label>Title:</label>
          <input
            name="title"
            value={movie.title}
            onChange={handleChange}
            placeholder="Title"
            required
            className="input"
          />
        </div>

        <div className="form-group">
          <label>Release Year:</label>
          <input
            name="releaseYear"
            type="number"
            value={movie.releaseYear}
            onChange={handleChange}
            required
            className="input"
          />
        </div>

        <div className="form-group">
          <label>Rating:</label>
          <input
            name="rating"
            value={movie.rating}
            onChange={handleChange}
            required
            className="input"
          />
        </div>

        <div className="form-group">
          <label>Duration:</label>
          <input
            name="duration"
            value={movie.duration}
            onChange={handleChange}
            placeholder="Duration"
            className="input"
          />
        </div>

        <div className="form-group">
          <label>Description:</label>
          <textarea
            name="description"
            value={movie.description}
            onChange={handleChange}
            placeholder="Description"
            className="input"
          />
        </div>

        <div className="form-group">
          <label>Genres:</label>
          <div className="custom-dropdown" ref={dropdownRef}>
            <input
              type="text"
              value={movie.genres.join(', ')}
              onClick={handleDropdownToggle}
              readOnly
              className="dropdown-input"
            />
            <div id="genre-dropdown" className="genre-dropdown">
              {GENRES.map((genre) => (
                <label key={genre} className="genre-checkbox-label">
                  <input
                    type="checkbox"
                    value={genre}
                    checked={movie.genres.includes(genre)}
                    onChange={() => handleGenreClick(genre)}
                    className="genre-checkbox"
                  />
                  {genre}
                </label>
              ))}
            </div>
          </div>
        </div>

        <div className="form-group">
          <label>Type:</label>
          <select
            name="type"
            value={movie.type}
            onChange={handleChange}
            className="select"
          >
            <option value="Movie">Movie</option>
            <option value="TV Show">TV Show</option>
          </select>
        </div>

        <div className="form-group">
          <label>Poster URL:</label>
          <input
            name="posterUrl"
            value={movie.posterUrl}
            onChange={handleChange}
            placeholder="Poster URL"
            className="input"
          />
        </div>

        <div className="form-group">
          <label>Director:</label>
          <input
            name="director"
            value={movie.director}
            onChange={handleChange}
            placeholder="Director"
            className="input"
          />
        </div>

        <div className="form-group">
          <label>Cast:</label>
          <input
            name="cast"
            value={movie.cast}
            onChange={handleChange}
            placeholder="Cast"
            className="input"
          />
        </div>

        <div className="form-group">
          <label>Country:</label>
          <input
            name="country"
            value={movie.country}
            onChange={handleChange}
            placeholder="Country"
            className="input"
          />
        </div>

        <button
          type="submit"
          className="submit-btn"
        >
          {isEdit ? 'Update' : 'Add'} Movie
        </button>
      </form>
    </div>
  );
};

export default MovieForm;
