import React from "react";
import { Feather } from "@expo/vector-icons";
import { Button, Icon, View, Text } from "native-base";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";

import { Store } from "../providers/AppProvider";
import ChatsListPage from "../pages/user/ChatsListPage";
import UsersListPage from "../pages/user/UsersListPage";
import TopicsListPage from "../pages/user/TopicsListPage";
import EventsListPage from "../pages/user/EventsListPage";
import PdfsHomePage from "../pages/user/pdfs/PdfsHomePage";
import PdfgroupsPage from "../pages/user/pdfs/groups/PdfgroupsPage";

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
  const { state } = React.useContext(Store);

  React.useLayoutEffect(() => {
    let current = "";

    if (route.state) {
      current = route.state.routes[route.state.index].name;
    }

    navigation.setOptions({
      title: "eHUB",
      headerLeft: () => {
        if (current == "PdfgroupsPage") {
          return (
            <Button
              transparent
              onPress={() => {
                navigation.openDrawer();
              }}
            >
              <Icon name="menu" type="Feather" style={{ color: "black" }} />
            </Button>
          );
        }

        return (
          <Button
            transparent
            onPress={() => {
              navigation.navigate("SearchPage");
            }}
          >
            <Icon name="search" type="Feather" style={{ color: "black" }} />
          </Button>
        );
      },
      headerRight: () => {
        if (current == "TopicsListPage") {
          return (
            <Button
              transparent
              onPress={() => {
                navigation.navigate("TopicsCreatePage");
              }}
            >
              <Icon name="plus" type="Feather" style={{ color: "black" }} />
            </Button>
          );
        }

        // if (current == "PdfgroupsPage") {
        //   return (
        //     <Button
        //       transparent
        //       onPress={() => {
        //         navigation.navigate("PdfsSavedPage");
        //       }}
        //     >
        // <Icon name="save" type="Feather" style={{ color: "black" }} />
        //     </Button>
        //   );
        // }

        return (
          <Button
            transparent
            onPress={() => {
              navigation.navigate("AccountPage");
            }}
          >
            <Icon name="user" type="Feather" style={{ color: "black" }} />
          </Button>
        );
      },
    });
  }, [route]);

  const screenOptions = ({ route }) => {
    return {
      tabBarIcon: ({ focused, color, size }) => {
        let iconName;

        if (route.name === "PdfgroupsPage") {
          iconName = focused ? "archive" : "archive";
        } else if (route.name === "TopicsListPage") {
          iconName = focused ? "compass" : "compass";
        } else if (route.name === "UsersListPage") {
          iconName = focused ? "users" : "users";
        } else if (route.name === "SearchPage") {
          iconName = focused ? "ios-search" : "ios-search";
        } else if (route.name === "EventsListPage") {
          iconName = focused ? "home" : "home";
        } else if (route.name === "ChatsListPage") {
          iconName = focused ? "ios-chatbubbles" : "ios-chatbubbles";
          return (
            <IconWithBadge
              name="message-circle"
              color={color}
              size={size}
              // badgeCount={state?.unread}
            />
          );
        }
        return <Feather name={iconName} size={size} color={color} />;
      },
    };
  };

  const tabBarOptions = {
    activeTintColor: "#0577f1",
    inactiveTintColor: "gray",
  };

  const initialRouteName = "EventsListPage";

  // prettier-ignore

  return (
    <Navigator {...{ tabBarOptions, initialRouteName, screenOptions }}>
      <Screen name="UsersListPage" component={UsersListPage} options={{ title: "Community" }} />
      <Screen name="EventsListPage" component={EventsListPage} options={{ title: "Home" }} />
      <Screen name="TopicsListPage" component={TopicsListPage} options={{ title: "Forum" }} />
      <Screen name="PdfgroupsPage"  component={PdfgroupsPage} options={{ title: "Library" }}/>
      <Screen name="ChatsListPage"  component={ChatsListPage} options={{ title: "Messages" }}/>
    </Navigator>
  );
}

export default TabNavigator;
