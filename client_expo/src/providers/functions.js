import axios from "axios";
import React from "react";
import { BACKEND_URL } from "../../env";

export function removeDuplicateObjects(arrayOfObjects, anObject) {
  const newArray = arrayOfObjects.map((obj) => {
    if (obj.id != anObject.id) {
      return obj;
    }
    return false;
  });

  console.log("sbhs", newArray);

  return newArray;
}

export function debounceHook(f, delay, user = " ") {
  console.log("debounce is being setup for ", user);
  console.log(" ");
  const timeref = React.useRef({});

  return function () {
    if (timeref.current.done) {
      console.log("debounce called");
      clearTimeout(timeref.current.done);
      // timeout.current.done = undefined;
    }

    console.log("debounce setup");
    timeref.current.done = setTimeout(() => {
      f();
      timeref.current.done = undefined;
    }, delay);
  };
}

export function debounce(f, delay, user = " ") {
  console.log("debounce is being setup for ", user);
  // console.log(" ");
  let done;
  return function () {
    // console.log(" ");
    // console.log("debounce called");
    if (done) {
      clearTimeout(done);
    }

    done = setTimeout(f, delay);
  };
}

export const ERROR_OBJECT = {
  errors: [`connection error, please check your data connection`],
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

  // console.log(response);

  return response;
}

export async function sendRequest(url, data, method = "POST") {
  let response;

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
}
