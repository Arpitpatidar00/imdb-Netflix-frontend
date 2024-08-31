import React from "react";
import "./About.css";
import { useSelector, useDispatch } from "react-redux";
import { fetchMovieById } from "../action/MoviesById";
import Modal from "./MovieDetails"; // Ensure this is correctly imported
import MovieDetails from "./MovieDetails.js"; // Ensure this is correctly imported

export default function Seggessions() {
  const dispatch = useDispatch();
  const [showModal, setShowModal] = React.useState(false);

  const { selectedMovie, similarMovies } = useSelector((state) => state.movies);
  if (!selectedMovie) return null;

  const handleCardClick = (movieId) => {
    dispatch(fetchMovieById(movieId)); // Fetch movie details by ID
    setShowModal(true);
  };
  const handleCloseModal = () => {
    setShowModal(false);
  };

  return (
    <div className="movie-container">
      {similarMovies.map((movie) => (
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
      ))}
      {showModal && selectedMovie && (
        <Modal show={showModal} onClose={handleCloseModal}>
          <MovieDetails movie={selectedMovie} onClose={handleCloseModal} />
        </Modal>
      )}
    </div>
  );
}
