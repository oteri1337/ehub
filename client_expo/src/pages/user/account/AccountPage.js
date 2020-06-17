import React from "react";
import { BACKEND_URL } from "../../../../env";
import { useNavigation } from "@react-navigation/native";
import { AppContext } from "../../../providers/AppProvider";
import {
  Container,
  Content,
  Text,
  List,
  ListItem,
  Left,
  Icon,
  Body,
  Button,
  Right,
  H1,
  View,
  Thumbnail,
} from "native-base";

function Li({ text = "", icon = "ios-today", color, to }) {
  const navigation = useNavigation();

  const onPress = () => {
    if (to) {
      navigation.navigate(to);
    }
  };

  return (
    <ListItem icon onPress={onPress}>
      <Left>
        <Button style={{ backgroundColor: color || "#FF9501" }}>
          <Icon active name={icon} />
        </Button>
      </Left>
      <Body>
        <Text>{text}</Text>
      </Body>
      <Right>
        <Icon active name="arrow-forward" />
      </Right>
    </ListItem>
  );
}

function AccountPage({ navigation }) {
  navigation.setOptions({ title: "My Account" });

  const { state, callReducer } = React.useContext(AppContext);
  const { first_name, last_name, photo_profile, department } = state.user;

  const uri = `${BACKEND_URL}/uploads/images/${photo_profile}`;

  const signOut = () => {
    callReducer({ dispatch: "UPDATE_USER", data: false });
  };

  return (
    <Container>
      {/* <HeaderComponent navigation={navigation} title="My Account" /> */}
      <Content>
        <View
          style={{ paddingBottom: 15, paddingTop: 15, alignItems: "center" }}
        >
          <Thumbnail
            large
            source={{ uri }}
            style={{ backgroundColor: "silver" }}
          />
          <H1 style={{ textAlign: "center", fontWeight: "bold" }}>
            {first_name} {last_name}
          </H1>

          <Text>{department}</Text>
        </View>
        <List>
          <Li to="ChangeEmailPage" text="Change Email" icon="ios-mail" />

          <Li
            to="UpdateProfilePage"
            text="Update Profile"
            icon="md-person"
            color="purple"
          />

          <Li
            to="ChangePasswordPage"
            color="#007AFF"
            text="Change Password"
            icon="ios-lock"
          />

          <Li
            color="green"
            to="ChangePhotoPage"
            text="Change Profile Photo"
            icon="ios-aperture"
          />

          <ListItem icon onPress={signOut}>
            <Left>
              <Button style={{ backgroundColor: "red" }}>
                <Icon active name="ios-power" />
              </Button>
            </Left>
            <Body>
              <Text>Sign Out</Text>
            </Body>
            <Right>
              <Icon active name="arrow-forward" />
            </Right>
          </ListItem>
        </List>
      </Content>
    </Container>
  );
}

export default AccountPage;
