import React from "react";
import * as Calendar from "expo-calendar";
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

  async function getDefaultCalendarSource() {
    const calendars = await Calendar.getCalendarsAsync();
    const defaultCalendars = calendars.filter(
      (each) => each.source.name === "iCloud"
    );
    return defaultCalendars[0].source;
  }

  async function createCalendar() {
    const defaultCalendarSource =
      Platform.OS === "ios"
        ? await getDefaultCalendarSource()
        : { isLocalAccount: true, name: "Expo Calendar" };
    const newCalendarID = await Calendar.createCalendarAsync({
      title: "Ehub Calendar",
      color: "blue",
      entityType: Calendar.EntityTypes.EVENT,
      sourceId: defaultCalendarSource.id,
      source: defaultCalendarSource,
      name: "internalCalendarName",
      ownerAccount: "personal",
      accessLevel: Calendar.CalendarAccessLevel.OWNER,
    });
    console.log(`Your new calendar ID is: ${newCalendarID}`);
  }

  // React.useEffect(() => {
  //   (async () => {
  //     const { status } = await Calendar.requestCalendarPermissionsAsync();
  //     // const rp = await Calendar.requestRemindersPermissionsAsync();

  //     // console.log(rp);

  //     if (status == "granted") {
  //       const calendars = await Calendar.getCalendarsAsync();
  //       console.log("Here are all your calendars:");

  //       const calendar = calendars.find((c) => c.allowsModifications === true);

  //       console.log(calendar);

  //       //console.log(calendars);

  //       const event = await Calendar.createEventAsync(calendar.id, {
  //         title: "test",
  //         startDate: new Date(),
  //         endDate: new Date(),
  //       });

  //       console.log(event);

  //       // createCalendar();
  //       // Calendar.createReminderAsync("A326A0F3-617E-4DA0-97CE-243A35AC06E1", {
  //       //   title: "test",
  //       // });
  //     }
  //   })();
  // }, []);

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

    // headerRight: () => (
    //   <Button
    //     transparent
    //     onPress={() => {
    //       navigation.navigate("EventsListPage");
    //     }}
    //   >
    //     <Icon name="calendar" style={{ color: "black" }} />
    //   </Button>
    // ),
  });

  const deleteTopic = () => {
    alert("are you sure tou want to delete this topic?");
  };

  // if (route.params.user_id === state.user.id) {
  //   navigation.setOptions({
  //     headerRight: () => (
  //       <Button transparent onPress={deleteTopic}>
  //         <Icon name="trash" type="Feather" style={{ color: "black" }} />
  //       </Button>
  //     ),
  //   });
  // }

  const onSubmit = (data) => {
    // const body = { id, data };
    // send("/api/events/comments", "ADD_COMMENT_TO_EVENT", body);

    const uid = Date.now();
    let body = {
      data,
      type: 0,
      id: uid,
      event_id: id,
      user_id: state.user.id,
    };

    callReducer({ dispatch: "ADD_COMMENT_TO_EVENT", data: body });

    const newbody = { ...body };
    newbody.id = id;

    send("/api/events/comments", "UPDATE_EVENT", newbody);
  };

  const onImage = (formData) => {
    formData.append("id", id);
    send("/api/events/comments", "ADD_COMMENT_TO_EVENT", formData);
    // send("/api/events/comment/image", "ADD_COMMENT_TO_EVENT", formData);
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
