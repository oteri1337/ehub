import React from "react";
import { Link } from "react-router-dom";
import { getNavClassName } from "hooks";
import ThemeChangerNavComponent from "./ThemeChangerNavComponent";

function NavComponent() {
  const class_name = getNavClassName();

  return (
    <div className="navbar-fixed">
      <nav className={class_name}>
        <a data-target="mobile-demo" className="sidenav-trigger">
          <i className="material-icons">menu</i>
        </a>
        <Link to="/" className="brand-logo hide-on-large-only">
          {PWA_NAME}
        </Link>
        <ul className=" hide-on-med-and-down">
          <li>
            <Link to="/" style={{ fontSize: "2rem" }}>
              Edu Hub
            </Link>
          </li>
          <li>
            <Link to="/developer.html">Developer</Link>
          </li>
          <li>
            <Link to="/screenshots.html">Screenshots</Link>
          </li>
          <li>
            <Link to="/privacy-policy.html">Privacy Policy</Link>
          </li>
          <ThemeChangerNavComponent />
        </ul>
        <ul className="right hide-on-med-and-down">
          <li>
            <a href={IPA_LINK} target="_blank" className="btn btn-secondary">
              Download on IOS
            </a>
          </li>
          <li>
            <a href={APK_LINK} target="_blank" className="btn">
              Download on Android
            </a>
          </li>
        </ul>
      </nav>
    </div>
  );
}

export default NavComponent;
