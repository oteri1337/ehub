import React from "react";
import { Platform } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { Header, Body, Title, Icon, Right, Button, Left } from "native-base";

function HeaderComponent({ title = "eHUB", page, icon }) {
  const navigation = useNavigation();

  let iconStyle = {};

  let leftAndBody = () => {
    return (
      <React.Fragment>
        <Left />
        <Body>
          <Title>{title}</Title>
        </Body>
      </React.Fragment>
    );
  };

  let iosBarStyle = "dark-content";

  if (Platform.OS == "android") {
    iconStyle = { color: "white" };

    iosBarStyle = "light-content";

    leftAndBody = () => {
      return (
        <Body>
          <Title>{title}</Title>
        </Body>
      );
    };
  }

  const onPress = () => {
    navigation.navigate(page || "AccountPage");
  };

  return (
    <Header iosBarStyle={iosBarStyle}>
      {leftAndBody()}
      <Right>
        <Button transparent onPress={onPress}>
          <Icon name={icon || "ios-contact"} style={iconStyle} />
        </Button>
      </Right>
    </Header>
  );
}

export default HeaderComponent;
