import React from "react";
import { Keyboard } from "react-native";
import { AppContext } from "../../providers/AppProvider";
import HeaderComponent from "../../components/HeaderBackComponent";
// import { sendRequestThenDispatch } from "../../providers/AppProvider";
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
  console.log(" ");
  console.log("topics page opened");

  const [title, setTitle] = React.useState("");
  const [content, setContent] = React.useState("");
  const { state, fetching, sendRequestThenDispatch } = React.useContext(
    AppContext
  );

  // const url = "/api/topics";
  // const dispatch = "NO_DISPATCH";
  // const { send, fetching } = sendRequestThenDispatch(url, dispatch);

  const onPress = async () => {
    if (title.length && content.length) {
      Keyboard.dismiss();
      const body = JSON.stringify({
        title,
        content,
        user_id: state.user.id,
      });
      const url = "/api/topics";
      const response = await sendRequestThenDispatch(url, "UPDATE_TOPIC", body);
      if (!response.errors.length) {
        navigation.navigate("TopicsReadPage", response.data);
      }
      // const data = await send(body);
      // console.log(data);
    }
  };

  const onBlur = () => {
    Keyboard.dismiss();
  };

  return (
    <Container>
      {/* <HeaderComponent navigation={navigation} title={"New Topic"} /> */}
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
