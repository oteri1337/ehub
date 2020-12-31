import React from "react";
import { Link } from "react-router-dom";

import news from "../../assets/images/news.png";
import chat from "../../assets/images/chat3.png";
import books from "../../assets/images/books.png";
import forum from "../../assets/images/forum.png";

import play from "../../assets/images/store-play.svg";
import apple from "../../assets/images/store-apple.svg";

import ContainerComponent from "components/container/TourContainerComponent";

function HomePage() {
  return (
    <ContainerComponent footer={false}>
      <section
        style={{
          display: "flex",
          alignItems: "center",
          flexWrap: "wrap-reverse",
        }}
        className="bg app-vh"
      >
        <div style={{ flex: 1.2, flexBasis: "375px" }}>
          <div
            className="app-mobile-center"
            style={{ paddingRight: "4rem", paddingLeft: "4rem" }}
          >
            <h1>
              Easy access to all <br />
              of your favourite books
            </h1>
            <p>
              Save your books offline to make sure you can read everywhere,
              <br />
              even without an internet connection.
            </p>
            <a className="btn btn-secondary" target="_blank" href={IPA_LINK}>
              Download on IOS
            </a>
            <a className="btn" target="_blank" href={APK_LINK}>
              Download on Android
            </a>
          </div>
        </div>
        <div style={{ flex: 1, paddingRight: "1rem", flexBasis: "375px" }}>
          <img src={books} className="responsive-img" />
        </div>
      </section>
      <section
        className="bg app-py-3"
        style={{ display: "flex", alignItems: "center", flexWrap: "wrap" }}
      >
        <div style={{ flex: 1, flexBasis: "375px" }} className="center">
          <img
            src={forum}
            style={{ maxHeight: "100vh" }}
            className="responsive-img"
          />
        </div>
        <div
          className="app-mobile-center"
          style={{ flex: 1, flexBasis: "375px" }}
        >
          <div className="container">
            <p
              className="material-icons notranslate"
              style={{
                color: "blue",
                padding: "1rem",
                borderRadius: "50%",
                backgroundColor: "#dadce0",
              }}
            >
              people
            </p>
            <h2>Collaboration and teamwork made easy with forums</h2>
            <p>
              Using the discussion forum for sharing ideas or brainstorming
              about an issue is another opportunity to encourage innovation.
              Here the community is encouraged to share and also to respond to
              peer driven solutions.
            </p>
            <a className="btn btn-secondary" target="_blank" href={IPA_LINK}>
              Download on IOS
            </a>
          </div>
        </div>
      </section>
      <section
        className="bg app-py-3"
        style={{
          display: "flex",
          alignItems: "center",
          flexWrap: "wrap-reverse",
        }}
      >
        <div
          style={{ flex: 1, flexBasis: "375px" }}
          className="app-mobile-center"
        >
          <div className="container">
            <p
              className="material-icons notranslate"
              style={{
                color: "blue",
                padding: "1rem",
                borderRadius: "50%",
                backgroundColor: "#dadce0",
              }}
            >
              question_answer
            </p>
            <h2>Send private messages to community members</h2>
            <p>
              Connect friends and colleagues. Private messaging facilitates
              one-on-one conversation with community members. Share emoji’s,
              photos, and documents.
            </p>
            <a className="btn btn-secondary" target="_blank" href={APK_LINK}>
              Download on Android
            </a>
          </div>
        </div>
        <div style={{ flex: 1, flexBasis: "375px" }} className="center">
          <img
            src={chat}
            style={{ maxHeight: "100vh" }}
            className="responsive-img"
          />
        </div>
      </section>
      <section
        style={{
          display: "flex",
          alignItems: "center",
          flexWrap: "wrap",
        }}
        className=" bg app-py-3"
      >
        <div style={{ flex: 1, flexBasis: "375px" }} className="center">
          <img
            src={news}
            style={{ maxHeight: "100vh" }}
            className="responsive-img"
          />
        </div>
        <div
          style={{ flex: 1, flexBasis: "375px" }}
          className="app-mobile-center"
        >
          <div className="container">
            <p
              className="material-icons notranslate"
              style={{
                color: "blue",
                padding: "1rem",
                borderRadius: "50%",
                backgroundColor: "#dadce0",
              }}
            >
              today
            </p>
            <h2>Join the Community and be informed about latest news</h2>
            <p>
              Whether you want to stay up-to-date on breaking news and events,
              read in-depth articles, or merely catch a few headlines within the
              community, eHUB will suit your needs and help you stay more
              informed.
            </p>
            <a className="btn btn-secondary" target="_blank" href={IPA_LINK}>
              Download on IOS
            </a>
          </div>
        </div>
      </section>
      <section className="bg app-py-3">
        <center className="container">
          <h1>Experience eHUB on any device</h1>
          <p>
            eHUB works on all major platforms, enabling you to work seamlessly
            across your mobile device, and tablets.
          </p>
          <a href={APK_LINK}>
            <img src={apple} className="app-px-1" />
          </a>
          {" "}
          <a href={IPA_LINK}>
            <img src={play} className="app-px-1" />
          </a>
        </center>
      </section>
      <section className="center app-py-3">
        <Link to="/developer.html" style={{ marginRight: "1rem" }}>
          Developer
        </Link>
        <Link to="/screenshots.html" style={{ marginLeft: "1rem" }}>
          Screenshots
        </Link>
        <p>
          <a href="/" target="_blank">
            Image Credits: Freepik
          </a>
        </p>
        <a href={`mailto:${MAIL_NAME}`}>{MAIL_NAME}</a>
      </section>
    </ContainerComponent>
  );
}

export default HomePage;
