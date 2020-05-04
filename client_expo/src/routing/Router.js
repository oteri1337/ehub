import React from "react";
import Routes from "./Routes";
import { NavigationContainer } from "@react-navigation/native";

function Router() {
  return (
    <NavigationContainer>
      <Routes />
    </NavigationContainer>
  );
}

export default Router;
