import { StatusBar } from "expo-status-bar";
import { Text } from "native-base";
import SignInPage from "./src/pages/SignInPage";
import { StyleSheet, View } from "react-native";

import Router from "./src/routing/Router";
import AppProvider from "./src/providers/AppProvider";

export default function App() {
  return (
    <AppProvider>
      <Router />
    </AppProvider>
  );

  return <SignInPage />;

  return (
    <View style={styles.container}>
      <Text>Open up App.js to start app!</Text>
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
