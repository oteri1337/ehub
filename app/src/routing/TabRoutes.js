import React from "react";
import LibraryRoutes from "./LibraryRoutes";
import { Feather } from "@expo/vector-icons";
import ChatsListPage from "../pages/user/ChatsListPage";
import UsersListPage from "../pages/user/UsersListPage";
import TopicsListPage from "../pages/user/TopicsListPage";
import EventsListPage from "../pages/user/EventsListPage";
import { Button, Icon, View, Text } from "native-base";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";

import { getFocusedRouteNameFromRoute } from '@react-navigation/native';

// function getHeaderTitle(route) {
  // If the focused route is not found, we need to assume it's the initial screen
  // This can happen during if there hasn't been any navigation inside the screen
  // In our case, it's "Feed" as that's the first screen inside the navigator

//   switch (routeName) {
//     case 'Feed':
//       return 'News feed';
//     case 'Profile':
//       return 'My profile';
//     case 'Account':
//       return 'My account';
//   }
// }

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
  React.useLayoutEffect(() => {
    // let current = "";

    const current = getFocusedRouteNameFromRoute(route) ?? '';
    
    // if (route?.state) {
    //   current = route?.state.routes[route.state.index].name;
    // }

    navigation.setOptions({
      title: "eHUB",
      headerLeft: () => {
        if (current == "LibraryPage") {
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

        // if (current == "LibraryPage") {
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

        if (route.name === "LibraryPage") {
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
      <Screen name="LibraryPage"  component={LibraryRoutes} options={{ title: "Library" }}/>
      <Screen name="ChatsListPage"  component={ChatsListPage} options={{ title: "Messages" }}/>
    </Navigator>
  );
}

export default TabNavigator;
