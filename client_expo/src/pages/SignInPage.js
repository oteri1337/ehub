import React from "react";
import Logo from "../../assets/icon.png";
import { sendRequestThenDispatch } from "../providers/AppProvider";
import { TouchableWithoutFeedback, Keyboard, Image } from "react-native";
import {
  View,
  Button,
  Item,
  Input,
  Icon,
  Spinner,
  Text,
  Container,
  Header,
} from "native-base";

function SignInPage({ navigation }) {
  const { send, refreshing } = sendRequestThenDispatch();
  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [kshown, setKshown] = React.useState(false);
  const [secureText, setSecureText] = React.useState(true);

  const shownListener = () => {
    setKshown(true);
  };

  const hiddenListenr = () => {
    setKshown(false);
  };

  React.useEffect(() => {
    Keyboard.addListener("keyboardDidShow", shownListener);
    Keyboard.addListener("keyboardDidHide", hiddenListenr);

    return () => {
      Keyboard.removeListener("keyboardDidShow", shownListener);
      Keyboard.removeListener("keyboardDidHide", hiddenListenr);
    };
  }, []);

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

  const to = (page) => {
    navigation.navigate(page);
  };

  const s = { color: "#007aff" };

  return (
    <Container>
      <Header transparent />
      <TouchableWithoutFeedback onPress={onBlur}>
        <View style={{ flex: 1 }}>
          <View
            style={{
              flex: 0.9,
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <Image style={{ height: 100, width: 95 }} source={Logo} />
          </View>
          <View style={{ flex: 2, padding: 15,alignItems: "center" }}>
            <Item regular style={{ borderRadius: 5, maxWidth:500 }}>
              <Icon name="ios-mail" />
              <Input
                value={email}
                placeholder="Email"
                autoCapitalize="none"
                autoCompleteType="off"
                keyboardType={"visible-password"}
                onChangeText={(text) => setEmail(text)}
              />
            </Item>
            <Item
              regular
              style={{
                marginTop: 20,
                borderRadius: 5,
                maxWidth:500
              }}
            >
              <Icon name="ios-lock" />
              <Input
                placeholder="Password"
                autoCompleteType="off"
                value={password}
                secureTextEntry={secureText}
                onChangeText={(text) => setPassword(text)}
              />
              <Icon
                name="eye"
                onPress={() => {
                  setSecureText(!secureText);
                }}
              />
            </Item>
            {!refreshing && (
              <View style={{ alignSelf: "center", marginTop: 25 }}>
                <Button
                  style={{ backgroundColor: "#0984e3" }}
                  onPress={onSubmit}
                >
                  <Text padding={20}>Log In</Text>
                </Button>
              </View>
            )}
            {refreshing && <Spinner />}
          </View>
          {!kshown && (
            <View
              style={{
                padding: 15,
                paddingTop: 0,
                flexDirection: "row",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <View style={{ flex: 1 }}>
                <Text
                  style={s}
                  onPress={() => {
                    to("SignUpPage");
                  }}
                >
                  Sign Up
                </Text>
              </View>

              <View>
                <Text style={s} onPress={() => to("PasswordPage")}>
                  Reset Password
                </Text>
              </View>
            </View>
          )}
        </View>
      </TouchableWithoutFeedback>
    </Container>
  );
}

export default SignInPage;
