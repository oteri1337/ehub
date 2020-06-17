import React from "react";
import { TextInput } from "react-native";
import { AppContext } from "../../../providers/AppProvider";
import { Container, Icon, Button, View, Text } from "native-base";
import BooksListComponent from "../../components/BookListComponent";
import UsersListComponent from "../../components/UsersListComponent";
import TopicsListComponent from "../../components/TopicsListComponent";

function SearchPage({ navigation }) {
  const { state, callReducer } = React.useContext(AppContext);

  const [topics, setTopics] = React.useState(state.topics);

  const [forum, setForum] = React.useState(true);
  const [books, setBooks] = React.useState(false);
  const [users, setUsers] = React.useState(false);
  const [display, setDisplay] = React.useState("flex");
  const [refreshing, setRefreshing] = React.useState(false);

  const select = (what) => {
    setBooks(false);
    setForum(false);
    setUsers(false);
    if (what == "books") {
      setBooks(true);
    }
    if (what == "forum") {
      setForum(true);
    }
    if (what == "users") {
      setUsers(true);
    }
  };

  const toggleDisplay = () => {
    if (display === "none") {
      setDisplay("flex");
    } else {
      setDisplay("none");
    }
  };

  const search = () => {
    setRefreshing(true);
    setTimeout(() => setRefreshing(false), 5000);
  };

  const onSearch = (text) => {
    const data = state.topics.data.filter((item) =>
      item.title.startsWith(text)
    );
    setTopics({ ...state.topics, data });
    console.log(data.length, text);
  };

  navigation.setOptions({
    headerTitle: () => (
      <TextInput
        style={{
          width: 280,
          padding: 10,
          borderRadius: 5,
          backgroundColor: "#f2f2f2",
        }}
        placeholder="Search"
        onSubmitEditing={search}
        onChangeText={onSearch}
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
      <Button transparent onPress={toggleDisplay}>
        <Icon name="sliders" type="Feather" style={{ color: "black" }} />
      </Button>
    ),
  });

  const renderList = () => {
    if (books) {
      return <BooksListComponent />;
    }
    if (users) {
      return <UsersListComponent />;
    }
    return (
      <TopicsListComponent
        list={topics}
        onRefresh={() => {}}
        onEndReached={() => {}}
        refreshing={refreshing}
        navigation={navigation}
      />
    );
  };

  return (
    <Container>
      <View
        style={{
          display,
          padding: 5,
          flexDirection: "row",
          justifyContent: "space-evenly",
        }}
      >
        <Button
          dark
          small
          bordered
          onPress={() => {
            select("forum");
          }}
          style={{ borderColor: forum ? "black" : "silver" }}
        >
          <Text style={{ fontWeight: "bold" }}>Forum</Text>
        </Button>

        <Button
          dark
          small
          bordered
          onPress={() => {
            select("books");
          }}
          style={{ borderColor: books ? "black" : "silver" }}
        >
          <Text style={{ fontWeight: "bold", textAlign: "left" }}>Books</Text>
        </Button>

        <Button
          dark
          small
          bordered
          onPress={() => {
            select("users");
          }}
          style={{ borderColor: users ? "black" : "silver" }}
        >
          <Text style={{ fontWeight: "bold" }}>Users</Text>
        </Button>
      </View>
      {renderList()}
    </Container>
  );
}

export default SearchPage;
