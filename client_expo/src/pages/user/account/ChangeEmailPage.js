import React from "react";
import { Keyboard, TouchableWithoutFeedback } from "react-native";
import { Container, View, Form, Item, Input, Button, Text } from "native-base";

function ChangeEmailPage({ navigation }) {
  navigation.setOptions({ title: "Change Email" });

  const [fetching, setFetching] = React.useState(false);
  const [email, setemail] = React.useState("");

  const dissmiss = () => {
    Keyboard.dismiss();
  };

  const change = () => {
    if (email.length) {
      setFetching(true);

      setTimeout(() => {
        setFetching(false);
      }, 3000);
    }
  };

  return (
    <Container style={{ flex: 1 }}>
      <TouchableWithoutFeedback onPress={dissmiss}>
        <View style={{ padding: 20 }}>
          <Text>
            Enter your new email, a verification email will be sent to your
            current email address.
          </Text>

          <Form>
            <Text style={{ marginTop: 40, marginBottom: 5 }}>New Email</Text>
            <Item regular>
              <Input onChangeText={(p) => setemail(p)} />
            </Item>
          </Form>
        </View>
      </TouchableWithoutFeedback>
      <View style={{ padding: 20, marginTop: 20 }}>
        {!fetching && (
          <Button full onPress={change}>
            <Text>Update </Text>
          </Button>
        )}

        {fetching && (
          <Button bordered full>
            <Text>Updating email</Text>
          </Button>
        )}
      </View>
    </Container>
  );
}

export default ChangeEmailPage;
