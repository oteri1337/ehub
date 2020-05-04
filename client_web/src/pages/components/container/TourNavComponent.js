import React from "react";

function NavComponent() {
  return (
    <React.Fragment>
      <nav className="">
        <div className="container">
          <ul>
            <li>
              <a data-target="m" className="sidenav-trigger show-on-large">
                {/* <span className="material-icons notranslate">menu</span> */}
              </a>
            </li>
          </ul>
          <a className="brand-logo">{PWA_NAME}</a>
        </div>
      </nav>
    </React.Fragment>
  );
}

export default NavComponent;
