import React from "react";
import { ImageBackground } from "react-native";
import { BACKEND_URL } from "../../../env";
import { AppContext } from "../../providers/AppProvider";
import HeaderComponent from "../../components/HeaderBackComponent";
import {
  Container,
  Button,
  View,
  Thumbnail,
  Text,
  List,
  ListItem,
  Body,
} from "native-base";

function UsersReadPage({ navigation, route }) {
  const {
    email,
    first_name,
    last_name,
    department,
    photo_profile,
  } = route.params;
  const { state } = React.useContext(AppContext);

  return (
    <Container>
      <HeaderComponent
        navigation={navigation}
        title={`${first_name} ${last_name}`}
      />
      <View style={{ flex: 1 }}>
        <View style={{ flex: 2, backgroundColor: "red" }}>
          <ImageBackground
            style={{ width: "100%", height: "100%" }}
            source={{ uri: `${BACKEND_URL}/uploads/images/${photo_profile}` }}
          />
        </View>
        <View style={{ flex: 1, padding: 15 }}>
          <List>
            <ListItem>
              <Body>
                <Text>
                  {first_name} {last_name}
                </Text>
                {/* <Text>{email}</Text> */}
              </Body>
            </ListItem>
            <ListItem>
              <Body>
                <Text>{department}</Text>
              </Body>
            </ListItem>
            <ListItem>
              <Body>
                <Text>Forum Posts</Text>
              </Body>
            </ListItem>
          </List>
        </View>
      </View>
      <View>
        <Button rounded full>
          <Text>Send Message</Text>
        </Button>
      </View>
    </Container>
  );
}

export default UsersReadPage;
