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

import TopicsReadPage from "../pages/user/TopicsReadPage";
import TopicsCreatePage from "../pages/user/TopicsCreatePage";

import PdfsReadPage from "../pages/user/pdfs/PdfsReadPage";
import PdfsPreviewPage from "../pages/user/pdfs/PdfsPreviewPage";

import UsersReadPage from "../pages/user/UsersReadPage";
import ChatsReadPage from "../pages/user/ChatsReadPage";

import SearchPage from "../pages/user/pdfs/SearchPage";
import AccountPage from "../pages/user/account/AccountPage";
import ChangeEmailPage from "../pages/user/account/ChangeEmailPage";
import ChangePhotoPage from "../pages/user/account/ChangePhotoPage";
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

        <Screen name="TopicsReadPage" component={TopicsReadPage}  />
        <Screen name="TopicsCreatePage" component={TopicsCreatePage} />

        <Screen name="PdfsReadPage" component={PdfsReadPage}/>
        <Screen name="PdfsPreviewPage" component={PdfsPreviewPage} />

        <Screen name="UsersReadPage" component={UsersReadPage} />
        <Screen name="ChatsReadPage" component={ChatsReadPage} />

        <Screen name="SearchPage" component={SearchPage}/>
        <Screen name="AccountPage" component={AccountPage} options={{...modalNav}} />
        <Screen name="ChangePhotoPage" component={ChangePhotoPage} options={{...modalNav}} />
        <Screen name="ChangeEmailPage" component={ChangeEmailPage} options={{...modalNav}} />
        <Screen name="ChangePasswordPage" component={ChangePasswordPage} options={{...modalNav}} /> 
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
