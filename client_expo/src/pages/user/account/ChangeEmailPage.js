import React from "react";
import { getRequest } from "../../../providers/functions";
import { Keyboard, TouchableWithoutFeedback } from "react-native";
import { sendRequestThenDispatch } from "../../../providers/AppProvider";
import { Container, View, Form, Item, Input, Button, Text } from "native-base";

function ChangeEmailPage({ navigation }) {
  React.useLayoutEffect(() => {
    navigation.setOptions({ title: "Change Email" });
  }, []);

  const { state, refreshing, send } = sendRequestThenDispatch();

  const [pin, setPin] = React.useState("");
  const [email, setemail] = React.useState("");
  const [submitted, setSubmitted] = React.useState(false);

  const dissmiss = () => {
    Keyboard.dismiss();
  };

  const proceed = async () => {
    if (email.length && email != state.user.email) {
      await getRequest("/api/users/auth/token/email");
      setSubmitted(true);
    }
  };

  const update = () => {
    if (pin.length) {
      const body = { pin, email };

      const onSuccess = () => {
        navigation.navigate("AccountPage");
      };

      send("/api/users/auth/email", "UPDATE_USER", body, "PATCH", onSuccess);
    }
  };

  if (submitted) {
    return (
      <Container style={{ padding: 20 }}>
        <Text style={{ textAlign: "center" }}>
          Please make sure you have access to {email}
        </Text>
        <Text style={{ textAlign: "center", marginTop: 20 }}>
          Then enter the confirmation pin sent to {state.user.email}
        </Text>

        <Form>
          <Text style={{ marginTop: 40, marginBottom: 5 }}>Pin</Text>
          <Item regular>
            <Input
              keyboardType="number-pad"
              value={pin}
              onChangeText={(t) => setPin(t)}
            />
          </Item>
        </Form>
        {!refreshing && (
          <Button full onPress={update} style={{ marginTop: 40 }}>
            <Text>Update</Text>
          </Button>
        )}

        {refreshing && (
          <Button full bordered style={{ marginTop: 40 }}>
            <Text>Updating</Text>
          </Button>
        )}
      </Container>
    );
  }

  return (
    <Container style={{ flex: 1 }}>
      <TouchableWithoutFeedback onPress={dissmiss}>
        <View style={{ padding: 20 }}>
          <Text>
            Enter your new email, a verification email will be sent to your
            current email address.
          </Text>

          <Text style={{ marginTop: 30 }}>
            Current Email : {state.user.email}
          </Text>

          <Form>
            <Text style={{ marginTop: 40, marginBottom: 5 }}>New Email</Text>
            <Item regular>
              <Input
                onChangeText={(p) => setemail(p)}
                autoCapitalize="none"
                autoCompleteType="email"
                blurOnSubmit={true}
              />
            </Item>
          </Form>
        </View>
      </TouchableWithoutFeedback>
      <View style={{ padding: 20, marginTop: 20 }}>
        <Button full onPress={proceed}>
          <Text>Proceed </Text>
        </Button>
      </View>
    </Container>
  );
}

export default ChangeEmailPage;
