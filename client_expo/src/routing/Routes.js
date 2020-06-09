import React from "react";
import { Platform } from "react-native";
import { AppContext } from "../providers/AppProvider";
import {
  createStackNavigator,
  CardStyleInterpolators,
} from "@react-navigation/stack";

import HomePage from "../pages/HomePage";
import SignUpPage from "../pages/SignUpPage";
import PasswordPage from "../pages/PasswordPage";

import TabRoutes from "./TabRoutes";
import SearchPage from "../pages/user/SearchPage";
import UsersReadPage from "../pages/user/UsersReadPage";

import PdfsReadPage from "../pages/user/PdfsReadPage";
import PdfsPreviewPage from "../pages/user/PdfsPreviewPage";

import TopicsReadPage from "../pages/user/TopicsReadPage";
import TopicsCreatePage from "../pages/user/TopicsCreatePage";

import AccountPage from "../pages/user/account/AccountPage";
import UploadPhotoPage from "../pages/user/account/UploadPhotoPage";
import ChangeAvatarPage from "../pages/user/account/ChangeAvatarPage";
import ChangeEmailPage from "../pages/user/account/ChangeEmailPage";
import ChangePasswordPage from "../pages/user/account/ChangePasswordPage";

const Stack = createStackNavigator();
const { Navigator, Screen } = Stack;

function Routes() {
  const { state } = React.useContext(AppContext);

  let modalNav = {
    cardStyleInterpolator: CardStyleInterpolators.forModalPresentationIOS,
  };

  const onPress = () => {
    navigation.navigate("AccountPage");
  };

  if (Platform.OS == "ios") {
    modalNav = {};
  }

  // prettier-ignore
  if (state.user ?? false) {
    return <Navigator>
        <Screen name="TabRoutes" component={TabRoutes} />
        <Screen name="SearchPage" component={SearchPage}/>
        <Screen name="PdfsReadPage" component={PdfsReadPage}/>
        <Screen name="AccountPage" component={AccountPage} options={{...modalNav, title: "My Account"}} />
        <Screen name="UsersReadPage" component={UsersReadPage} />
        <Screen name="TopicsReadPage" component={TopicsReadPage}  />
        <Screen name="PdfsPreviewPage" component={PdfsPreviewPage} />
        <Screen name="TopicsCreatePage" component={TopicsCreatePage} options={{title: "New Topic"}} />
        <Screen name="UploadPhotoPage" component={UploadPhotoPage} options={{...modalNav,title: "Upload Photo"}} />
        <Screen name="ChangeAvatarPage" component={ChangeAvatarPage} options={{...modalNav, title: "Change Avatar"}} />
        <Screen name="ChangeEmailPage" component={ChangeEmailPage} options={{...modalNav, title: "Change Email"}} />
        <Screen name="ChangePasswordPage" component={ChangePasswordPage} options={{...modalNav, title: "Change Password"}} />
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
