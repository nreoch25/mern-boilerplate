import fetch from "isomorphic-fetch";
const API_URL = "https://jsonplaceholder.typicode.com";

export default function callApi(endpoint, method) {
  return fetch(`${API_URL}/${endpoint}`, {
    headers: { "content-type": "application/json" },
    method: method
  })
  .then(response => response.json().then(json => ({ json, response })))
  .then(({ json, response }) => {
    if (!response.ok) {
      return Promise.reject(json);
    }
    return json;
  })
  .then(
    response => response,
    error => error
  );
}
