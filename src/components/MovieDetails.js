import React from 'react';
import MovieDetails from './About.js'; // Ensure the path is correct
import './Modal.css';

export default function Modal({ show, movie, onClose }) {
  if (!show) return null; // Don't render the modal if `show` is false

  return (
    <div className='model'>
    <div className="modal-overlay">
      <div className="modal-content">
        <MovieDetails movie={movie} onClose={onClose} />
      </div>
    </div>
    </div>
  );
}
