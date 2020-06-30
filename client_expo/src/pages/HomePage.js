import React from "react";
import Logo from "../../assets/icon.png";
import Signin from "../../assets/library.png";
import Text from "./components/TextComponent";
import { sendRequestThenDispatch } from "../providers/AppProvider";
import {
  TouchableWithoutFeedback,
  ImageBackground,
  Keyboard,
  KeyboardAvoidingView,
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

  // return (
  //   <View style={{ flex: 1 }}>
  //     <View style={{ height: 125, justifyContent: "center" }}>
  //       <Thumbnail
  //         large
  //         source={Logo}
  //         style={{
  //           marginTop: -20,
  //           marginLeft: 25,
  //           padding: 15,
  //         }}
  //       />
  //     </View>
  //     <View
  //       style={{
  //         flex: 1,
  //         padding: 5,
  //         alignItems: "center",
  //         backgroundColor: "black",
  //       }}
  //     >
  //       <Item regular style={{ borderRadius: 5 }}>
  //         <Icon name="ios-mail" style={{ color: "#fff" }} />
  //         <Input
  //           placeholder="Email"
  //           autoCapitalize="none"
  //           autoCompleteType="email"
  //           style={{ color: "#fff" }}
  //           placeholderTextColor="#fff"
  //           value={email}
  //           onChangeText={(text) => setEmail(text)}
  //         />
  //       </Item>
  //       <Item regular style={{ marginTop: 10, borderRadius: 5 }}>
  //         <Icon name="ios-lock" style={{ color: "#fff" }} />
  //         <Input
  //           placeholder="Password"
  //           style={{ color: "#fff" }}
  //           placeholderTextColor="#fff"
  //           value={password}
  //           secureTextEntry={true}
  //           onChangeText={(text) => setPassword(text)}
  //           onBlur={onBlur}
  //         />
  //       </Item>
  //       {!refreshing && (
  //         <View style={{ alignSelf: "center", marginTop: 10 }}>
  //           <Button success bordered onPress={onSubmit}>
  //             <Text padding={20} style={{ color: "rgb(92, 184, 92)" }}>
  //               Log In
  //             </Text>
  //           </Button>
  //         </View>
  //       )}
  //     </View>
  //     <View style={{ backgroundColor: "black", alignItems: "center" }}>
  //       <Text
  //         style={{
  //           marginTop: 25,
  //           color: "#fff",
  //         }}
  //       >
  //         Forgot password?{" "}
  //         <Text
  //           style={{ color: "#f3ae35" }}
  //           onPress={() => navigation.navigate("PasswordPage")}
  //         >
  //           Get Help
  //         </Text>
  //       </Text>
  //     </View>
  //   </View>
  // );

  const to = (page) => {
    navigation.navigate(page);
  };

  const s = { color: "#f3ae35" };

  return (
    <View style={{ flex: 1, backgroundColor: "black" }}>
      <TouchableWithoutFeedback onPress={onBlur}>
        <ImageBackground
          source={Signin}
          style={{ width: "100%", height: "100%" }}
        >
          <Header transparent iosBarStyle="light-content" />
          <Thumbnail
            large
            source={Logo}
            style={{
              marginTop: -30,
              marginLeft: 25,
            }}
          />
          <Item
            regular
            style={{
              marginTop: 40,
              marginLeft: 15,
              marginRight: 15,
              borderRadius: 5,
              borderColor: "#e3e3e3",
            }}
          >
            <Icon name="ios-mail" style={{ color: "#e3e3e3" }} />
            <Input
              placeholder="Email"
              autoCapitalize="none"
              autoCompleteType="email"
              style={{ color: "#e3e3e3" }}
              placeholderTextColor="#e3e3e3"
              value={email}
              onChangeText={(text) => setEmail(text)}
            />
          </Item>
          <Item
            regular
            style={{
              marginTop: 25,
              borderRadius: 5,
              marginLeft: 15,
              marginRight: 15,
              borderColor: "#e3e3e3",
            }}
          >
            <Icon name="ios-lock" style={{ color: "#e3e3e3" }} />
            <Input
              placeholder="Password"
              style={{ color: "#e3e3e3" }}
              placeholderTextColor="#e3e3e3"
              value={password}
              secureTextEntry={true}
              onChangeText={(text) => setPassword(text)}
              onBlur={onBlur}
            />
          </Item>
          {!refreshing && (
            <View style={{ alignSelf: "center", marginTop: 25 }}>
              <Button success bordered onPress={onSubmit}>
                <Text padding={20} style={{ color: "rgb(92, 184, 92)" }}>
                  Log In
                </Text>
              </Button>
            </View>
          )}
          {refreshing && <Spinner />}
          <View style={{ marginTop: 130, alignItems: "center" }}>
            <Text style={{ color: "#e3e3e3" }}>
              Forgot password?{" "}
              <Text style={s} onPress={() => to("PasswordPage")}>
                Get Help
              </Text>
            </Text>
            <Text style={{ color: "#e3e3e3", marginTop: 20 }}>
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
        </ImageBackground>
      </TouchableWithoutFeedback>
    </View>
  );

  {
    /* return (
    <Container style={{ backgroundColor: "black" }}>
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
                marginLeft: 25,
                padding: 15,
              }}
            />
          <Form
            onSubmit={onSubmit}
            style={{ paddingLeft: 15, paddingRight: 15 }}
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

          <View></View>
          <View style={{ marginTop: 20 }}></View>
        </View>
      </TouchableWithoutFeedback>
      <KeyboardAvoidingView
        keyboardVerticalOffset={100}
        style={{ backgroundColor: "red" }}
      >
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
      </KeyboardAvoidingView>
      </ImageBackground>
    </Container>
  ); */
  }
}

export default HomePage;
