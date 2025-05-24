import React, { useEffect, useState } from "react";
import MovieServiceAPI from "../API/MovieServiceAPI/MovieServiceAPI";
import { useLocation, useNavigate } from "react-router-dom";
import HeaderComponent from "../Components/LayoutComponents/HeaderComponents/HeaderComponent";
import client from "../SanitySetup/sanityClient";
import { Col, Container, Row, Table } from "react-bootstrap";
import { GetAllPageComponents } from "../SanitySetup/sanityQueries";

function SearchCollectionComponent() {
  const [sections, setSections] = useState([]);
  const [movies, setMovies] = useState([]);
  const [hideEditButton, setHideEditButton] = useState(false);

  const sanityQuery = GetAllPageComponents();
  const location = useLocation();
  const navigate = useNavigate();

  // Get the 'query' parameter from the URL
  const getQueryParam = () => {
    const params = new URLSearchParams(location.search);
    return params.get("query");
  };
  function handleShowMovieDetails(selectedMovieId) {
    navigate(`/search/movie-details?movieId=${selectedMovieId}`);
  }

  useEffect(() => {
    setHideEditButton(true);
    async function fetchSection() {
      const data = await client.fetch(sanityQuery);
      setSections(data);
    }
    fetchSection();
    const searchQuery = getQueryParam(); // Get the query from URL
    async function fetchMovies() {
      if (searchQuery) {
        let response = await MovieServiceAPI(searchQuery);
        setMovies(response);
      }
    }
    fetchMovies();
  }, [location.search]);

  return (
    <Container>
      <div>
        <HeaderComponent sections={sections} hideEditButton={hideEditButton} />
      </div>
      <Row>
        <Col lg={4}>
        filter menu
        </Col>
        <Col lg={8}>
          <div id="MovieSearchTableContainer">
            {movies &&
              movies.map((movie, index) => {
                return (
                  <div
                    key={index}
                    style={{  display: "flex" }}
                  >
                    <Table
                      striped
                      style={{ width: "100%", cursor: "pointer" }}
                      onClick={() => handleShowMovieDetails(movie?.id)}
                    >
                      <thead>
                        <tr>
                          <th>Title</th>
                          <th>Overview</th>
                          <th>release date</th>
                          <th>Poster</th>
                        </tr>
                      </thead>
                      <tbody>
                        <tr>
                          <td>{movie.title}</td>
                          <td>{movie.overview}</td>
                          <td>{movie.release_date}</td>
                          <td>
                            <img
                              style={{ height: "150px" }}
                              src={movie.poster_path}
                              alt={`Movie Poster: ${movie.title}`}
                            />
                          </td>
                        </tr>
                      </tbody>
                    </Table>
                  </div>
                );
              })}
          </div>
        </Col>
      </Row>
    </Container>
  );
}

export default SearchCollectionComponent;
