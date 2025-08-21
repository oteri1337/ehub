import React from "react";
import { Link } from "react-router-dom";
import { Helmet } from "react-helmet";

function BreadComponent({ data = [], className = "" }) {
  if (!data.length) {
    return <React.Fragment />;
  }

  const renderTitle = () => {
    if (data.length) {
      return <Helmet title={`${data[data.length - 1].label} - ${PWA_NAME}`} />;
    }
  };

  const links = data.map((item) => {
    if (item.link) {
      return (
        <span key={item.label}>
          <Link to={item.link}>
            <b>{item.label}</b>
          </Link>
          <i className="material-icons notranslate">chevron_right</i>
        </span>
      );
    }

    return (
      <span className="capitalize" key={item.label || data.length}>
        <b>{item.label}</b>
      </span>
    );
  });

  return (
    <React.Fragment>
      {renderTitle()}
      <br />
      <section className={`${className} app-px-1 app-pb-1`}>{links}</section>
    </React.Fragment>
  );
}

export default BreadComponent;
