import React from "react";
import Logo from "../../assets/icon.png";
import Text from "./components/TextComponent";
import { sendRequestThenDispatch } from "../providers/AppProvider";
import { Keyboard, Image, TouchableWithoutFeedback } from "react-native";
import {
  View,
  Header,
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
  const { send, refreshing } = sendRequestThenDispatch();

  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [first_name, setFirstName] = React.useState("");
  const [last_name, setLastName] = React.useState("");
  const [department, setDepartment] = React.useState("");
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
        first_name,
        last_name,
        department,
        password_confirmation,
      });
      send("/api/users", "UPDATE_USER", body);
    }
  };

  const onBlur = () => {
    Keyboard.dismiss();
  };

  return (
    <Container>
      <Header transparent>
        <Left>
          <Button transparent onPress={onPress}>
            <Icon name="arrow-back" style={{ marginLeft: 5, color: "black" }} />
          </Button>
        </Left>
      </Header>
      <TouchableWithoutFeedback>
        <Content style={{ flex: 1 }}>
          <View
            style={{ flex: 1, justifyContent: "center", alignItems: "center" }}
          >
            <Image style={{ height: 100, width: 95 }} source={Logo} />
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
              <Item regular style={{ marginBottom: 25, borderRadius: 5 }}>
                <Icon name="ios-contact" />
                <Input
                  placeholder="First Name"
                  value={first_name}
                  onChangeText={(text) => setFirstName(text)}
                />
              </Item>
              <Item regular style={{ marginBottom: 25, borderRadius: 5 }}>
                <Icon name="ios-person" />
                <Input
                  placeholder="Last Name"
                  value={last_name}
                  onChangeText={(text) => setLastName(text)}
                />
              </Item>
              <Item regular style={{ marginBottom: 25, borderRadius: 5 }}>
                <Icon name="ios-school" />
                <Input
                  placeholder="Department"
                  onBlur={onBlur}
                  onChangeText={(text) => setDepartment(text)}
                  value={department}
                />
              </Item>

              {!refreshing && (
                <View style={{ alignSelf: "center" }}>
                  <Button success bordered onPress={onSubmit}>
                    <Text padding={20} style={{ color: "rgb(92, 184, 92)" }}>
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

  // return (
  //   <Container>
  //     <View style={{ flex: 1 }}>
  //       <Header
  //         transparent
  //         androidStatusBarColor="#FFF"
  //         iosBarStyle="dark-content"
  //       >
  //         <Left>
  //           <Button transparent onPress={onPress}>
  //             <Icon
  //               name="arrow-back"
  //               style={{ marginLeft: 5, color: "black" }}
  //             />
  //           </Button>
  //         </Left>
  //         <Body></Body>
  //         <Right></Right>
  //       </Header>
  //       <Content padder>
  //         <View style={{ flex: 1, margin: "auto" }}>
  //           <View style={{ alignSelf: "center" }}>
  //             <Image style={{ height: 100, width: 95 }} source={Logo} />
  //           </View>
  //           <H1 style={{ textAlign: "center", marginTop: 25 }}>SIGN UP</H1>
  //           <Form>
  //             <Item regular style={{ marginBottom: 25, borderRadius: 5 }}>
  //               <Icon name="ios-mail" />
  //               <Input
  //                 placeholder="Email"
  //                 onChangeText={(text) => setEmail(text)}
  //                 value={email}
  //               />
  //             </Item>
  //             <Item regular style={{ marginBottom: 25, borderRadius: 5 }}>
  //               <Icon name="ios-lock" />
  //               <Input
  //                 placeholder="Password"
  //                 onChangeText={(text) => setPassword(text)}
  //                 secureTextEntry={true}
  //                 value={password}
  //               />
  //             </Item>
  //             <Item regular style={{ marginBottom: 25, borderRadius: 5 }}>
  //               <Icon name="ios-lock" />
  //               <Input
  //                 placeholder="Confirm Password"
  //                 onChangeText={(text) => setPasswordConf(text)}
  //                 secureTextEntry={true}
  //                 value={password_confirmation}
  //               />
  //             </Item>
  //             <Item regular style={{ marginBottom: 25, borderRadius: 5 }}>
  //               <Icon name="ios-school" />
  //               <Input
  //                 placeholder="Department"
  //                 onBlur={onBlur}
  //                 onChangeText={(text) => setDepartment(text)}
  //                 value={department}
  //               />
  //             </Item>
  //           </Form>
  //         </View>
  //       </Content>
  //     </View>
  //   </Container>
  // );
}

export default SignUpPage;
