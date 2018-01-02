import React from "react";
import { Route, Switch } from "react-router-dom";

// import Index from "./components/Index";
// import Home from "./components/Home";
// import PageNotFound from "./components/PageNotFound";
import Header from "./components/Header";
import * as Routes from "./Routes";

const App = () => (
  <div>
    <Header />
    <Route
      path="/"
      component={({ match }) => (
        <div>
          <Switch>
            <Route exact path="/" component={Routes.Index} />
            <Route exact path="/home" component={Routes.Home} />
            <Route component={Routes.PageNotFound} />
          </Switch>
        </div>
      )}
    />
  </div>
);

export default App;
