import React, { useEffect, useState } from "react";
import {
  GetMovieCreditsById,
  GetMovieDetailsById,
  GetRecommendedMoviesById,
} from "../API/MovieServiceAPI/MovieServiceAPI";
import HeaderComponent from "../Components/LayoutComponents/HeaderComponents/HeaderComponent";
import { GetAllPageComponents } from "../SanitySetup/sanityQueries";
import client from "../SanitySetup/sanityClient";
import {Container, Nav, Row } from "react-bootstrap";
import FooterComponent from "../Components/LayoutComponents/FooterComponents/FooterComponent";
import { useLocation } from "react-router-dom";
import RecommendedMoviesComponent from "../Components/LayoutComponents/BodyComponents/RecommendedMoviesComponent";
import LoadingSpinnerComponent from "../Components/CommonComponents/LoadingSpinnerComponent";
import MovieExtraDetailsComponent from "../Components/LayoutComponents/BodyComponents/MovieExtraDetailsComponent";
import MovieDetailsCardComponent from "../Components/LayoutComponents/BodyComponents/MovieDetailsCardComponent";
import MovieCreditComponent from "../Components/LayoutComponents/BodyComponents/MovieCreditComponent";

function MovieDetailsComponent() {
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const movieId = queryParams.get("movieId");
  const [movie, setMovie] = useState(null);
  const [hideEditButton, setHideEditButton] = useState(false);
  const [sections, setSections] = useState([]);
  const [loading, setLoading] = useState(true);
  const [recommendedMovies, setRecommendedMovies] = useState(null);
  const [movieCredits, setMovieCredits] = useState(null);
  const query = GetAllPageComponents();
  const [activeTab, setActiveTab] = useState("movie-details");

  async function fetchSection() {
    const data = await client.fetch(query);
    setSections(data);
  }
  async function GetMovieDetails() {
    const movie = await GetMovieDetailsById(movieId);
    setMovie(movie);
    setHideEditButton(true);
  }

  useEffect(() => {
    fetchSection();

    GetMovieDetails();
    GetReccomendMovies();
    GetMovieCredits();
    setLoading(false);
  }, [movieId]);

  const GetReccomendMovies = async () => {
    const recommendedMovies = await GetRecommendedMoviesById(movieId);
    setRecommendedMovies(recommendedMovies);
  };

  const GetMovieCredits = async () => {
    const movieCredits = await GetMovieCreditsById(movieId);
    setMovieCredits(movieCredits);
  };

  if (!movieId) {
    return (
      <p
        style={{
          justifyContent: "center",
          display: "flex",
          alignItems: "center",
        }}
      >
        Error: Something went wrong getting the movie details, The movie ID is
        null or undefined
      </p>
    );
  }
  if (!movie) {
    return (
      <Container fluid>
        <Row className="justify-content-center  align-items-center vh-100">
          <LoadingSpinnerComponent />
        </Row>
      </Container>
    );
  }
  return (
    <>
      <Container fluid>
        <div>
          <HeaderComponent
            sections={sections}
            hideEditButton={hideEditButton}
          />
        </div>

        <MovieDetailsCardComponent movie={movie} />

        <Row>
          <Row>
            <Nav
              className="justify-content-center d-flex mt-3 gap-2 mx-auto"
              variant="tabs"
              activeKey={activeTab}
              onSelect={(selectedKey) => setActiveTab(selectedKey)}
            >
              <Nav.Item>
                <Nav.Link eventKey="movie-details">Movie Information </Nav.Link>
              </Nav.Item>
              <Nav.Item>
                <Nav.Link eventKey="credit">Movie Credit</Nav.Link>
              </Nav.Item>
              <Nav.Item>
                <Nav.Link eventKey="recommend">Reccomended Movies</Nav.Link>
              </Nav.Item>
            </Nav>
          </Row>
          <Row className="mt-4">
            {activeTab === "credit" && (
              <MovieCreditComponent movieCredits={movieCredits} />
            )}
            {activeTab === "recommend" && (
              <div className="justify-content-center d-flex">
                <RecommendedMoviesComponent
                  recommendedMovies={recommendedMovies}
                  fetchSection={fetchSection}
                  GetMovieDetails={GetMovieDetails}
                />
              </div>
            )}
            {activeTab === "movie-details" && (
              <MovieExtraDetailsComponent movie={movie} />
            )}
          </Row>
        </Row>
      </Container>
      <FooterComponent sections={sections} />
    </>
  );
}

export default MovieDetailsComponent;
