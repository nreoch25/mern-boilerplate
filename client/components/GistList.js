import React from "react";
import PropTypes from "prop-types";

const GistsList = ({ gists }) => (
  <ul>
    {gists.map(gist => (
      <li key={gist.id}>{gist.title}</li>
    ))}
  </ul>
);

GistsList.propTypes = {
  gists: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
  })).isRequired,
};

export default GistsList;
