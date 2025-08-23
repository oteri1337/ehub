import React from "react";
import { BACKEND_URL } from "../../../../env";
import { ImageBackground } from "react-native";
// import * as Permissions from "expo-permissions";
import * as ImagePicker from "expo-image-picker";
import { Container, View, Button, Text } from "native-base";
import { sendRequestThenDispatch } from "../../../providers/AppProvider";

function UpdatePhotoPage({ navigation }) {
  React.useLayoutEffect(() => {
    navigation.setOptions({ title: "Change Photo" });
  }, []);

  const { state, refreshing, send } = sendRequestThenDispatch();

  const { photo_profile } = state.user;

  const uri = `${BACKEND_URL}/uploads/images/${photo_profile}`;

  // React.useEffect(() => {
  //   const asyncOperation = async () => {
  //     // console.log(perm);
  //   };

  //   asyncOperation();
  // }, []);

  const uploadPhoto = async () => {
    const perm = await Permissions.askAsync(Permissions.CAMERA_ROLL);

    console.log(perm);

    const result = await ImagePicker.launchImageLibraryAsync({
      allowsEditing: true,
    });

    if (!result.cancelled) {
      const formData = new FormData();

      formData.append("photo", {
        uri: result.uri,
        type: "image/jpeg",
        name: `${state.user.id}.jpg`,
      });

      send("/api/users/auth/photo", "UPDATE_USER", formData);
    }
  };

  return (
    <Container>
      <View style={{ flex: 2 }}>
        <ImageBackground
          style={{ width: "100%", height: "100%" }}
          source={{ uri }}
        >
          <View style={{ flex: 1, justifyContent: "center" }}>
            <Text
              style={{ textAlign: "center", color: "white", fontSize: 25 }}
              onPress={uploadPhoto}
            ></Text>
          </View>
        </ImageBackground>
      </View>
      <View style={{ flex: 1, padding: 10 }}>
        <View style={{ flex: 1, justifyContent: "flex-end" }}>
          {!refreshing && (
            <Button full onPress={uploadPhoto}>
              <Text>Select Photo </Text>
            </Button>
          )}

          {refreshing && (
            <Button bordered full>
              <Text>Uploading ...</Text>
            </Button>
          )}
        </View>
      </View>
    </Container>
  );
}

export default UpdatePhotoPage;
