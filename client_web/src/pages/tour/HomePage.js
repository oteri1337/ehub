import React from "react";
import s1 from "../../assets/images/s1.jpeg";
import s2 from "../../assets/images/s2.jpeg";
import s3 from "../../assets/images/s3.jpeg";
import s4 from "../../assets/images/s4.jpeg";

import s5 from "../../assets/images/s5.jpeg";
import s6 from "../../assets/images/s6.jpeg";
import s7 from "../../assets/images/s7.jpeg";
import s8 from "../../assets/images/s8.jpeg";

import s9 from "../../assets/images/s9.jpeg";
import s10 from "../../assets/images/s10.jpeg";
import s11 from "../../assets/images/s11.jpeg";
import s12 from "../../assets/images/s12.jpeg";

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
            href="https://exp-shell-app-assets.s3.us-west-1.amazonaws.com/android/%40oteri2021/eHUB-956471d948da423b9a164ca5c3afa0a9-signed.apk"
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
      <section>
        <div>
          <center>
            <div className="row">
              <div className="col l3 s12 app-my-3">
                <img src={s1} style={{ maxHeight: "100vh" }} />
              </div>
              <div className="col l3 s12 app-my-3">
                <img src={s2} style={{ maxHeight: "100vh" }} />
              </div>
              <div className="col l3 s12 app-my-3">
                <img src={s3} style={{ maxHeight: "100vh" }} />
              </div>
              <div className="col l3 s12 app-my-3">
                <img src={s4} style={{ maxHeight: "100vh" }} />
              </div>

              <div className="col l3 s12 app-my-3">
                <img src={s5} style={{ maxHeight: "100vh" }} />
              </div>
              <div className="col l3 s12 app-my-3">
                <img src={s6} style={{ maxHeight: "100vh" }} />
              </div>
              <div className="col l3 s12 app-my-3">
                <img src={s7} style={{ maxHeight: "100vh" }} />
              </div>
              <div className="col l3 s12 app-my-3">
                <img src={s8} style={{ maxHeight: "100vh" }} />
              </div>

              <div className="col l3 s12 app-my-3">
                <img src={s9} style={{ maxHeight: "100vh" }} />
              </div>
              <div className="col l3 s12 app-my-3">
                <img src={s10} style={{ maxHeight: "100vh" }} />
              </div>
              <div className="col l3 s12 app-my-3">
                <img src={s11} style={{ maxHeight: "100vh" }} />
              </div>
              <div className="col l3 s12 app-my-3">
                <img src={s12} style={{ maxHeight: "100vh" }} />
              </div>
            </div>
          </center>
        </div>
      </section>
    </ContainerComponent>
  );
}

export default HomePage;
