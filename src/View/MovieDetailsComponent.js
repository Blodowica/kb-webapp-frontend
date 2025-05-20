import React, { useEffect, useState } from "react";
import { GetMovieDetailsById } from "../API/MovieServiceAPI/MovieServiceAPI";
import HeaderComponent from "../Components/LayoutComponents/HeaderComponents/HeaderComponent";
import { GetAllPageComponents } from "../SanitySetup/sanityQueries";
import client from "../SanitySetup/sanityClient";
import { Col, Container, Row } from "react-bootstrap";
import FooterComponent from "../Components/LayoutComponents/FooterComponents/FooterComponent";
import { useLocation, useParams } from "react-router-dom";

function MovieDetailsComponent() {
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const movieId = queryParams.get("movieId");

  const [movie, setMovie] = useState(null);
  const [hideEditButton, setHideEditButton] = useState(false);
  const [sections, setSections] = useState([]);

  const query = GetAllPageComponents();

  async function fetchSection() {
    const data = await client.fetch(query);
    setSections(data);
  }

  useEffect(() => {
    fetchSection();
    async function GetMovieDetails() {
      const movie = await GetMovieDetailsById(movieId);
      setMovie(movie);
      setHideEditButton(true);
    }

    GetMovieDetails();
  }, []);

  console.log(movie);

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
    return <p>Loading movie details...</p>;
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

        <Row
          className="mt-2 p-4 position-relative"
          style={{ minHeight: "400px" }}
        >
          {/* Background image layer */}
          <div
            className="position-absolute w-100 h-100"
            style={{
              top: 0,
              left: 0,
              backgroundImage: `url(${movie?.backdrop_path})`,
              backgroundSize: "cover",
              backgroundRepeat: "no-repeat",
              backgroundPosition: "center",
              opacity: 0.3, // control the dimming effect
              zIndex: 0,
            }}
          />

          {/* Foreground content */}
          <Col
            lg={3}
            md={5}
            sm={6}
            xs={12}
            className="position-relative"
            style={{ zIndex: 1 }}
          >
            <img
              style={{ height: "500px", borderRadius: "5%" }}
              src={movie?.poster_path}
              alt="Movie poster"
              
            />
          </Col>
          <Col
            lg={9}
            md={7}
            xs={12}
            className="position-relative"
            style={{ zIndex: 1, textAlign: "start" }}
          >
            <h2 style={{ fontSize: "3rem", color: "black" }}>{movie?.title}</h2>
            <h4>{movie?.tagline}</h4>
            <br />
            <strong >Overview:</strong>
            <br />
            <strong style={{fontWeight: '600',  fontSize: "1.333rem"}}>{movie?.overview}</strong>
            <Col className="mt-4 pt-3">
              <Col className="mb-1">
                <strong> Release date: </strong> {movie?.release_date}
              </Col>
              <Col className="mb-1">
                <strong> Status: </strong> {movie?.status}
              </Col>
              <Col className="mb-1">
                <strong> Runtime: </strong> {movie?.runtime} minutes
              </Col>
              <Col className="mb-1">
                <strong> Genres: </strong>{" "}
                {movie.genres?.map((genre) => genre.name).join(", ")}
              </Col>

              <Col className="mb-1">
                <strong> Production Companies: </strong>{" "}
                {movie.production_companies
                  ?.map((company) => company.name)
                  .join(", ")}
              </Col>
            </Col>
          </Col>
        </Row>
        <Row className="mt-4 pt-4 mb-4" style={{ textAlign: "start" }}>
          <h4>Recommendations</h4>
          Insert the fucntioanlity to show the recommended movies here
        </Row>
      </Container>
      <FooterComponent sections={sections} />
    </>
  );
}

export default MovieDetailsComponent;
