import React from "react";
import { List, Container } from "native-base";
import { connect } from "../../providers/AppProvider";
import TopicsList from "../components/TopicsListComponent";
import {
  fetchTopics,
  fetchTopicsPage,
} from "../../providers/actions/topicsActions";

function TopicsListPage(props) {
  console.log("topics list page rendered");

  const { list, refreshing, onRefresh, onEndReached } = props;

  React.useEffect(() => {
    onRefresh();
  }, []);

  return (
    <Container>
      <List>
        <TopicsList {...{ list, onRefresh, refreshing, onEndReached }} />
      </List>
    </Container>
  );
}

const mapStateToProps = (state) => ({
  list: state.topics,
  refreshing: state.fetching.topics,
});

const mapDispatchToProps = (dispatch) => ({
  onRefresh: () => {
    dispatch(fetchTopics());
  },
  onEndReached: () => {
    dispatch(fetchTopicsPage());
  },
});

export default connect(mapStateToProps, mapDispatchToProps, TopicsListPage);
