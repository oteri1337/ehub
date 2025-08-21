import React from "react";
import { List, Container } from "native-base";
import EventsList from "../components/EventsListComponent";
import {
  getRequestThenDispatch,
  useNotification,
} from "../../providers/AppProvider";

function EventsListPage() {
  useNotification();

  const url = "/api/events";
  const dispatch = "UPDATE_EVENTS";
  const { state, refreshing, send } = getRequestThenDispatch(url, dispatch);
  const list = state?.events;

  const onRefresh = async () => {
    send(url, dispatch);
  };

  const onEndReached = async () => {
    if (!refreshing) {
      const { next_page_url } = list;
      if (next_page_url) {
        send(next_page_url, `${dispatch}_PAGE`);
      }
    }
  };

  return (
    <Container>
      <List>
        <EventsList {...{ list, onRefresh, refreshing, onEndReached }} />
      </List>
    </Container>
  );
}

export default EventsListPage;
