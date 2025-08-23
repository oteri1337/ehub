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
    send(url, dispatch);
  };

  // React.useEffect(() => {
  //   let debounceTime = setTimeout(() => {
  //     if (!refreshing) {
  //       if (list.data.length <= 12) {
  //         console.log("refresh topics");
  //         send(url, dispatch);
  //       }
  //     }
  //   }, 4000);
  //   return () => {
  //     clearTimeout(debounceTime);
  //   };
  // }, [list]);

  const onEndReached = () => {
    if (!refreshing) {
      const { next_page_url } = list;
      if (next_page_url) {
        console.log(" on end reached");
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

// import React from "react";
// import { List, Container } from "native-base";
// import { connect } from "../../providers/AppProvider";
// import TopicsList from "../components/TopicsListComponent";
// import {
//   fetchTopics,
//   fetchTopicsPage,
// } from "../../providers/actions/topicsActions";

// function TopicsListPage(props) {
//   const { list, refreshing, onRefresh, onEndReached } = props;

//   React.useEffect(() => {
//     console.log("refresh topics");
//     onRefresh();
//   }, [list]);

//   return (
//     <Container>
//       <List>
//         <TopicsList {...{ list, onRefresh, refreshing, onEndReached }} />
//       </List>
//     </Container>
//   );
// }

// const mapStateToProps = (state) => ({
//   list: state?.topics,
//   refreshing: state?.fetching.topics,
// });

// const mapDispatchToProps = (dispatch) => ({
//   onRefresh: () => {
//     dispatch(fetchTopics());
//   },
//   onEndReached: () => {
//     dispatch(fetchTopicsPage());
//   },
// });

// export default connect(mapStateToProps, mapDispatchToProps, TopicsListPage);
