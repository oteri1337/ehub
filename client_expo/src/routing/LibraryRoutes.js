import React from "react";
import PdfsListPage from "../pages/user/pdfs/PdfsListPage";
import PdfsSavedPage from "../pages/user/pdfs/PdfsSavedPage";
import { createStackNavigator } from "@react-navigation/stack";
import PdfsParentPage from "../pages/user/pdfs/PdfsParentPage";

const { Navigator, Screen } = createStackNavigator();

function LibraryRoutes() {
  return (
    <Navigator headerMode="none">
      <Screen name="PdfsListPage" component={PdfsListPage} />
      <Screen name="PdfsSavedPage" component={PdfsSavedPage} />
      <Screen name="PdfsParentPage" component={PdfsParentPage} />
    </Navigator>
  );
}

export default LibraryRoutes;
