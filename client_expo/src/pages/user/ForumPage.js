import React from "react";
import HeaderComponent from "../../components/HeaderComponent";
import { Container, Content, Text, Fab, Button, Icon } from "native-base";

function ForumPage({ navigation }) {
  return (
    <Container>
      <HeaderComponent navigation={navigation} />
      <Content padder>
        <Text>Forum</Text>
        {/* <Fab>
          <Button disabled style={{ backgroundColor: "#DD5144" }}>
            <Icon name="mail" />
          </Button>
        </Fab> */}
      </Content>
    </Container>
  );
}

export default ForumPage;
