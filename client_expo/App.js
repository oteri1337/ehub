import React from "react";
// import {AppLoading } from "expo";
import { Root } from "native-base";
import Router from "./src/routing/Router";
import AppProvider from "./src/providers/AppProvider";
import AsyncStorage from '@react-native-async-storage/async-storage';
// import * as Font from "expo-font";
// import { AsyncStorage } from "react-native";
// import NetInfo from "@react-native-community/netinfo";
// import { getRequest } from "./src/providers/functions";
// import reducer from "./src/providers/reducers/rootReducer";
// import { Ionicons, Feather, AntDesign } from "@expo/vector-icons";

// import * as Sentry from "sentry-expo";
// Sentry.init({
//   dsn:
//     "https://c2b899d1cc574c5ebe2cdcbe2bee74fd@o402390.ingest.sentry.io/5263439",
//   enableInExpoDevelopment: true,
//   debug: true,
// });

function App() {

  // const [state, setState] = React.useState({});

  // // load async storaga state
  React.useEffect(() => {

    const loadPersisted = async () => {
      let persisted = await AsyncStorage.getItem("state");


      if (persisted) {

        persisted = JSON.parse(persisted);

        console.log("p",persisted);

        // setState(persisted);
      }

    }

    loadPersisted();

  }, []);

  // const [loaded] = Font.useFonts({
  //   Roboto: require("native-base/Fonts/Roboto.ttf"),
  //   Concert: require("./assets/Concert/ConcertOne-Regular.ttf"),
  //   Patrick: require("./assets/Patrick/PatrickHand-Regular.ttf"),
  //   Roboto_medium: require("native-base/Fonts/Roboto_medium.ttf"),
  //   ...Feather.font,
  //   ...Ionicons.font,
  //   ...AntDesign.font,
  // });

  // React.useEffect(() => {
  //   let mouted = true;

  //   const asyncOperation = async () => {
  //     const network = await NetInfo.fetch();

  //     let persisted = await AsyncStorage.getItem("state");

  //     if (persisted) {
  //       persisted = JSON.parse(persisted);
  //       console.log("network", network.isConnected);
  //       console.log("persisted", persisted);

  //       if (Object.keys(persisted).length) {
  //         setState(persisted);
  //       }
  //     } else {
  //       persisted = {};
  //     }

  //     if (network.isConnected) {
  //       let response = await getRequest("/api/users/auth/status");
  //       if (response.errors.length === 0) {
  //         const action = { dispatch: "UPDATE_USER", data: response.data };
  //         const data = reducer(persisted, action);
  //         if (mouted) {
  //           setState(data);
  //         }
  //       }
  //     }

  //     setDone(true);
  //   };

  //   asyncOperation();

  //   return () => {
  //     mouted = false;
  //   };
  // }, []);

  // React.useEffect(() => {
  //   (async () => {
  //     let persisted = await AsyncStorage.getItem("state");
  //     console.log(persisted);
  //   })();
  // }, []);

  // // if (Object.keys(state).length === 0 || !done) {
  // //   return <AppLoading />;
  // // }
  // console.log("init", state);

  return (
    <AppProvider>
      <Root>
        <Router />
      </Root>
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
