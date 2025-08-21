import React from "react";
import TourNavComponent from "./TourNavComponent";
import { CSSTransition } from "react-transition-group";
import BreadComponent from "components/BreadComponent";
import TourFooterComponent from "./TourFooterComponent";
import TourSideNavComponent from "./TourSideNavComponent";

function ContainerComponent(props) {
  let className = "";
  const { nav = true, footer = true, children, bread = [] } = props;

  if (bread.length) {
    className = "container app-mb-1";
  }

  const renderNav = () => {
    if (nav) {
      return <TourNavComponent />;
    }
  };

  const renderFooter = () => {
    if (footer) {
      return <TourFooterComponent />;
    }
  };

  React.useLayoutEffect(() => {
    scrollTo(0, 0);
    const elems = document.querySelectorAll(".sidenav");
    M.Sidenav.init(elems, {});
  }, []);

  return (
    <React.Fragment>
      {renderNav()}
      <TourSideNavComponent />
      <main className={className} style={{ minHeight: "60vh" }}>
        <BreadComponent data={bread} />
        <CSSTransition classNames="fade" in={true} appear={true} timeout={300}>
          <div>{children}</div>
        </CSSTransition>
      </main>
      {renderFooter()}
    </React.Fragment>
  );
}

export default ContainerComponent;
