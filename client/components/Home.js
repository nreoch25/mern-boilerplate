import React, { Component } from "react";
import { connect } from "react-redux";
import { fetchGists } from "../actions";

class Home extends Component {
  componentDidMount() {
    this.props.fetchGists();
  }
  render() {
    console.log("GISTS", this.props.gists);
    return <h1>Mern Boilerplate Home</h1>;
  }
}

function mapStateToProps(state) {
  return {
    gists: state.gists
  };
}

export default connect(mapStateToProps, { fetchGists })(Home);
