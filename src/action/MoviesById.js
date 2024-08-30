import axios from 'axios';
import Api from '../Api.js'
export const FETCH_MOVIE_BY_ID_REQUEST = 'FETCH_MOVIE_BY_ID_REQUEST';
export const FETCH_MOVIE_BY_ID_SUCCESS = 'FETCH_MOVIE_BY_ID_SUCCESS';
export const FETCH_MOVIE_BY_ID_FAILURE = 'FETCH_MOVIE_BY_ID_FAILURE';

export const fetchMovieById = (id) => async (dispatch) => {
  dispatch({ type: FETCH_MOVIE_BY_ID_REQUEST });

  try {
    const movieResponse = await axios.get(`${Api}/api/movies/Search/${id}`);
    const similarMoviesResponse = await axios.get(`${Api}/api/movies/movies/${id}`);
  
console.log(similarMoviesResponse.data)
    dispatch({
      type: FETCH_MOVIE_BY_ID_SUCCESS,
      payload: {
        movie: movieResponse.data,
        similarMovies: similarMoviesResponse.data,
      },
    });
  } catch (error) {
    dispatch({
      type: FETCH_MOVIE_BY_ID_FAILURE,
      payload: error.message,
    });
  }
};
