import React from "react";
import TopicsPage from "../pages/user/TopicsPage";
import UsersReadPage from "../pages/user/UsersReadPage";
import TopicsReadPage from "../pages/user/TopicsReadPage";
import TopicsCreatePage from "../pages/user/TopicsCreatePage";

import { createStackNavigator } from "@react-navigation/stack";

const Stack = createStackNavigator();

function TopicsRoutes() {
  return (
    <Stack.Navigator headerMode="none">
      <Stack.Screen name="TopicsPage" component={TopicsPage} />
      <Stack.Screen name="UsersReadPage" component={UsersReadPage} />
      <Stack.Screen name="TopicsReadPage" component={TopicsReadPage} />
      <Stack.Screen name="TopicsCreatePage" component={TopicsCreatePage} />
    </Stack.Navigator>
  );
}

export default TopicsRoutes;
