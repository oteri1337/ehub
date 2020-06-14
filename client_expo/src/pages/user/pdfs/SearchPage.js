import React from "react";
import {
  Container,
  Text,
  Input,
  Item,
  Icon,
  Button,
  Header,
} from "native-base";

function SearchPage({ navigation }) {
  navigation.setOptions({
    headerShown: false,
  });

  return (
    <Container>
      <Header searchBar rounded>
        <Item>
          <Icon
            name="arrow-left"
            type="Feather"
            onPress={() => {
              navigation.pop();
            }}
          />
          <Input placeholder="Search" />
        </Item>
        <Button transparent style={{ color: "black" }}>
          <Icon
            name="align-center"
            type="Feather"
            style={{ color: "black" }}
            onPress={() => {
              navigation.pop();
            }}
          />
        </Button>
      </Header>
      <Text>SearchPage</Text>
    </Container>
  );
}

export default SearchPage;
