import React from "react";
import { Icon } from "native-base";
import { AppContext } from "../providers/AppProvider";
import { getRequest } from "../providers/functions/http";
import { createStackNavigator } from "@react-navigation/stack";
import {
  createDrawerNavigator,
  DrawerContentScrollView,
  DrawerItem,
} from "@react-navigation/drawer";

import HomePage from "../pages/HomePage";
import SignUpPage from "../pages/SignUpPage";
import PasswordPage from "../pages/PasswordPage";

import UserHomePage from "../pages/user/UserHomePage";
import AccountPage from "../pages/user/account/AccountPage";
import ProfilePage from "../pages/user/account/ProfilePage";
import MessagesPage from "../pages/user/account/MessagesPage";

import PdfgroupsPage from "../pages/user/PdfgroupsPage";
import PdfgroupsReadPage from "../pages/user/PdfgroupsReadPage";
import PdfsReadPage from "../pages/user/PdfsReadPage";
import SavedPdfsPage from "../pages/user/SavedPdfsPage";

import NewsPage from "../pages/user/NewsPage";
import NewsReadPage from "../pages/user/NewsReadPage";

import TopicsPage from "../pages/user/TopicsPage";
import TopicsCreatePage from "../pages/user/TopicsCreatePage";

import UsersPage from "../pages/user/UsersPage";
import UsersReadPage from "../pages/user/UsersReadPage";

const Stack = createStackNavigator();
const Drawer = createDrawerNavigator();

function Link({ label, icon = "ios-qr-scanner", onPress }) {
  return (
    <DrawerItem
      label={label}
      icon={({ focused, color, size }) => (
        <Icon
          size={size}
          name={focused ? icon : icon}
          // style={{ color: "rgba(28, 28, 30, 0.68)" }}
        />
      )}
      onPress={onPress}
    />
  );
}

function DrawerContentComponent(props) {
  const navigation = props.navigation;
  const { state, callReducer } = React.useContext(AppContext);
  const { first_name, last_name, department } = state.user;

  const signOut = async () => {
    callReducer({ dispatch: "UPDATE_USER", data: false });
    await getRequest("/api/users/auth/signout");
  };

  const goto = (page) => {
    navigation.navigate(page);
  };

  // prettier-ignore
  return (
    <DrawerContentScrollView {...props}>
      <Link onPress={() => goto("ProfilePage")} label={`${first_name} ${last_name}`} icon="ios-contact" />
      <Link onPress={() => goto("PdfgroupsPage")} label="Library" icon="ios-copy" />
      <Link onPress={() => goto("NewsPage")} label="News" icon="ios-image" />
      <Link onPress={() => goto("TopicsPage")} label="Forum" icon="md-chatboxes" />
      <Link onPress={() => goto("UsersPage")} label="Community" icon="ios-contacts" />
      <Link onPress={() => goto("MessagesPage")} label="Messages" icon="md-mail"/>      
      <Link onPress={() => goto("SavedPdfsPage")} label="Downloads" icon="ios-save"/>
      <Link onPress={() => goto("AccountPage")} label="My Account" icon="ios-construct"/>
      <Link onPress={signOut} label="Sign Out" icon="md-power" />
    </DrawerContentScrollView>
  );
}

function Routes() {
  const { state } = React.useContext(AppContext);

  if (state.user ?? false) {
    // prettier-ignore
    return (
      <Drawer.Navigator drawerContent={(props) => <DrawerContentComponent {...props} />}>
        <Drawer.Screen name="HomePage" component={UserHomePage} />
        <Drawer.Screen name="AccountPage" component={AccountPage} />
        <Drawer.Screen name="ProfilePage" component={ProfilePage} />
        <Drawer.Screen name="MessagesPage" component={MessagesPage} />

        <Drawer.Screen name="PdfgroupsPage" component={PdfgroupsPage} />
        <Drawer.Screen name="PdfgroupsReadPage" component={PdfgroupsReadPage} />
        <Drawer.Screen name="PdfsReadPage" component={PdfsReadPage} />
        <Drawer.Screen name="SavedPdfsPage" component={SavedPdfsPage} />

        <Drawer.Screen name="NewsPage" component={NewsPage} />
        <Drawer.Screen name="NewsReadPage" component={NewsReadPage} />

        <Drawer.Screen name="TopicsPage" component={TopicsPage} />
        <Drawer.Screen name="TopicsCreatePage" component={TopicsCreatePage} />

        <Drawer.Screen name="UsersPage" component={UsersPage} />
        <Drawer.Screen name="UsersReadPage" component={UsersReadPage} />
      </Drawer.Navigator>
    );
  }

  return (
    <Stack.Navigator headerMode="none">
      <Stack.Screen name="HomePage" component={HomePage} />
      <Stack.Screen name="SignUpPage" component={SignUpPage} />
      <Stack.Screen name="PasswordPage" component={PasswordPage} />
    </Stack.Navigator>
  );
}

export default Routes;
