import React, { Fragment } from "react";
import { BACKEND_URL } from "../../../../env";
import { AppContext } from "../../../providers/AppProvider";
import { ImageBackground } from "react-native";
import { Container, View, Button, Text, Spinner, Picker } from "native-base";
import * as Permissions from "expo-permissions";
import * as ImagePicker from "expo-image-picker";

function UploadPhotoPage() {
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
    setFetching(true);
    const result = await ImagePicker.launchImageLibraryAsync({
      base64: true,
    });
    setUri(result.uri);
    setFetching(false);
    console.log(result);
  };

  const renderSpinner = () => {
    if (fetching) {
      return <Spinner />;
    }
    return <Fragment />;
  };

  return (
    <Container>
      <View style={{ flex: 2 }}>
        <ImageBackground
          style={{ width: "100%", height: "100%" }}
          source={{ uri }}
        />
      </View>
      <View style={{ flex: 1, justifyContent: "flex-end", padding: 10 }}>
        {renderSpinner()}

        {/* <Button full style={{ margin: 5 }}>
          <Text>Use Avatar</Text>
        </Button> */}
        <Text note style={{ textAlign: "center" }}>
          SELECT AVATAR
        </Text>
        <Picker selectedValue="key0" note mode="dialog">
          <Picker.Item label="Select Avatar" value="key0" />
          <Picker.Item label="ATM Card" value="key1" />
          <Picker.Item label="Debit Card" value="key2" />
          <Picker.Item label="Credit Card" value="key3" />
          <Picker.Item label="Net Banking" value="key4" />
        </Picker>
        <Button full style={{ margin: 5 }} onPress={uploadPhoto}>
          <Text>Upload Photo</Text>
        </Button>
      </View>
    </Container>
  );
}

export default UploadPhotoPage;
