import React from "react";
import { Link } from "react-router-dom";
import { adminSignOut } from "functions";
import Office from "images/app/Office.jpg";
import { Store } from "providers/AppProvider";
import ThemeChangerSideNavComponent from "./ThemeChangerSideNavComponent";

function SideNavComponent() {
  const { state, callReducer } = React.useContext(Store);
  const { admin } = state;

  React.useLayoutEffect(() => {
    const elems = document.querySelectorAll(".sidenav");
    M.Sidenav.init(elems, {});
  });

  React.useEffect(() => {
    var elems = document.querySelectorAll(".collapsible");
    M.Collapsible.init(elems, {});
  }, []);

  return (
    <React.Fragment>
      <ul className="sidenav sidenav-fixed" id="mobile-demo">
        <li>
          <div className="user-view">
            <div className="background">
              <img src={`${Office}`} />
            </div>
            <a href="#user">
              <img
                className="circle"
                src={`/uploads/images/${admin.photo_profile}`}
              />
            </a>
            <Link to="/user/profile">
              <span className="white-text name">
                {admin.first_name} {admin.last_name}
              </span>
            </Link>
            <Link to="/user/profile">
              <span className="white-text email">{admin.email}</span>
            </Link>
          </div>
        </li>
        <ThemeChangerSideNavComponent />
        <li className="no-padding">
          <ul className="collapsible collapsible-accordion">
            <li className="active">
              <a className="collapsible-header">
                Control
                <i className="material-icons notranslate">arrow_drop_down</i>
              </a>
              <div className="collapsible-body">
                <ul>
                  <li>
                    <Link
                      to="/control/events/list.html"
                      className="sidenav-close"
                    >
                      <span className="material-icons notranslate">home</span>
                      Home
                    </Link>
                  </li>

                  <li>
                    <Link
                      to="/control/topics/list.html"
                      className="sidenav-close"
                    >
                      <span className="material-icons notranslate">adjust</span>
                      Forum
                    </Link>
                  </li>

                  <li>
                    <Link
                      to="/control/pdfs/index.html"
                      className="sidenav-close"
                    >
                      <span className="material-icons notranslate">
                        archive
                      </span>
                      Library
                    </Link>
                  </li>

                  <li>
                    <Link
                      to="/control/users/list.html"
                      className="sidenav-close"
                    >
                      <span className="material-icons notranslate">
                        supervised_user_circle
                      </span>
                      Community
                    </Link>
                  </li>
                </ul>
              </div>
            </li>
          </ul>
        </li>
        <li />
        <li className="no-padding">
          <ul className="collapsible collapsible-accordion">
            <li className="active">
              <a className="collapsible-header">
                Account
                <i className="material-icons notranslate">arrow_drop_down</i>
              </a>
              <div className="collapsible-body">
                <ul>
                  <li>
                    <Link
                      to="/control/account/index.html"
                      className="sidenav-close"
                    >
                      <span className="material-icons notranslate">
                        account_circle
                      </span>
                      My Account
                    </Link>
                  </li>
                  <li>
                    <a onClick={() => adminSignOut(callReducer)}>
                      <span className="material-icons notranslate">
                        power_settings_new
                      </span>
                      Sign Out
                    </a>
                  </li>
                </ul>
              </div>
            </li>
          </ul>
        </li>
      </ul>
    </React.Fragment>
  );
}

export default SideNavComponent;
