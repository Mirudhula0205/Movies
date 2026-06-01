import React, { useEffect, useState } from "react";
import "./App.css";

function App() {
  const [movies, setMovies] = useState([]);
  const [selectedMovie, setSelectedMovie] = useState(null);

  useEffect(() => {
    fetch("http://localhost:3002/api/movies")
      .then((res) => res.json())
      .then((data) => setMovies(data));
  }, []);

  const viewMovie = (id) => {
    fetch(`http://localhost:3002/api/movies/${id}`)
      .then((res) => res.json())
      .then((data) => setSelectedMovie(data));
  };

  if (selectedMovie) {
    return (
      <div className="container">
        <button
          onClick={() => setSelectedMovie(null)}
        >
          Back to Movies
        </button>

        <h1>{selectedMovie.title}</h1>

        {Object.entries(selectedMovie).map(
          ([key, value]) => {
            let displayValue = value;

            if (key === "release_date") {
              displayValue =
                new Date(value).toLocaleDateString();
            }

            if (key === "runtime") {
              displayValue = `${value} minutes`;
            }

            return (
              <p key={key}>
                <strong>{key}</strong>:{" "}
                {String(displayValue)}
              </p>
            );
          }
        )}
      </div>
    );
  }

  return (
    <div className="container">
      <h1>Movies</h1>

      <div className="movie-grid">
        {movies.map((movie) => (
          <div
            className="movie-card"
            key={movie.id}
            onClick={() => viewMovie(movie.id)}
          >
            <h3>{movie.title}</h3>

            <p>{movie.tagline}</p>

            <p>
              Rating: {movie.vote_average}/10
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default App;

export default App;
