import express from "express";
import compression from "compression";
import bodyParser from "body-parser";
import path from "path";

// Webpack Requirements
import webpack from "webpack";
import config from "../webpack.config.dev.js";
import webpackDevMiddleware from "webpack-dev-middleware";
import webpackHotMiddleware from "webpack-hot-middleware";

// Initialize the Express app
const app = new express();

// Run Webpack dev server in development mode
if(process.env.NODE_ENV === "development") {
  const compiler = webpack(config);
  app.use(webpackDevMiddleware(compiler, { noInfo: false, colors: true, publicPath: config.output.publicPath }));
  app.use(webpackHotMiddleware(compiler));
}

// React and Redux setup
import { configureStore } from "../client/store";
import { Provider } from "react-redux";
import React from "react";
import { renderToString } from "react-dom/server";
import { match, RouterContext } from "react-router";

// Import required modules
import routes from "../client/routes";
import { fetchComponentData } from "./utils/fetchData";
import serverConfig from "./config";

// Apply body Parser and server public assets and routes
app.use(compression());
app.use(bodyParser.json({ limit: "20mb" }));
app.use(bodyParser.urlencoded({ limit: "20mb", extended: false }));
app.use(express.static(path.resolve(__dirname, "../dist")));

// Render Initial HTML
const renderFullPage = (html, initialState) => {

  // Import Manifests
  const assetsManifest = process.env.webpackAssets && JSON.parse(process.env.webpackAssets);
  const chunkManifest = process.env.webpackChunkAssets && JSON.parse(process.env.webpackChunkAssets);

  return `
    <!DOCTYPE HTML>
    <html>
      <head>
        ${process.env.NODE_ENV === "production" ? `<link rel="stylesheet" href="${assetsManifest["/app.css"]}" />` : ""}
        <link href="https://fonts.googleapis.com/css?family=Lato:400,300,700" rel="stylesheet" type="text/css" />
      </head>
      <body>
        <div id="root"><div>${html}</div></div>
        <script>
          window.__INITIAL_STATE__ = ${JSON.stringify(initialState)};
          ${process.env.NODE_ENV === "production" ?
          `//<![CDATA[
          window.webpackManifest = ${JSON.stringify(chunkManifest)};
          //]]>` : ""}
        </script>
        <script src='${process.env.NODE_ENV === 'production' ? assetsManifest['/vendor.js'] : '/vendor.js'}'></script>
        <script src='${process.env.NODE_ENV === 'production' ? assetsManifest['/app.js'] : '/app.js'}'></script>
      </body>
    </html>
  `;
};

// Server side Rendering based on routes matched by react-router
app.use((req, res, next) => {
  match({ routes, location: req.url }, (err, redirectLocation, renderProps) => {
    if(err) {
      return res.status(500);
    }
    if(redirectLocation) {
      return res.redirect(302, redirectLocation.pathname + redirectLocation.search);
    }
    if(!renderProps) {
      return next();
    }
    const store = configureStore();

    //TODO implement fetchComponentData for Server side rendering
    return fetchComponentData(store, renderProps.components, renderProps.params)
      .then(() => {
        const initialView = renderToString(
          <Provider store={store}>
            <RouterContext {...renderProps} />
          </Provider>
        );
        const finalState = store.getState();
        res.set("Content-Type", "text/html").status(200).end(renderFullPage(initialView, finalState));
      })
      .catch((error) => {
        next(error);
      });
  });
});

app.listen(serverConfig.port, (error) => {
  if(!error) {
    console.log(`Adentify is running on port: ${serverConfig.port}`);
  }
});
