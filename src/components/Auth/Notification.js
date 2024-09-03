import React from 'react';
import '../Modal.css'; // Import the CSS file for styling

const Notification = ({ message, type, onClose }) => {
  return (
    <div className={`notification ${type}`}>
      <p>{message}</p>
      <button className="close-btn" onClick={onClose}>×</button>
    </div>
  );
};

export default Notification;