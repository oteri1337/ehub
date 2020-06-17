import React from "react";
import { Keyboard, TouchableWithoutFeedback } from "react-native";
import {
  Container,
  View,
  Form,
  Item,
  Input,
  Button,
  Text,
  Textarea,
  Picker,
} from "native-base";

function UpdateProfilePage({ navigation }) {
  navigation.setOptions({ title: "Update Profile" });

  const [fetching, setFetching] = React.useState(false);
  const [password, setPassword] = React.useState("");
  const [new_password, setNewPassword] = React.useState("");
  const [confirm_password, setConfirmPassword] = React.useState("");

  const dissmiss = () => {
    Keyboard.dismiss();
  };

  const change = () => {
    if (password.length && new_password.length && confirm_password.length) {
      setFetching(true);

      setTimeout(() => {
        setFetching(false);
      }, 3000);
    }
  };

  return (
    <Container style={{ flex: 1 }}>
      <TouchableWithoutFeedback onPress={dissmiss}>
        <View style={{ flex: 1, padding: 20 }}>
          <Form>
            <Text style={{ marginBottom: 5 }}>Url</Text>
            <Item regular>
              <Input
                secureTextEntry={true}
                onChangeText={(p) => setPassword(p)}
              />
            </Item>

            <Text style={{ marginTop: 40, marginBottom: 5 }}>Phone</Text>
            <Item regular>
              <Input
                secureTextEntry={true}
                onChangeText={(p) => setPassword(p)}
              />
            </Item>

            <Text style={{ marginTop: 40, marginBottom: 5 }}>About</Text>
            <Item regular>
              <Textarea rowSpan={5} />
            </Item>

            <Picker
              selectedValue="key0"
              note
              mode="dialog"
              style={{ marginTop: 40 }}
              onValueChange={(p) => {
                console.log(p);
              }}
            >
              <Picker.Item label="Petroleum Engineering" value="key0" />
              <Picker.Item label="Chemical Engineering" value="key3" />
              <Picker.Item label="Electrical Engineering" value="key1" />
              <Picker.Item label="Mechanical Engineering" value="key2" />
              <Picker.Item label="Chemical Engineering" value="key2" />
            </Picker>
          </Form>
        </View>
      </TouchableWithoutFeedback>
      <View style={{ padding: 20 }}>
        {!fetching && (
          <Button full onPress={change}>
            <Text>Update </Text>
          </Button>
        )}

        {fetching && (
          <Button bordered full>
            <Text>Updating Password</Text>
          </Button>
        )}
      </View>
    </Container>
  );
}

export default UpdateProfilePage;
