import React from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";

const PageNotFound = (props, context = {}) => {
  if (context.setStatus) {
    context.setStatus(404);
  }

  return (
    <div>
      <h1>Page not found</h1>
      <Link to="/">Go home</Link>
    </div>
  );
};
PageNotFound.contextTypes = {
  setStatus: PropTypes.func.isRequired
};

export default PageNotFound;
