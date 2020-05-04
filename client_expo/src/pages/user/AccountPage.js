import React from "react";
import HeaderComponent from "../../components/HeaderComponent";
import { Container, Content, Text } from "native-base";

function ProfilePage({ navigation }) {
  return (
    <Container>
      <HeaderComponent navigation={navigation} />
      <Content padder>
        <Text>My Profile</Text>
      </Content>
    </Container>
  );
}

export default ProfilePage;
