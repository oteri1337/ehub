import React from "react";
import { Platform } from "react-native";
import { Store } from "../providers/AppProvider";
import {
  createStackNavigator,
  CardStyleInterpolators,
} from "@react-navigation/stack";

import HomePage from "../pages/HomePage";
import SignUpPage from "../pages/SignUpPage";
import PasswordPage from "../pages/PasswordPage";

import AccountPage from "../pages/user/account/AccountPage";
import ChangeEmailPage from "../pages/user/account/ChangeEmailPage";
import ChangePhotoPage from "../pages/user/account/UpdatePhotoPage";
import ChangePasswordPage from "../pages/user/account/UpdatePasswordPage";
import UpdateProfilePage from "../pages/user/account/UpdateProfilePage";

import TabRoutes from "./TabRoutes";

import SearchPage from "../pages/user/SearchPage";

import UsersReadPage from "../pages/user/UsersReadPage";
import ChatsReadPage from "../pages/user/ChatsReadPage";

import PdfsListPage from "../pages/user/pdfs/PdfsListPage";
import PdfsReadPage from "../pages/user/pdfs/PdfsReadPage";
import PdfsSavedPage from "../pages/user/pdfs/PdfsSavedPage";
import PdfsPreviewPage from "../pages/user/pdfs/PdfsPreviewPage";
import PdfsCommentPage from "../pages/user/pdfs/PdfsCommentPage";

import TopicsReadPage from "../pages/user/TopicsReadPage";
import TopicsCreatePage from "../pages/user/TopicsCreatePage";

import EventsReadPage from "../pages/user/EventsReadPage";
import CommentsReadPage from "../pages/user/CommentsReadPage";

const Stack = createStackNavigator();
const { Navigator, Screen } = Stack;

function Routes() {
  const { state } = React.useContext(Store);

  let modalNav = {
    cardStyleInterpolator: CardStyleInterpolators.forModalPresentationIOS,
  };

  if (Platform.OS == "ios") {
    modalNav = {};
  }

  // prettier-ignore
  if (state.user ?? false) {
    return <Navigator>
        <Screen name="TabRoutes" component={TabRoutes} />

        <Screen name="AccountPage" component={AccountPage} options={{...modalNav}} initialParams={{test: 1}} />
        <Screen name="ChangeEmailPage" component={ChangeEmailPage} options={{...modalNav}} />
        <Screen name="ChangePhotoPage" component={ChangePhotoPage} options={{...modalNav}} />
        <Screen name="ChangePasswordPage" component={ChangePasswordPage} options={{...modalNav}} /> 
        <Screen name="UpdateProfilePage" component={UpdateProfilePage} options={{...modalNav}} />

        <Screen name="SearchPage" component={SearchPage}/>

        <Screen name="UsersReadPage" component={UsersReadPage} />
        <Screen name="ChatsReadPage" component={ChatsReadPage} />

        <Screen name="PdfsListPage" component={PdfsListPage} />
        <Screen name="PdfsReadPage" component={PdfsReadPage}/>
        <Screen name="PdfsSavedPage" component={PdfsSavedPage}/>
        <Screen name="PdfsPreviewPage" component={PdfsPreviewPage} />
        <Screen name="PdfsCommentPage" component={PdfsCommentPage} />

        <Screen name="TopicsReadPage" component={TopicsReadPage}  />
        <Screen name="TopicsCreatePage" component={TopicsCreatePage} />

        <Screen name="EventsReadPage" component={EventsReadPage} />

        <Screen name="CommentsReadPage" component={CommentsReadPage} />

    </Navigator>
  }

  return (
    <Navigator headerMode="none">
      <Screen name="HomePage" component={HomePage} />
      <Screen name="SignUpPage" component={SignUpPage} />
      <Screen name="PasswordPage" component={PasswordPage} />
    </Navigator>
  );
}

export default Routes;
