import React from "react";
import { Container, Button, Icon } from "native-base";
import { sendRequestThenDispatch } from "../../providers/AppProvider";
import MessageListComponent from "../components/MessageListComponent";
import MessageFormComponent from "../components/MessageFormComponent";

function EventsReadPage({ navigation, route }) {
  const { slug } = route.params;
  const { state, send } = sendRequestThenDispatch();
  const { id, title, content, image } = state.events.object[slug];

  navigation.setOptions({
    title,
    headerLeft: () => (
      <Button
        transparent
        onPress={() => {
          navigation.navigate("EventsListPage");
        }}
      >
        <Icon name="arrow-back" style={{ color: "black" }} />
      </Button>
    ),
  });

  const deleteTopic = () => {
    alert("are you sure tou want to delete this topic?");
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

  const onSubmit = (message) => {
    const body = { topic_id: id, message };
    send("/api/topics/comment", "UPDATE_TOPIC", body);
  };

  return (
    <Container>
      <MessageListComponent messages={[]} top={content} image={image} />
      <MessageFormComponent onSubmit={onSubmit} />
    </Container>
  );
}
export default EventsReadPage;
