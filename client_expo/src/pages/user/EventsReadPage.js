import React from "react";
import * as Calendar from "expo-calendar";
import { KeyboardAvoidingView, Platform } from "react-native";
import { Container, Button, Icon, View } from "native-base";
import { sendRequestThenDispatch } from "../../providers/AppProvider";
import MessageListComponent from "../components/MessageListComponent";
import MessageFormComponent from "../components/MessageFormComponent";

function EventsReadPage({ navigation, route }) {
  const { slug } = route.params;
  const { state, send } = sendRequestThenDispatch();
  const { id, title, content, image, comments } = state.events.object[slug];

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
    headerRight: () => (
      <Button
        transparent
        onPress={() => {
          navigation.navigate("EventsListPage");
        }}
      >
        <Icon name="calendar" style={{ color: "black" }} />
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
    const body = { event_id: id, message };
    send("/api/events/comment", "UPDATE_EVENT", body);
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
      <MessageListComponent messages={comments} top={content} image={image} />
      <MessageFormComponent onSubmit={onSubmit} />
    </KeyboardAvoidingView>
  );
}
export default EventsReadPage;
