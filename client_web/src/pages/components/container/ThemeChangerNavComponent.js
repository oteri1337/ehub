import React from "react";
import { Store } from "providers/AppProvider";

function ThemeChangerNavComponent() {
  const { callReducer } = React.useContext(Store);

  React.useLayoutEffect(() => {
    document.addEventListener("DOMContentLoaded", function () {
      var elems = document.querySelectorAll(".dropdown-trigger");
      console.log(elems);
      M.Dropdown.init(elems, { coverTrigger: false, hover: true });
    });
  }, []);

  return (
    <React.Fragment>
      <li>
        <a className="dropdown-trigger" data-target="themer">
          Theme
        </a>
      </li>
      <ul id="themer" className="dropdown-content">
        <li>
          <a
            id="en"
            onClick={() =>
              callReducer({ dispatch: "UPDATE_THEME", data: "LIGHT" })
            }
          >
            Light
          </a>
        </li>
        <li>
          <a
            id="en"
            onClick={() =>
              callReducer({ dispatch: "UPDATE_THEME", data: "DARK" })
            }
          >
            Dark
          </a>
        </li>
      </ul>
    </React.Fragment>
  );
}

export default ThemeChangerNavComponent;
