import React from "react";
import SearchResultList from "./SearchResultList";
import { Route } from "react-router-dom";


function SearchResult({ match }) {
  return (
    <Route path={`${match.path}/:keyword`} component={SearchResultList} />
  );

}


export default SearchResult;