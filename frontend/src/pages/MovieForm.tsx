import { useParams, useNavigate } from 'react-router-dom';
import { useEffect, useState, useRef } from 'react';
import { GENRES } from '../constants/Genres';
import { API_BASE_URL } from '../api/config';
import './MovieForm.css';

//Movie Form for CRUD functionality
const MovieForm = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const isEdit = !!id;

  // Sets an empty movie
  const [movie, setMovie] = useState({
    title: '',
    releaseYear: 2024,
    rating: '',
    description: '',
    duration: '',
    posterUrl: '',
    genres: [] as string[],
    type: '',
    director: '',
    cast: '',
    country: '',
  });

  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (isEdit) {
      fetch(`${API_BASE_URL}/movie/${id}`)
        .then((res) => {
          if (!res.ok) throw new Error("Failed to fetch movie for edit");
          return res.json();
        })
        .then((data) => {
          const selectedGenres = data.genres ? data.genres.split(', ') : [];
          setMovie({ ...data, genres: selectedGenres });
        })
        .catch((err) => {
          console.error("Error fetching movie data:", err);
        });
    }
  }, [id]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target;

    if (type === 'checkbox' && e.target instanceof HTMLInputElement) {
      setMovie((prevState) => ({
        ...prevState,
        [name]: (e.target as HTMLInputElement).checked,
      }));
    } else if (type === 'select-multiple' && e.target instanceof HTMLSelectElement) {
      const selectedOptions = Array.from(e.target.selectedOptions, (option) => option.value);
      setMovie((prevState) => ({
        ...prevState,
        genres: selectedOptions,
      }));
    } else {
      setMovie((prevState) => ({
        ...prevState,
        [name]: value,
      }));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    //Sends new data to the database

    const method = isEdit ? 'PUT' : 'POST';
    const url = isEdit ? `${API_BASE_URL}/movie/${id}` : `${API_BASE_URL}/movie`;

    const movieData = {
      ...movie,
      genres: movie.genres.join(', '),
      showId: isEdit ? id : undefined,
    };

    console.log("Submitting movie data:", movieData);

    try {
      const response = await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(movieData),
      });

      if (!response.ok) {
        const errorText = await response.text();
        throw new Error(`Server responded with status ${response.status}: ${errorText}`);
      }

      console.log("Movie submitted successfully.");
      navigate('/admin');
    } catch (err) {
      console.error("Error submitting movie:", err);
      alert("Error submitting movie. Check console for details.");
    }
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

  useEffect(() => {
    document.addEventListener('click', handleClickOutside);
    return () => document.removeEventListener('click', handleClickOutside);
  }, []);

  return (
    <div className="form-container">
      <h2>{isEdit ? 'Edit Movie' : 'Add Movie'}</h2>

      <form onSubmit={handleSubmit} className="movie-form">
        <div className="form-group">
          <label>Title:</label>
          <input name="title" value={movie.title} onChange={handleChange} placeholder="Title" required className="input" />
        </div>

        <div className="form-group">
          <label>Release Year:</label>
          <input name="releaseYear" type="number" value={movie.releaseYear} onChange={handleChange} required className="input" />
        </div>

        <div className="form-group">
          <label>Rating:</label>
          <input name="rating" value={movie.rating} onChange={handleChange} required className="input" />
        </div>

        <div className="form-group">
          <label>Duration:</label>
          <input name="duration" value={movie.duration} onChange={handleChange} placeholder="Duration" className="input" />
        </div>

        <div className="form-group">
          <label>Description:</label>
          <textarea name="description" value={movie.description} onChange={handleChange} placeholder="Description" className="input" />
        </div>

        <div className="form-group">
          <label>Genres:</label>
          <div className="custom-dropdown" ref={dropdownRef}>
            <input type="text" value={movie.genres.join(', ')} onClick={handleDropdownToggle} readOnly className="dropdown-input" />
            <div id="genre-dropdown" className="genre-dropdown">
              {GENRES.map((genre) => (
                <label key={genre} className="genre-checkbox-label">
                  <input type="checkbox" value={genre} checked={movie.genres.includes(genre)} onChange={() => handleGenreClick(genre)} className="genre-checkbox" />
                  {genre}
                </label>
              ))}
            </div>
          </div>
        </div>

        <div className="form-group">
          <label>Type:</label>
          <select name="type" value={movie.type} onChange={handleChange} className="select">
            <option value="Movie">Movie</option>
            <option value="TV Show">TV Show</option>
          </select>
        </div>

        <div className="form-group">
          <label>Poster URL:</label>
          <input name="posterUrl" value={movie.posterUrl} onChange={handleChange} placeholder="Poster URL" className="input" />
        </div>

        <div className="form-group">
          <label>Director:</label>
          <input name="director" value={movie.director} onChange={handleChange} placeholder="Director" className="input" />
        </div>

        <div className="form-group">
          <label>Cast:</label>
          <input name="cast" value={movie.cast} onChange={handleChange} placeholder="Cast" className="input" />
        </div>

        <div className="form-group">
          <label>Country:</label>
          <input name="country" value={movie.country} onChange={handleChange} placeholder="Country" className="input" />
        </div>

        <button type="submit" className="submit-btn">
          {isEdit ? 'Update' : 'Add'} Movie
        </button>
      </form>
    </div>
  );
};

export default MovieForm;
