import React, { useState } from "react";
import { GENRES } from "../constants/Genres";

// Filters by all Genres
// Pulls from the constants folder and lists categories
type Props = {
  selectedGenres: string[];
  onChange: (genres: string[]) => void;
};

const initialVisibleGenres = [
  "Action", "Adventure", "Children", "Comedies",
  "Documentaries", "Drama", "Fantasy", "Musicals",
];

const GenreFilter: React.FC<Props> = ({ selectedGenres, onChange }) => {
  const [showAll, setShowAll] = useState(false);

  const hiddenGenres = GENRES.filter((g) => !initialVisibleGenres.includes(g));

  const handleToggle = (genre: string) => {
    const isSelected = selectedGenres.includes(genre);
    const updated = isSelected
      ? selectedGenres.filter((g) => g !== genre)
      : [...selectedGenres, genre];
    onChange(updated);
  };

  return (
    <div style={{ marginBottom: "20px" }}>
      {/* Always show initial genres */}
      <div style={{ display: "flex", flexWrap: "wrap", gap: "10px", marginBottom: "10px" }}>
        {initialVisibleGenres.map((genre) => (
          <button
            key={genre}
            onClick={() => handleToggle(genre)}
            style={{
              padding: "6px 10px",
              borderRadius: "6px",
              border: "1px solid #fff",
              background: selectedGenres.includes(genre) ? "#fff" : "transparent",
              color: selectedGenres.includes(genre) ? "#000" : "#fff",
              cursor: "pointer",
            }}
          >
            {genre}
          </button>
        ))}
      </div>

      {/* Extra genres only when expanded */}
      {showAll && (
        <div style={{ display: "flex", flexWrap: "wrap", gap: "10px", marginBottom: "10px" }}>
          {hiddenGenres.map((genre) => (
            <button
              key={genre}
              onClick={() => handleToggle(genre)}
              style={{
                padding: "6px 10px",
                borderRadius: "6px",
                border: "1px solid #fff",
                background: selectedGenres.includes(genre) ? "#fff" : "transparent",
                color: selectedGenres.includes(genre) ? "#000" : "#fff",
                cursor: "pointer",
              }}
            >
              {genre}
            </button>
          ))}
        </div>
      )}

      {/* Toggle button */}
      <div>
        <button
          onClick={() => setShowAll((prev) => !prev)}
          style={{
            padding: "6px 12px",
            backgroundColor: "#333",
            color: "#fff",
            borderRadius: "4px",
            border: "1px solid #fff",
            cursor: "pointer",
          }}
        >
          {showAll ? "Fewer Categories ▲" : "More Categories ▼"}
        </button>
      </div>
    </div>
  );
};

export default GenreFilter;
