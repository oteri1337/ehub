import React from "react";
import { Link } from "react-router-dom";
import { adminSignOut } from "functions";
import { Store } from "providers/AppProvider";
import ThemeChangerNavComponent from "./ThemeChangerNavComponent";

function NavComponent() {
  const { callReducer } = React.useContext(Store);

  return (
    <nav className="pushpin">
      <div>
        <ul>
          <li>
            <a
              data-target="mobile-demo"
              className="sidenav-trigger show-on-large"
            >
              <span className="material-icons notranslate">menu</span>
            </a>
          </li>
        </ul>
        <Link to="/control/index.html" className="brand-logo">
          {PWA_NAME}
        </Link>
        <ul id="nav-mobile" className="right hide-on-med-and-down">
          <li>
            <Link to="/control/events/list.html">Home</Link>
          </li>

          <li>
            <Link to="/control/pdfs/index.html">Library</Link>
          </li>
          <ThemeChangerNavComponent />
          <li>
            <a onClick={() => adminSignOut(callReducer)} title="Sign Out">
              <span className="material-icons notranslate">
                power_settings_new
              </span>
            </a>
          </li>
        </ul>

        <ul id="nav-mobile" className="right hide-on-large-only">
          <li>
            <a onClick={() => adminSignOut(callReducer)} title="Sign Out">
              <span className="material-icons notranslate">
                power_settings_new
              </span>
            </a>
          </li>
        </ul>
      </div>
    </nav>
  );
}

export default NavComponent;
