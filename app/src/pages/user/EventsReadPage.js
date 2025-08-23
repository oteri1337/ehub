import React from "react";
import { Button, Icon, Container, Text } from "native-base";
import { KeyboardAvoidingView, Platform, Alert } from "react-native";
import { sendRequestThenDispatch } from "../../providers/AppProvider";
import MessageListComponent from "../components/MessageListComponent";

function EventsReadPage({ navigation, route }) {
  const { id } = route.params;
  const { state, send, callReducer } = sendRequestThenDispatch();
  const event = state.events.object[id];

  if (!event) {
    navigation.navigate("EventsListPage");

    return (
      <Container style={{ alignItems: "center", justifyContent: "center" }}>
        <Text>Topic Not Found</Text>
      </Container>
    );
  }

  const { title, image, comments } = event;

  const enableNotifications = () => {
    Alert.alert(
      "Confirm",
      "recieve notifications for this event?",
      [
        {
          text: "Recieve",
          onPress: () => {
            send("/api/events/users", "UPDATE_EVENT", { event_id: id });
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
      "block notifications for this event?",
      [
        {
          text: "Block",
          onPress: () => {
            const body = { event_id: id };
            send("/api/events/users", "UPDATE_EVENT", body, "DELETE");
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

  React.useLayoutEffect(() => {
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
      headerRight: () => {
        const notificationsEnabled = event.users?.find(
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
  }, [state.events]);

  const onSubmit = (data) => {
    const uid = Date.now();
    let body = {
      data,
      type: 0,
      id: uid,
      event_id: id,
      user_id: state.user.id,
    };

    if (event.allow_comments == "yes") {
      callReducer({ dispatch: "ADD_COMMENT_TO_EVENT", data: body });
    }

    const newbody = { ...body };
    newbody.id = id;

    send("/api/events/comments", "UPDATE_EVENT", newbody);
  };

  const onImage = (formData) => {
    const uid = Date.now();
    let body = {
      data: "Uploading...",
      type: 0,
      id: uid,
      event_id: id,
      user_id: state.user.id,
    };

    callReducer({ dispatch: "ADD_COMMENT_TO_EVENT", data: body });

    formData.append("id", id);
    send("/api/events/comments", "UPDATE_EVENT", formData);
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
        list={event}
        image={image}
        next_dispatch="UPDATE_EVENT_COMMENTS_PAGE"
        onSubmit={onSubmit}
        onImage={onImage}
      />
    </KeyboardAvoidingView>
  );
}
export default EventsReadPage;
