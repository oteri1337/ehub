import React from "react";
import { BACKEND_URL } from "../../../env";
import { ImageBackground } from "react-native";
import { Container, Button, View, Text, Icon } from "native-base";

function UsersReadPage({ navigation, route }) {
  const { first_name, last_name, department, photo_profile } = route.params;

  navigation.setOptions({ title: `${first_name} ${last_name}` });

  return (
    <Container>
      <View style={{ flex: 1 }}>
        <View style={{ flex: 2, backgroundColor: "red" }}>
          <ImageBackground
            style={{ width: "100%", height: "100%" }}
            source={{ uri: `${BACKEND_URL}/uploads/images/${photo_profile}` }}
          />
        </View>
        <View style={{ flex: 1, padding: 10 }}>
          <Text style={{ textAlign: "center", marginBottom: 5 }}>
            {department}
          </Text>
          <Text style={{ textAlign: "center" }}>
            bio goes here bio goes herebio goes herebio goes herebio goes
            herebio goes herebio goes herebio goes herebio goes herebio goes
          </Text>
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
