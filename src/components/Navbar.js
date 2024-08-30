import React, { useState } from "react";
import axios from "axios";
import { useSelector } from "react-redux";
import Cookies from 'js-cookie';
import { useDataContext } from "../components/contex/DataContext.js";
import LogoutIcon from "@mui/icons-material/Logout";
import "./Navbar.css";
import Api from "../Api.js"

export default function Navbar() {
  const { selectedFilter, setSelectedFilter, fetchData } = useDataContext();

  const userData = useSelector((state) => state.auth.userData);

  const [searchTerm, setSearchTerm] = useState("");
  const [suggestions, setSuggestions] = useState([]);
  const [isProfileMenuOpen, setIsProfileMenuOpen] = useState(false);

  const handleFilterChange = (event) => {
    const value = event.target.value;
    setSelectedFilter(value);
    fetchData(value);
  };

  const handleSearchChange = (event) => {
    const value = event.target.value;
    setSearchTerm(value);

    if (value.length >= 3) {
      fetch(`${Api}/api/movies/Search?query=${value}`)
        .then((response) => response.json())
        .then((data) => {
          const sortedSuggestions = data.sort((a, b) => {
            if (a.toLowerCase() === value.toLowerCase()) return -1;
            if (b.toLowerCase() === value.toLowerCase()) return 1;
            return 0;
          });
          setSuggestions(sortedSuggestions);
        })
        .catch((error) => console.error("Error fetching suggestions:", error));
    } else {
      setSuggestions([]);
    }
  };
  const logout = async () => {
    try {
      // Get session ID from cookies
      const sessionId = Cookies.get('sessionId');
  
      if (!sessionId) {
        console.error('No session ID found in cookies');
        return;
      }
  
      // Call the logout API with session ID
      const response = await fetch(`${Api}/api/auth/logout`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ sessionId }), // Send session ID in request body
      });
  
      if (!response.ok) {
        throw new Error('Failed to log out');
      }
  
      // Clear cookies and local storage
      Cookies.remove('accessToken');
      Cookies.remove('sessionId');
      localStorage.removeItem('userData');
  
      // Optionally, redirect to login page or home page
      window.location.href = '/login';
    } catch (error) {
      console.error('Logout error:', error);
    }
  };
  const handleSuggestionClick = (suggestion) => {
    setSearchTerm(suggestion);
    setSuggestions([]);
  };

  
  const handleSearchClick = () => {
    if (searchTerm.trim() !== "") {
      axios
        .post(`${Api}/api/search/SearchByQyary?searchTerm=${searchTerm} `)
        .then((response) => {
          const data = response.data;
          console.log("Search results:", data);
          // Handle the search results here
        })
        .catch((error) => console.error("Error fetching search results:", error));
    }
  };
  const toggleProfileMenu = () => {
    setIsProfileMenuOpen((prev) => !prev);
  };

  return (
    <div>
      <nav className="navbar bg-body-tertiary">
        <div className="container-fluid">
        <a className="navbar-brand" href="/home">Movies</a>
        <label>
            Apply a filter:
            <select
              name="selectedFilter"
              value={selectedFilter}
              onChange={handleFilterChange}
            >
              <option value="">Select a filter</option>
              <option value="top-rated">Top Rated</option>
              <option value="top-comment">Top Comment</option>
              <option value="most-awarded">Most-Awarded</option>
            </select>
          </label>
          <form
            className="d-flex"
            role="search"
            onSubmit={(e) => e.preventDefault()}
          >
            <input
              className="form-control me-2"
              type="search"
              placeholder="Search"
              aria-label="Search"
              value={searchTerm}
              onChange={handleSearchChange}
            />
            <button
              className="btn btn-outline-success"
              type="button"
              onClick={handleSearchClick}
            >
              Search
            </button>
            {suggestions.length > 0 && (
              <ul className="suggestions-list">
                {suggestions.map((suggestion, index) => (
                  <li
                    key={suggestion.id || index}
                    onClick={() => handleSuggestionClick(suggestion)}
                  >
                    {suggestion}
                  </li>
                ))}
              </ul>
            )}
          </form>
          <div className="profile-menu" onClick={toggleProfileMenu}>
            <img
              src={userData?.image || "/default-profile.jpg"}
              alt="User Profile"
              className="user-image"
              onError={(e) => {
                e.target.onerror = null;
                e.target.src = "/maxresdefault.jpg";
              }}
            />
            {isProfileMenuOpen && (
              <ul className="profile-dropdown">
                <li>
                  <button id="profile" onClick={toggleProfileMenu}>
                    View Profile
                  </button>
                </li>
                <li>
                  <button id="logout-btn" onClick={logout}>
                    Logout <LogoutIcon className="h-1 w-1" />
                  </button>
                </li>
              </ul>
            )}
          </div>
        </div>
      </nav>
    </div>
  );
}
