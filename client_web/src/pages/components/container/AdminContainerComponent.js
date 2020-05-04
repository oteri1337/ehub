import React from "react";
import { Helmet } from "react-helmet";
import BreadComponent from "components/BreadComponent";
import FadeInComponent from "components/FadeInComponent";

import NavComponent from "./AdminNavComponent";
import SideNavComponent from "./AdminSideNavComponent";

function ContainerComponent({ bread = [], children }) {
  React.useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <React.Fragment>
      <Helmet>
        <style>
          {`

        @media (min-width: 800px) {
           header, main, footer {
              padding-left: 300px;
            }
        }

        `}
        </style>
      </Helmet>
      <header>
        <NavComponent />
        <SideNavComponent />
      </header>
      <main className="app-mx-1">
        <BreadComponent data={bread} />
        {bread.length == 0 && <br />}
        <FadeInComponent>
          <div>{children}</div>
        </FadeInComponent>
      </main>
    </React.Fragment>
  );
}

export default ContainerComponent;
