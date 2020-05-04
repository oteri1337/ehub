import axios from "axios";
import { BACKEND_URL } from "../../../env";

export const ERROR_OBJECT = {
  errors: [`connection or server error @ ${BACKEND_URL}`],
  data: {},
};

export async function getRequest(url) {
  let response;

  // try {
  //   response = await fetch(BACKEND_URL + url, {
  //     credentials: "include",
  //   });
  //   response = await response.json();
  // } catch (e) {
  //   console.log(e);
  //   response = { ...ERROR_OBJECT, jsError: e };
  // }

  try {
    response = await axios({ url: BACKEND_URL + url, withCredentials: true });
    response = response.data;
  } catch (e) {
    console.log(e);
    response = { ...ERROR_OBJECT, jsError: e };
  }

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

  try {
    response = await axios({
      url: BACKEND_URL + url,
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
