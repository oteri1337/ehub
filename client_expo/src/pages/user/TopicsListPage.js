import React from "react";
import { List, Container } from "native-base";
import TopicsList from "../components/TopicsListComponent";
import { getRequestThenDispatch } from "../../providers/AppProvider";

function TopicsListPage() {
  const url = "/api/topics";
  const dispatch = "UPDATE_TOPICS";
  const { state, refreshing, send } = getRequestThenDispatch(url, dispatch);
  const list = state.topics;

  const onRefresh = async () => {
    send("/api/topics", dispatch);
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
        <TopicsList {...{ list, onRefresh, refreshing, onEndReached }} />
      </List>
    </Container>
  );
}

export default TopicsListPage;
