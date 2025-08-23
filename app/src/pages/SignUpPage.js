import React from "react";
import Logo from "../../assets/icon.png";
import Text from "./components/TextComponent";
import { sendRequestThenDispatch } from "../providers/AppProvider";
import { Keyboard, Image, TouchableWithoutFeedback } from "react-native";
import { View, Form, Item, Input, Icon, Button, Body } from "native-base";
import { Container, Content, Header, Left, Spinner, Right } from "native-base";

function SignUpPage({ navigation }) {
  const { send, refreshing } = sendRequestThenDispatch();

  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [password_confirmation, setPasswordConf] = React.useState("");

  const onPress = () => {
    navigation.navigate("SignInPage");
  };

  const onSubmit = () => {
    if (email.length && password.length) {
      Keyboard.dismiss();
      const body = JSON.stringify({
        email,
        password,
        password_confirmation,
      });
      send("/api/users", "UPDATE_USER", body);
    }
  };

  return (
    <Container>
      <Header transparent>
        <Left>
          <Button transparent onPress={onPress}>
            <Icon name="arrow-back" style={{ marginLeft: 5, color: "black" }} />
          </Button>
        </Left>
        <Body />
        <Right />
      </Header>
      <TouchableWithoutFeedback>
        <Content style={{ flex: 1 }}>
          <View
            style={{ flex: 1, justifyContent: "center", alignItems: "center" }}
          >
            <Image style={{ height: 50, width: 47 }} source={Logo} />
            <Text style={{ textAlign: "center", marginTop: 20 }}>Sign Up</Text>
          </View>
          <View style={{ flex: 2.5, padding: 15 }}>
            <Form>
              <Item regular style={{ marginBottom: 25, borderRadius: 5 }}>
                <Icon name="ios-mail" />
                <Input
                  placeholder="Email"
                  autoCapitalize="none"
                  onChangeText={(text) => setEmail(text)}
                  value={email}
                />
              </Item>
              <Item regular style={{ marginBottom: 25, borderRadius: 5 }}>
                <Icon name="ios-lock" />
                <Input
                  placeholder="Password"
                  onChangeText={(text) => setPassword(text)}
                  secureTextEntry={true}
                  value={password}
                />
              </Item>
              <Item regular style={{ marginBottom: 25, borderRadius: 5 }}>
                <Icon name="ios-lock" />
                <Input
                  placeholder="Confirm Password"
                  onChangeText={(text) => setPasswordConf(text)}
                  secureTextEntry={true}
                  value={password_confirmation}
                />
              </Item>

              {!refreshing && (
                <View style={{ alignSelf: "center" }}>
                  <Button onPress={onSubmit}>
                    <Text
                      padding={20}
                      style={{ color: "white", backgroundColor: "#0984e3" }}
                    >
                      Sign Up
                    </Text>
                  </Button>
                </View>
              )}

              {refreshing && <Spinner />}
            </Form>
          </View>
        </Content>
      </TouchableWithoutFeedback>
    </Container>
  );
}

export default SignUpPage;
