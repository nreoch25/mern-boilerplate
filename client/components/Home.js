import React, { Component } from "react";
import { connect } from "react-redux";
import { fetchGists } from "../actions";

class Home extends Component {
  componentWillMount() {
    this.props.fetchGists();
  }
  render() {
    return <h1>Mern Boilerplate Home</h1>;
  }
}

export default connect(null, { fetchGists })(Home);
