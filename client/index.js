import React from "react";
import { hydrate } from "react-dom";
import { BrowserRouter } from "react-router-dom";
import { loadComponents } from "loadable-components";
import { AppContainer } from "react-hot-loader";
import { Provider } from "react-redux";
import App from "./AppContainer";
import { configureStore } from "./store";
import sagas from "./sagas";

// Base stylesheet
require("./styles/main.css");

// Initialize store
const store = configureStore(window.__INITIAL_STATE__);
// run redux sagas
store.runSaga(sagas);

const mountApp = document.getElementById("root");

setTimeout(() => {
  loadComponents().then(() => {
    hydrate(
      <AppContainer>
        <Provider store={store}>
          <BrowserRouter>
            <App />
          </BrowserRouter>
        </Provider>
      </AppContainer>,
      mountApp
    );
  });
}, 0);

// For hot reloading of react components
if (module.hot) {
  module.hot.accept("./AppContainer", () => {
    const NextApp = require("./AppContainer").default; // eslint-disable-line global-require
    hydrate(
      <AppContainer>
        <Provider store={store}>
          <BrowserRouter>
            <NextApp />
          </BrowserRouter>
        </Provider>
      </AppContainer>,
      mountApp
    );
  });
}
