import React from "react";
import TourContainerComponent from "components/container/TourContainerComponent";

function PrivacyPolicyPage() {
  return (
    <TourContainerComponent>
      <div className="row app-py-3">
        <div className="col l10 offset-l1 s12">
          <h2 className="center">Privacy Policy</h2>
          <br />

          <div className="container">
            <div className="card-panel ">
              <b>Data Policy</b>
              <p>
                Data inludes information provided when a user registers on the
                app, and others generated while using the app. We do not sell
                user data to third parties and we do not use user data for our
                own profit.
              </p>
              <br />

              <b>Cookie Policy</b>
              <p>
                A cookie is a small piece of data stored on a user's mobile app,
                we only use cookies to maintain a user's session so they do not
                have to log in to the app each time they open it.
              </p>

              <br />
              <b>Advertisement Policy</b>
              <p>
                We have no promotional content or advertisement to a paid
                product or service on the app. We do not allow third parties to
                place promotional content on the app in an automated form such
                as using an Ad Network.
              </p>
            </div>
          </div>
        </div>
      </div>
    </TourContainerComponent>
  );
}

export default PrivacyPolicyPage;
