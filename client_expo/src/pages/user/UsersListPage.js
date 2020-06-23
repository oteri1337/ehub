import React from "react";
import { List, Container } from "native-base";
import { AppContext } from "../../providers/AppProvider";
import UsersList from "../components/UsersListComponent";

const UsersListPage = function Users({ route }) {
  const { users, getRequestThenDispatch } = React.useContext(AppContext);
  const dispatch = "UPDATE_USERS";
  const { send, refreshing } = getRequestThenDispatch("/api/users", dispatch);
  const list = users;

  const onRefresh = async () => {
    send("/api/users", dispatch);
  };

  // React.useEffect(() => {
  //   onRefresh();
  // }, []);

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
};

export default UsersListPage;
