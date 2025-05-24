import axios from "axios";

const baseURL = process.env.REACT_APP_SEARCH_SERVICE_URL;

function SearchMovieByQuery(query, page) {
   if (query != null) {
    return axios
      .get(`${baseURL}/Movies/MovieBySearch`, {
        params: {
          query: query,
          page: page,
        },
      })
      .then((response) => {
         return response.data;  
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
return { data: [], error: error.message || "Unknown error" };  }
}



 
async function GetMovieDetailsById(movieId){
  try {
    const response =  await axios.get(`${baseURL}/Movies/MoviebyId?movieId=${movieId}`);
    return response.data;
  } catch (error) {
        window.alert("Error fetching movie details:", error);

  }
}

async function GetMovieCreditsById(movieId){
  try {
    const response =  await axios.get(`${baseURL}/Movies/MovieCredits?movieId=${movieId}`);
    return response.data;
  } catch (error) {
        window.alert("Error fetching movie Credits:", error);

  }
}

async function GetRecommendedMoviesById(movieId){
  try {
    const response = await axios.get(`${baseURL}/Movies/MovieRecommendations?movieId=${movieId}`);
    return response.data;
  } catch (error) {
    console.warn("There was a problem getting the recommended movies")
  }
}


export { SearchMovieByQuery, GetTrendingMovies, GetMovieDetailsById, GetRecommendedMoviesById, GetMovieCreditsById};
export default MovieServiceAPI;
