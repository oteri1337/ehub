import React from "react";
import { Container, Content, Text } from "native-base";
import HeaderComponent from "../../components/HeaderComponent";

function SavedPdfsPage({ navigation }) {
  return (
    <Container>
      <HeaderComponent navigation={navigation} />
      <Content padder>
        <Text>Offline Reading</Text>
      </Content>
    </Container>
  );
}

export default SavedPdfsPage;
