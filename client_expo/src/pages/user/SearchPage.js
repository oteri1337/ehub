import React from "react";
import { TextInput } from "react-native";
import { AppContext } from "../../providers/AppProvider";
import { Container, Icon, Button, View, Text } from "native-base";
import PdfsListComponent from "../components/PdfsListComponent";
import UsersListComponent from "../components/UsersListComponent";
import TopicsListComponent from "../components/TopicsListComponent";

import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";

const Tab = createMaterialTopTabNavigator();

const BooksPage = ({ navigation }) => {
  const { state } = React.useContext(AppContext);

  const root = state.pdfs;

  const { term } = state.search;

  const [list, setList] = React.useState(root);

  React.useEffect(() => {
    const filtered = root.data.filter((item) => item.title.startsWith(term));
    setList({ ...root, data: filtered });
  }, [state]);

  return (
    <PdfsListComponent
      list={list}
      refreshing={false}
      navigation={navigation}
      onRefresh={() => {}}
      onEndReached={() => {}}
    />
  );
};

const TopicsPage = ({ navigation }) => {
  const { state } = React.useContext(AppContext);

  const root = state.topics;

  const { term } = state.search;

  const [list, setList] = React.useState(root);

  React.useEffect(() => {
    const filtered = root.data.filter((item) => item.title.startsWith(term));
    setList({ ...root, data: filtered });
  }, [state]);

  return (
    <TopicsListComponent
      list={list}
      refreshing={false}
      navigation={navigation}
      onRefresh={() => {}}
      onEndReached={() => {}}
    />
  );
};

const UsersPage = ({ navigation }) => {
  const { state } = React.useContext(AppContext);

  const root = state.users;

  const { term } = state.search;

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
      refreshing={false}
      navigation={navigation}
      onRefresh={() => {}}
      onEndReached={() => {}}
    />
  );
};

function SearchPage({ navigation }) {
  const { state, callReducer } = React.useContext(AppContext);

  navigation.setOptions({
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
        onSubmitEditing={() => {}}
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
        <Icon name="arrow-left" type="Feather" style={{ color: "black" }} />
      </Button>
    ),
    headerRight: () => (
      <Button transparent onPress={() => {}}>
        <Icon name="search" type="Feather" style={{ color: "black" }} />
      </Button>
    ),
  });

  return (
    <Tab.Navigator>
      <Tab.Screen name="Books" component={BooksPage} />
      <Tab.Screen name="Topics" component={TopicsPage} />
      <Tab.Screen name="Users" component={UsersPage} />
    </Tab.Navigator>
  );
}

export default SearchPage;
