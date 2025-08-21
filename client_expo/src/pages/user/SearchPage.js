import React from "react";
import { TextInput } from "react-native";
import { Icon, Button } from "native-base";
import PdfsListComponent from "../components/PdfsListComponent";
import UsersListComponent from "../components/UsersListComponent";
import TopicsListComponent from "../components/TopicsListComponent";
import { Store, getRequestThenDispatch } from "../../providers/AppProvider";

import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";

const Tab = createMaterialTopTabNavigator();

const BooksPage = ({ navigation }) => {
  const { state } = React.useContext(Store);

  const root = state.pdfs;

  const { term, refreshing } = state.search;

  const [list, setList] = React.useState(root);

  React.useEffect(() => {
    const filtered = root.data.filter((item) => item.title.startsWith(term));
    setList({ ...root, data: filtered });
  }, [state]);

  return (
    <PdfsListComponent
      list={list}
      refreshing={refreshing}
      navigation={navigation}
      onRefresh={() => {}}
      onEndReached={() => {}}
    />
  );
};

const TopicsPage = ({ navigation }) => {
  const { state } = React.useContext(Store);

  const root = state.topics;

  const { term, refreshing } = state.search;

  const [list, setList] = React.useState(root);

  React.useEffect(() => {
    const filtered = root.data.filter((item) => item.title.startsWith(term));
    setList({ ...root, data: filtered });
  }, [state]);

  return (
    <TopicsListComponent
      list={list}
      refreshing={refreshing}
      navigation={navigation}
      onRefresh={() => {}}
      onEndReached={() => {}}
    />
  );
};

const UsersPage = ({ navigation }) => {
  const { state } = React.useContext(Store);

  const root = state.users;

  const { term, refreshing } = state.search;

  const [list, setList] = React.useState(root);

  React.useEffect(() => {
    const filtered = root.data.filter((item) =>
      item.first_name.startsWith(term)
    );
    setList({ ...root, data: filtered });
  }, [state]);

  return (
    <UsersListComponent
      list={list}
      refreshing={refreshing}
      navigation={navigation}
      onRefresh={() => {}}
      onEndReached={() => {}}
    />
  );
};

function SearchPage({ navigation, route }) {
  const { state, callReducer, send } = getRequestThenDispatch();

  React.useLayoutEffect(() => {
    navigation.setOptions({
      headerStyle: {
        elevation: 0,
        shadowOpacity: 0,
      },
      headerTitle: () => (
        <TextInput
          style={{
            width: 280,
            padding: 10,
            borderRadius: 5,
            backgroundColor: "#f2f2f2",
          }}
          value={state.search.term}
          placeholder="Search"
          onSubmitEditing={async () => {
            const { term } = state.search;

            if (term.length) {
              callReducer({ dispatch: "UPDATE_SEARCH_REFRESHING", data: true });

              const current = route.state.routes[route.state.index].name;

              if (current == "Users") {
                await send(`/api/users/search/${term}`, `UPDATE_USERS`);
              }

              if (current == "Topics") {
                await send(`/api/topics/search/${term}`, `UPDATE_TOPICS`);
              }

              if (current == "Books") {
                await send(`/api/pdfs/search/${term}`, `UPDATE_PDFS`);
              }

              callReducer({
                dispatch: "UPDATE_SEARCH_REFRESHING",
                data: false,
              });
              callReducer({ dispatch: "UPDATE_SEARCH_TERM", data: "" });
            }
          }}
          onChangeText={(data) => {
            callReducer({ dispatch: "UPDATE_SEARCH_TERM", data });
          }}
        />
      ),
      headerLeft: () => (
        <Button
          transparent
          onPress={() => {
            navigation.pop();
          }}
        >
          <Icon name="arrow-back" style={{ color: "black" }} />
        </Button>
      ),
      headerRight: () => (
        <Button transparent onPress={() => {}}>
          <Icon name="search" type="Feather" style={{ color: "black" }} />
        </Button>
      ),
    });
  }, [state, route]);

  return (
    <Tab.Navigator>
      <Tab.Screen name="Topics" component={TopicsPage} />
      <Tab.Screen name="Users" component={UsersPage} />
      <Tab.Screen name="Books" component={BooksPage} />
    </Tab.Navigator>
  );
}

export default SearchPage;
