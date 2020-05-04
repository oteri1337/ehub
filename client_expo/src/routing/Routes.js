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
import SignUpPage from "../pages/auth/SignUpPage";

import UserHomePage from "../pages/user/UserHomePage";

import PdfsReadPage from "../pages/user/PdfsReadPage";
import SavedPdfsPage from "../pages/user/SavedPdfsPage";
import PdfgroupsPage from "../pages/user/PdfgroupsPage";
import PdfgroupsReadPage from "../pages/user/PdfgroupsReadPage";

import NewsPage from "../pages/user/NewsPage";
import ForumPage from "../pages/user/ForumPage";
import AccountPage from "../pages/user/AccountPage";
import UsersPage from "../pages/user/UsersPage";

const Stack = createStackNavigator();
const Drawer = createDrawerNavigator();

function Link({ label, icon = "ios-qr-scanner", onPress }) {
  return (
    <DrawerItem
      label={label}
      icon={({ focused, color, size }) => (
        <Icon color={color} size={size} name={focused ? icon : icon} />
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
      <Link onPress={() => goto("AccountPage")} label={`${first_name} ${last_name}`} icon="ios-contact" />
      <Link onPress={() => goto("PdfgroupsPage")} label="E Library" icon="ios-copy" />
      <Link onPress={() => goto("SavedPdfsPage")} label="Downloads" icon="ios-save"/>
      <Link onPress={() => goto("NewsPage")} label="News" icon="ios-image" />
      <Link onPress={() => goto("ForumPage")} label="Forum" icon="md-chatboxes" />
      <Link onPress={() => goto("UsersPage")} label="Community" icon="ios-contacts" />
      <Link onPress={() => goto("AccountPage")} label="Inbox" icon="md-mail"/>      
      <Link onPress={() => goto("AccountPage")} label="My Account" icon="ios-construct"/>
      <Link onPress={signOut} label="Signout" icon="md-power" />
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
        
        <Drawer.Screen name="PdfsReadPage" component={PdfsReadPage} />
        <Drawer.Screen name="SavedPdfsPage" component={SavedPdfsPage} />
        <Drawer.Screen name="PdfgroupsPage" component={PdfgroupsPage} />
        <Drawer.Screen name="PdfgroupsReadPage" component={PdfgroupsReadPage} />

        <Drawer.Screen name="NewsPage" component={NewsPage} />
        <Drawer.Screen name="ForumPage" component={ForumPage} />
        <Drawer.Screen name="AccountPage" component={AccountPage} />
        <Drawer.Screen name="UsersPage" component={UsersPage} />
      </Drawer.Navigator>
    );
  }

  return (
    <Stack.Navigator headerMode="none">
      <Stack.Screen name="HomePage" component={HomePage} />
      <Stack.Screen name="SignUpPage" component={SignUpPage} />
    </Stack.Navigator>
  );
}

export default Routes;
