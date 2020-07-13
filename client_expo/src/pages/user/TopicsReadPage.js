import React from "react";
import { Button, Icon, Container, Text, Textarea } from "native-base";
import { KeyboardAvoidingView, Platform, Alert, FlatList } from "react-native";
import { sendRequestThenDispatch } from "../../providers/AppProvider";
import MessageListComponent from "../components/MessageListComponent";
import MessageFormComponent from "../components/MessageFormComponent";

function TopicsReadPage({ navigation, route }) {
  const { slug } = route.params;
  const { state, send } = sendRequestThenDispatch();

  const topic = state.topics.object[slug];

  if (!topic) {
    navigation.navigate("TopicsListPage");

    return (
      <Container style={{ alignItems: "center", justifyContent: "center" }}>
        <Text>Topic Not Found</Text>
      </Container>
    );
  }

  const { id, title, comments } = topic;

  navigation.setOptions({
    title,
    headerLeft: () => (
      <Button
        transparent
        onPress={() => {
          navigation.navigate("TopicsListPage");
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
    const body = { topic_id: id, data };
    send("/api/topics/comment", "ADD_COMMENT_TO_TOPIC", body);
  };

  const onImage = (formData) => {
    formData.append("topic_id", id);
    send("/api/topics/comment/image", "ADD_COMMENT_TO_TOPIC", formData);
  };

  let avoid = false;

  if (Platform.OS == "ios") {
    avoid = true;
  }

  const renderItem = ({ item }) => {
    return <Text key={item.id}>{item.message}</Text>;
  };

  const keyExtractor = (item) => {
    return item.id.toString();
  };

  return (
    <KeyboardAvoidingView
      enabled={avoid}
      behavior="padding"
      style={{ flex: 1 }}
      keyboardVerticalOffset={60}
    >
      <MessageListComponent data={comments} list={topic} />
      <MessageFormComponent onSubmit={onSubmit} onImage={onImage} />
    </KeyboardAvoidingView>
  );
}
export default TopicsReadPage;
