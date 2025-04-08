import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Header from "../components/Header";
import Footer from "../components/Footer";
import AuthorizeView from "../components/AuthorizeView";

const Admin: React.FC = () => {
  const navigate = useNavigate();

  const [searchTerm, setSearchTerm] = useState("");
  const [categoryFilter, setCategoryFilter] = useState("All");

  const dummyMovies = [
    { id: 1, title: "The Matrix", director: "The Wachowskis", year: 1999, type: "Sci-Fi", rating: "R", category: "Action", avgRating: 4.7, numRatings: 2000 },
    { id: 2, title: "Inception", director: "Christopher Nolan", year: 2010, type: "Sci-Fi", rating: "PG-13", category: "Thriller", avgRating: 4.8, numRatings: 3000 },
    { id: 3, title: "Parasite", director: "Bong Joon-ho", year: 2019, type: "Drama", rating: "R", category: "Thriller", avgRating: 4.6, numRatings: 2500 },
    { id: 4, title: "The Godfather", director: "Francis Ford Coppola", year: 1972, type: "Crime", rating: "R", category: "Classic", avgRating: 4.9, numRatings: 5000 },
    { id: 5, title: "Pulp Fiction", director: "Quentin Tarantino", year: 1994, type: "Crime", rating: "R", category: "Action", avgRating: 4.8, numRatings: 4000 },
    { id: 6, title: "The Dark Knight", director: "Christopher Nolan", year: 2008, type: "Action", rating: "PG-13", category: "Superhero", avgRating: 4.9, numRatings: 6000 },
    { id: 7, title: "Fight Club", director: "David Fincher", year: 1999, type: "Drama", rating: "R", category: "Cult", avgRating: 4.7, numRatings: 3200 },
    { id: 8, title: "Forrest Gump", director: "Robert Zemeckis", year: 1994, type: "Drama", rating: "PG-13", category: "Classic", avgRating: 4.6, numRatings: 3500 },
    { id: 9, title: "Interstellar", director: "Christopher Nolan", year: 2014, type: "Sci-Fi", rating: "PG-13", category: "Adventure", avgRating: 4.5, numRatings: 4200 },
    { id: 10, title: "Whiplash", director: "Damien Chazelle", year: 2014, type: "Drama", rating: "R", category: "Music", avgRating: 4.8, numRatings: 2700 },
    { id: 11, title: "Gladiator", director: "Ridley Scott", year: 2000, type: "Action", rating: "R", category: "Historical", avgRating: 4.7, numRatings: 3300 },
    { id: 12, title: "Titanic", director: "James Cameron", year: 1997, type: "Romance", rating: "PG-13", category: "Drama", avgRating: 4.5, numRatings: 5500 },
    { id: 13, title: "The Social Network", director: "David Fincher", year: 2010, type: "Drama", rating: "PG-13", category: "Biography", avgRating: 4.4, numRatings: 2800 },
    { id: 14, title: "The Revenant", director: "Alejandro G. Iñárritu", year: 2015, type: "Adventure", rating: "R", category: "Survival", avgRating: 4.3, numRatings: 2600 },
    { id: 15, title: "La La Land", director: "Damien Chazelle", year: 2016, type: "Musical", rating: "PG-13", category: "Romance", avgRating: 4.5, numRatings: 3400 },
    { id: 16, title: "Shutter Island", director: "Martin Scorsese", year: 2010, type: "Mystery", rating: "R", category: "Thriller", avgRating: 4.2, numRatings: 2500 },
    { id: 17, title: "The Prestige", director: "Christopher Nolan", year: 2006, type: "Drama", rating: "PG-13", category: "Mystery", avgRating: 4.6, numRatings: 3000 },
    { id: 18, title: "Memento", director: "Christopher Nolan", year: 2000, type: "Thriller", rating: "R", category: "Mystery", avgRating: 4.7, numRatings: 2800 },
    { id: 19, title: "Joker", director: "Todd Phillips", year: 2019, type: "Drama", rating: "R", category: "Psychological", avgRating: 4.6, numRatings: 3600 },
    { id: 20, title: "Mad Max: Fury Road", director: "George Miller", year: 2015, type: "Action", rating: "R", category: "Adventure", avgRating: 4.5, numRatings: 3100 },
    { id: 21, title: "Black Panther", director: "Ryan Coogler", year: 2018, type: "Superhero", rating: "PG-13", category: "Marvel", avgRating: 4.4, numRatings: 4100 },
    { id: 22, title: "The Avengers", director: "Joss Whedon", year: 2012, type: "Superhero", rating: "PG-13", category: "Marvel", avgRating: 4.3, numRatings: 5200 },
    { id: 23, title: "Avengers: Endgame", director: "Russo Brothers", year: 2019, type: "Superhero", rating: "PG-13", category: "Marvel", avgRating: 4.7, numRatings: 6200 },
    { id: 24, title: "Doctor Strange", director: "Scott Derrickson", year: 2016, type: "Superhero", rating: "PG-13", category: "Marvel", avgRating: 4.2, numRatings: 3000 },
    { id: 25, title: "Iron Man", director: "Jon Favreau", year: 2008, type: "Superhero", rating: "PG-13", category: "Marvel", avgRating: 4.5, numRatings: 4300 },
    { id: 26, title: "The Lion King", director: "Roger Allers", year: 1994, type: "Animation", rating: "G", category: "Family", avgRating: 4.8, numRatings: 3900 },
    { id: 27, title: "Toy Story", director: "John Lasseter", year: 1995, type: "Animation", rating: "G", category: "Family", avgRating: 4.6, numRatings: 3500 },
    { id: 28, title: "Finding Nemo", director: "Andrew Stanton", year: 2003, type: "Animation", rating: "G", category: "Family", avgRating: 4.7, numRatings: 3400 },
    { id: 29, title: "Up", director: "Pete Docter", year: 2009, type: "Animation", rating: "PG", category: "Family", avgRating: 4.8, numRatings: 3600 },
    { id: 30, title: "WALL·E", director: "Andrew Stanton", year: 2008, type: "Animation", rating: "G", category: "Sci-Fi", avgRating: 4.9, numRatings: 3700 },
    { id: 31, title: "Inside Out", director: "Pete Docter", year: 2015, type: "Animation", rating: "PG", category: "Family", avgRating: 4.7, numRatings: 3800 },
    { id: 32, title: "Coco", director: "Lee Unkrich", year: 2017, type: "Animation", rating: "PG", category: "Musical", avgRating: 4.8, numRatings: 3400 },
    { id: 33, title: "Frozen", director: "Chris Buck", year: 2013, type: "Animation", rating: "PG", category: "Musical", avgRating: 4.4, numRatings: 4500 },
    { id: 34, title: "Tangled", director: "Nathan Greno", year: 2010, type: "Animation", rating: "PG", category: "Romance", avgRating: 4.3, numRatings: 3200 },
    { id: 35, title: "Moana", director: "Ron Clements", year: 2016, type: "Animation", rating: "PG", category: "Adventure", avgRating: 4.5, numRatings: 3600 },
    { id: 36, title: "Zootopia", director: "Byron Howard", year: 2016, type: "Animation", rating: "PG", category: "Mystery", avgRating: 4.6, numRatings: 3300 },
    { id: 37, title: "Big Hero 6", director: "Don Hall", year: 2014, type: "Animation", rating: "PG", category: "Superhero", avgRating: 4.4, numRatings: 3100 },
    { id: 38, title: "Ratatouille", director: "Brad Bird", year: 2007, type: "Animation", rating: "G", category: "Comedy", avgRating: 4.7, numRatings: 3200 },
    { id: 39, title: "Monsters, Inc.", director: "Pete Docter", year: 2001, type: "Animation", rating: "G", category: "Family", avgRating: 4.6, numRatings: 3000 },
    { id: 40, title: "The Incredibles", director: "Brad Bird", year: 2004, type: "Animation", rating: "PG", category: "Superhero", avgRating: 4.8, numRatings: 3600 },
    { id: 41, title: "The Irishman", director: "Martin Scorsese", year: 2019, type: "Crime", rating: "R", category: "Drama", avgRating: 4.3, numRatings: 2200 },
    { id: 42, title: "1917", director: "Sam Mendes", year: 2019, type: "War", rating: "R", category: "Historical", avgRating: 4.5, numRatings: 2600 },
    { id: 43, title: "Dunkirk", director: "Christopher Nolan", year: 2017, type: "War", rating: "PG-13", category: "Historical", avgRating: 4.2, numRatings: 2700 },
    { id: 44, title: "The Shape of Water", director: "Guillermo del Toro", year: 2017, type: "Fantasy", rating: "R", category: "Romance", avgRating: 4.0, numRatings: 2500 },
    { id: 45, title: "Moonlight", director: "Barry Jenkins", year: 2016, type: "Drama", rating: "R", category: "LGBTQ+", avgRating: 4.2, numRatings: 2300 },
    { id: 46, title: "Get Out", director: "Jordan Peele", year: 2017, type: "Horror", rating: "R", category: "Thriller", avgRating: 4.5, numRatings: 3100 },
    { id: 47, title: "Us", director: "Jordan Peele", year: 2019, type: "Horror", rating: "R", category: "Thriller", avgRating: 4.1, numRatings: 2700 },
    { id: 48, title: "Nope", director: "Jordan Peele", year: 2022, type: "Sci-Fi", rating: "R", category: "Thriller", avgRating: 4.0, numRatings: 2100 },
    { id: 49, title: "Her", director: "Spike Jonze", year: 2013, type: "Romance", rating: "R", category: "Sci-Fi", avgRating: 4.3, numRatings: 2900 },
    { id: 50, title: "Ex Machina", director: "Alex Garland", year: 2014, type: "Sci-Fi", rating: "R", category: "Thriller", avgRating: 4.4, numRatings: 2800 },
  ];
  
    // Add more movies as needed


  const filteredMovies = dummyMovies.filter((movie) => {
    const matchesSearch = movie.title.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = categoryFilter === "All" || movie.category === categoryFilter;
    return matchesSearch && matchesCategory;
  });

  const uniqueCategories = ["All", ...new Set(dummyMovies.map((m) => m.category))];

  return (
    <div style={{ backgroundColor: "#f4f4f4", minHeight: "100vh", fontFamily: "Arial, sans-serif" }}>
      <Header username="User" />

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
