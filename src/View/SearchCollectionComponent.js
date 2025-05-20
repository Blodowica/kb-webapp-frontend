import React, { useEffect, useState } from "react";
import MovieServiceAPI from "../API/MovieServiceAPI/MovieServiceAPI";
import { useLocation, useNavigate } from "react-router-dom";
import HeaderComponent from "../Components/LayoutComponents/HeaderComponents/HeaderComponent";
import client from "../SanitySetup/sanityClient";
import { Container, Table } from "react-bootstrap";
import { GetAllPageComponents } from "../SanitySetup/sanityQueries";
import MovieDetailsComponent from "./MovieDetailsComponent";

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
        console.log("Search query:", searchQuery); // Log the search query
        let response = await MovieServiceAPI(searchQuery);
        console.log(response);

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

      <div>
        {movies &&
          movies.map((movie, index) => {
            return (
              <div
                key={index}
                style={{ justifyContent: "center", display: "flex" }}
              >
                <Table
                  striped
                  style={{ width: "50%", cursor: 'pointer' }}
                  onClick={() => handleShowMovieDetails(movie?.id)}
                >
                  <thead>
                    <tr>
                      <th>Title</th>
                      <th>Overview</th>
                      <th>release date</th>
                      <th>poster</th>
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
                          alt=" movie poster"
                        />
                      </td>
                    </tr>
                  </tbody>
                </Table>
              </div>
            );
          })}
      </div>
    </Container>
  );
}

export default SearchCollectionComponent;
