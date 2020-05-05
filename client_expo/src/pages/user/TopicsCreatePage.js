import React from "react";
import HeaderComponent from "../../components/HeaderBackComponent";
import { AppContext } from "../../providers/AppProvider";
import {
  Container,
  View,
  Form,
  Textarea,
  Button,
  Text,
  Item,
  Input,
} from "native-base";

function TopicsCreatePage({ navigation }) {
  const { state } = React.useContext(AppContext);

  return (
    <Container>
      <HeaderComponent navigation={navigation} title={"New Topic"} />
      <View style={{ flex: 1, padding: 5 }}>
        <View style={{ flex: 2 }}>
          <Form>
            <Item regular>
              <Input placeholder="Title" />
            </Item>
            <Textarea rowSpan={20} bordered />
          </Form>
        </View>
        <View style={{ flex: 1, justifyContent: "flex-end" }}>
          <Button full style={{ marginTop: 5 }}>
            <Text>Post</Text>
          </Button>
        </View>
      </View>
    </Container>
  );
}

export default TopicsCreatePage;
