import React from "react";
import HeaderComponent from "../../components/HeaderComponent";
import { Container, Content, Text } from "native-base";

function UsersPage({ navigation }) {
  return (
    <Container>
      <HeaderComponent navigation={navigation} />
      <Content padder>
        <Text>Community</Text>
      </Content>
    </Container>
  );
}

export default UsersPage;
