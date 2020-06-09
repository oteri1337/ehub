import React from "react";
import NewsPage from "../pages/user/NewsPage";
import NewsReadPage from "../pages/user/NewsReadPage";
import { createStackNavigator } from "@react-navigation/stack";

const Stack = createStackNavigator();

function NewsRoutes() {
  return (
    <Stack.Navigator headerMode="none">
      <Stack.Screen name="NewsPage" component={NewsPage} />
      <Stack.Screen name="NewsReadPage" component={NewsReadPage} />
    </Stack.Navigator>
  );
}

export default NewsRoutes;
