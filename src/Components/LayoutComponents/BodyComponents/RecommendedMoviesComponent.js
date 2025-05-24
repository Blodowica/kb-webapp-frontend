import React from "react";
import { Col, Row } from "react-bootstrap";
import { useNavigate } from "react-router-dom";

function RecommendedMoviesComponent({ recommendedMovies }) {
  const navigate = useNavigate();
  async function handleShowMovieDetails(selectedMovieId) {
    if (!selectedMovieId) {
      return;
     }
    navigate(`/search/movie-details?movieId=${selectedMovieId}`);
    }

  return (
    <Row className="mt-4 pt-4 mb-4 text-start justify-content-center">
      {!recommendedMovies || recommendedMovies.length === 0 ? (
        <div className="d-flex justify-content-center align-items-center w-100">
          <div className="spinner-border text-primary" role="status">
            <span className="visually-hidden">Loading...</span>
          </div>
        </div>
      ) : (
        recommendedMovies.slice(0, 6).map((movie, index) => (
          <Col
            key={index}
            lg={1}
            className={`mb-4 text-center`}
            onClick={() => handleShowMovieDetails(movie.id)}
          >
            <img
              src={movie.poster_path}
              alt={movie.title}
              style={{
                width: "100%",
                maxWidth: "275px",
                height: "auto",
                borderRadius: "8px",
              }}
            />
            <p className="mt-2 mb-0 fw-bold">{movie.title}</p>
            <p className="p-0 mt-0 font-italic">{movie.release_date}</p>
          </Col>
        ))
      )}
    </Row>
  );
}

export default RecommendedMoviesComponent;
