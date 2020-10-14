import React from "react";
import { AppLoading } from "expo";
import * as Font from "expo-font";
import { Root } from "native-base";
import Router from "./src/routing/Router";
import { AsyncStorage } from "react-native";
import AppProvider from "./src/providers/AppProvider";
import NetInfo from "@react-native-community/netinfo";
import { getRequest } from "./src/providers/functions";
import reducer from "./src/providers/reducers/rootReducer";
import { Ionicons, Feather, AntDesign } from "@expo/vector-icons";

// import * as Sentry from "sentry-expo";
// Sentry.init({
//   dsn:
//     "https://c2b899d1cc574c5ebe2cdcbe2bee74fd@o402390.ingest.sentry.io/5263439",
//   enableInExpoDevelopment: true,
//   debug: true,
// });

function App() {
  const [state, setState] = React.useState({});
  const [loaded] = Font.useFonts({
    Roboto: require("native-base/Fonts/Roboto.ttf"),
    Concert: require("./assets/Concert/ConcertOne-Regular.ttf"),
    Patrick: require("./assets/Patrick/PatrickHand-Regular.ttf"),
    Roboto_medium: require("native-base/Fonts/Roboto_medium.ttf"),
    ...Feather.font,
    ...Ionicons.font,
    ...AntDesign.font,
  });

  React.useEffect(() => {
    const asyncOperation = async () => {
      const network = await NetInfo.fetch();

      let persisted = await AsyncStorage.getItem("state");

      persisted = JSON.parse(persisted);

      setState(persisted);

      // console.log(persisted);

      // if (network.isConnected) {
      //   let response = await getRequest("/api/users/auth/status");
      //   if (response.errors.length === 0) {
      //     const action = { dispatch: "UPDATE_USER", data: response.data };
      //     const data = reducer({}, action);
      //     setState(data);
      //   }
      // }
    };

    asyncOperation();
  }, []);

  // React.useEffect(() => {
  //   (async () => {
  //     let persisted = await AsyncStorage.getItem("state");
  //     console.log(persisted);
  //   })();
  // }, []);

  if (!loaded) {
    return <AppLoading />;
  }

  if (Object.keys(state).length === 0) {
    return <AppLoading />;
  }

  return (
    <AppProvider initialState={state}>
      <Router />
    </AppProvider>
  );
}

// export default class App extends React.Component {
//   constructor(props) {
//     super(props);
//     this.state = {
//       isReady: false,
//       persisted: {},
//     };
//   }

//   async componentDidMount() {
//     await Font.loadAsync({
// Roboto: require("native-base/Fonts/Roboto.ttf"),
// Concert: require("./assets/Concert/ConcertOne-Regular.ttf"),
// Patrick: require("./assets/Patrick/PatrickHand-Regular.ttf"),
// Roboto_medium: require("native-base/Fonts/Roboto_medium.ttf"),
// ...Ionicons.font,
// ...Feather.font,
// ...AntDesign.font,
//     });
// let persisted = await AsyncStorage.getItem("state");
// console.log(persisted);
//     persisted = await JSON.parse(persisted);
//     this.setState({ ...this.state, isReady: true, persisted });
//   }

//   render() {
//     if (!this.state.isReady) {
//       return <AppLoading />;
//     }

//     return (
//       <AppProvider initialState={this.state.persisted}>
//         <Root>
//           <Router />
//         </Root>
//       </AppProvider>
//     );
//   }
// }

export default App;
