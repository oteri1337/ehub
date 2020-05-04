import { Platform } from "react-native";

let url;

if (Platform.OS === "web") {
  url = "https://ehubcore.com";
  // url = "https://localhost:1026";
} else {
  url = "https://ehubcore.com";
  // url = "http://10.0.2.2:1025";
}

export const BACKEND_URL = url;
