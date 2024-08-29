import {
    FETCH_MOVIE_BY_ID_REQUEST,
    FETCH_MOVIE_BY_ID_SUCCESS,
    FETCH_MOVIE_BY_ID_FAILURE,
  } from '.././action/MoviesById.js';
  
  const initialState = {
    selectedMovie: {},
    similarMovies: [],
    loading: false,
    error: null,
  };
  
  const movieReducer = (state = initialState, action) => {
    switch (action.type) {
      case FETCH_MOVIE_BY_ID_REQUEST:
        return { ...state, loading: true, error: null };
      case FETCH_MOVIE_BY_ID_SUCCESS:
        return { ...state, loading: false, selectedMovie: action.payload.movie, similarMovies: action.payload.similarMovies };
      case FETCH_MOVIE_BY_ID_FAILURE:
        return { ...state, loading: false, error: action.payload };
      default:
        return state;
    }
  };
  
  export default movieReducer;
  