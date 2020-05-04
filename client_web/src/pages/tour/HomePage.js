import React from "react";
import ContainerComponent from "components/container/TourContainerComponent";

function HomePage() {
  return (
    <ContainerComponent nav={false} footer={false}>
      <section
        className="app-vh bg app-image-back-1"
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          textAlign: "center",
          flexDirection: "column",
        }}
      >
        <div style={{ zIndex: 1, maxWidth: "90%", margin: "0 auto" }}>
          <h1>{PWA_NAME}</h1>
          <p>Join over 2000 students using the leading science app</p>
          <br />
          <a
            className="btn btn-large"
            href="https://expo.io/@oteri2021/eHUB"
            target="_blank"
          >
            DOWNLOAD FOR ANDROID
          </a>
          <a
            className="btn btn-large btn-secondary"
            href="https://expo.io/@oteri2021/eHUB"
            target="_blank"
          >
            DOWNLOAD FOR IOS
          </a>
        </div>
        <div style={{ position: "absolute", bottom: 0, zIndex: 1 }}>
          {MAIL_NAME}
        </div>
        <div className="app-bg-overlay"></div>
      </section>
    </ContainerComponent>
  );
}

export default HomePage;
