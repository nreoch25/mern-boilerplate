import fetch from "isomorphic-fetch";

export default function callApi(url, method) {
  return fetch(`${url}`, {
    headers: { "Content-Type": "application/json", Accept: "application/json" },
    method: method
  })
    .then(response => response.json().then(json => ({ json, response })))
    .then(({ json, response }) => {
      if (!response.ok) {
        return Promise.reject(json);
      }
      return json;
    })
    .then(response => response, error => error);
}
