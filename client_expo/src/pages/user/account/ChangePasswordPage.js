import React from "react";
import { Keyboard, TouchableWithoutFeedback } from "react-native";
import { Container, View, Form, Item, Input, Button, Text } from "native-base";

function ChangePasswordPage({ navigation }) {
  navigation.setOptions({ title: "Change Password" });

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
          <Text>
            Enter your current password, then enter and confirm your new
            password.
          </Text>

          <Form>
            <Text style={{ marginTop: 40, marginBottom: 5 }}>Password</Text>
            <Item regular>
              <Input
                secureTextEntry={true}
                onChangeText={(p) => setPassword(p)}
              />
            </Item>

            <Text style={{ marginTop: 40, marginBottom: 5 }}>New Password</Text>
            <Item regular>
              <Input
                secureTextEntry={true}
                onChangeText={(p) => setNewPassword(p)}
              />
            </Item>

            <Text style={{ marginTop: 40, marginBottom: 5 }}>
              Confirm Password
            </Text>
            <Item regular>
              <Input
                secureTextEntry={true}
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

export default ChangePasswordPage;
