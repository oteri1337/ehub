import React from "react";
import { Button, Icon, Container, Text } from "native-base";
import { KeyboardAvoidingView, Platform, Alert } from "react-native";
import {
  sendRequestThenDispatch,
  getRequestThenDispatch,
} from "../../providers/AppProvider";
import MessageListComponent from "../components/MessageListComponent";

function TopicsReadPage({ navigation, route }) {
  const { id } = route.params;
  const get = getRequestThenDispatch();
  const { state, send, callReducer } = sendRequestThenDispatch();

  React.useEffect(() => {
    callReducer({ dispatch: "CLEAR_TOPIC_UNREAD", data: id });
  }, []);

  React.useLayoutEffect(() => {
    if (id) {
      const topic = state.topics.object[id];

      if (topic) {
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

        navigation.setOptions({
          title: topic.title,
          headerLeft: () => (
            <Button
              transparent
              onPress={() => {
                get.send("/api/topics", "UPDATE_TOPICS");
                navigation.navigate("TopicsListPage");
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
                    <Icon
                      type="Feather"
                      name="bell-off"
                      style={{ color: "black" }}
                    />
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
      }
    }
  }, [state.topics]);

  if (!id) {
    return (
      <Container>
        <Text>No Id Passed</Text>
      </Container>
    );
  }

  const topic = state.topics.object[id];

  if (!topic) {
    return (
      <Container>
        <Text>Topic Not Found</Text>
      </Container>
    );
  }

  const { comments, allow_comments } = topic;

  const onSubmit = (data) => {
    const uid = Date.now();
    let body = {
      data,
      type: 0,
      id: uid,
      topic_id: id,
      user_id: state.user.id,
    };

    if (allow_comments == "yes") {
      callReducer({ dispatch: "ADD_COMMENT_TO_TOPIC", data: body });
    }

    const newbody = { ...body };
    newbody.id = id;

    send(`/api/topics/${id}`, "UPDATE_TOPIC", newbody);
  };

  const onImage = (formData) => {
    const uid = Date.now();
    let body = {
      data: "Uploading...",
      type: 0,
      id: uid,
      topic_id: id,
      user_id: state.user.id,
    };

    callReducer({ dispatch: "ADD_COMMENT_TO_TOPIC", data: body });

    formData.append("id", id);
    send(`/api/topics/${id}`, "UPDATE_TOPIC", formData);
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
        type="forum"
        data={comments}
        list={topic}
        next_dispatch="UPDATE_TOPIC_COMMENTS_PAGE"
        onSubmit={onSubmit}
        onImage={onImage}
      />
    </KeyboardAvoidingView>
  );
}
export default TopicsReadPage;
