// import React, { createContext, useState, useContext } from "react";
// import axios from "axios";
// import Api from "../../Api.js";

// const DataContext = createContext({
//   data: [],
//   selectedFilter: "",
//   setData: () => {},
//   setSelectedFilter: () => {},
//   fetchData: () => {},
//   fetchMovieById: () => {}, // Add the new function
//   logout: () => {},
// });

// export const DataProvider = ({ children }) => {
//   const [selectedFilter, setSelectedFilter] = useState("");
//   const [data, setData] = useState([]);
//   const [lastSelectedFilter, setLastSelectedFilter] = useState("");
//   const [selectedMovie, setSelectedMovie] = useState(null); // State for selected movie details
//   const [similarMovies, setsimilarMovies] = useState(null); // State for selected movie details
//   const [search, setSearch] = useState(null);

//   const fetchData = async (value) => {
//     if (value === lastSelectedFilter) return;

//     let apiUrl = "";

//     switch (value) {
//       case "top-rated":
//         apiUrl = `${Api}/api/movies/top-rated`;
//         break;
//       case "top-comment":
//         apiUrl = `${Api}/api/movies/most-commented`;
//         break;
//       case "most-awarded":
//         apiUrl = `${Api}/api/movies/most-awarded`;
//         break;
//       case "trending":
//         apiUrl = `${Api}/api/movies/trending`;
//         break;
//       default:
//         return;
//     }

//     try {
//       const response = await axios.get(apiUrl);
//       setData(response.data);
//       setLastSelectedFilter(value);
//     } catch (error) {
//       console.error("Error fetching data:", error);
//     }
//   };

//   const fetchMovieById = async (id) => {
//     try {
//       // First API call to fetch movie details
//       const movieResponse = await axios.get(`${Api}/api/movies/Search/${id}`);

//       // Handle the first response data
//       setSelectedMovie(movieResponse.data); // Assuming setSelectedMovie is used for the first response

//       // Second API call to fetch similar movies
//       const similarMoviesResponse = await axios.get(
//         `${Api}0/api/movies/movies/${id}`
//       );
//       // Handle the second response data (if needed)
//       // For example, if you want to display or process similar movies:
//       setsimilarMovies(similarMoviesResponse.data);

//       // You can also update state or handle this data as needed
//     } catch (error) {
//       console.error("Error fetching movie by ID:", error);
//     }
//   };

//   return (
//     <DataContext.Provider
//       value={{
//         data,
//         selectedFilter,
//         setSelectedFilter,
//         setData,

//         fetchData,
//         fetchMovieById, // Provide the new function
//         selectedMovie, // Provide the selected movie data
//         similarMovies,
//         setsimilarMovies,
//         search,
//         setSearch,
//       }}
//     >
//       {children}
//     </DataContext.Provider>
//   );
// };

// export const useDataContext = () => useContext(DataContext);
import React, { createContext, useState, useContext } from "react";
import axios from "axios";
import Api from "../../Api.js";

const DataContext = createContext({
  data: [],
  search: [],
  selectedFilter: "",
  setData: () => {},
  setSearch: () => {},
  setSelectedFilter: () => {},
  fetchData: () => {},
  fetchSearchData: () => {}, // New function to fetch search results
  fetchMovieById: () => {},
  logout: () => {},
});

export const DataProvider = ({ children }) => {
  const [selectedFilter, setSelectedFilter] = useState("");
  const [data, setData] = useState([]);
  const [search, setSearch] = useState([]);
  const [lastSelectedFilter, setLastSelectedFilter] = useState("");
  const [selectedMovie, setSelectedMovie] = useState(null);
  const [similarMovies, setsimilarMovies] = useState(null);

  const fetchData = async (value) => {
    if (value === lastSelectedFilter) return;

    let apiUrl = "";

    switch (value) {
      case "top-rated":
        apiUrl = `${Api}/api/movies/top-rated`;
        break;
      case "top-comment":
        apiUrl = `${Api}/api/movies/most-commented`;
        break;
      case "most-awarded":
        apiUrl = `${Api}/api/movies/most-awarded`;
        break;
      case "trending":
        apiUrl = `${Api}/api/movies/trending`;
        break;
      default:
        return;
    }

    try {
      const response = await axios.get(apiUrl);
      setData(response.data);
      setLastSelectedFilter(value);
      setSearch([]); // Clear search results when filter is used
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  // const fetchSearchData = async (query) => {
  //   try {
  //     const response = await axios.get(`${Api}/api/movies/search?q=${query}`);
  //     setSearch(response.data);
  //     setData([]); // Clear filter data when search is used
  //   } catch (error) {
  //     console.error("Error fetching search data:", error);
  //   }
  // };
  const fetchSearchData = async (query) => {
    if (!query) return;

    const apiUrl = `${Api}/api/movies/search?q=${encodeURIComponent(query)}`;

    try {
      const response = await axios.get(apiUrl);
      setSearch(response.data); // Update search results state
      setData([]); // Clear filtered data to show only search results
    } catch (error) {
      console.error("Error fetching search results:", error);
    }
  };
  const fetchMovieById = async (id) => {
    try {
      const movieResponse = await axios.get(`${Api}/api/movies/Search/${id}`);
      setSelectedMovie(movieResponse.data);

      const similarMoviesResponse = await axios.get(`${Api}/api/movies/movies/${id}`);
      setsimilarMovies(similarMoviesResponse.data);
    } catch (error) {
      console.error("Error fetching movie by ID:", error);
    }
  };

  return (
    <DataContext.Provider
      value={{
        data,
        search,
        selectedFilter,
        setSelectedFilter,
        setData,
        setSearch,
        fetchData,
        fetchSearchData, // Provide the new function
        fetchMovieById,
        selectedMovie,
        similarMovies,
        setsimilarMovies,
      }}
    >
      {children}
    </DataContext.Provider>
  );
};

export const useDataContext = () => useContext(DataContext);
