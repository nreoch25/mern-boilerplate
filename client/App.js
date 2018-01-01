import React from "react";
import { Provider } from "react-redux";
import propTypes from "prop-types";
import { Router, browserHistory } from "react-router";

// Import routes
import routes from "./routes";

// Base stylesheet
require("./styles/main.css");

export default function App(props) {
  return (
    <Provider store={props.store}>
      <Router history={browserHistory}>{routes}</Router>
    </Provider>
  );
}

App.propTypes = {
  store: propTypes.object.isRequired
};
