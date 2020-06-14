import React from "react";
import { Platform } from "react-native";
import { View, Textarea, Button, Icon } from "native-base";

function MessageFormComponent({ onSubmit }) {
  const [message, setMessage] = React.useState("");

  const onPress = () => {
    onSubmit(message);
    setMessage("");
  };

  let flex = 0.3;

  if (Platform.OS === "ios") {
    flex = 1.2;
  }

  return (
    <View style={{ flex }}>
      <View style={{ flexDirection: "row" }}>
        <View style={{ flex: 1 }}>
          <Textarea
            value={message}
            onChangeText={(m) => setMessage(m)}
            style={{ borderColor: "#ebebeb", borderWidth: 2, padding: 5 }}
          />
        </View>
        <View style={{ padding: 5 }}>
          <Button onPress={onPress} rounded style={{ height: 50, width: 50 }}>
            <Icon name="send" />
          </Button>
        </View>
      </View>
    </View>
  );
}

export default MessageFormComponent;
