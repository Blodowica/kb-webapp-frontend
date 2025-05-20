import axios from "axios";

const baseURL = process.env.REACT_APP_SEARCH_SERVICE_URL;

function SearchMovieByQuery(query, page) {
  console.log(baseURL);
  if (query != null) {
    return axios
      .get(`${baseURL}/Movies/MovieBySearch`, {
        params: {
          query: query,
          page: page,
        },
      })
      .then((response) => {
        console.log(response.data);
        return response.data; // return the actual data
      })
      .catch((error) => {
        console.log(error);
        return [];  
      });
  }
  return Promise.resolve([]);  
}

function MovieServiceAPI(query, page) {
  return SearchMovieByQuery(query, page);
}

async function GetTrendingMovies() {
  try {
    const response = await axios.get(`${baseURL}/Movies/MovieTrending`);
     return response.data;  
  } catch (error) {
    console.log("Error fetching trending movies:", error);
    return [];  
  }
}



 
async function GetMovieDetailsById(movieId){
  try {
    const response =  await axios.get(`${baseURL}/Movies/MoviebyId?movieId=${movieId}`);
    return response.data;
  } catch (error) {
        window.alert("Error fetching movie details:", error);

  }
}


export { SearchMovieByQuery, GetTrendingMovies, GetMovieDetailsById };
export default MovieServiceAPI;
