import React, { useEffect, useState } from "react";
import { Col, Row } from "react-bootstrap";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";
import LayoutControlButtonsComponent from "../../CommonComponents/LayoutControlButtonsComponent";
import { GetTrendingMovies } from "../../../API/MovieServiceAPI/MovieServiceAPI";
import { useNavigate } from "react-router-dom";

function BookPreviewListComponent({ component, layoutprops, showEditView }) {
  const { styling } = component;
  const { section, fetchSection } = layoutprops;
  const parsedStyle = JSON.parse(styling);
  const navigate = useNavigate();

  const [currentPage, setCurrentPage] = useState(0);
  const moviesPerPage = 5;
  const [movies, setMovies] = useState([]);

  useEffect(() => {
    async function fetchData() {
      const result = await GetTrendingMovies();

      // Safely fallback if API returned empty
      if (result && Array.isArray(result) && result.length > 0) {
        setMovies(result);
      } else if (component.books && component.books.length > 0) {
        setMovies(component.books);
      }
    }

    fetchData();
  }, [component.books]);

  const paginatedMovies = movies.slice(
    currentPage * moviesPerPage,
    (currentPage + 1) * moviesPerPage
  );

  const handleNext = () => {
    if ((currentPage + 1) * moviesPerPage < movies.length) {
      setCurrentPage((prev) => prev + 1);
    }
  };

  const handlePrev = () => {
    if (currentPage > 0) {
      setCurrentPage((prev) => prev - 1);
    }
  };

  const handleGetMovieDetails = (selectedMovieId) => {
    navigate(`/search/movie-details?movieId=${selectedMovieId}`);
  };

  return (
    <Row>
      <h2>Popular Movies this week</h2>
      <Col style={{ paddingBottom: "10px" }}>
        <div style={{ textAlign: "center", marginTop: "2rem" }}>
          <div style={parsedStyle.container}>
            {paginatedMovies.map((movie, idx) => (
              <div
                key={idx}
                style={parsedStyle.bookCard}
                onClick={() => handleGetMovieDetails(movie.id)}
              >
                <img
                  src={movie.poster_path || movie.imageUrl}
                  alt={movie.title}
                  style={parsedStyle.image}
                />
                <div style={parsedStyle.title}>{movie.title}</div>
                <div style={parsedStyle.author}>
                  {movie.release_date || movie?.author}
                </div>
              </div>
            ))}
          </div>

          <div
            style={{
              marginTop: "1.5rem",
              display: "flex",
              justifyContent: "center",
              gap: "1rem",
            }}
          >
            <button
              onClick={handlePrev}
              disabled={currentPage === 0}
              style={{
                fontSize: "1.5rem",
                border: "none",
                background: "none",
                cursor: "pointer",
              }}
            >
              <FaChevronLeft />
            </button>
            <button
              onClick={handleNext}
              disabled={(currentPage + 1) * moviesPerPage >= movies.length}
              style={{
                fontSize: "1.5rem",
                border: "none",
                background: "none",
                cursor: "pointer",
              }}
            >
              <FaChevronRight />
            </button>
          </div>
        </div>
      </Col>

      {showEditView && (
        <LayoutControlButtonsComponent
          section={section}
          component={component}
          fetchSection={fetchSection}
          hideEdit={true}
          componentType={"body"}
        />
      )}
    </Row>
  );
}

export default BookPreviewListComponent;
