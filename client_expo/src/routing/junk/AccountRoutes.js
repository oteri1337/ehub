import React from "react";
import AccountPage from "../pages/user/account/AccountPage";
import ProfilePage from "../pages/user/account/ProfilePage";
import { createStackNavigator } from "@react-navigation/stack";

const Stack = createStackNavigator();

function AccountRoutes() {
  return (
    <Stack.Navigator headerMode="none">
      <Stack.Screen name="AccountPage" component={AccountPage} />
      <Stack.Screen name="ProfilePage" component={ProfilePage} />
    </Stack.Navigator>
  );
}

export default AccountRoutes;
