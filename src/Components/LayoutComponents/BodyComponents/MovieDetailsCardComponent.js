import React from "react";
import { Col, Row } from "react-bootstrap";

function MovieDetailsCardComponent({ movie }) {
  if (!movie) {
    movie = null;
  }

  return (
    <Row className="mt-1 p-4 position-relative" style={{ minHeight: "550px" }}>
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
        <strong>Overview:</strong>
        <br />
        <strong style={{ fontWeight: "600", fontSize: "1.333rem" }}>
          {movie?.overview ? movie?.overview : "-"}
        </strong>
        <Col className="mt-4 pt-3">
          <Col className="mb-1">
            <strong> Release date: </strong>{" "}
            {movie?.release_date ? movie?.release_date : "Uknown"}
          </Col>

          <Col className="mb-1">
            <strong> Runtime: </strong>{" "}
            {movie?.runtime ? movie?.runtime + " minutes" : "Unknown"}
          </Col>
          <Col className="mb-1">
            <strong> Genres: </strong>
            {movie?.genres?.length
              ? movie.genres.map((genre) => genre.name).join(", ")
              : "Unknown"}
          </Col>
        </Col>
      </Col>
    </Row>
  );
}

export default MovieDetailsCardComponent;
