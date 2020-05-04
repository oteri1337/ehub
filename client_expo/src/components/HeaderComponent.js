import React from "react";
import { AppContext } from "../providers/AppProvider";
import { getRequest } from "../providers/functions/http";
import { Header, Item, Icon, Input } from "native-base";

function HeaderComponent({ navigation }) {
  const { state, callReducer } = React.useContext(AppContext);

  const signOut = async () => {
    callReducer({ dispatch: "UPDATE_USER", data: false });
    await getRequest("/api/users/auth/signout");
  };

  return (
    <Header
      androidStatusBarColor="#FFF"
      iosBarStyle="dark-content"
      transparent
      searchBar
      style={{
        height: 80,
        // paddingLeft: 10,
        // paddingRight: 10,
      }}
    >
      <Item
        bordered
        rounded
        style={{
          height: 50,
          borderRadius: 10,
          backgroundColor: "#fff",
        }}
      >
        <Icon name="ios-menu" onPress={() => navigation.openDrawer()} />
        <Input placeholder="Search" />
        <Icon name="ios-search" />
      </Item>
    </Header>
  );
}

export default HeaderComponent;
