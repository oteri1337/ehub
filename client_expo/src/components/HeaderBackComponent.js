import React from "react";
import { Platform } from "react-native";
import { useNavigation } from "@react-navigation/native";
import {
  Header,
  Body,
  Title,
  Icon,
  Right,
  Button,
  Left,
  Text,
} from "native-base";

function HeaderComponent({ title = "eHUB", arrowBackPressed = false }) {
  const navigation = useNavigation();

  arrowBackPressed =
    arrowBackPressed ||
    function () {
      navigation.goBack();
    };

  let iconStyle = {};

  let bodyStyle = {
    flex: 3,
  };

  let textStyle = {};

  let iosBarStyle = "dark-content";

  if (Platform.OS == "android") {
    iosBarStyle = "light-content";

    iconStyle = { color: "white" };

    bodyStyle = { flex: 3 };

    textStyle = { color: "white" };
  }

  return (
    <Header iosBarStyle={iosBarStyle}>
      <Left>
        <Button transparent onPress={arrowBackPressed}>
          <Icon name="arrow-back" />
        </Button>
      </Left>
      <Body style={bodyStyle}>
        <Text style={textStyle}>{title}</Text>
      </Body>
    </Header>
  );
}

export default HeaderComponent;
