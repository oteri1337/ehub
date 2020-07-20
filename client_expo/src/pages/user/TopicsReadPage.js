import React from "react";
import { Button, Icon, Container, Spinner } from "native-base";
import { KeyboardAvoidingView, Platform, Alert } from "react-native";
import { sendRequestThenDispatch } from "../../providers/AppProvider";
import MessageListComponent from "../components/MessageListComponent";
import MessageFormComponent from "../components/MessageFormComponent";

function TopicsReadPage({ navigation, route }) {
  const { id } = route.params;

  const { state, send, callReducer } = sendRequestThenDispatch();

  const topic = state.topics.object[id];

  if (!topic) {
    callReducer({ dispatch: "UPDATE_TOPIC", data: route.params });
    // getRequestThenDispatch();

    // navigation.setOptions({ title: "Fetching Post" });
    // navigation.navigate("TopicsListPage");

    return (
      <Container style={{ alignItems: "center", justifyContent: "center" }}>
        <Spinner />
      </Container>
    );
  }

  const { title, comments } = topic;

  navigation.setOptions({
    title,
    headerLeft: () => (
      <Button
        transparent
        onPress={() => {
          navigation.pop();
          //navigation.navigate("TopicsListPage");
        }}
      >
        <Icon name="arrow-back" style={{ color: "black" }} />
      </Button>
    ),
  });

  const deleteTopic = () => {
    Alert.alert(
      "Confirm",
      "Are you sure you want to delete this topic?",
      [
        {
          text: "Delete",
          onPress: () => {
            send("/api/topics", "UPDATE_TOPICS", { id }, "DELETE");
          },
        },
        {
          text: "Cancel",
          onPress: () => {},
        },
      ],
      { cancelable: false }
    );
  };

  if (route.params.user_id === state.user.id) {
    navigation.setOptions({
      headerRight: () => (
        <Button transparent onPress={deleteTopic}>
          <Icon name="trash" type="Feather" style={{ color: "black" }} />
        </Button>
      ),
    });
  }

  const onSubmit = (data) => {
    const body = { id, data };
    send("/api/topics/comments", "ADD_COMMENT_TO_TOPIC", body);
  };

  const onImage = (formData) => {
    formData.append("id", id);
    send("/api/topics/comments", "ADD_COMMENT_TO_TOPIC", formData);
  };

  let avoid = false;

  if (Platform.OS == "ios") {
    avoid = true;
  }

  return (
    <KeyboardAvoidingView
      enabled={avoid}
      behavior="padding"
      style={{ flex: 1 }}
      keyboardVerticalOffset={60}
    >
      <MessageListComponent
        data={comments}
        list={topic}
        next_dispatch="UPDATE_TOPIC_COMMENTS_PAGE"
      />
      <MessageFormComponent onSubmit={onSubmit} onImage={onImage} />
    </KeyboardAvoidingView>
  );
}
export default TopicsReadPage;
