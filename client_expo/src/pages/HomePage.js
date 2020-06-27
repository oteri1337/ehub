import React from "react";
import Logo from "../../assets/logo.png";
import Signin from "../../assets/library.png";
import Text from "./components/TextComponent";
import { sendRequestThenDispatch } from "../providers/AppProvider";
import {
  TouchableWithoutFeedback,
  ImageBackground,
  Keyboard,
  Image,
} from "react-native";
import {
  View,
  Button,
  H1,
  Form,
  Item,
  Input,
  Icon,
  Thumbnail,
  Header,
  Spinner,
  Container,
} from "native-base";

function HomePage({ navigation }) {
  const { send, refreshing } = sendRequestThenDispatch();
  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");

  const onSubmit = () => {
    if (email.length && password.length) {
      Keyboard.dismiss();
      const body = JSON.stringify({ email, password });
      send("/api/users/auth/signin", "UPDATE_USER", body);
    }
  };

  const onBlur = () => {
    Keyboard.dismiss();
  };

  return (
    <Container>
      <ImageBackground
        source={Signin}
        style={{ width: "100%", height: "100%" }}
      >
        <Header transparent iosBarStyle="light-content" />
        <TouchableWithoutFeedback onPress={onBlur}>
          <View style={{ flex: 1 }}>
            <Thumbnail
              large
              source={Logo}
              style={{
                marginTop: -20,
                marginLeft: 25,
                padding: 15,
              }}
            />
            <Form
              onSubmit={onSubmit}
              style={{ marginTop: 45, paddingLeft: 15, paddingRight: 15 }}
            >
              <H1 style={{ textAlign: "center", color: "#fff" }}>eHUB</H1>
              <Item
                regular
                style={{ marginBottom: 25, marginTop: 25, borderRadius: 5 }}
              >
                <Icon name="ios-mail" style={{ color: "#fff" }} />
                <Input
                  placeholder="Email"
                  autoCapitalize="none"
                  autoCompleteType="email"
                  style={{ color: "#fff" }}
                  placeholderTextColor="#fff"
                  value={email}
                  onChangeText={(text) => setEmail(text)}
                />
              </Item>
              <Item regular style={{ marginBottom: 25, borderRadius: 5 }}>
                <Icon name="ios-lock" style={{ color: "#fff" }} />
                <Input
                  placeholder="Password"
                  style={{ color: "#fff" }}
                  placeholderTextColor="#fff"
                  value={password}
                  secureTextEntry={true}
                  onChangeText={(text) => setPassword(text)}
                  onBlur={onBlur}
                />
              </Item>
              {!refreshing && (
                <View style={{ alignSelf: "center" }}>
                  <Button success bordered onPress={onSubmit}>
                    <Text padding={20} style={{ color: "rgb(92, 184, 92)" }}>
                      Log In
                    </Text>
                  </Button>
                </View>
              )}

              {refreshing && <Spinner />}
            </Form>

            <View>
              <Text
                style={{
                  textAlign: "center",
                  marginTop: 25,
                  color: "#fff",
                  marginBottom: 10,
                }}
              >
                Forgot password?{" "}
                <Text
                  style={{ color: "#f3ae35" }}
                  onPress={() => navigation.navigate("PasswordPage")}
                >
                  Get Help
                </Text>
              </Text>
            </View>
            <View style={{ marginTop: 20 }}>
              <Text style={{ textAlign: "center", color: "#fff" }}>
                Don't have an account?{" "}
                <Text
                  style={{ color: "#f3ae35" }}
                  onPress={() => {
                    navigation.navigate("SignUpPage");
                  }}
                >
                  Sign Up
                </Text>
              </Text>
            </View>
          </View>
        </TouchableWithoutFeedback>
      </ImageBackground>
    </Container>
  );
}

export default HomePage;
