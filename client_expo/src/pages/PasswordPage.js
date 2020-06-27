import React from "react";
import Logo from "../../assets/logo.png";
import Library from "../../assets/library.png";
import { ImageBackground, Keyboard } from "react-native";
import { sendRequestThenDispatch } from "../providers/AppProvider";

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
  H1,
  Thumbnail,
  Spinner,
  Left,
  Body,
  Right,
} from "native-base";

function PasswordPage({ navigation }) {
  const url = "/api/users/auth/signin";
  const { fetching } = sendRequestThenDispatch(url, "UPDATE_USER");

  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");

  const onSubmit = () => {
    if (email.length && password.length) {
      Keyboard.dismiss();
      const body = JSON.stringify({ email, password });
      send(body);
    }
  };

  const onBlur = () => {
    Keyboard.dismiss();
  };

  return (
    <Container>
      <ImageBackground
        source={Library}
        style={{ width: "100%", height: "100%" }}
      >
        <Header transparent iosBarStyle="light-content">
          <Left>
            <Button
              transparent
              onPress={() => {
                navigation.navigate("HomePage");
              }}
            >
              <Icon name="ios-undo" style={{ color: "#fff" }} />
            </Button>
          </Left>
          <Body></Body>
          <Right></Right>
        </Header>

        <Form style={{ paddingLeft: 15, paddingRight: 15, marginTop: 100 }}>
          <View style={{ alignSelf: "center", marginBottom: 25 }}>
            <Thumbnail large source={Logo} />
          </View>
          <H1 style={{ textAlign: "center", color: "#fff" }}>
            Password Recovery
          </H1>
          <Item
            regular
            style={{ marginBottom: 25, marginTop: 25, borderRadius: 5 }}
          >
            <Icon name="ios-mail" style={{ color: "#fff" }} />
            <Input
              placeholder="Email"
              style={{ color: "#fff" }}
              placeholderTextColor="#fff"
              value={email}
              onChangeText={(text) => setEmail(text)}
            />
          </Item>
          {!fetching && (
            <View style={{ alignSelf: "center" }}>
              <Button success bordered onPress={onSubmit}>
                <Text padding={20} style={{ color: "rgb(92, 184, 92)" }}>
                  SUBMIT
                </Text>
              </Button>
            </View>
          )}

          {fetching && <Spinner />}
        </Form>
      </ImageBackground>
    </Container>
  );
}

export default PasswordPage;
