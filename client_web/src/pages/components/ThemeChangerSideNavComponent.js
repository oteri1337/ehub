import React from "react";
import { AppContext } from "providers/AppProvider";

function ThemeChangerSideNavComponent() {
  const { callReducer } = React.useContext(AppContext);

  return (
    <li className="no-padding">
      <ul className="collapsible collapsible-accordion">
        <li>
          <a className="collapsible-header">
            THEME
            <i className="material-icons notranslate">arrow_drop_down</i>
          </a>
          <div className="collapsible-body">
            <ul>
              <li>
                <a
                  className="sidenav-close"
                  onClick={() =>
                    callReducer({ dispatch: "UPDATE_THEME", data: "DARK" })
                  }
                >
                  <span className="material-icons notranslate">bookmark</span>
                  DARK
                </a>
              </li>
              <li>
                <a
                  className="sidenav-close"
                  onClick={() =>
                    callReducer({ dispatch: "UPDATE_THEME", data: "LIGHT" })
                  }
                >
                  <span className="material-icons notranslate">
                    bookmark_border
                  </span>
                  LIGHT
                </a>
              </li>
            </ul>
          </div>
        </li>
      </ul>
    </li>
  );
}

export default ThemeChangerSideNavComponent;
