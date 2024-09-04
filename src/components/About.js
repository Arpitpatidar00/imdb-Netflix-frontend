// // import React from "react";
// // import "./About.css";
// // import { useSelector } from "react-redux";
// // import Seggessions from "./Seggessions.js";
// // import CloseButton from 'react-bootstrap/CloseButton';

// // const wordLimit = 200;

// // export default function MovieDetails({ onClose }) {
// //   const { selectedMovie } = useSelector((state) => state.movies);

// //   // Safeguard for undefined selectedMovie and similarMovies
// //   if (!selectedMovie) return null;

// //   function truncateText(text = "", wordLimit) {
// //     const words = text.split(" ");
// //     if (words.length > wordLimit) {
// //       return words.slice(0, wordLimit).join(" ") + "...";
// //     }
// //     return text;
// //   }

// //   return (
// //     <div className="movie-details">
// //       {/* Header section */}
// //       <div className="header">
// //         <div className="image-placeholder">
// //           <img
// //             src={selectedMovie.poster || "/maxresdefault.jpg"}
// //             alt={selectedMovie.title}
// //             onError={(e) => {
// //               e.target.onerror = null; // Prevents an infinite loop if fallback image fails
// //               e.target.src = "/maxresdefault.jpg"; // Path to your fallback image
// //             }}
// //           />
// //           <div className="close-btn" onClick={onClose}>
// //           <CloseButton />
// //           </div>
// //         </div>
// //       </div>

// //       {/* Movie Information section */}
// //       <div className="info-section">
// //         <div className="info-section-first">
// //           <div className="info-year">
// //             {selectedMovie.year} • {selectedMovie.runtime} mins, Rated:{" "}
// //             {selectedMovie.rated}
// //           </div>
// //           <div className="info-year">
// //             {(selectedMovie.countries || []).join(", ")}
// //           </div>
// //           <div className="info-cast">
// //             Cast: {(selectedMovie.cast || []).join(", ")}
// //           </div>
// //         </div>

// //         <div className="info-section-second">
// //           <div className="info-top">Top 10 movie of Today</div>
// //           <div className="info-genres">
// //             Genres: {(selectedMovie.genres || []).join(", ")}
// //           </div>
// //         </div>

// //         <div className="info-section-third">
// //           <div className="info-plot">
// //             {truncateText(selectedMovie.fullplot || "", wordLimit)}
// //           </div>
// //           <div className="info-box">This movie is: {selectedMovie.type}</div>
// //         </div>
// //       </div>

// //       {/* Similar Movies section */}
// //       <div className="more-like">
// //         <div className="more-like-this">More Like This</div>
// //       </div>

// //       <Seggessions />
// //     </div>
// //   );
// // }
// import React from "react";
// import { useSelector } from "react-redux";
// import Seggessions from "./Seggessions";
// import CloseButton from 'react-bootstrap/CloseButton';
// import Loader from '././Loder.js'; // Import the Loader component
// import "./About.css";

// const wordLimit = 200;

// export default function MovieDetails({ onClose }) {
//   const { selectedMovie, loading } = useSelector((state) => state.movies);

//   // Safeguard for undefined selectedMovie
//   if (loading) {
//     return <Loader />; // Use the Loader component
//   }

//   if (!selectedMovie) return null;

//   function truncateText(text = "", wordLimit) {
//     const words = text.split(" ");
//     if (words.length > wordLimit) {
//       return words.slice(0, wordLimit).join(" ") + "...";
//     }
//     return text;
//   }

//   return (
//     <div className="movie-details">
//       {/* Header section */}
//       <div className="header">
//         <div className="image-placeholder">
//           <img
//             src={selectedMovie.poster || "/maxresdefault.jpg"}
//             alt={selectedMovie.title}
//             onError={(e) => {
//               e.target.onerror = null;
//               e.target.src = "/maxresdefault.jpg";
//             }}
//           />
//           <div className="close-btn" onClick={onClose}>
//             <CloseButton />
//           </div>
//         </div>
//       </div>

//       {/* Movie Information section */}
//       <div className="info-section">
//         <div className="info-section-first">
//           <div className="info-year">
//             {selectedMovie.year} • {selectedMovie.runtime} mins, Rated:{" "}
//             {selectedMovie.rated}
//           </div>
//           <div className="info-year">
//             {(selectedMovie.countries || []).join(", ")}
//           </div>
//           <div className="info-cast">
//             Cast: {(selectedMovie.cast || []).join(", ")}
//           </div>
//         </div>

//         <div className="info-section-second">
//           <div className="info-top">Top 10 movie of Today</div>
//           <div className="info-genres">
//             Genres: {(selectedMovie.genres || []).join(", ")}
//           </div>
//         </div>

//         <div className="info-section-third">
//           <div className="info-plot">
//             {truncateText(selectedMovie.fullplot || "", wordLimit)}
//           </div>
//           <div className="info-box">This movie is: {selectedMovie.type}</div>
//         </div>
//       </div>

//       {/* Similar Movies section */}
//       <div className="more-like">
//         <div className="more-like-this">More Like This</div>
//       </div>

//       <Seggessions />
//     </div>
//   );
// }
import React from "react";
import { useSelector } from "react-redux";
import Seggessions from "./Seggessions";
import CloseButton from 'react-bootstrap/CloseButton';
import Loader from '././Loder.js'; // Import the Loader component
import "./About.css";

const wordLimit = 200;

export default function MovieDetails({ onClose }) {
  const { selectedMovie, loading } = useSelector((state) => state.movies);

  if (loading) {
    return <Loader />; // Display the loader while data is being fetched
  }

  if (!selectedMovie) return null;

  function truncateText(text = "", wordLimit) {
    const words = text.split(" ");
    if (words.length > wordLimit) {
      return words.slice(0, wordLimit).join(" ") + "...";
    }
    return text;
  }

  return (
    <div className="movie-details">
      {/* Header section */}
      <div className="header">
        <div className="image-placeholder">
          <img
            src={selectedMovie.poster || "/maxresdefault.jpg"}
            alt={selectedMovie.title}
            onError={(e) => {
              e.target.onerror = null;
              e.target.src = "/maxresdefault.jpg";
            }}
          />
          <div className="close-btn" onClick={onClose}>
            <CloseButton />
          </div>
        </div>
      </div>

      {/* Movie Information section */}
      <div className="info-section">
        <div className="info-section-first">
          <div className="info-year">
            {selectedMovie.year} • {selectedMovie.runtime} mins, Rated:{" "}
            {selectedMovie.rated}
          </div>
          <div className="info-year">
            {(selectedMovie.countries || []).join(", ")}
          </div>
          <div className="info-cast">
            Cast: {(selectedMovie.cast || []).join(", ")}
          </div>
        </div>

        <div className="info-section-second">
          <div className="info-top">Top 10 movie of Today</div>
          <div className="info-genres">
            Genres: {(selectedMovie.genres || []).join(", ")}
          </div>
        </div>

        <div className="info-section-third">
          <div className="info-plot">
            {truncateText(selectedMovie.fullplot || "", wordLimit)}
          </div>
          <div className="info-box">This movie is: {selectedMovie.type}</div>
        </div>
      </div>

      {/* Similar Movies section */}
      <div className="more-like">
        <div className="more-like-this">More Like This</div>
      </div>

      <Seggessions />
    </div>
  );
}
