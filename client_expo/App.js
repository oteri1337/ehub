import React from "react";
import { AppLoading } from "expo";
import * as Font from "expo-font";
import { Root } from "native-base";
import Router from "./src/routing/Router";
import { AsyncStorage } from "react-native";
import { Ionicons, Feather } from "@expo/vector-icons";
import AppProvider from "./src/providers/AppProvider";
import reducer from "./src/providers/reducers/rootReducer";

export default class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isReady: false,
      persisted: {},
    };
  }

  async componentDidMount() {
    await Font.loadAsync({
      Montserrat: require("./assets/Montserrat/Montserrat-Medium.ttf"),
      Roboto: require("native-base/Fonts/Roboto.ttf"),
      Roboto_medium: require("native-base/Fonts/Roboto_medium.ttf"),
      ...Ionicons.font,
      ...Feather.font,
    });
    let persisted = await AsyncStorage.getItem("state");
    persisted = await JSON.parse(persisted);
    this.setState({ ...this.state, isReady: true, persisted });
  }

  render() {
    if (!this.state.isReady) {
      return <AppLoading />;
    }

    return (
      <Root>
        <AppProvider initialState={this.state.persisted}>
          <Router />
        </AppProvider>
      </Root>
    );
  }
}
