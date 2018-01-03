/* App Entry Script */

if (process.env.NODE_ENV === "production") {
  process.env.webpackAssets = JSON.stringify(require("./dist/manifest.json"));
  process.env.webpackChunkAssets = JSON.stringify(
    require("./dist/chunk-manifest.json")
  );
  // In production serve the webpack server file
  require("./dist/server.bundle.js");
} else {
  require("./server/server");
}
