
import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { fetchMovieById } from "../action/MoviesById";
import Modal from "./MovieDetails"; // Ensure this is correctly imported
import MovieDetails from "./MovieDetails.js"; // Ensure this is correctly imported
import { useDataContext } from "./contex/DataContext";
import './Home.css'

export default function Home() {
  const dispatch = useDispatch();
  const { data } = useDataContext();
  const selectedFilter = useSelector((state) => state.selectedFilter); // Access only the needed part of state
  const selectedMovie = useSelector((state) => state.movies.selectedMovie); // Access only the needed part of state

  const [showModal, setShowModal] = React.useState(false);

  useEffect(() => {
    if (selectedFilter) {
      // Fetch data based on selectedFilter here if needed
    }
  }, [selectedFilter]);

  const handleCardClick = (movieId) => {
    dispatch(fetchMovieById(movieId)); // Fetch movie details by ID
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
  };

  return (
    <div>
    <div className="movie-container">
  {data.map((movie) => (
    <div
      className="movie-card"
      key={movie._id}
      onClick={() => handleCardClick(movie._id)}
    >
      <img className="movie-card-img" src={movie.poster} alt={movie.title} />
      <div className="movie-card-body">
        <h5 className="movie-card-title">{movie.title}</h5>
        <p className="movie-card-text">
          <small className="text-muted">
            Released: {new Date(movie.released).toDateString()}
          </small>
        </p>
        <p className="card-text">
                  <small className="text-muted">Rating: {movie.imdb?.rating || "N/A"}</small>
                </p>
      </div>
    </div>
  ))}
</div>

      {showModal && selectedMovie && (
        <Modal show={showModal} onClose={handleCloseModal}>
          <MovieDetails movie={selectedMovie} onClose={handleCloseModal} />
        </Modal>
      )}
    </div>
  );
}
