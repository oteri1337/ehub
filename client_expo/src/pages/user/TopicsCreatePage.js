import React from "react";
import { Keyboard } from "react-native";
import { AppContext } from "../../providers/AppProvider";
import HeaderComponent from "../../components/HeaderBackComponent";
import { sendRequestThenDispatch } from "../../providers/AppProvider";
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
  const { state } = React.useContext(AppContext);

  const url = "/api/topics";
  const dispatch = "NO_DISPATCH";
  const { send, fetching, response } = sendRequestThenDispatch(url, dispatch);

  const [title, setTitle] = React.useState("");
  const [content, setContent] = React.useState("");

  const onPress = () => {
    if (title.length && content.length) {
      Keyboard.dismiss();
      const body = JSON.stringify({
        title,
        content,
        user_id: state.user.id,
      });
      send(body);
    }
  };

  const onBlur = () => {
    Keyboard.dismiss();
  };

  return (
    <Container>
      <HeaderComponent navigation={navigation} title={"New Topic"} />
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
          <Button full style={{ marginTop: 5 }} onPress={onPress}>
            <Text>Post</Text>
          </Button>
        )}
        {fetching && <Spinner />}
      </Content>
    </Container>
  );
}

export default TopicsCreatePage;
