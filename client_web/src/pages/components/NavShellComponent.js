import React from "react";
import { signOut } from "functions";
import { Link } from "react-router-dom";
import { Store } from "providers/AppProvider";

function NavShellComponent({ active }) {
  const { callReducer } = React.useContext(Store);

  const one = React.useRef();
  const two = React.useRef();
  const three = React.useRef();
  const four = React.useRef();

  React.useLayoutEffect(() => {
    if (active === 1) {
      one.current.classList.add("active");
    }
    if (active === 2) {
      one.current.classList.add("active");
      two.current.classList.add("active");
    }
    if (active === 3) {
      one.current.classList.add("active");
      two.current.classList.add("active");
      three.current.classList.add("active");
    }
    if (active === 4) {
      one.current.classList.add("active");
      two.current.classList.add("active");
      three.current.classList.add("active");
      four.current.classList.add("active");
    }
  }, []);

  return (
    <React.Fragment>
      <div className="navbar-fixed">
        <nav>
          <div className="container">
            <Link to="/" className="brand-logo">
              {PWA_NAME}
            </Link>
            <ul className="right">
              <li>
                <a>
                  <span ref={one} className="nav-circle">
                    1
                  </span>
                  <span className="hide-on-med-and-down">Account</span>
                </a>
              </li>
              <li>
                <a>
                  <span ref={two} className="nav-circle">
                    2
                  </span>
                  <span className="hide-on-med-and-down">Details</span>
                </a>
              </li>
              <li>
                <a>
                  <span ref={three} className="nav-circle">
                    3
                  </span>
                  <span className="hide-on-med-and-down">Confirm</span>
                </a>
              </li>
              <li>
                <a>
                  <span ref={four} className="nav-circle">
                    4
                  </span>
                  <span className="hide-on-med-and-down">Identity</span>
                </a>
              </li>
              {active > 1 && (
                <li id="signin material-icons notranslate">
                  <a
                    title="Sign Out"
                    onClick={(e) => {
                      e.preventDefault();
                      signOut(callReducer);
                    }}
                  >
                    <span className="material-icons notranslate">
                      power_settings_new
                    </span>
                  </a>
                </li>
              )}
            </ul>
          </div>
        </nav>
      </div>
      <br />
      <br />
    </React.Fragment>
  );
}

export default NavShellComponent;
