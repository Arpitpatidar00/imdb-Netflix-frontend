import { configureStore } from '@reduxjs/toolkit';
import authReducer from './reducers/authReducer.js';
import movieReducer from './reducers/MoviReducer.js'; // Import the new movie reducer


const store = configureStore({
  reducer: {
    auth: authReducer,
    movies: movieReducer, // Add the movie reducer to the store

  },
});
export default store;