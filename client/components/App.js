import React, { Component } from "react";
import { fetchPosts, fetchPhotos } from "../actions/AppActions";

class App extends Component {
  render() {
    return (
      <div>
        <header>Site Header</header>
        {this.props.children}
        <footer>Site Footer</footer>
      </div>
    );
  }
}

App.need = [
  () => { return fetchPosts(); },
  () => { return fetchPhotos(); }
];

export default App;
