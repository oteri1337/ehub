import React from "react";
import { Keyboard } from "react-native";
// import * as Permissions from "expo-permissions";
import * as ImagePicker from "expo-image-picker";
import * as DocumentPicker from "expo-document-picker";
import { View, Textarea, Button, Icon, ActionSheet } from "native-base";

var BUTTONS = ["Image", "Document", "Cancel"];
var DESTRUCTIVE_INDEX = 1;
var CANCEL_INDEX = 2;

function MessageFormComponent(props) {
  const { onSubmit, onImage, onMessageHook } = props;

  const [message, setMessage] = React.useState("");

  const onPress = () => {
    onSubmit(message);
    onMessageHook();
    setMessage("");
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
        backgroundColor: "white",
        paddingTop: 10,
        paddingBottom: 10,
      }}
    >
      <View>
        <Button
          transparent
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
        >
          <Icon name="plus" type="Feather" style={{ color: "#007aff" }} />
        </Button>
      </View>
      <View style={{ flex: 1, paddingRight: 5 }}>
        <Textarea
          value={message}
          onChangeText={(m) => setMessage(m)}
          style={{
            fontSize: 15,
            lineHeight: 22,
            borderColor: "silver",
            borderWidth: 1.5,
            borderRadius: 5,
            height: 45,
            padding: 5,
          }}
        />
      </View>
      <View style={{ paddingRight: 5 }}>
        <Button
          onPress={onPress}
          rounded
          style={{ width: 45, backgroundColor: "#007aff" }}
        >
          <Icon name="send" style={{ fontSize: 17, right: -1.5 }} />
        </Button>
      </View>
    </View>
  );
}

export default MessageFormComponent;
