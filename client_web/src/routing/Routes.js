import React from "react";
import { Switch, Route } from "react-router-dom";

import AdminRoute from "./AdminRoute";
import GuestAdminRoute from "./GuestAdminRoute";

import HomePage from "../pages/tour/HomePage";
import ErrorPage from "../pages/tour/ErrorPage";
import SignInPage from "../pages/tour/auth/SignInPage";
import DeveloperPage from "../pages/tour/DeveloperPage";
import ScreenshotsPage from "../pages/tour/ScreeenshotsPage";
import PrivacyPolicyPage from "../pages/tour/PrivacyPolicyPage";

import AdminHomePage from "../pages/admin/AdminHomePage";
import AdminSigninPage from "../pages/admin/AdminSignInPage";
import AdminPasswordPage from "../pages/admin/auth/AdminPasswordPage";

import AdminAccountPage from "../pages/admin/auth/AdminAccountPage";
import AdminPasswordLoggedPage from "../pages/admin/auth/AdminPasswordLoggedPage";

import TopicsListPage from "../pages/admin/topics/TopicsListPage";
import TopicsReadPage from "../pages/admin/topics/TopicsReadPage";
import TopicsUpdatePage from "../pages/admin/topics/TopicsUpdatePage";

import UsersListPage from "../pages/admin/users/UsersListPage";
import UsersReadPage from "../pages/admin/users/UsersReadPage";
import UsersSendPushPage from "../pages/admin/users/message/SendPushPage";
import UsersSendEmailPage from "../pages/admin/users/message/SendEmailPage";

import EventsListPage from "../pages/admin/events/EventsListPage";
import EventsReadPage from "../pages/admin/events/EventsReadPage";
import EventsCreatePage from "../pages/admin/events/EventsCreatePage";
import EventsUpdatePage from "../pages/admin/events/EventsUpdatePage";
import EventsUpdateImagePage from "../pages/admin/events/EventsUpdateImagePage";

import PdfsHomePage from "../pages/admin/pdfs/PdfsHomePage";
import PdfsListPage from "../pages/admin/pdfs/PdfsListPage";
import PdfsReadPage from "../pages/admin/pdfs/PdfsReadPage";
import PdfsCreatePage from "../pages/admin/pdfs/PdfsCreatePage";
import PdfsUpdatePage from "../pages/admin/pdfs/PdfsUpdatePage";
import PdfsUpdateFilePage from "../pages/admin/pdfs/PdfsUpdateFilePage";
import PdfsUpdateImagePage from "../pages/admin/pdfs/PdfsUpdateImagePage";
import PdfsUpdateGroupsPage from "../pages/admin/pdfs/PdfsUpdateGroupsPage";

import PdfGroupsListPage from "../pages/admin/pdfs/groups/PdfGroupsListPage";
import PdfGroupsCreatePage from "../pages/admin/pdfs/groups/PdfGroupsCreatePage";
import PdfGroupsUpdatePage from "../pages/admin/pdfs/groups/PdfGroupsUpdatePage";

import PdfParentGroupsListPage from "../pages/admin/pdfs/pdfparentgroups/PdfparentGroupsListPage";
import PdfParentGroupsCreatePage from "../pages/admin/pdfs/pdfparentgroups/PdfparentGroupsCreatePage";
import PdfParentGroupsUpdatePage from "../pages/admin/pdfs/pdfparentgroups/PdfparentGroupsUpdatePage";

function Routes() {
  // prettier-ignore
  return (
      <Switch>
        <Route exact path="/" component={HomePage} />
        <Route exact path="/index.html" component={HomePage} />
        <Route exact path="/signin.html" component={SignInPage} />
        <Route exact path="/developer.html" component={DeveloperPage} />
        <Route exact path="/privacy-policy.html" component={PrivacyPolicyPage} />
        <Route exact path="/screenshots.html" component={ScreenshotsPage} />

        <GuestAdminRoute exact path="/control/signin.html" component={AdminSigninPage} />        
        <GuestAdminRoute exact path="/control/password.html" component={AdminPasswordPage} />

        <AdminRoute exact path="/control/index.html" component={AdminHomePage} />
        <AdminRoute exact path="/control/account/password.html" component={AdminPasswordLoggedPage} />
        
        <AdminRoute exact path="/control/account/index.html" component={AdminAccountPage} />

        <AdminRoute exact path="/control/events/list.html" component={EventsListPage} />
        <AdminRoute exact path="/control/events/create.html" component={EventsCreatePage} />
        <AdminRoute exact path="/control/events/:id" component={EventsReadPage} />
        <AdminRoute exact path="/control/events/:id/updateimage" component={EventsUpdateImagePage} />
        <AdminRoute exact path="/control/events/:id/update" component={EventsUpdatePage} />

        <AdminRoute exact path="/control/topics/list.html" component={TopicsListPage} />
        <AdminRoute exact path="/control/topics/:id" component={TopicsReadPage} />
        <AdminRoute exact path="/control/topics/:id/update" component={TopicsUpdatePage} />

        <AdminRoute exact path="/control/users/list.html" component={UsersListPage} />
        <AdminRoute exact path="/control/users/:id" component={UsersReadPage} />
        <AdminRoute exact path="/control/users/:id/push" component={UsersSendPushPage} />
        <AdminRoute exact path="/control/users/:id/email" component={UsersSendEmailPage} />

        <AdminRoute exact path="/control/pdfs/index.html" component={PdfsHomePage} />
        <AdminRoute exact path="/control/pdfs/list.html" component={PdfsListPage} />
        <AdminRoute exact path="/control/pdfs/create.html" component={PdfsCreatePage} />
        <AdminRoute exact path="/control/pdfs/:slug" component={PdfsReadPage} />
        <AdminRoute exact path="/control/pdfs/:slug/update" component={PdfsUpdatePage} />
        <AdminRoute exact path="/control/pdfs/:slug/update-file" component={PdfsUpdateFilePage} />
        <AdminRoute exact path="/control/pdfs/:slug/update-image" component={PdfsUpdateImagePage} />
        <AdminRoute exact path="/control/pdfs/:slug/update-groups" component={PdfsUpdateGroupsPage} />

        <AdminRoute exact path="/control/pdfgroups/list.html" component={PdfGroupsListPage} />
        <AdminRoute exact path="/control/pdfgroups/create.html" component={PdfGroupsCreatePage} />
        <AdminRoute exact path="/control/pdfgroups/:slug" component={PdfGroupsUpdatePage} />

        <AdminRoute exact path="/control/pdfparentgroups/list.html" component={PdfParentGroupsListPage} />
        <AdminRoute exact path="/control/pdfparentgroups/create.html" component={PdfParentGroupsCreatePage} />
        <AdminRoute exact path="/control/pdfparentgroups/:slug" component={PdfParentGroupsUpdatePage} />

        <Route component={ErrorPage} />
      </Switch>
  );
}

export default Routes;
