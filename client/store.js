import { createStore, applyMiddleware, compose } from "redux";
import createSagaMiddleware, { END } from "redux-saga";
import thunk from "redux-thunk";
import DevTools from "./utils/DevTools";
import rootReducer from "./reducers";

export function configureStore(initialState = {}) {
  const sagaMiddleware = createSagaMiddleware();
  const enhancers = [applyMiddleware(thunk, sagaMiddleware)];

  if (process.env.CLIENT && process.env.NODE_ENV === "development") {
    // Enable DevTools only when rendering on client and during development
    enhancers.push(
      window.devToolsExtension
        ? window.devToolsExtension()
        : DevTools.instrument()
    );
  }

  const store = createStore(rootReducer, initialState, compose(...enhancers));

  store.runSaga = sagaMiddleware.run;
  store.close = () => store.dispatch(END);

  // For hot reloading reducers
  if (module.hot) {
    // Enable Webpack hot module replacement for reducers
    module.hot.accept("./reducers", () => {
      const nextReducer = require("./reducers").default; // eslint-disable-line global-require
      store.replaceReducer(nextReducer);
    });
  }

  return store;
}
