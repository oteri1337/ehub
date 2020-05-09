import React from "react";
import { AppContext } from "../providers/AppProvider";
import { getRequest } from "../providers/functions/http";
import { createDrawerNavigator } from "@react-navigation/drawer";
import { DrawerContentScrollView } from "@react-navigation/drawer";

import Link from "./Link";
import PdfsRoutes from "./PdfsRoutes";
import TourRoutes from "./TourRoutes";
import NewsRoutes from "./NewsRoutes";
import UsersRoutes from "./UsersRoutes";
import TopicsRoutes from "./TopicsRoutes";
import AccountRoutes from "./AccountRoutes";

import SavedPdfsPage from "../pages/user/SavedPdfsPage";
import MessagesPage from "../pages/user/account/MessagesPage";

const Drawer = createDrawerNavigator();

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
      <Link onPress={() => goto("AccountRoutes")} label={`${first_name} ${last_name}`} icon="ios-contact" />
      <Link onPress={() => goto("PdfRoutes")} label="Library" icon="ios-copy" />
      <Link onPress={() => goto("NewsRoutes")} label="News" icon="ios-image" />
      <Link onPress={() => goto("TopicsRoutes")} label="Forum" icon="md-chatboxes" />
      <Link onPress={() => goto("UsersRoutes")} label="Community" icon="ios-contacts" />
      <Link onPress={() => goto("MessagesPage")} label="Messages" icon="md-mail"/>      
      <Link onPress={() => goto("SavedPdfsPage")} label="Downloads" icon="ios-save"/>
      <Link onPress={() => goto("AccountRoutes")} label="My Account" icon="ios-construct"/>
      <Link onPress={signOut} label="Sign Out" icon="md-power" />
    </DrawerContentScrollView>
  );
}

function Routes() {
  const { state } = React.useContext(AppContext);

  if (state.user ?? false) {
    // prettier-ignore
    return (
      <Drawer.Navigator  initialRouteName="PdfRoutes" drawerContent={(props)  => <DrawerContentComponent {...props} />}>

        <Drawer.Screen name="PdfRoutes" component={PdfsRoutes} />

        <Drawer.Screen name="NewsRoutes" component={NewsRoutes} />

        <Drawer.Screen name="TopicsRoutes" component={TopicsRoutes} />

        <Drawer.Screen name="UsersRoutes" component={UsersRoutes} />

        <Drawer.Screen name="AccountRoutes" component={AccountRoutes} />

        <Drawer.Screen name="MessagesPage" component={MessagesPage} />

        <Drawer.Screen name="SavedPdfsPage" component={SavedPdfsPage} />

      </Drawer.Navigator>
    );
  }

  return <TourRoutes />;
}

export default Routes;
