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
} from "native-base";

function SignInPage({ navigation }) {
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

  const to = (page) => {
    navigation.navigate(page);
  };

  const s = { color: "#f3ae35" };

  return (
    <Container>
      <TouchableWithoutFeedback onPress={onBlur}>
        <View style={{ flex: 1.5 }}>
          <View
            style={{
              flex: 1,
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <Image style={{ height: 100, width: 95 }} source={Logo} />
          </View>
          <View style={{ flex: 2, padding: 15 }}>
            <Item regular style={{ borderRadius: 5 }}>
              <Icon name="ios-mail" />
              <Input
                placeholder="Email"
                autoCapitalize="none"
                value={email}
                onChangeText={(text) => setEmail(text)}
              />
            </Item>
            <Item
              regular
              style={{
                marginTop: 20,
                borderRadius: 5,
              }}
            >
              <Icon name="ios-lock" />
              <Input
                placeholder="Password"
                value={password}
                secureTextEntry={true}
                onChangeText={(text) => setPassword(text)}
                onBlur={onBlur}
              />
            </Item>
            {!refreshing && (
              <View style={{ alignSelf: "center", marginTop: 25 }}>
                <Button success onPress={onSubmit}>
                  <Text padding={20}>Log In</Text>
                </Button>
              </View>
            )}
            {refreshing && <Spinner />}
          </View>
          <View
            style={{ flex: 1, alignItems: "center", justifyContent: "center" }}
          >
            <Text style={{ fontWeight: "bold" }}>
              Forgot password?{" "}
              <Text style={s} onPress={() => to("PasswordPage")}>
                Get Help
              </Text>
            </Text>
            <Text style={{ marginTop: 15, fontWeight: "bold" }}>
              Don't have an account?{" "}
              <Text
                style={s}
                onPress={() => {
                  to("SignUpPage");
                }}
              >
                Sign Up
              </Text>
            </Text>
          </View>
        </View>
      </TouchableWithoutFeedback>
    </Container>
  );

  //   return (
  //     <View style={{ flex: 1 }}>
  // <TouchableWithoutFeedback onPress={onBlur}>
  //         <View style={{ alignItems: "center", paddingTop: 20 }}>
  //           <Header transparent iosBarStyle="light-content" />
  // <Thumbnail
  //   large
  //   source={Logo}
  //   style={{
  //     marginTop: -30,
  //     marginLeft: 25,
  //   }}
  // />
  // <Item
  //   regular
  //   style={{
  //     marginTop: 40,
  //     marginLeft: 15,
  //     marginRight: 15,
  //     borderRadius: 5,
  //   }}
  // >
  //   <Icon name="ios-mail" />
  //   <Input
  //     placeholder="Email"
  //     autoCapitalize="none"
  //     autoCompleteType="email"
  //     value={email}
  //     onChangeText={(text) => setEmail(text)}
  //   />
  // </Item>
  // <Item
  //   regular
  //   style={{
  //     marginTop: 25,
  //     borderRadius: 5,
  //     marginLeft: 15,
  //     marginRight: 15,
  //   }}
  // >
  //   <Icon name="ios-lock" />
  //   <Input
  //     placeholder="Password"
  //     value={password}
  //     secureTextEntry={true}
  //     onChangeText={(text) => setPassword(text)}
  //     onBlur={onBlur}
  //   />
  // </Item>
  // {!refreshing && (
  //   <View style={{ alignSelf: "center", marginTop: 25 }}>
  //     <Button success onPress={onSubmit}>
  //       <Text padding={20}>Log In</Text>
  //     </Button>
  //   </View>
  // )}
  // {refreshing && <Spinner />}
  //           <View style={{ marginTop: 130, alignItems: "center" }}>
  //   <Text>
  //     Forgot password?{" "}
  //     <Text style={s} onPress={() => to("PasswordPage")}>
  //       Get Help
  //     </Text>
  //   </Text>
  //   <Text style={{ marginTop: 15 }}>
  //     Don't have an account?{" "}
  //     <Text
  //       style={s}
  //       onPress={() => {
  //         to("SignUpPage");
  //       }}
  //     >
  //       Sign Up
  //     </Text>
  //             </Text>
  //           </View>
  //         </View>
  //       </TouchableWithoutFeedback>
  //     </View>
  //   );
}

export default SignInPage;
