import React from "react";
import { render } from "react-dom";
import Router from "./routing/Router";
import AppProvider from "./providers/AppProvider";
import EditorProvider from "./providers/EditorProvider";
import reducer from "./providers/reducers/rootReducer";
import { registerWorker } from "./functions";
import "./assets/app";

async function renderApp() {
  // load saved state
  let data = await JSON.parse(localStorage.getItem("state"));
  data = reducer({}, { dispatch: "UPDATE_STATE", data });

  // update theme
  data = reducer(data, { dispatch: "UPDATE_THEME", data: data.theme });

  // render component
  render(
    <AppProvider initialState={data}>
      <EditorProvider>
        <Router />
      </EditorProvider>
    </AppProvider>,
    document.getElementById("root")
  );
}

// if (location.protocol !== "https:") {
//   location.replace(
//     `https:${location.href.substring(location.protocol.length)}`
//   );
// }

renderApp();
registerWorker();
