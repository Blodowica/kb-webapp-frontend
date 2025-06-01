import React from 'react';
import { Card, Carousel, Col, Container, Row } from 'react-bootstrap';
import { FaArrowLeft, FaArrowRight } from 'react-icons/fa';


function MovieCreditComponent({movieCredits}) {


 //cast scroll
  const chunkCast = (arr, size) =>
    arr
      ? Array.from({ length: Math.ceil(arr.length / size) }, (_, i) =>
          arr.slice(i * size, i * size + size)
        )
      : [];

    return ( 

            <>
                <Container className="d-flex justify-content-center my-4">
                  <Card
                    style={{ width: "100%", maxWidth: "800px" }}
                    className="p-4 text-start"
                  >
                    <Row>
                      <h4 className="justify-content-center d-flex mb-4 pb-4">
                        Crew Members
                      </h4>
                      <Col lg={6}>
                        <Col className="justify-content-center d-flex ">
                          <img
                            style={{
                              height: "200px",
                              width: "auto",
                              borderRadius: "5%",
                            }}
                            src={movieCredits?.director?.profile_path}
                            alt={
                              movieCredits?.director?.job || "Director image"
                            }
                          />
                        </Col>
                        <Col className="justify-content-center d-flex ">
                          <strong> {movieCredits?.director?.name} </strong>
                        </Col>
                        <div className="justify-content-center d-flex ">
                          {movieCredits?.director?.job}
                        </div>
                      </Col>

                      <Col lg={6}>
                        <Col className="justify-content-center d-flex ">
                          <img
                            style={{
                              height: "200px",
                              width: "auto",
                              borderRadius: "5%",
                            }}
                            src={movieCredits?.producer?.profile_path}
                            alt={
                              movieCredits?.producer?.job || "Producer image"
                            }
                          />
                        </Col>
                        <Col className="justify-content-center d-flex ">
                          <strong> {movieCredits?.producer?.name} </strong>
                        </Col>
                        <div className="justify-content-center d-flex ">
                          {movieCredits?.producer?.job}
                        </div>
                      </Col>
                    </Row>
                    <h4>Cast members</h4>

                    {movieCredits?.topCast?.length > 0 && (
                      <Carousel
                        indicators={false}
                        interval={null}
                        className="text-center"
                        nextIcon={
                          <span
                            style={{
                              background: "orange",
                              borderRadius: "50%",
                              padding: "8px",
                              color: "#fff",
                            }}
                          >
                            <FaArrowRight size={20} />
                          </span>
                        }
                        prevIcon={
                          <span
                            style={{
                              background: "orange",
                              borderRadius: "100%",
                              padding: "8px",
                              color: "#fff",
                            }}
                          >
                            <FaArrowLeft size={20} />
                          </span>
                        }
                      >
                        {chunkCast(movieCredits.topCast, 3).map(
                          (castGroup, index) => (
                            <Carousel.Item key={index}>
                              <Row className="justify-content-center">
                                {castGroup.map((castMember, idx) => (
                                  <Col
                                    key={idx}
                                    md={3}
                                    className="d-flex flex-column align-items-center"
                                  >
                                    <img
                                      style={{
                                        height: "200px",
                                        width: "auto",
                                        borderRadius: "5%",
                                      }}
                                      src={castMember?.profile_path}
                                      alt={castMember?.name || "Actor image"}
                                    />
                                    <strong>{castMember.name}</strong>
                                    <div>{castMember.character}</div>
                                  </Col>
                                ))}
                              </Row>
                            </Carousel.Item>
                          )
                        )}
                      </Carousel>
                    )}
                  </Card>
                </Container>
              </>
        
     );
}

export default MovieCreditComponent;