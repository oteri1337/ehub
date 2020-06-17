import React from "react";
import { List, Container } from "native-base";
import { AppContext } from "../../providers/AppProvider";
import TopicsList from "../components/TopicsListComponent";

function TopicsPage() {
  const context = React.useContext(AppContext);
  const { refreshing, getRequestThenDispatch, state } = context;
  const list = state.topics;

  const dispatch = "UPDATE_TOPICS";

  const onRefresh = async () => {
    getRequestThenDispatch("/api/topics", dispatch);
  };

  const onEndReached = async () => {
    if (!refreshing) {
      const { next_page_url } = list;
      if (next_page_url) {
        getRequestThenDispatch(next_page_url, `${dispatch}_PAGE`);
      }
    }
  };

  React.useEffect(() => {
    if (!list.data.length) {
      onRefresh();
    }
  }, []);

  return (
    <Container>
      <List>
        <TopicsList {...{ list, onRefresh, refreshing, onEndReached }} />
      </List>
    </Container>
  );
}

export default TopicsPage;
