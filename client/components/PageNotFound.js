import React from "react";
import { Link } from "react-router-dom";

const PageNotFound = (props, context = {}) => {
  return (
    <div>
      <h1>Page not found</h1>
      <Link to="/">Go home</Link>
    </div>
  );
};

export default PageNotFound;
