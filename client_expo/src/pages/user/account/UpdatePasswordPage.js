import React from "react";
import { sendRequest } from "../../../providers/functions";
import { Keyboard, TouchableWithoutFeedback } from "react-native";
import { Container, View, Form, Item, Input, Button, Text } from "native-base";

function UpdatePasswordPage({ navigation }) {
  React.useLayoutEffect(() => {
    navigation.setOptions({ title: "Change Password" });
  }, []);

  const [fetching, setFetching] = React.useState(false);

  const [password, setPassword] = React.useState("");
  const [new_password, setNewPassword] = React.useState("");
  const [new_password_confirm, setConfirmPassword] = React.useState("");

  const dissmiss = () => {
    Keyboard.dismiss();
  };

  const change = async () => {
    if (password.length && new_password.length && new_password_confirm.length) {
      setFetching(true);

      const body = {
        password,
        new_password,
        new_password_confirm,
      };

      const url = "/api/users/auth/password";

      const response = await sendRequest(url, body, "PATCH");

      console.log(response);

      if (response.errors.length) {
        alert(response.errors[0]);
      }

      if (response.message.length) {
        alert(response.message);
        setPassword("");
        setNewPassword("");
        setConfirmPassword("");
      }

      setFetching(false);
    }
  };

  return (
    <Container style={{ flex: 1 }}>
      <TouchableWithoutFeedback onPress={dissmiss}>
        <View style={{ flex: 1, padding: 20 }}>
          <Text>
            Enter your current password, then enter and confirm your new
            password.
          </Text>

          <Form>
            <Text style={{ marginTop: 40, marginBottom: 5 }}>Password</Text>
            <Item regular>
              <Input
                value={password}
                secureTextEntry={true}
                onChangeText={(p) => setPassword(p)}
              />
            </Item>

            <Text style={{ marginTop: 40, marginBottom: 5 }}>New Password</Text>
            <Item regular>
              <Input
                value={new_password}
                secureTextEntry={true}
                onChangeText={(p) => setNewPassword(p)}
              />
            </Item>

            <Text style={{ marginTop: 40, marginBottom: 5 }}>
              Confirm New Password
            </Text>
            <Item regular>
              <Input
                secureTextEntry={true}
                value={new_password_confirm}
                onChangeText={(p) => setConfirmPassword(p)}
              />
            </Item>
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

export default UpdatePasswordPage;
