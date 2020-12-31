import React from "react";
import Logo from "images/logo.png";
import { Link } from "react-router-dom";
import ThemeChangerSideNavComponent from "./ThemeChangerSideNavComponent";

function SideNavComponent() {
  React.useEffect(() => {
    const selems = document.querySelectorAll(".sidenav");
    M.Sidenav.init(selems, {});

    const elems = document.querySelectorAll(".collapsible");
    M.Collapsible.init(elems, {});
  }, []);

  return (
    <ul className="sidenav" id="mobile-demo">
      <li>
        <div className="user-view">
          <div className="background">
            <img
              src={Logo}
              style={{
                height: "25vh",
                padding: "1rem",
                paddingLeft: "2rem",
              }}
            />
          </div>
        </div>
      </li>

      <ThemeChangerSideNavComponent />

      <li className="no-padding">
        <ul className="collapsible collapsible-accordion">
          <li className="active">
            <a className="collapsible-header">
              Pages
              <i className="material-icons notranslate">arrow_drop_down</i>
            </a>
            <div className="collapsible-body">
              <ul>
                <li>
                  <Link to="/developer.html" className="sidenav-close">
                    <span className="material-icons notranslate">
                      account_circle
                    </span>
                    Developer
                  </Link>
                </li>
                <li>
                  <Link to="/screenshots.html" className="sidenav-close">
                    <span className="material-icons notranslate">
                      phone_iphone
                    </span>
                    Screenshots
                  </Link>
                </li>
                <li>
                  <Link to="/privacy-policy.html" className="sidenav-close">
                    <span className="material-icons notranslate">
                      privacy_tip
                    </span>
                    Privacy Policy
                  </Link>
                </li>
              </ul>
            </div>
          </li>
        </ul>
      </li>
    </ul>
  );
}

export default SideNavComponent;
