import React from "react";
import { BACKEND_URL } from "../../../../env";
import { Store } from "../../../providers/AppProvider";
import { useNavigation } from "@react-navigation/native";
import CachedThumbnail from "../../components/CachedThumbnail";
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
} from "native-base";

function Li({ text = "", icon = "ios-today", color, to, param = {} }) {
  // const navigation = useNavigation();

  const onPress = () => {
    // if (to) {
    //   navigation.navigate(to, param);
    // }
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
  // React.useLayoutEffect(() => {
  //   navigation.setOptions({ title: "My Account" });

  //   return () => {
  //     console.log("un mounting");
  //   };
  // }, []);

  const { state, signOut } = React.useContext(Store);

  const {
    first_name = "",
    last_name = "",
    photo_profile = "",
    email = "",
  } = state?.user ?? {
    first_name: "",
    last_name: "",
    photo_profile: "",
    email: "",
  };

  const uri = `${BACKEND_URL}/uploads/images/${photo_profile}`;

  return (
    <Container>
      <Content>
        <View
          style={{ paddingBottom: 15, paddingTop: 15, alignItems: "center" }}
        >
          <CachedThumbnail
            large
            source={{ uri }}
            style={{ backgroundColor: "silver" }}
          />
          <H1 style={{ textAlign: "center", fontWeight: "bold" }}>
            {first_name} {last_name}
          </H1>

          <Text>{email}</Text>
        </View>
        <List>
          {/* <Li
            to="UsersReadPage"
            text="View Profile"
            icon="md-person"
            color="black"
            param={state.user}
          /> */}

          <Li to="ChangeEmailPage" text="Change Email" icon="ios-mail" />

          <Li
            to="UpdateProfilePage"
            text="Update Profile"
            icon="md-person-add"
            color="purple"
          />

          <Li
            to="ChangePasswordPage"
            color="#007AFF"
            text="Update Password"
            icon="ios-lock"
          />

          {/* <Li
            color="grey"
            to="ChangePhotoPage"
            text="Notification Settings"
            icon="ios-notifications"
          /> */}

          <Li
            color="green"
            to="ChangePhotoPage"
            text="Update Profile Photo"
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

      <Text note style={{ textAlign: "center", marginBottom: 10 }}>
        contact info@ehubcore.com for help and feedback
      </Text>
    </Container>
  );
}

export default AccountPage;
