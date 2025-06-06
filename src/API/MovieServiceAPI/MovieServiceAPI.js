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

async function GetGenreList() {
  try {
    const response = await axios.get(`${baseURL}/Movies/Genres`);
    if (response.status !== 200) {
      return [];
    }
    return response;
  } catch (error) {
    return { error: error };
  }
}

function MovieServiceAPI(query, page) {
  return SearchMovieByQuery(query, page);
}

async function GetTrendingMovies() {
  try {
    const response = await axios.get(`${baseURL}/Movies/MovieTrending`);
    return response.data;
  } catch (error) {
    return { data: [], error: error.message || "Unknown error" };
  }
}

async function GetMovieDetailsById(movieId) {
  try {
    const response = await axios.get(
      `${baseURL}/Movies/MoviebyId?movieId=${movieId}`
    );
    return response.data;
  } catch (error) {
    window.alert("Error fetching movie details:", error);
  }
}

async function GetMovieCreditsById(movieId) {
  try {
    const response = await axios.get(
      `${baseURL}/Movies/MovieCredits?movieId=${movieId}`
    );
    return response.data;
  } catch (error) {
    window.alert("Error fetching movie Credits:", error);
  }
}

 
async function GetMovieWithFilters(
  page,
  sortBy,
  includeGenreIds,
  releaseYear,
  excludeGenreIds,
  language = "en-US"
) {

  
  
  try {
    const params = {};

    // Page number (default 1)
    params.page = page && page > 0 ? page : 1;

    // Sorting: field.direction (e.g. popularity.desc)
    if (sortBy?.field && sortBy?.direction) {
      params.sortBy = `${sortBy.field}.${sortBy.direction.toLowerCase()}`;
    }

    // Include genres as comma-separated IDs (e.g. "14,35,25")
    if (includeGenreIds && includeGenreIds?.length > 0) {
      params.genres = includeGenreIds.join(",");
    }

    // Exclude genres as comma-separated IDs
    if (excludeGenreIds && excludeGenreIds.length > 0) {
      params.excludeGenres = excludeGenreIds.join(",");
    }

    // Release year
    if (releaseYear) {
      params.releaseYear = releaseYear;
    }

    // Language param (optional)
    if (language) {
      params.language = language;
    }
 
    
    const response = await axios.get(
      `${baseURL}/Movies/MovieSearchByFilter`,
      { params }
    );

    return response.data; 
  } catch (error) {
    console.error("API call failed:", error);
    throw error; // Rethrow to handle upstream if needed
  }
}

async function GetRecommendedMoviesById(movieId) {
  try {
    const response = await axios.get(
      `${baseURL}/Movies/MovieRecommendations?movieId=${movieId}`
    );
    return response.data;
  } catch (error) {
    console.warn("There was a problem getting the recommended movies");
  }
}

export {
  SearchMovieByQuery,
  GetTrendingMovies,
  GetMovieDetailsById,
  GetRecommendedMoviesById,
  GetMovieCreditsById,
  GetGenreList,
  GetMovieWithFilters,
};
export default MovieServiceAPI;
