require("babel-register");
const Enzyme = require("enzyme");
const Adapter = require("enzyme-adapter-react-16");

Enzyme.configure({ adapter: new Adapter() });

// Disable webpack-specific features for tests since
// Mocha doesn't know what to do with them.
require.extensions[".css"] = function() {
  return null;
};
require.extensions[".png"] = function() {
  return null;
};
require.extensions[".jpg"] = function() {
  return null;
};

// Configure JSDOM and set global variables
// to simulate a browser environment for tests.
var jsdom = require("jsdom").jsdom;

var exposedProperties = ["window", "navigator", "document"];

global.document = jsdom("");
global.window = document.defaultView;
Object.keys(document.defaultView).forEach(property => {
  if (typeof global[property] === "undefined") {
    exposedProperties.push(property);
    global[property] = document.defaultView[property];
  }
});

global.navigator = {
  userAgent: "node.js"
};

documentRef = document; //eslint-disable-line no-undef
