import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { fetchMovieById } from "../action/MoviesById";
import Loader from "././Loder.js"; // Import the Loader component

export default function Seggessions() {
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(true);

  const { selectedMovie, similarMovies } = useSelector((state) => state.movies);
  
  useEffect(() => {
    if (similarMovies.length > 0) {
      setLoading(false); // Data is loaded
    }
  }, [similarMovies]);

  const handleCardClick = (movieId) => {
    setLoading(true); // Set loading state to true when fetching new movie
    dispatch(fetchMovieById(movieId));
  };

  useEffect(() => {
    if (selectedMovie) {
      setLoading(false); // Set loading to false once the selected movie is fetched
    }
  }, [selectedMovie]);

  if (!selectedMovie && loading) {
    return <Loader />; // Show loader if data is not yet loaded
  }

  return (
    <div className="movie-container">
      {loading ? (
        <Loader /> // Show loader when data is being fetched
      ) : (
        similarMovies.map((movie) => (
          <div
            className="movie-card"
            key={movie._id}
            onClick={() => handleCardClick(movie._id)}
          >
            <img
              className="movie-card-img"
              src={movie.poster}
              alt={movie.title}
              onError={(e) => {
                e.target.onerror = null; // Prevents an infinite loop if fallback image fails
                e.target.src = "/maxresdefault.jpg"; // Path to your fallback image
              }}
            />
            <div className="movie-card-body">
              <h5 className="movie-card-title">{movie.title}</h5>
              <p className="movie-card-text">
                <small className="text-muted">
                  Released: {new Date(movie.released).toDateString()}
                </small>
              </p>
              <p className="card-text">
                <small className="text-muted">
                  Rating: {movie.imdb?.rating || "N/A"}
                </small>
              </p>
            </div>
          </div>
        ))
      )}
    </div>
  );
}
