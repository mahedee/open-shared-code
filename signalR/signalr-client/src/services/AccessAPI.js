import { BASE_URL } from "../utils/Settings";

export function getData(endPoint) {
  // payload
  let payload = {
    method: "GET",
    headers: {
      "access-control-allow-origin": "*",
      Accept: "application/json",
      "Content-Type": "application/json",
      //'Authorization': 'Bearer ' + token
    },
  };

  return fetch(BASE_URL + endPoint, payload)
    .then(function (response) {
      if (!response.ok) {
        throw Error(response.statusText);
      }
      return response.json();
    })
    .then(function (result) {
      return result;
    })
    .catch(function (error) {
      console.log(error);
    });
}
