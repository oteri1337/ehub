import React from "react";
import { Ionicons, Feather } from "@expo/vector-icons";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";

import UsersPage from "../pages/user/UsersListPage";
import TopicsPage from "../pages/user/TopicsListPage";
import ChatsListPage from "../pages/user/ChatsListPage";
import PdfgroupsPage from "../pages/user/pdfs/PdfgroupsPage";
import SavedPdfsPage from "../pages/user/pdfs/SavedPdfsPage";

import { Button, Icon } from "native-base";

const Tab = createBottomTabNavigator();
const { Screen, Navigator } = Tab;

function TabNavigator({ navigation }) {
  const goToAccountPage = () => {
    navigation.navigate("AccountPage");
  };

  const goToSearchPage = () => {
    navigation.navigate("SearchPage");
  };

  navigation.setOptions({
    title: "eHUB",
    headerLeft: () => (
      <Button transparent onPress={goToAccountPage}>
        <Icon name="user" type="Feather" style={{ color: "black" }} />
      </Button>
    ),
    headerRight: () => (
      <Button transparent onPress={goToSearchPage}>
        <Icon name="search" type="Feather" style={{ color: "black" }} />
      </Button>
    ),
  });

  const goToTopicCreate = () => {
    navigation.navigate("TopicsCreatePage");
  };

  const screenOptions = ({ route }) => {
    // if (route.name == "TopicsPage") {
    //   navigation.setOptions({
    //     headerRight: () => (
    //       <Button transparent onPress={goToTopicCreate}>
    //         <Icon name="add" />
    //       </Button>
    //     ),
    //   });
    // }

    return {
      tabBarIcon: ({ focused, color, size }) => {
        let iconName;

        if (route.name === "PdfgroupsPage") {
          iconName = focused ? "ios-filing" : "ios-filing";
          return <Feather name="archive" size={size} color={color} />;
        } else if (route.name === "TopicsPage") {
          iconName = focused ? "ios-image" : "ios-image";
          return <Feather name="image" size={size} color={color} />;
        } else if (route.name === "UsersPage") {
          iconName = focused ? "ios-contacts" : "ios-contacts";
          return <Feather name="users" size={size} color={color} />;
        } else if (route.name === "ChatsListPage") {
          iconName = focused ? "ios-chatbubbles" : "ios-chatbubbles";
          return <Feather name="message-circle" size={size} color={color} />;
        } else if (route.name === "SearchPage") {
          iconName = focused ? "ios-search" : "ios-search";
        } else if (route.name === "SavedPdfsPage") {
          iconName = focused ? "ios-save" : "ios-save";
          return <Feather name="save" size={size} color={color} />;
        }

        // You can return any component that you like here!
        return <Ionicons name={iconName} size={size} color={color} />;
      },
    };
  };

  const tabBarOptions = {
    activeTintColor: "black",
    inactiveTintColor: "gray",
  };

  const initialRouteName = "PdfgroupsPage";

  return (
    <Navigator {...{ tabBarOptions, screenOptions, initialRouteName }}>
      <Screen
        name="TopicsPage"
        component={TopicsPage}
        options={{ title: "Forum" }}
      />
      <Screen
        name="PdfgroupsPage"
        component={PdfgroupsPage}
        options={{ title: "Library" }}
      />
      <Screen
        name="UsersPage"
        component={UsersPage}
        options={{ title: "Community" }}
      />
      <Screen
        name="SavedPdfsPage"
        component={SavedPdfsPage}
        options={{ title: "Saved" }}
      />
      <Screen
        name="ChatsListPage"
        component={ChatsListPage}
        options={{ title: "Messages" }}
      />
    </Navigator>
  );
}

export default TabNavigator;
