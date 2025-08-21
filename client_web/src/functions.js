function urlBase64ToUint8Array(base64String) {
  const padding = "=".repeat((4 - (base64String.length % 4)) % 4);
  const base64 = (base64String + padding)
    .replace(/\-/g, "+")
    .replace(/_/g, "/");

  const rawData = window.atob(base64);
  const outputArray = new Uint8Array(rawData.length);

  for (var i = 0; i < rawData.length; ++i) {
    outputArray[i] = rawData.charCodeAt(i);
  }
  return outputArray;
}

export const registerWorker = async function () {
  if (location.protocol == "http:") {
    console.log("cannot register service worker on onsecure protocol");
    return;
  }

  const { serviceWorker } = navigator;
  if (serviceWorker?.controller) {
    serviceWorker.addEventListener("controllerchange", () => {
      window.location.reload();
    });
    // const reg = await serviceWorker.getRegistration();
    // if (reg.waiting) {
    // 	const sure = confirm("update to latest version");
    // 	if (sure) {
    // 		serviceWorker.controller.postMessage({ data: "update" });
    // 	}
    // }
    return;
  }

  try {
    console.log("registering service worker");
    await serviceWorker?.register("/sw.js", { scope: "/" });
  } catch (error) {
    console.log("service worker registration failed", error);
  }
};

export const getPushSubscription = async function () {
  if (location.protocol == "http:") {
    console.log("cannot register push on onsecure protocol");
    return;
  }
  let subscription;

  const permission = await Notification.requestPermission();

  if (permission == "denied") {
    console.log("notifications permission denied");
    return;
  }

  if (permission == "granted") {
    console.log("notifications permission granted");
    const reg = await navigator?.serviceWorker?.getRegistration();
    subscription = await reg.pushManager.getSubscription();

    if (!subscription) {
      console.log("subscribing to push service");
      try {
        subscription = await reg.pushManager.subscribe({
          userVisibleOnly: true,
          applicationServerKey: urlBase64ToUint8Array(VAPID_KEY),
        });
      } catch (errors) {
        console.log("failed to subscribe for push notifications", errors);
      }
    }

    subscription = JSON.stringify(subscription);
  }

  console.log(subscription);
  return subscription;
};

export const ERROR_OBJECT = {
  errors: ["server error"],
  data: {},
};

export async function getRequest(url) {
  let response;

  try {
    response = await fetch(url);
    response = await response.json();
  } catch (e) {
    response = ERROR_OBJECT;
  }

  return response;
}

export async function sendRequest(url, body, type = "POST") {
  let response;

  try {
    response = await fetch(url, {
      method: type,
      body: JSON.stringify(body),
      credentials: "include",
      headers: {
        "content-type": "application/json",
      },
    });
    response = await response.json();
  } catch (e) {
    response = { ...ERROR_OBJECT, jsError: e };
  }

  return response;
}

export async function sendFormRequest(url, body) {
  // const xhr = new XMLHttpRequest();
  // xhr.open("POST", url);
  // xhr.addEventListener("progress", (e) => {
  //   console.log("progress", e);
  // });
  // xhr.setRequestHeader("Content-Type", "multipart/form-data");
  // xhr.send(url);
  let response;
  try {
    response = await fetch(url, {
      method: "POST",
      body: body,
      credentials: "include",
    });
    response = await response.json();
  } catch (e) {
    console.log("fetch error");
    response = { ...ERROR_OBJECT, jsError: e };
  }
  return response;
}

export const requestUpload = async function (endpoint, formData) {
  try {
    let response = await fetch(endpoint, {
      method: "POST",
      body: formData,
      credentials: "include",
    });
    return (response = await response.json());
  } catch (error) {
    let data = {
      errors: ["Server Error"],
      data: {},
    };
    return data;
  }
};

export async function signOut(callReducer) {
  await getRequest("/api/users/auth/signout");
  callReducer({ dispatch: "UPDATE_USER", data: false });
}

export async function adminSignOut(callReducer) {
  await getRequest("/api/admins/auth/signout");
  callReducer({ dispatch: "UPDATE_ADMIN", data: false });
}

export const getFormData = (event, formObjects = [], callback, is = []) => {
  event.preventDefault();

  const formdata = new FormData();

  formObjects.forEach((formObject) => {
    if (formObject.type == "file") {
      formdata.append(formObject.id, formObject.ref.current.files[0]);
    } else if (formObject.type == "select") {
      formdata.append(formObject.id, formObject.value || "");
    } else {
      formdata.append(formObject.id, formObject.ref.current.value || "");
    }
  });

  if (is.length) {
    is.forEach((i) => {
      formdata.append(i.key, i.value);
    });
  }

  const callBack = callback || function () {};

  callBack(formdata);
};
