import React from "react";
import { Image } from "react-native";
import { Container } from "native-base";
import { BACKEND_URL } from "../../../../env";
import { View, Item, Picker, Button, Text, Spinner } from "native-base";
import { sendRequestThenDispatch } from "../../../providers/AppProvider";

function AvatarPage({ navigation }) {
  React.useLayoutEffect(() => {
    navigation.setOptions({ title: "Select Avatar" });
  }, []);

  const [photo_profile, setphoto_profile] = React.useState("boy1.jpg");

  const uri = `${BACKEND_URL}/uploads/images/${photo_profile}`;

  const { refreshing, send } = sendRequestThenDispatch();

  return (
    <Container>
      <View style={{ flex: 1, alignItems: "center", padding: 20 }}>
        <Image
          style={{ height: 300, width: 300, marginTop: 20 }}
          source={{ uri }}
        />
        <Item regular style={{ marginTop: 30 }}>
          <Picker
            mode="dropdown"
            selectedValue={photo_profile}
            iosHeader="Select photo_profile"
            onValueChange={(data) => setphoto_profile(data)}
          >
            <Picker.Item label="Boy on yellow" value="boy1.jpg" />
            <Picker.Item label="Man on green" value="boy2.jpg" />
            <Picker.Item label="Man on blue" value="boy3.jpg" />
            <Picker.Item label="Lady on pink" value="girl1.jpg" />
            <Picker.Item label="Lady on yellow" value="girl2.jpg" />
          </Picker>
        </Item>

        {!refreshing && (
          <Button
            full
            success
            style={{ marginTop: 35 }}
            onPress={() => {
              const body = { photo_profile };

              send("/api/users/auth/profile", "UPDATE_USER", body, "PATCH");
            }}
          >
            <Text>PROCEED</Text>
          </Button>
        )}

        {refreshing && <Spinner />}
      </View>
    </Container>
  );
}

export default AvatarPage;
