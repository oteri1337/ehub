import React from "react";
import { Container, Button, Icon } from "native-base";
import { AppContext } from "../../providers/AppProvider";
import MessageListComponent from "../components/MessageListComponent";
import MessageFormComponent from "../components/MessageFormComponent";

function TopicsReadPage({ navigation, route }) {
  const { slug } = route.params;
  const { state, sendRequestThenDispatch } = React.useContext(AppContext);
  const { id, title, content, comments, user } = state.topics.object[slug];

  navigation.setOptions({
    title,
    headerLeft: () => (
      <Button
        transparent
        onPress={() => {
          navigation.navigate("TopicsPage");
        }}
      >
        <Icon name="arrow-left" type="Feather" style={{ color: "black" }} />
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
    sendRequestThenDispatch("/api/topics/comment", "UPDATE_TOPIC", body);
  };

  return (
    <Container>
      <MessageListComponent messages={comments} top={content} user={user} />
      <MessageFormComponent onSubmit={onSubmit} />
    </Container>
  );
}
export default TopicsReadPage;
