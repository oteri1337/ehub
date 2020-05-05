import React from "react";
import { BACKEND_URL } from "../../../../env";
import { AppContext } from "../../../providers/AppProvider";
import HeaderComponent from "../../../components/HeaderComponent";
import { Container, Content, Text, Thumbnail, View, Button } from "native-base";

function ProfilePage({ navigation }) {
  const { state } = React.useContext(AppContext);
  const {
    email,
    first_name,
    last_name,
    department,
    photo_profile,
  } = state.user;

  return (
    <Container>
      <HeaderComponent navigation={navigation} />
      <Content padder>
        <Text>MY PROFILE</Text>
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
      </Content>
    </Container>
  );
}

export default ProfilePage;
