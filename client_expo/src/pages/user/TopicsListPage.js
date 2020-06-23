import React from "react";
import { List, Container } from "native-base";
import { AppContext } from "../../providers/AppProvider";
import TopicsList from "../components/TopicsListComponent";

function TopicsListPage() {
  const context = React.useContext(AppContext);
  const { getRequestThenDispatch, state } = context;
  const dispatch = "UPDATE_TOPICS";
  const { refreshing, send } = getRequestThenDispatch("/api/topics", dispatch);
  const list = state.topics;

  const onRefresh = async () => {
    send("/api/topics", dispatch);
  };

  // React.useEffect(() => {
  //   console.log("on mount topics list");
  //   onRefresh();
  // }, []);

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
