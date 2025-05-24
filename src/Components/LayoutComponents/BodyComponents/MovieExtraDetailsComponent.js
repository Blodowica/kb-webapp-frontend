import React from 'react';
import { Card, Col, Container } from 'react-bootstrap';
import { CircularProgressbar } from 'react-circular-progressbar';

function MovieExtraDetailsComponent({movie}) {

if(!movie){
    movie = null;
}

    return ( 

        <Container className="d-flex justify-content-center my-4">
                <Card
                  style={{ width: "100%", maxWidth: "800px" }}
                  className="p-4 text-start"
                >
                  <div className="d-flex flex-column gap-3">
                    <div>
                      <strong>Status: </strong>{" "}
                      {movie?.status?.trim() || "Unknown"}
                    </div>

                    <div>
                      <strong>Production Companies: </strong>
                      {movie?.production_companies?.length
                        ? movie.production_companies
                            .map((company) => company.name)
                            .join(", ")
                        : "Unknown"}
                    </div>

                    <div className="d-flex align-items-center gap-3">
                      <Col lg={6} className="d-flex align-items-center gap-2">
                        <strong>Movie Score: </strong>
                        <div style={{ width: "50px", height: "50px" }}>
                          <CircularProgressbar
                            value={Number(
                              ((movie?.vote_average || 0) * 10).toFixed(2)
                            )}
                            text={`${((movie?.vote_average || 0) * 10).toFixed(0)}%`}
                            styles={{
                              path: {
                                stroke:
                                  (movie?.vote_average || 0) * 10 >= 55
                                    ? "green"
                                    : (movie?.vote_average || 0) * 10 >= 35
                                      ? "orange"
                                      : "red",
                              },
                              trail: { stroke: "#eee" },
                              text: { fill: "#333", fontSize: "20px" },
                            }}
                          />
                        </div>
                      </Col>
                      <Col lg={6}>
                        <strong>Revenue: </strong>
                        {movie?.revenue
                          ? `$${new Intl.NumberFormat("en-US").format(movie.revenue)}`
                          : "Unknown"}
                      </Col>
                    </div>

                    <div>
                      <strong>Original Language: </strong>{" "}
                      {movie?.original_language?.toUpperCase() || "Unknown"}
                    </div>

                    <div>
                      <strong>Genres: </strong>
                      {movie?.genres?.length
                        ? movie.genres.map((genre) => genre.name).join(", ")
                        : "Unknown"}
                    </div>

                    <div>
                      <strong>Origin Country: </strong>
                      {movie?.origin_country?.length
                        ? movie.origin_country.join(", ")
                        : "Unknown"}
                    </div>

                    <div>
                      <strong>Languages Spoken: </strong>
                      {movie?.spoken_languages?.length
                        ? movie.spoken_languages
                            .map((lang) => lang.english_name)
                            .join(", ")
                        : "Unknown"}
                    </div>

                    {movie?.belongs_to_collection?.name && (
                      <div>
                        <strong>Collection: </strong>
                        <div className="mt-1">
                          {movie.belongs_to_collection.name}
                        </div>
                        {movie.belongs_to_collection.poster_path && (
                          <img
                            src={movie.belongs_to_collection.poster_path}
                            alt={movie.belongs_to_collection.name}
                            className="mt-2"
                            style={{
                              width: "100px",
                              borderRadius: "8px",
                              boxShadow: "0 2px 6px rgba(0,0,0,0.2)",
                            }}
                          />
                        )}
                      </div>
                    )}

                    {movie?.keywords?.keywords?.length > 0 && (
                      <div>
                        <strong>Keywords: </strong>
                        <div className="d-flex flex-wrap gap-2 mt-2">
                          {movie.keywords.keywords.map((keyword, index) => (
                            <Card
                              key={index}
                              style={{
                                backgroundColor: "orange",
                                color: "white",
                                padding: "4px 12px",
                                fontSize: "0.875rem",
                                borderRadius: "1rem",
                                border: "none",
                                flexShrink: 0,
                              }}
                            >
                              {keyword.name}
                            </Card>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                </Card>
              </Container>
     );
}

export default MovieExtraDetailsComponent;