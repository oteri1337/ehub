import React from "react";
import * as Linking from "expo-linking";
import { BACKEND_URL } from "../../../env";
import { ImageBackground } from "react-native";
import { AppContext } from "../../providers/AppProvider";
import { Container, Button, View, Text } from "native-base";

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
      <Button rounded full onPress={onPress}>
        <Text>Send Message</Text>
      </Button>
    );
  };

  return (
    <Container>
      <View style={{ flex: 1 }}>
        <View style={{ flex: 2, backgroundColor: "red" }}>
          <ImageBackground
            style={{ width: "100%", height: "100%" }}
            source={{ uri: `${BACKEND_URL}/uploads/images/${photo_profile}` }}
          />
        </View>
        <View style={{ flex: 1, padding: 10, alignItems: "center" }}>
          <Text style={{ marginBottom: 5 }}>{department}</Text>
          <Text style={{ marginBottom: 5 }}>{email}</Text>
          <Text style={{ marginBottom: 10 }}>{bio}</Text>
          <Text style={{ color: "blue" }} onPress={open}>
            {link.substring(0, 40)}
          </Text>
        </View>
      </View>
      <View>{renderMessageButton()}</View>
    </Container>
  );
}

export default UsersReadPage;
