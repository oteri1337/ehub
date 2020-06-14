import React from "react";
import { BACKEND_URL } from "../../../../env";
import { AppContext } from "../../../providers/AppProvider";
import { ImageBackground } from "react-native";
import { Container, View, Button, Text, Spinner, Picker } from "native-base";
import * as Permissions from "expo-permissions";
import * as ImagePicker from "expo-image-picker";

function UploadPhotoPage({ navigation }) {
  navigation.setOptions({ title: "Change Photo" });

  const { state } = React.useContext(AppContext);
  const { photo_profile } = state.user;
  const initialPhoto = `${BACKEND_URL}/uploads/images/${photo_profile}`;

  const [fetching, setFetching] = React.useState(false);
  const [uri, setUri] = React.useState(initialPhoto);

  React.useEffect(() => {
    const asyncOperation = async () => {
      const perm = await Permissions.askAsync(Permissions.CAMERA_ROLL);
      console.log(perm);
    };

    asyncOperation();
  }, []);

  const uploadPhoto = async () => {
    //setFetching(true);
    const result = await ImagePicker.launchImageLibraryAsync({
      base64: true,
    });
    setUri(result.uri);
    //setFetching(false);
    // console.log(result);
  };

  const change = () => {
    setFetching(true);

    setTimeout(() => {
      setFetching(false);
    }, 3000);
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
            >
              SELECT PHOTO
            </Text>
          </View>
        </ImageBackground>
      </View>
      <View style={{ flex: 1, padding: 10 }}>
        <View>
          <Text note style={{ textAlign: "center" }}>
            SELECT AVATAR
          </Text>
          <Picker
            selectedValue="key0"
            note
            mode="dialog"
            onValueChange={(p) => {
              console.log(p);
            }}
          >
            <Picker.Item label="Blue" value="key0" />
            <Picker.Item label="Green" value="key3" />
            <Picker.Item label="Purple" value="key1" />
            <Picker.Item label="Orange" value="key2" />
          </Picker>
        </View>

        <View style={{ flex: 1, justifyContent: "flex-end" }}>
          {!fetching && (
            <Button full onPress={change}>
              <Text>Save Changes </Text>
            </Button>
          )}

          {fetching && (
            <Button bordered full>
              <Text>Saving Changes</Text>
            </Button>
          )}
        </View>
      </View>
    </Container>
  );
}

export default UploadPhotoPage;
