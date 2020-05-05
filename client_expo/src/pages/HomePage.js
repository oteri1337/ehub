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
  Content,
  Toast,
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
        <Thumbnail source={Logo} style={{ marginTop: -20, marginLeft: 25 }} />
        <Form
          onSubmit={onSubmit}
          style={{ paddingLeft: 15, paddingRight: 15, marginTop: 90 }}
        >
          <H1 style={{ textAlign: "center", color: "#fff" }}>eHUB</H1>
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
        </Form>

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

        {/* 
      <Content>
        <ImageBackground
          source={Signin}
          style={{ width: "100%", height: "100%" }}
        >
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
              marginTop: 65,
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
          <View style={{ marginTop: 130, paddingBottom: 10 }}>
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
      </Content> */}
      </ImageBackground>
    </Container>
  );
}

export default HomePage;
