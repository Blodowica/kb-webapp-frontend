import React, { useEffect, useState } from "react";
import MovieServiceAPI from "../API/MovieServiceAPI/MovieServiceAPI";
import { useLocation, useNavigate } from "react-router-dom";
import HeaderComponent from "../Components/LayoutComponents/HeaderComponents/HeaderComponent";
import client from "../SanitySetup/sanityClient";
import {
  Card,
  Col,
  Container,
  Pagination,
  Row,
} from "react-bootstrap";
import { GetAllPageComponents } from "../SanitySetup/sanityQueries";
import FilterMenuComponent from "../Components/LayoutComponents/BodyComponents/FilterMenuComponent";

function SearchCollectionComponent() {
  const [sections, setSections] = useState([]);
  const [movies, setMovies] = useState([]);
  const [hideEditButton, setHideEditButton] = useState(false);
  const [activePage, setActivePage] = useState(1);
  const [maxPagination, setMaxPagination] = useState(1);
  const [searchQuery, setSearchQuery] = useState();
  const [activeTab, setActiveTab] = useState("movie-details");

  const sanityQuery = GetAllPageComponents();
  const location = useLocation();
  const navigate = useNavigate();
  let paginationItems = [];
  // Get the 'query' parameter from the URL
  const getQueryParam = () => {
    const params = new URLSearchParams(location.search);
    return params.get("query");
  };

  function handleShowMovieDetails(selectedMovieId) {
    navigate(`/search/movie-details?movieId=${selectedMovieId}`);
  }

  //format date to e.g. 3 july 2026
  const formatReadableDate = (dateStr) => {
    if (!dateStr) {
      const date = new Date(dateStr);
      return new Intl.DateTimeFormat("en-GB", {
        day: "numeric",
        month: "long",
        year: "numeric",
      }).format(date);
    }
    return;
  };

  const scrollToTop = () => {
  window.scrollTo({ top: 0, left: 0, behavior: 'smooth' });
};

  //loop over the pages for the pagination
  for (let number = 1; number <= maxPagination; number++) {
    paginationItems.push(
      <Pagination.Item
        key={number}
        active={number === activePage}
        onClick={() => handlePagination(number)}
      >
        {number}
      </Pagination.Item>
    );
  }
  const paginationBasic = <Pagination>{paginationItems}</Pagination>;

  const handlePagination = async (number) => {
    if (!number || number === activePage) {
      return;
    }
    setActivePage(number);
    const response = await MovieServiceAPI(searchQuery, number);
    if (response && response.results) {
      //fetch the movie again
      setMovies(response?.results);
      scrollToTop();
    }
    return;
  };

  useEffect(() => {
    setHideEditButton(true);
    async function fetchSection() {
      const data = await client.fetch(sanityQuery);
      setSections(data);
    }
    fetchSection();
    const searchQuery = getQueryParam(); // Get the query from URL
    setSearchQuery(searchQuery);
    async function fetchMovies() {
      if (searchQuery) {
        let response = await MovieServiceAPI(searchQuery);
        setMovies(response?.results);
        setMaxPagination(response?.total_pages);
      }
    }
    fetchMovies();
  }, [location.search]);

  return (
    <Container>
      <div>
        <HeaderComponent sections={sections} hideEditButton={hideEditButton} />
      </div>

      {/* <<<<<<<<<<<<<<<<<<<<<<<<<<<<< FILTER MENU START >>>>>>>>>>>>>>>>>>>>>>>>>>> */}
      <Row>
        <Col className="mt-4 flex-column" lg={4}>
          <FilterMenuComponent
            activeTab={activeTab}
            setActiveTab={setActiveTab}
            page={activePage}
            setMovies={setMovies}
          />
        </Col>
        <Col lg={8} className="mt-3">
          {movies &&
            movies.map((movie, index) => {
              const formatedDate = formatReadableDate(
                movie?.release_date ? movie?.release_date : null
              );
              return (
                <Container className="mt-3" key={index}>
                  <Card onClick={() => handleShowMovieDetails(movie?.id)}>
                    <Row>
                      <Col
                        lg={2}
                        md={4}
                        sm={4}
                        xs={3}
                        className="justify-content-start d-flex "
                      >
                        <img
                          style={{
                            height: "155px",
                            width: "auto",
                            borderTopLeftRadius: "5%",
                            borderBottomLeftRadius: "5%",
                          }}
                          src={movie.poster_path}
                          alt={`Movie Poster: ${movie.title}`}
                        />
                      </Col>
                      <Col
                        lg={10}
                        md={7}
                        sm={4}
                        xs={6}
                        className="justify-content-start text-start d-flex flex-column mt-2"
                      >
                        <Row>
                          <strong>{movie?.title}</strong>
                          <p className="mb-0">{formatedDate}</p>
                        </Row>
                        <Row className="p-3">
                          <p>
                            {movie?.overview.length > 150 ? (
                              <>
                                {movie.overview.substring(0, 175)}...{" "}
                                <span
                                  style={{ color: "blue", cursor: "pointer" }}
                                >
                                  See more
                                </span>
                              </>
                            ) : (
                              movie?.overview
                            )}
                          </p>
                        </Row>
                      </Col>
                    </Row>
                  </Card>
                </Container>
              );
            })}
          <Row className="mt-4">
            <Col lg={12} className="d-flex justify-content-center">
              {paginationBasic}
            </Col>
          </Row>
        </Col>
      </Row>
    </Container>
  );
}

export default SearchCollectionComponent;
