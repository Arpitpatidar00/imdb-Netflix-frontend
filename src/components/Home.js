import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { fetchMovieById } from "../action/MoviesById";
import Modal from "./MovieDetails";
import MovieDetails from "./MovieDetails.js";
import { useDataContext } from "./contex/DataContext";
import "./Home.css";

export default function Home() {
  const dispatch = useDispatch();
  const { data, search, setSearch } = useDataContext(); // Ensure setSearch is available to clear search state
  const selectedFilter = useSelector((state) => state.selectedFilter);
  const selectedMovie = useSelector((state) => state.movies.selectedMovie);
  const [showModal, setShowModal] = React.useState(false);
  const [isSearchActive, setIsSearchActive] = React.useState(false);

  useEffect(() => {
    if (selectedFilter) {
      setIsSearchActive(false); // Reset search state to show filtered content
      setSearch([]); // Clear search results to prevent showing search content
    }
  }, [selectedFilter, setSearch]); // Added 'setSearch' to the dependency array

  useEffect(() => {
    setIsSearchActive(search && search.length > 0); // Update search state based on search results
  }, [search]);

  const handleCardClick = (movieId) => {
    dispatch(fetchMovieById(movieId));
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
  };

  return (
    <div>
      <div className="movie-container">
        {/* Show filtered content if search is not active */}
        {isSearchActive
          ? (search || []).map((movie) => (
              <div
                className="movie-card"
                key={movie._id}
                onClick={() => handleCardClick(movie._id)}
              >
                <img
                  className="movie-card-img"
                  src={movie.poster || "/maxresdefault.jpg"}
                  alt={movie.title}
                  onError={(e) => {
                    e.target.onerror = null;
                    e.target.src = "/maxresdefault.jpg";
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
          : (data || []).map((movie) => (
              <div
                className="movie-card"
                key={movie._id}
                onClick={() => handleCardClick(movie._id)}
              >
                <img
                  className="movie-card-img"
                  src={movie.poster || "/maxresdefault.jpg"}
                  alt={movie.title}
                  onError={(e) => {
                    e.target.onerror = null;
                    e.target.src = "/maxresdefault.jpg";
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
      </div>

      {showModal && selectedMovie && (
        <Modal show={showModal} onClose={handleCloseModal}>
          <MovieDetails movie={selectedMovie} onClose={handleCloseModal} />
        </Modal>
      )}
    </div>
  );
}
