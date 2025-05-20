import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";

import PageComponent from "./View/PageComponent";
import SearchCollectionComponent from "./View/SearchCollectionComponent";

import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Auth0Provider } from "@auth0/auth0-react";
import MovieDetailsComponent from "./View/MovieDetailsComponent";

function App() {
  return (
    <div className="App">
      <Auth0Provider
      domain={process.env.REACT_APP_AUTH0_DOMAIN}
      clientId={process.env.REACT_APP_AUTH0_CLIENTID}
      authorizationParams={{
        redirect_uri: process.env.REACT_APP_HOME_URL
      }}
      >

      <BrowserRouter>
        <Routes>
          <Route key={"search-collection"} path="/search" element={<SearchCollectionComponent />} />
          <Route key={"page"} path="/" element={<PageComponent />} />
          <Route key={"movie-details"} path="/search/movie-details" element={<MovieDetailsComponent />} />
        </Routes>
      </BrowserRouter>
      </Auth0Provider>
    </div>
  );
}

export default App;
