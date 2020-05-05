import { Platform } from "react-native";

let url;

if (Platform.OS === "web") {
  url = "https://localhost:1026";
  url = "https://ehubcore.com";
}

if (Platform.OS === "ios") {
  url = "http://172.20.10.3:1025";
  url = "https://ehubcore.com";
}

if (Platform.OS === "android") {
  url = "http://10.0.2.2:1025";
  url = "https://ehubcore.com";
}

export const BACKEND_URL = url;
