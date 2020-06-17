import React from "react";
import { Keyboard } from "react-native";
import { AppContext } from "../../providers/AppProvider";
import {
  Container,
  Content,
  Form,
  Textarea,
  Button,
  Text,
  Item,
  Input,
  Spinner,
} from "native-base";

function TopicsCreatePage({ navigation }) {
  navigation.setOptions({ title: "New Topic" });

  const [title, setTitle] = React.useState("");
  const [content, setContent] = React.useState("");
  const { state, fetching, sendRequestThenDispatch } = React.useContext(
    AppContext
  );

  const onPress = async () => {
    if (title.length && content.length) {
      Keyboard.dismiss();
      const body = JSON.stringify({
        title,
        content,
        user_id: state.user.id,
      });
      const url = "/api/topics";
      const response = await sendRequestThenDispatch(url, "ADD_TOPIC", body);
      console.log(response);
      if (!response.errors.length) {
        navigation.navigate("TopicsReadPage", response.data);
      }
    }
  };

  const onBlur = () => {
    Keyboard.dismiss();
  };

  return (
    <Container>
      <Content style={{ padding: 15 }}>
        <Form>
          <Item regular>
            <Input
              placeholder="Title"
              value={title}
              onChangeText={(text) => setTitle(text)}
            />
          </Item>
          <Textarea
            bordered
            rowSpan={8}
            onBlur={onBlur}
            value={content}
            placeholder="Content"
            onChangeText={(text) => setContent(text)}
          />
        </Form>
        {!fetching && (
          <Button full onPress={onPress} style={{ marginTop: 5 }}>
            <Text>Post</Text>
          </Button>
        )}
        {fetching && <Spinner />}
      </Content>
    </Container>
  );
}

export default TopicsCreatePage;
