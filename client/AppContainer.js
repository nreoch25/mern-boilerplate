import React from "react";
import { Route, Switch } from "react-router-dom";

import Index from "./components/Index";

const App = () => (
  <div>
    <Route
      path="/"
      component={({ match }) => (
        <div>
          <Switch>
            <Route exact path="/" component={Index} />
          </Switch>
        </div>
      )}
    />
  </div>
);

export default App;
