import React from "react";
import { List, Container } from "native-base";
import UsersList from "../components/UsersListComponent";
import { getRequestThenDispatch } from "../../providers/AppProvider";

function UsersListPage() {
  const url = "/api/users";
  const dispatch = "UPDATE_USERS";
  const { state, refreshing, send } = getRequestThenDispatch(url, dispatch);
  const list = state.users;

  const onRefresh = async () => {
    send("/api/users", dispatch);
  };

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
        <UsersList {...{ list, onRefresh, refreshing, onEndReached }} />
      </List>
    </Container>
  );
}

export default UsersListPage;
