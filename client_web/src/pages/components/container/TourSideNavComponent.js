import React from "react";
import { Link } from "react-router-dom";
import Logo from "images/logo.png";
import ThemeChangerSideNavComponent from "../ThemeChangerSideNavComponent";

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
              Members
              <i className="material-icons notranslate">arrow_drop_down</i>
            </a>
            <div className="collapsible-body">
              <ul>
                <li>
                  <Link to="/signin.html" className="sidenav-close">
                    <span className="material-icons notranslate">
                      account_circle
                    </span>
                    LOGIN
                  </Link>
                </li>
                <li>
                  <Link to="/signup.html" className="sidenav-close">
                    <span className="material-icons notranslate">
                      account_circle
                    </span>
                    SIGNUP
                  </Link>
                </li>
              </ul>
            </div>
          </li>
        </ul>
      </li>

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
                  <Link to="/" className="sidenav-close">
                    <span className="material-icons notranslate">
                      account_balance
                    </span>
                    HOME
                  </Link>
                </li>

                <li>
                  <Link to="/pricing.html" className="sidenav-close">
                    <span className="material-icons notranslate">
                      attach_money
                    </span>
                    PRICING
                  </Link>
                </li>

                <li>
                  <Link to="/about.html" className="sidenav-close">
                    <span className="material-icons notranslate">
                      supervised_user_circle
                    </span>
                    ABOUT US
                  </Link>
                </li>

                <li>
                  <Link to="/why-mining.html" className="sidenav-close">
                    <span className="material-icons notranslate">wb_sunny</span>
                    WHY MINING
                  </Link>
                </li>

                <li>
                  <Link to="/customer-service.html" className="sidenav-close">
                    <span className="material-icons notranslate">
                      emoji_people
                    </span>
                    CUSTOMER SERVICE
                  </Link>
                </li>
              </ul>
            </div>
          </li>
        </ul>
      </li>

      <li className="no-padding">
        <ul className="collapsible collapsible-accordion">
          <li className="active">
            <a className="collapsible-header">
              Technology
              <i className="material-icons notranslate">arrow_drop_down</i>
            </a>
            <div className="collapsible-body">
              <ul>
                <li>
                  <Link to="/hive.html" className="sidenav-close">
                    <span className="material-icons notranslate">dns</span>
                    Hive
                  </Link>
                </li>
                <li>
                  <Link to="/radiant-tech.html" className="sidenav-close">
                    <span className="material-icons notranslate">dns</span>
                    Radiant Tech
                  </Link>
                </li>
                <li>
                  <Link to="/enigma.html" className="sidenav-close">
                    <span className="material-icons notranslate">dns</span>
                    Enigma Datacenter
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
