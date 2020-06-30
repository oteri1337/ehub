import React from "react";
import { Platform } from "react-native";
import { View, Textarea, Button, Icon, ActionSheet } from "native-base";

var BUTTONS = ["Image", "Document", "Cancel"];
var DESTRUCTIVE_INDEX = 1;
var CANCEL_INDEX = 2;

function MessageFormComponent({ onSubmit }) {
  const [message, setMessage] = React.useState("");

  const onPress = () => {
    onSubmit(message);
    setMessage("");
  };

  return (
    <View style={{ flexDirection: "row", alignItems: "center" }}>
      <View style={{ padding: 5 }}>
        <Button
          bordered
          dark
          onPress={() => {
            ActionSheet.show(
              {
                options: BUTTONS,
                cancelButtonIndex: CANCEL_INDEX,
                destructiveButtonIndex: DESTRUCTIVE_INDEX,
                title: "Share",
              },
              (buttonIndex) => {
                console.log("aamk");
              }
            );
          }}
          style={{ height: 50, width: 50 }}
        >
          <Icon
            name="ios-images"
            type="Ionicons"
            style={{ fontSize: 18, lineHeight: 30 }}
          />
        </Button>
      </View>
      <View style={{ flex: 1 }}>
        <Textarea
          value={message}
          onChangeText={(m) => setMessage(m)}
          style={{
            borderColor: "black",
            borderWidth: 0.5,
            height: 50,
            padding: 5,
          }}
        />
      </View>
      <View style={{ padding: 5 }}>
        <Button
          dark
          onPress={onPress}
          rounded
          style={{ height: 50, width: 50 }}
        >
          <Icon name="send" />
        </Button>
      </View>
    </View>
  );
}

export default MessageFormComponent;
