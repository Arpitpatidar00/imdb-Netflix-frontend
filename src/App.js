import './App.css';
import { BrowserRouter as Router, Route, Routes, useLocation } from 'react-router-dom';
import PrivateRoute from "./components/Auth/PrivateRoute.js"; // Adjust the import path as needed

import About from './components/About';
import Home from './components/Home';
import Navbar from './components/Navbar';
import Signup from './components/Auth/Signup';
import VerifyAccount from './components/Auth/Otp';
import Login from './components/Auth/Login';
// import {BlogCard}  from './components/MoviesFilter.js';

function App() {
  const location = useLocation();
  
  return (
    <div>
      {location.pathname !== '/' && location.pathname !== '/login' && location.pathname !== '/VerifyAccount' && <Navbar />}
      <Routes>
        <Route path="/" element={<Signup />} />
        <Route path="/VerifyAccount" element={<VerifyAccount />} />
        <Route path="/login" element={<Login />} />
        <Route
          path="/home"
          element={<PrivateRoute element={<Home />} />}
        />
         {/* <Route
          path="/BlogCard"
          element={<PrivateRoute element={<BlogCard />} />}
        /> */}
        <Route
          path="/about"
          element={<PrivateRoute element={<About />} />}
        />
      </Routes>
    </div>
  );
}

export default function AppWrapper() {
  return (
    <Router>
      <App />
    </Router>
  );
}
