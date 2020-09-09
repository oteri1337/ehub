import React from "react";
import { Keyboard } from "react-native";
import * as Permissions from "expo-permissions";
import * as ImagePicker from "expo-image-picker";
import * as DocumentPicker from "expo-document-picker";
import { View, Textarea, Button, Icon, ActionSheet } from "native-base";

var BUTTONS = ["Image", "Document", "Cancel"];
var DESTRUCTIVE_INDEX = 1;
var CANCEL_INDEX = 2;

function MessageFormComponent({ onSubmit, onImage, onDocument }) {
  onImage =
    onImage ||
    function (formData) {
      console.log("upload image", formData);
    };

  onDocument =
    onDocument ||
    function () {
      console.log("upload document");
    };

  const [message, setMessage] = React.useState("");

  const onPress = () => {
    onSubmit(message);
    setMessage("");
    // Keyboard.dismiss();
  };

  const uploadPhoto = async () => {
    await Permissions.askAsync(Permissions.CAMERA_ROLL);

    const result = await ImagePicker.launchImageLibraryAsync();

    if (!result.cancelled) {
      const formData = new FormData();

      formData.append("data", {
        uri: result.uri,
        type: "image/jpeg",
        name: `ehub.jpg`,
      });

      formData.append("type", 1);

      onImage(formData);

      Keyboard.dismiss();
    }
  };

  const uploadDocument = async () => {
    const result = await DocumentPicker.getDocumentAsync({
      type: "application/pdf",
    });

    if (!result.cancel) {
      const formData = new FormData();

      formData.append("data", {
        uri: result.uri,
        type: "application/pdf",
        name: `ehub.pdf`,
      });

      formData.append("type", 2);

      onImage(formData);

      Keyboard.dismiss();
    }
  };

  return (
    <View
      style={{
        flexDirection: "row",
        alignItems: "center",
      }}
    >
      <View style={{ padding: 5 }}>
        <Button
          bordered
          dark
          onPress={() => {
            ActionSheet.show(
              {
                options: BUTTONS,
                cancelButtonIndex: CANCEL_INDEX,
                title: "Share",
              },
              (buttonIndex) => {
                if (buttonIndex === 0) {
                  uploadPhoto();
                }

                if (buttonIndex === 1) {
                  uploadDocument();
                }
              }
            );
          }}
          style={{ height: 50, width: 50 }}
        >
          <Icon
            name="image"
            type="Feather"
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
