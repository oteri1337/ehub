import React from "react";
import HomePage from "../pages/HomePage";
import SignUpPage from "../pages/SignUpPage";
import PasswordPage from "../pages/PasswordPage";
import { createStackNavigator } from "@react-navigation/stack";

const Stack = createStackNavigator();

function PdfRoutes() {
  return (
    <Stack.Navigator headerMode="none">
      <Stack.Screen name="HomePage" component={HomePage} />
      <Stack.Screen name="SignUpPage" component={SignUpPage} />
      <Stack.Screen name="PasswordPage" component={PasswordPage} />
    </Stack.Navigator>
  );
}

export default PdfRoutes;
