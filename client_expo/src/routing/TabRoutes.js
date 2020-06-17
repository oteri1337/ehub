import React from "react";
import { Ionicons, Feather } from "@expo/vector-icons";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";

import UsersPage from "../pages/user/UsersListPage";
import TopicsPage from "../pages/user/TopicsListPage";
import ChatsListPage from "../pages/user/ChatsListPage";
import PdfgroupsPage from "../pages/user/pdfs/PdfgroupsPage";
import SavedPdfsPage from "../pages/user/pdfs/SavedPdfsPage";

import { Button, Icon, View, Text } from "native-base";

function IconWithBadge({ name, badgeCount, color, size }) {
  return (
    <View style={{ width: 24, height: 24, margin: 5 }}>
      <Feather name={name} size={size} color={color} />
      {badgeCount > 0 && (
        <View
          style={{
            // On React Native < 0.57 overflow outside of parent will not work on Android, see https://git.io/fhLJ8
            position: "absolute",
            right: -6,
            top: -3,
            backgroundColor: "red",
            borderRadius: 6,
            width: 12,
            height: 12,
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Text style={{ color: "white", fontSize: 10, fontWeight: "bold" }}>
            {badgeCount}
          </Text>
        </View>
      )}
    </View>
  );
}

const Tab = createBottomTabNavigator();
const { Screen, Navigator } = Tab;

function TabNavigator({ navigation, route }) {
  const goToAccountPage = () => {
    navigation.navigate("AccountPage");
  };

  const goToSearchPage = () => {
    navigation.navigate("SearchPage");
  };

  const goToTopicsCreatePage = () => {
    navigation.navigate("TopicsCreatePage");
  };

  let current = "";

  if (route.state) {
    current = route.state.routes[route.state.index].name;
  }

  navigation.setOptions({
    title: "eHUB",
    headerLeft: () => (
      <Button transparent onPress={goToSearchPage}>
        <Icon name="search" type="Feather" style={{ color: "black" }} />
      </Button>
    ),
    headerRight: () => {
      if (current == "TopicsPage") {
        return (
          <Button transparent onPress={goToTopicsCreatePage}>
            <Icon name="plus" type="Feather" style={{ color: "black" }} />
          </Button>
        );
      }
      return (
        <Button transparent onPress={goToAccountPage}>
          <Icon name="user" type="Feather" style={{ color: "black" }} />
        </Button>
      );
    },
  });

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
          return (
            <IconWithBadge
              name="message-circle"
              color={color}
              size={size}
              badgeCount={10}
            />
          );
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
