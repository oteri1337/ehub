import React from "react";
import * as Linking from "expo-linking";
import { BACKEND_URL } from "../../../env";
import { ImageBackground } from "react-native";
import { AppContext } from "../../providers/AppProvider";
import { Container, Content, Button, View, Text, Icon } from "native-base";

function UsersReadPage({ navigation, route }) {
  const { state } = React.useContext(AppContext);

  const { params } = route;
  const {
    first_name,
    last_name,
    department,
    photo_profile,
    email,
    bio,
    link,
    id,
  } = params;

  navigation.setOptions({ title: `${first_name} ${last_name}` });

  const open = () => {
    Linking.openURL(link);
  };

  const onPress = () => {
    navigation.navigate("ChatsReadPage", {
      recvr: params,
      recvr_id: id,
    });
  };

  const renderMessageButton = () => {
    if (state.user.id === id) {
      return <React.Fragment />;
    }
    return (
      <Button bordered dark rounded full onPress={onPress}>
        <Text>Send Message</Text>
      </Button>
    );
  };

  return (
    <Container>
      <Content>
        <View style={{ height: 350, backgroundColor: "silver" }}>
          <ImageBackground
            style={{ width: "100%", height: "100%" }}
            source={{ uri: `${BACKEND_URL}/uploads/images/${photo_profile}` }}
          />
        </View>
        <View style={{ padding: 10 }}>
          {renderMessageButton()}

          <View
            style={{
              flex: 1,
              flexDirection: "row",
              marginBottom: 10,
              marginTop: 10,
            }}
          >
            <View style={{ flex: 1, alignItems: "center" }}>
              <Icon
                name="award"
                type="Feather"
                style={{ color: "black", fontSize: 20 }}
              />
            </View>
            <View style={{ flex: 4 }}>
              <Text style={{ color: "black" }}>{department}</Text>
            </View>
          </View>

          <View style={{ flex: 1, flexDirection: "row", marginBottom: 10 }}>
            <View style={{ flex: 1, alignItems: "center" }}>
              <Icon
                name="mail"
                type="Feather"
                style={{ color: "black", fontSize: 20 }}
              />
            </View>
            <View style={{ flex: 4 }}>
              <Text style={{ color: "black" }}>{email}</Text>
            </View>
          </View>

          <View style={{ flex: 1, flexDirection: "row", marginBottom: 10 }}>
            <View style={{ flex: 1, alignItems: "center" }}>
              <Icon
                name="link-2"
                type="Feather"
                style={{ color: "black", fontSize: 20 }}
              />
            </View>
            <View style={{ flex: 4 }}>
              <Text onPress={open} style={{ color: "black" }}>
                {link}
              </Text>
            </View>
          </View>
          <Text
            style={{
              marginBottom: 10,
              lineHeight: 25,
              marginLeft: 10,
              marginRight: 10,
            }}
          >
            {bio}
          </Text>
        </View>
      </Content>
    </Container>
  );
}

export default UsersReadPage;
