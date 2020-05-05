import React from "react";
import { BACKEND_URL } from "../../../env";
import { AppContext } from "../../providers/AppProvider";
import HeaderComponent from "../../components/HeaderBackComponent";
import { Container, Button, View, Thumbnail, Text } from "native-base";

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
        <View style={{ alignSelf: "center" }}>
          <Thumbnail
            large
            source={{
              uri: `${BACKEND_URL}/uploads/images/${photo_profile}`,
            }}
          />
        </View>

        <Text style={{ textAlign: "center", margin: 5 }}>
          {first_name} {last_name}
        </Text>
        <Text style={{ textAlign: "center", margin: 5 }}>{email}</Text>
        <Text style={{ textAlign: "center", margin: 5 }}>{department}</Text>
        <View style={{ alignSelf: "center", marginTop: 20 }}>
          <Button rounded full>
            <Text>Send Message</Text>
          </Button>
        </View>
      </View>
    </Container>
  );
}

export default UsersReadPage;
