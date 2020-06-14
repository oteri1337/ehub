import axios from "axios";
import { BACKEND_URL } from "../../../env";

export const ERROR_OBJECT = {
  errors: [`connection or server error @ ${BACKEND_URL}`],
  data: false,
};

export async function getRequest(endpoint) {
  let response;

  const url = BACKEND_URL + endpoint;

  try {
    response = await axios({ url, withCredentials: true });
    response = response.data;
  } catch (e) {
    response = { ...ERROR_OBJECT, jsError: e };
  }

  // try {
  //   response = await fetch(url, {
  //     credentials: "include",
  //   });
  //   response = await response.json();
  // } catch (e) {
  //   response = { ...ERROR_OBJECT, jsError: e };
  // }

  console.log(response);

  return response;
}

export async function sendRequest(url, data, method = "POST") {
  let response;
  // try {
  //   response = await fetch(BACKEND_URL + url, {
  //     method,
  //     body,
  //     credentials: "include",
  //     headers: {
  //       "Content-Type": "application/json",
  //     },
  //   });
  //   response = await response.json();
  // } catch (e) {
  //   response = { ...ERROR_OBJECT, jsError: e };
  // }

  const headers = { "content-type": "application/json" };

  const newUrl = BACKEND_URL + url;

  try {
    response = await axios({
      url: newUrl,
      data,
      method,
      headers,
      withCredentials: true,
    });
    response = response.data;
  } catch (e) {
    console.log(e);
    response = { ...ERROR_OBJECT, jsError: e };
  }

  return response;
}
