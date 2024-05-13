import React from "react";
import "./SearchResultsList.css";
import { SearchResult } from "./SearchResult";

export const SearchResultsList = ({ results }) => {
  return (
    <div className="results-list">
      {results.map((result, idx) => {
        return <SearchResult result={result} key={idx} />;
      })}
    </div>
  );
};
