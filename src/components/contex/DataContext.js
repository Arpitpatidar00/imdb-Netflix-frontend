import React, { createContext, useState, useContext } from 'react';
import axios from 'axios';
import Api from "../../Api.js"

const DataContext = createContext({
  data: [],
  selectedFilter: '',
  setData: () => {},
  setSelectedFilter: () => {},
  fetchData: () => {},
  fetchMovieById: () => {}, // Add the new function
  logout:()=>{},
});

export const DataProvider = ({ children }) => {
  const [selectedFilter, setSelectedFilter] = useState('');
  const [data, setData] = useState([]);
  const [lastSelectedFilter, setLastSelectedFilter] = useState('');
  const [selectedMovie, setSelectedMovie] = useState(null); // State for selected movie details
  const [similarMovies,setsimilarMovies,] = useState(null); // State for selected movie details

  const fetchData = async (value) => {
    if (value === lastSelectedFilter) return;
  
    let apiUrl = '';
  
    switch (value) {
      case 'top-rated':
        apiUrl = `${Api}/api/movies/top-rated`;
        break;
      case 'top-comment':
        apiUrl = `${Api}/api/movies/most-commented`;
        break;
      case 'most-awarded':
        apiUrl = `${Api}/api/movies/most-awarded`;
        break;
      default:
        return;
    }
  
    try {
      const response = await axios.get(apiUrl);
      setData(response.data);
      setLastSelectedFilter(value);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };
  

  const fetchMovieById = async (id) => {
    try {

        // First API call to fetch movie details
        const movieResponse = await axios.get(`${Api}/api/movies/Search/${id}`);
        
        // Handle the first response data
        setSelectedMovie(movieResponse.data); // Assuming setSelectedMovie is used for the first response

        // Second API call to fetch similar movies
        const similarMoviesResponse = await axios.get(`${Api}0/api/movies/movies/${id}`);
        // Handle the second response data (if needed)
        // For example, if you want to display or process similar movies:
        setsimilarMovies(similarMoviesResponse.data)

        // You can also update state or handle this data as needed
    } catch (error) {
        console.error('Error fetching movie by ID:', error);
    }
};



  return (
    <DataContext.Provider
      value={{
        data,
        selectedFilter, setSelectedFilter,
        setData,
        
        fetchData,
        fetchMovieById, // Provide the new function
        selectedMovie, // Provide the selected movie data
        similarMovies,
        setsimilarMovies,
      }}
    >
      {children}
    </DataContext.Provider>
  );
};

export const useDataContext = () => useContext(DataContext);
