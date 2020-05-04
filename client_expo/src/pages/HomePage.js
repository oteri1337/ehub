import React from "react";
import Logo from "../../assets/logo.png";
import Signin from "../../assets/library.png";
import Text from "../components/TextComponent";
import { ImageBackground, Keyboard } from "react-native";
import ErrorsComponent from "../components/ErrorsComponent";
import ContainerComponent from "../components/ContainerComponent";
import { sendRequestThenDispatch } from "../providers/AppProvider";
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
  const url = "/api/users/auth/signin";
  const { send, fetching, response } = sendRequestThenDispatch(
    url,
    "UPDATE_USER"
  );
  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");

  const onSubmit = () => {
    if (email.length && password.length) {
      Keyboard.dismiss();
      const body = JSON.stringify({ email, password });
      send(body);
    }
  };

  const onPress = () => {
    navigation.navigate("SignUpPage");
  };

  const login = () => {
    navigation.navigate("UserHomePage");
  };

  const onBlur = () => {
    Keyboard.dismiss();
  };

  return (
    <Container>
      <View style={{ flex: 1 }}>
        <ImageBackground
          source={Signin}
          style={{ width: "100%", height: "100%" }}
        >
          <Header
            transparent
            androidStatusBarColor="#FFF"
            iosBarStyle="light-content"
          />
          <View
            style={{
              flex: 1,
              marginLeft: 25,
            }}
          >
            <Thumbnail source={Logo} style={{ marginTop: -20 }} />
          </View>
          <View
            style={{
              flex: 4,
              padding: 10,
            }}
          >
            <H1 style={{ textAlign: "center", color: "#fff" }}>eHUB</H1>
            <Form onSubmit={onSubmit}>
              <ContainerComponent
                maxWidth="414px"
                marginLeft="auto"
                marginRight="auto"
              >
                <Item rounded style={{ marginBottom: 25, marginTop: 25 }}>
                  <Icon name="ios-mail" style={{ color: "#fff" }} />
                  <Input
                    placeholder="Email"
                    style={{ color: "#fff" }}
                    placeholderTextColor="#fff"
                    value={email}
                    onChangeText={(text) => setEmail(text)}
                  />
                </Item>
                <Item rounded style={{ marginBottom: 25 }}>
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
              </ContainerComponent>
            </Form>
            {!fetching && (
              <View style={{ alignSelf: "center" }}>
                <Button success bordered onPress={onSubmit}>
                  <Text padding={20} style={{ color: "rgb(92, 184, 92)" }}>
                    Log In
                  </Text>
                </Button>
              </View>
            )}

            {fetching && <Spinner />}

            <ErrorsComponent errors={response.errors} />
          </View>
          <View style={{ flex: 1 }}>
            <Text
              style={{
                textAlign: "center",
                marginTop: 25,
                color: "#fff",
                marginBottom: 10,
              }}
            >
              Forgot password?{" "}
              <Text style={{ color: "#f3ae35" }} onPress={login}>
                Get Help
              </Text>
            </Text>
            <Text style={{ textAlign: "center", color: "#fff" }}>
              Don't have an account?{" "}
              <Text style={{ color: "#f3ae35" }} onPress={onPress}>
                Sign Up
              </Text>
            </Text>
          </View>
        </ImageBackground>
      </View>
    </Container>
  );
}

export default HomePage;
