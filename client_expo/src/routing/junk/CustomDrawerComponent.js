import React from "react";
import { getRequest } from "../providers/functions/http";
import { DrawerContentScrollView } from "@react-navigation/drawer";
import Link from "./Link";

function CustomDrawerComponent(props) {
  const navigation = props.navigation;
  const { state, callReducer } = React.useContext(Store);
  const { first_name, last_name, department } = state.user;

  const signOut = async () => {
    callReducer({ dispatch: "UPDATE_USER", data: false });
    await getRequest("/api/users/auth/signout");
  };

  const goto = (page) => {
    navigation.navigate(page);
  };

  console.log(props.descriptors);

  // prettier-ignore
  return (
      <DrawerContentScrollView {...props}>      
        <Link onPress={() => goto("PdfRoutes")} label="Library" icon="ios-copy" />
        <Link onPress={() => goto("NewsRoutes")} label="News" icon="ios-image" />
        <Link onPress={() => goto("TopicsRoutes")} label="Forum" icon="md-chatboxes" />
        <Link onPress={() => goto("UsersRoutes")} label="Community" icon="ios-contacts" />
        <Link onPress={() => goto("MessagesPage")} label="Messages" icon="md-mail"/>      
        <Link onPress={() => goto("SavedPdfsPage")} label="Downloads" icon="ios-save"/>
        <Link onPress={() => goto("AccountRoutes")} label="My Account" icon="ios-construct"/>
        <Link onPress={() => goto("AccountRoutes")} label={`${first_name} ${last_name}`} icon="ios-contact" />
        <Link onPress={signOut} label="Sign Out" icon="md-power" />
      </DrawerContentScrollView>
    );
}

export default CustomDrawerComponent;
