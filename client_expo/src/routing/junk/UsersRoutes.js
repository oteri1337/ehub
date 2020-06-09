import React from "react";
import UsersPage from "../pages/user/UsersPage";
import UsersReadPage from "../pages/user/UsersReadPage";
import { createStackNavigator } from "@react-navigation/stack";

const Stack = createStackNavigator();

function UsersRoutes() {
  return (
    <Stack.Navigator headerMode="none">
      <Stack.Screen name="UsersPage" component={UsersPage} />
      {/* <Stack.Screen name="UsersReadPage" component={UsersReadPage} /> */}
    </Stack.Navigator>
  );
}

export default UsersRoutes;
