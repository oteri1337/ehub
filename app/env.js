import { Platform } from "react-native";

let url = "http://127.0.0.1:8888";

// if (Platform.OS === "ios") {
//   // physical device
//   url = "http://172.20.10.3:1025";

//   // production
//   url = "https://ehubcore.com";
// }

// if (Platform.OS === "android") {
//   // virtual device
//   url = "http://10.0.2.2:1025";

//   // physical device
//   url = "http://192.168.43.149:1025";

//   // production
//   url = "https://ehubcore.com";
// }

// if (Platform.OS === "web") {
//   // development
//   url = "https://ehub";

//   // production
//   url = "https://ehubcore.com";
// }

export const BACKEND_URL = url;
