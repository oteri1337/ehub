import React from "react";
import Logo from "../../assets/icon.png";
import { Keyboard, Image } from "react-native";
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

        <Form style={{ paddingLeft: 15, paddingRight: 15, marginTop: 100 }}>
          <View style={{ alignSelf: "center", marginBottom: 25 }}>
            <Image style={{ height: 100, width: 95 }} large source={Logo} />
          </View>
          <H1 style={{ textAlign: "center" }}>Password Recovery</H1>
          <Item
            regular
            style={{ marginBottom: 25, marginTop: 25, borderRadius: 5 }}
          >
            <Icon name="ios-mail" />
            <Input
              placeholder="Email"
              value={email}
              onChangeText={(text) => setEmail(text)}
            />
          </Item>
          {!fetching && (
            <View style={{ alignSelf: "center" }}>
              <Button success onPress={onSubmit}>
                <Text padding={20}>SUBMIT</Text>
              </Button>
            </View>
          )}

          {fetching && <Spinner />}
        </Form>
      </View>
    </Container>
  );
}

export default PasswordPage;
