import React from "react";
import PdfsReadPage from "../pages/user/PdfsReadPage";
import PdfgroupsPage from "../pages/user/PdfgroupsPage";
import PdfgroupsReadPage from "../pages/user/PdfgroupsReadPage";
import { createStackNavigator } from "@react-navigation/stack";

const Stack = createStackNavigator();

function PdfRoutes() {
  return (
    <Stack.Navigator headerMode="none">
      <Stack.Screen name="PdfgroupsPage" component={PdfgroupsPage} />
      <Stack.Screen name="PdfgroupsReadPage" component={PdfgroupsReadPage} />
      <Stack.Screen name="PdfsReadPage" component={PdfsReadPage} />
    </Stack.Navigator>
  );
}

export default PdfRoutes;
