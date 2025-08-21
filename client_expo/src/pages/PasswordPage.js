import React from "react";
import Logo from "../../assets/icon.png";
import { sendRequest } from "../providers/functions";
import { Keyboard, Image, TouchableWithoutFeedback } from "react-native";
import {
  Text,
  Container,
  Header,
  Form,
  Item,
  Input,
  View,
  Button,
  Icon,
  Spinner,
  Left,
  Body,
  Right,
} from "native-base";

function PasswordPage({ navigation }) {
  const [email, setEmail] = React.useState("");

  const [token, setToken] = React.useState("");
  const [new_password, setNewPassword] = React.useState("");
  const [new_password_confirmation, setConfirmation] = React.useState("");

  const [next, setNext] = React.useState(false);
  const [refreshing, setRefreshing] = React.useState(false);

  console.log("next", next);

  const onSubmit = async () => {
    if (email.length) {
      Keyboard.dismiss();
      const body = JSON.stringify({ email });

      setRefreshing(true);
      const response = await sendRequest("/api/users/auth/token", body);
      console.log(response);

      setRefreshing(false);

      if (response.errors.length) {
        alert(response.errors[0]);
      } else {
        setNext(true);
      }
    }
  };

  const renderForm = () => {
    if (next) {
      return (
        <Form style={{ paddingLeft: 15, paddingRight: 15 }}>
          <Item regular style={{ marginTop: 15, borderRadius: 5 }}>
            <Icon name="ios-lock" />
            <Input
              placeholder="New password"
              value={new_password}
              onChangeText={(text) => setNewPassword(text)}
              autoCapitalize="none"
              autoCompleteType="off"
              secureTextEntry={true}
              keyboardType={"visible-password"}
            />
          </Item>

          <Item regular style={{ marginTop: 15, borderRadius: 5 }}>
            <Icon name="ios-lock" />
            <Input
              placeholder="Confirm New password"
              value={new_password_confirmation}
              onChangeText={(text) => setConfirmation(text)}
              autoCapitalize="none"
              autoCompleteType="off"
              secureTextEntry={true}
              keyboardType={"visible-password"}
            />
          </Item>

          <Item regular style={{ marginTop: 15, borderRadius: 5 }}>
            <Icon name="ios-lock" />
            <Input
              placeholder="Verification Token"
              value={token}
              onChangeText={(text) => setToken(text)}
              autoCapitalize="none"
              autoCompleteType="off"
              keyboardType="decimal-pad"
            />
          </Item>

          {!refreshing && (
            <View style={{ alignSelf: "center", marginTop: 15 }}>
              <Button
                success
                onPress={async () => {
                  if (
                    new_password.length &&
                    new_password_confirmation.length &&
                    token.length
                  ) {
                    Keyboard.dismiss();
                    const body = JSON.stringify({
                      new_password,
                      new_password_confirmation,
                      token,
                      email,
                    });

                    setRefreshing(true);
                    const response = await sendRequest(
                      "/api/users/auth/password/reset",
                      body,
                      "PATCH"
                    );
                    console.log(response);

                    setRefreshing(false);

                    if (response.errors.length) {
                      alert(response.errors[0]);
                    } else {
                      alert(response.message);
                    }
                  }
                }}
              >
                <Text padding={20}>SUBMIT</Text>
              </Button>
            </View>
          )}
        </Form>
      );
    }

    return (
      <Form style={{ paddingLeft: 15, paddingRight: 15, marginTop: 30 }}>
        <Text style={{ textAlign: "center" }}>
          To reset your password enter your email below, a token will be sent to
          you.
        </Text>
        <Item
          regular
          style={{ marginBottom: 25, borderRadius: 5, marginTop: 45 }}
        >
          <Icon name="ios-mail" />
          <Input
            placeholder="Email"
            value={email}
            onChangeText={(text) => setEmail(text)}
            autoCapitalize="none"
            autoCompleteType="off"
            keyboardType={"visible-password"}
          />
        </Item>
        {!refreshing && (
          <View style={{ alignSelf: "center" }}>
            <Button style={{ backgroundColor: "#007aff" }} onPress={onSubmit}>
              <Text padding={20}>SUBMIT</Text>
            </Button>
          </View>
        )}
      </Form>
    );
  };

  return (
    <Container>
      <TouchableWithoutFeedback
        onPress={() => {
          Keyboard.dismiss();
        }}
      >
        <View>
          <Header transparent iosBarStyle="light-content">
            <Left>
              <Button
                transparent
                onPress={() => {
                  navigation.navigate("SignInPage");
                }}
              >
                <Icon
                  name="arrow-back"
                  style={{ color: "black", marginLeft: 5 }}
                />
              </Button>
            </Left>
            <Body></Body>
            <Right></Right>
          </Header>

          <View style={{ alignSelf: "center" }}>
            <Image style={{ height: 50, width: 49 }} source={Logo} />
          </View>
          <Text style={{ marginTop: 10, textAlign: "center" }}>
            Password Recovery
          </Text>

          {renderForm()}

          {refreshing && <Spinner />}
        </View>
      </TouchableWithoutFeedback>
    </Container>
  );
}

export default PasswordPage;
