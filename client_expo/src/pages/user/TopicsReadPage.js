import React from "react";
import { Button, Icon, Container, Spinner, Text, View } from "native-base";
import {
  KeyboardAvoidingView,
  Platform,
  Alert,
  ScrollView,
} from "react-native";
import { sendRequestThenDispatch } from "../../providers/AppProvider";
import MessageListComponent from "../components/MessageListComponent";
import { exp } from "react-native-reanimated";

function TopicsReadPage({ navigation, route }) {
  const { id } = route.params;

  const { state, send, callReducer } = sendRequestThenDispatch();

  const topic = state.topics.object[id];

  if (!topic) {
    callReducer({ dispatch: "UPDATE_TOPIC", data: route.params });

    return (
      <Container style={{ alignItems: "center", justifyContent: "center" }}>
        <Spinner />
      </Container>
    );
  }

  const enableNotifications = () => {
    Alert.alert(
      "Confirm",
      "recieve notifications for this topic?",
      [
        {
          text: "Recieve",
          onPress: () => {
            send("/api/topics/users", "UPDATE_TOPIC", { topic_id: id });
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

  const disableNotifications = () => {
    Alert.alert(
      "Confirm",
      "block notifications for this topic?",
      [
        {
          text: "Block",
          onPress: () => {
            const body = { topic_id: id };
            send("/api/topics/users", "UPDATE_TOPIC", body, "DELETE");
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
    headerRight: () => {
      const notificationsEnabled = topic.users?.find(
        (user) => user.id == state.user.id
      );

      if (notificationsEnabled) {
        return (
          <React.Fragment>
            <Button transparent onPress={disableNotifications}>
              <Icon type="Feather" name="bell-off" style={{ color: "black" }} />
            </Button>
          </React.Fragment>
        );
      }

      return (
        <React.Fragment>
          <Button transparent onPress={enableNotifications}>
            <Icon type="Feather" name="bell" style={{ color: "black" }} />
          </Button>
        </React.Fragment>
      );
    },
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
        <React.Fragment>
          <Button transparent onPress={deleteTopic}>
            <Icon name="trash" type="Feather" style={{ color: "black" }} />
          </Button>
        </React.Fragment>
      ),
    });
  }

  const onSubmit = (data) => {
    const uid = Date.now();
    let body = {
      data,
      type: 0,
      id: uid,
      topic_id: id,
      user_id: state.user.id,
    };

    // callReducer({ dispatch: "ADD_COMMENT_TO_TOPIC", data: body });

    const newbody = { ...body };
    newbody.id = id;

    send(`/api/topics/${id}`, "UPDATE_TOPIC", newbody);
  };

  const onImage = (formData) => {
    formData.append("id", id);
    send(`/api/topics/${id}`, "ADD_COMMENT_TO_TOPIC", formData);
  };

  let avoid = false;

  if (Platform.OS == "ios") {
    avoid = true;
  }

  // const [expanded, setExpanded] = React.useState(true);
  // let name = "chevron-up";

  // if (!expanded) {
  //   name = "chevron-down";
  // }

  // const toggle = () => {
  //   setExpanded(!expanded);
  // };

  return (
    <KeyboardAvoidingView
      enabled={avoid}
      behavior="padding"
      style={{ flex: 1 }}
      keyboardVerticalOffset={60}
    >
      {/* <View style={{ backgroundColor: "white" }}>
        <View style={{ flexDirection: "row" }}>
          <View style={{ flex: 1 }}>
            <Text></Text>
          </View>
          <View>
            <Button transparent onPress={toggle}>
              <Icon name={name} type="Feather" style={{ color: "black" }} />
            </Button>
          </View>
        </View>
        {expanded ? (
          <Text style={{ padding: 10, lineHeight: 25 }}>{topic.data}</Text>
        ) : (
          <React.Fragment />
        )}
      </View> */}
      <MessageListComponent
        type="forum"
        data={comments}
        list={topic}
        next_dispatch="UPDATE_TOPIC_COMMENTS_PAGE"
        onSubmit={onSubmit}
        onImage={onImage}
      />
      {/* <MessageFormComponent onSubmit={onSubmit} onImage={onImage} /> */}
    </KeyboardAvoidingView>
  );
}
export default TopicsReadPage;
