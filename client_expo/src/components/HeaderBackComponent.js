import React from "react";
import { AppContext } from "../providers/AppProvider";
import { getRequest } from "../providers/functions/http";
import {
  Header,
  Left,
  Button,
  Icon,
  Right,
  Body,
  Title,
  Text,
} from "native-base";

function HeaderComponent({ navigation, title = "" }) {
  const { state, callReducer } = React.useContext(AppContext);

  const signOut = async () => {
    callReducer({ dispatch: "UPDATE_USER", data: false });
    await getRequest("/api/users/auth/signout");
  };

  return (
    <Header
      androidStatusBarColor="#FFF"
      style={{ paddingLeft: 15 }}
      transparent
    >
      <Left>
        <Button transparent onPress={() => navigation.goBack()}>
          <Icon name="arrow-back" style={{ color: "rgba(28, 28, 30, 0.68)" }} />
        </Button>
      </Left>
      <Body style={{ flex: 3 }}>
        <Text>{title}</Text>
      </Body>
      <Right>
        {/* <Button transparent>
          <Icon
            name="ios-save"
            style={{ color: "rgba(28, 28, 30, 0.68)", marginRight: 10 }}
          />

          <Icon
            name="ios-share-alt"
            style={{ color: "rgba(28, 28, 30, 0.68)", marginRight: 10 }}
          />
        </Button> */}
      </Right>
    </Header>
  );
}

export default HeaderComponent;
