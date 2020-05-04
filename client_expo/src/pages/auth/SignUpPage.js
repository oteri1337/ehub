import React from "react";
import Logo from "../../../assets/logo.png";
import { ImageBackground, Keyboard } from "react-native";
import Signup from "../../../assets/library.png";
import Text from "../../components/TextComponent";
import ErrorsComponent from "../../components/ErrorsComponent";
import { sendRequestThenDispatch } from "../../providers/AppProvider";
import {
  View,
  Header,
  Thumbnail,
  Form,
  Item,
  Input,
  Icon,
  H1,
  Button,
  Left,
  Body,
  Right,
  Content,
  Container,
  Spinner,
} from "native-base";

function SignUpPage({ navigation }) {
  const url = "/api/users";
  const { send, fetching, response } = sendRequestThenDispatch(
    url,
    "UPDATE_USER"
  );

  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [first_name, setFirstName] = React.useState("");
  const [last_name, setLastName] = React.useState("");
  const [department, setDepartment] = React.useState("");
  const [password_confirmation, setPasswordConf] = React.useState("");

  const onPress = () => {
    navigation.navigate("HomePage");
  };

  const onSubmit = () => {
    if (email.length && password.length) {
      Keyboard.dismiss();
      const body = JSON.stringify({
        email,
        password,
        first_name,
        last_name,
        department,
        password_confirmation,
      });
      send(body);
    }
  };

  const onBlur = () => {
    Keyboard.dismiss();
  };

  return (
    <Container>
      <View style={{ flex: 1 }}>
        <ImageBackground
          source={Signup}
          style={{ width: "100%", height: "100%" }}
        >
          <Header
            transparent
            androidStatusBarColor="#FFF"
            iosBarStyle="dark-content"
          >
            <Left>
              <Button transparent onPress={onPress}>
                <Icon name="ios-undo" style={{ color: "#fff" }} />
              </Button>
            </Left>
            <Body></Body>
            <Right></Right>
          </Header>
          <Content padder>
            <View style={{ flex: 1, margin: "auto" }}>
              <View style={{ alignSelf: "center" }}>
                <Thumbnail large source={Logo} />
              </View>
              <H1
                style={{ color: "white", textAlign: "center", marginTop: 25 }}
              >
                SIGN UP
              </H1>
              <Form>
                <Item rounded style={{ marginBottom: 25, marginTop: 25 }}>
                  <Icon name="ios-contact" style={{ color: "#fff" }} />
                  <Input
                    placeholder="First Name"
                    style={{ color: "#fff" }}
                    placeholderTextColor="#fff"
                    value={first_name}
                    onChangeText={(text) => setFirstName(text)}
                  />
                </Item>
                <Item rounded style={{ marginBottom: 25 }}>
                  <Icon name="ios-person" style={{ color: "#fff" }} />
                  <Input
                    placeholder="Last Name"
                    style={{ color: "#fff" }}
                    placeholderTextColor="#fff"
                    value={last_name}
                    onChangeText={(text) => setLastName(text)}
                  />
                </Item>
                <Item rounded style={{ marginBottom: 25 }}>
                  <Icon name="ios-mail" style={{ color: "#fff" }} />
                  <Input
                    placeholder="Email"
                    style={{ color: "#fff" }}
                    placeholderTextColor="#fff"
                    onChangeText={(text) => setEmail(text)}
                    value={email}
                  />
                </Item>
                <Item rounded style={{ marginBottom: 25 }}>
                  <Icon name="ios-lock" style={{ color: "#fff" }} />
                  <Input
                    placeholder="Password"
                    style={{ color: "#fff" }}
                    placeholderTextColor="#fff"
                    onChangeText={(text) => setPassword(text)}
                    secureTextEntry={true}
                    value={password}
                  />
                </Item>
                <Item rounded style={{ marginBottom: 25 }}>
                  <Icon name="ios-lock" style={{ color: "#fff" }} />
                  <Input
                    placeholder="Confirm Password"
                    style={{ color: "#fff" }}
                    placeholderTextColor="#fff"
                    onChangeText={(text) => setPasswordConf(text)}
                    secureTextEntry={true}
                    value={password_confirmation}
                  />
                </Item>
                <Item rounded style={{ marginBottom: 25 }}>
                  <Icon name="ios-school" style={{ color: "#fff" }} />
                  <Input
                    placeholder="Department"
                    style={{ color: "#fff" }}
                    placeholderTextColor="#fff"
                    onBlur={onBlur}
                    onChangeText={(text) => setDepartment(text)}
                    value={department}
                  />
                </Item>

                {!fetching && (
                  <View style={{ alignSelf: "center" }}>
                    <Button success bordered onPress={onSubmit}>
                      <Text padding={20} style={{ color: "rgb(92, 184, 92)" }}>
                        Sign Up
                      </Text>
                    </Button>
                  </View>
                )}

                {fetching && <Spinner />}

                <ErrorsComponent errors={response.errors} />
              </Form>
            </View>
          </Content>
        </ImageBackground>
      </View>
    </Container>
  );
}

export default SignUpPage;
